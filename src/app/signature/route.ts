import {NextRequest, NextResponse} from "next/server";
import {addDoc, collection} from "firebase/firestore";
import firestore from "../../../firebase/firestore";

interface AddSignatureRequestBody {
    name: string;
    studentId: string;
    department: string;
    signatureBase64: string;
}

export async function PUT(request: NextRequest) {
    const body: AddSignatureRequestBody = await request.json();

    const {name, studentId, department, signatureBase64} = body;

    try {
        // Firestore에 데이터 추가
        await addDoc(collection(firestore, "signatureListTable"), {
            name,
            studentId,
            department,
            signatureBase64,
        });

        return NextResponse.json({status: 201, message: "서명이 정상적으로 등록되었습니다!"});
    } catch (error) {
        console.error("Firestore 저장 실패:", error);

        return NextResponse.json({status: 400, message: "오류가 발생했습니다. 다시 시도해주세요."});
    }
}