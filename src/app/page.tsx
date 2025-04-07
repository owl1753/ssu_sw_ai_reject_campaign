"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import AppealBox from "@/components/appealBox";

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
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      navigator.clipboard
        .writeText(window.location.href)
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
          <h1 className="font-bold text-xl mb-4">
            AI혁신대학 개편,
            <br />
            학생이 외면당한 결정에 반대합니다.
            <br />
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

          <AppealBox
            title="충분한 준비 없이 성급하게 개편을 추진하고 있습니다."
            content={`AI혁신대학 계획은 2026학년도 신입생 모집요강 마감 일정에 맞추기 위해 무리하게 추진되고 있습니다.\n학생들과의 사전 설명회나 논의 과정 없이 절차가 진행되었고, 이는 정당성을 심각하게 훼손하는 문제입니다.\n교수 충원도 완료되지 않은 상태에서 개편이 추진되고 있으며, 그 불확실성의 피해는 고스란히 학생에게 돌아갑니다.`}
          />
          <br />
          <AppealBox
            title="학생 이익·학습권을 침해하는 도입안입니다."
            content={`새로 도입되는 커리큘럼이 다른 각 학부의 정체성과 학습 내용을 훼손합니다. 학생들이 학과를 선택할 때 기대한 학습 내용을 보장받을 수 없습니다. 실제로 스마트시스템소프트웨어에서 AI융합학과로 전환된 후 특정 과목이 폐지된 사례가 있습니다.`}
          />
          <br />
          <AppealBox
            title="휴학생과 재학생에 대한 보호안이 없습니다."
            content={`급진적인 추진으로 인해 발생할 학생들의 피해를 고려하지 않았으며, 받을 피해에 대한 대비책이 전무합니다.\n2026년부터 5년 동안 학과를 유지해 준다고 하지만 이는 불가피하게 초과학기를 해야하는 현 전과생들에게는 무의미합니다.\n또한 컴퓨터학부에 자유전공학부 학생들의 수요가 몰릴 경우에 대한 구체적인 대비책이 부족하고, 그에 따른 학생 피해를 사전에 예방하거나 보장할 수 있는 방안도 아직 명확하지 않습니다.`}
          />
          <br />
          <AppealBox
            title="학교는 학과 폐지와 통합을 단순 정원 변경과 학부 신설로 처리하며, 지켜야 하는 정원조정 절차 일부를 생략했습니다."
            content="[정원조정에관한규정 제4조 1항]에 따라 학과를 폐지하는 경우 재학생에게 전수조사를 실시해야 합니다. 하지만 소프트웨어학부와 AI융합학부의 2026년 정원 0명으로 고정하여 실질적으로 폐과를 진행하는 과정에서 전수조사를 실시하지 않았습니다."
          />
          <br />
          <div>
            <h2 className="text-lg font-semibold mb-2">우리의 요구</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>AI혁신대학 도입안에 대한 전면 재검토</li>
              <li>학생 의견 수렴 및 사전 협의를 통한 절차적 정당성 확보</li>
              <li>
                학생의 의견이 반영된 학습권 및 교육 환경 보장을 위한 구체적이고
                실효성 있는 대책 마련 후 개편 시행
              </li>
            </ul>
          </div>
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
