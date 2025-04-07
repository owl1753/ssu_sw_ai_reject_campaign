"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react"; 

export default function Home() {
  const [signatureCount, setSignatureCount] = useState<number | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("signature/size");

    eventSource.onmessage = (event) => {
      const { size } = JSON.parse(event.data);
      setSignatureCount(size);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center mx-auto max-w-3xl w-full">
        <section>
          <h1 className="font-bold text-lg mb-4">
            소프트웨어학부・AI융합학부 통폐합, <br />
            학생이 외면당한 결정에 반대합니다. <br />
            반대 온라인 서명운동에 동참해 주세요!
          </h1>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-nowrap">
                반대 서명운동 실시간현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              {signatureCount !== null ? (
                <b className="text-red-500">{signatureCount}명</b>
              ) : (
                <span className="text-sm text-gray-500">로딩 중...</span>
              )}{" "}
              참여중!
            </CardContent>
          </Card>

          <h2 className="text-base mb-1.5 font-semibold">
            학생 이익·학습권을 침해하는 도입안입니다.
          </h2>
          <p className="text-sm mb-4">
            커리큘럼이 다른 각 학부의 정체성과 학습 내용을 훼손합니다. 학생들이
            학과를 선택할 때 기대한 학습 내용을 보장받을 수 없습니다. 실제로
            스마트시스템소프트웨어에서 AI융합학과로 전환된 후 특정 과목이 폐지된
            사례가 있습니다.
          </p>

          <h2 className="text-base mb-1.5 font-semibold">
            15억 지원이 확정적이지 않으며, 현재의 문제 해결을 위한 구체적인 활용안이 없습니다.
          </h2>
          <p className="text-sm mb-4">
            이렇게 도입안이 시행된다면, 15억이 지원되더라도 교수·강의실 부족과 자유전공학부 쏠림 문제를 해결할 수 없습니다.
          </p>

          <h2 className="text-base mb-1.5 font-semibold">
            휴학생과 재학생에 대한 보호안이 없습니다.
          </h2>
          <p className="text-sm">
            5년간 기존 학부명 졸업장 보장에 대한 법적 효력이 있는 문서가 존재하지 않고, 보장되더라도 군휴학을 하는 경우 5년 내에 졸업이 불가합니다.
          </p>
        </section>

        {/* 서명 + 공유 버튼 그룹 */}
        <div className="flex gap-2 w-full">
          <Button asChild size="lg" className="flex-1" variant="outline">
            <Link href="/signature-form">서명하기</Link>
          </Button>
          <Button size="icon" variant="secondary" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
            <span className="sr-only">공유하기</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
