"use client"

import React, {useRef, useImperativeHandle, forwardRef} from "react";
import SignatureCanvas from "react-signature-canvas";

type Props = {
    onChange?: (dataURL: string) => void;
};

export type SignaturePadRef = {
    clear: () => void;
};

const SignaturePad = forwardRef<SignaturePadRef, Props>(({onChange}, ref) => {
    const sigCanvasRef = useRef<SignatureCanvas>(null);

    useImperativeHandle(ref, () => ({
        clear: () => {
            sigCanvasRef.current?.clear();
            onChange?.("");
        }
    }));

    return (
        <div className="relative border rounded-md p-2 bg-white w-full max-w-full overflow-hidden">
            <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{
                    className: "signature-canvas w-full h-[200px]", 
                    style: { width: 900, borderRadius: '8px' }
                }}
                onEnd={() => {
                    const dataURL = sigCanvasRef.current?.toDataURL() || ""
                    onChange?.(dataURL)
                }}
            />

        </div>
    );
});

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
