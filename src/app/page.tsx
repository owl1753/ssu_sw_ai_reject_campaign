import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import AppealBox from "@/components/appealBox";
import ShareButton from "@/app/components/ShareButton";
import {collection, getDocs} from "firebase/firestore";
import firestore from "../../firebase/firestore";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const {size} = await getDocs(collection(firestore, "signatureListTable"));

    return (
        <div className="min-h-screen px-4 py-8 font-[family-name:var(--font-geist-sans)] bg-white">
            <main className="flex flex-col gap-10 items-center mx-auto max-w-3xl w-full">
                <section className="w-full">
                    <h1 className="font-extrabold text-2xl text-center leading-snug text-gray-900 mb-6">
                        AI혁신대학 개편, <br/>
                        <span className="text-red-600">
                            학생이 외면당한 결정에 반대합니다.
                            <br/>
                        </span>
                        반대 온라인 서명운동에 동참해 주세요!
                    </h1>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-nowrap">
                                반대 온라인 서명운동 실시간 현황
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <b className="text-red-600 text-lg">
                                {size}명
                            </b> 참여중!
                        </CardContent>
                    </Card>

                    {/* AppealBoxes with separation */}
                    <div className="space-y-8">
                        <AppealBox
                            title="충분한 준비 없이 성급하게 개편을 추진하고 있습니다."
                            content={`현 AI혁신대학 도입안은 2026학년도 신입생 모집요강 마감 일정에 맞추기 위해 무리하게 추진되고 있습니다.\n학생들과의 사전 설명회나 논의 과정 없이 절차가 진행되었고, 이는 정당성을 심각하게 훼손하는 문제입니다.\n교수 충원도 완료되지 않은 상태에서 도입안이 추진되고 있으며, 그 불확실성의 피해는 고스란히 학생에게 돌아갑니다.`}
                        />
                        <hr className="border-gray-200"/>
                        <AppealBox
                            title="학생 이익·학습권을 침해하는 도입안입니다."
                            content={`새로 도입되는 커리큘럼이 다른 각 학부의 정체성과 학습 내용을 훼손합니다. 학생들이 학과를 선택할 때 기대한 학습 내용을 보장받을 수 없습니다. 실제로 스마트시스템소프트웨어에서 AI융합학과로 전환된 후 특정 과목이 폐지된 사례가 있습니다.`}
                        />
                        <hr className="border-gray-200"/>
                        <AppealBox
                            title="휴학생과 재학생에 대한 보호안이 없습니다."
                            content={`급진적인 추진으로 인해 발생할 학생들의 피해를 고려하지 않았으며, 받을 피해에 대한 대비책이 전무합니다.\n2026년부터 5년 동안 학과를 유지해 준다고 하지만 이는 불가피하게 초과학기를 해야하는 현 전과생들에게는 무의미합니다.\n또한 컴퓨터학부에 자유전공학부 학생들의 수요가 몰릴 경우에 대한 구체적인 대비책이 부족하고, 그에 따른 학생 피해를 사전에 예방하거나 보장할 수 있는 방안도 아직 명확하지 않습니다.`}
                        />
                        <hr className="border-gray-200"/>
                        <AppealBox
                            title="학생들의 의견을 충분히 고려하지 않은 도입입니다"
                            content="소프트웨어학부와 AI융합학부의 2026년 정원 0명으로 고정하는 것은 실질적으로 폐과와 다름 없습니다. 이런 중대한 결정에 학생들 의견을 고려하지 않았고, 제4조1항의 정원조정 과정에서 ‘재적학생 동의여부 전수 설문조사’ 가 필요하나, 이 또한 거치지 않았습니다."
                        />
                    </div>

                    {/* 요구사항 */}
                    <Card className="mt-10">
                        <CardHeader>
                            <h2 className="text-lg font-semibold">우리의 요구</h2>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-base text-gray-800">
                                <li>AI혁신대학 도입안에 대한 전면 재검토</li>
                                <li>학생 의견 수렴 및 사전 협의를 통한 절차적 정당성 확보</li>
                                <li>
                                    학생의 의견이 반영된 학습권 및 교육 환경 보장을 위한
                                    구체적이고 실효성 있는 대책 마련 후 개편 시행
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>

                <p className="text-base text-gray-400">
                    ※ 본 서명운동은 SW&AI학부의 일부 학생들이 모여서 개발한 웹사이트를
                    통해 진행하고 있는 운동입니다.
                </p>

                {/* 서명 + 공유 버튼 그룹 */}
                <div className="flex gap-3 w-full">
                    <Button
                        asChild
                        className="flex-1 font-semibold text-bas bg-black text-white h-14"
                        variant="outline"
                    >
                        <Link href="/signature-form">서명하기</Link>
                    </Button>
                    <ShareButton/>
                </div>
            </main>
        </div>
    );
}
