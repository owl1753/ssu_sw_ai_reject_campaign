import {Button} from "@/components/ui/button"
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen px-4 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center mx-auto max-w-3xl">
                <section>
                    <h1 className="font-bold text-lg mb-4">
                        소프트웨어학부・AI융합학부 통폐합, <br />
                        학생이 외면당한 결정에 반대합니다. <br />
                        반대 온라인 서명운동에 동참해 주세요!
                    </h1>
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle className="text-nowrap">반대 서명운동 실시간현황</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <b className="text-red-500">800명</b> 참여중!
                        </CardContent>
                    </Card>
                    <h2 className="text-base mb-1.5">
                        통폐합은 학교에서 제시한 문제를 해결할 수 없음
                    </h2>
                    <ol className="text-sm mb-4">
                        <ul>자유 전공학부 정원 쏠림 대책 부재</ul>
                        <ul>교수·강의실 부족 문제 해결 불가</ul>
                        <ul>AI혁신대학 15억 지원금 활용 계획 불명확 및 선정 불확실성</ul>
                    </ol>
                    <h2 className="text-base mb-1.5">
                        학생 이익·학습권이 보장되지 않음
                    </h2>
                    <ol className="text-sm">
                        <ul>각 학부 정체성 훼손</ul>
                        <ul>소프트웨어학부/AI융합학부 중점 분야 차이 무시</ul>
                        <ul>5년내 졸업 어려운 학생들 학부명 보장 문제</ul>
                        <ul>과거 스마트시스템소프트웨어 졸업생 학부명 보장 약속 불이행</ul>
                    </ol>
                </section>
                <Button asChild size="lg" className="w-full" variant="outline">
                    <Link href="/signature-form">
                        서명하기
                    </Link>
                </Button>
            </main>
        </div>
    );
}
