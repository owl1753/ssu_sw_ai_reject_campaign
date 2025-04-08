"use client"

import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";

export default function ShareButton() {
    const handleShare = () => {
        if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert("링크가 복사되었습니다!");
                })
                .catch(() => {
                    alert("링크 복사에 실패했습니다.");
                });
        } else {
            alert("현재 브라우저에서 클립보드 복사를 지원하지 않습니다.");
        }
    };

    return <Button
        size="icon"
        variant="secondary"
        className="shrink-0 h-14"
        onClick={handleShare}
    >
        <Share2 className="w-5 h-5"/>
        <span className="sr-only">공유하기</span>
    </Button>
}