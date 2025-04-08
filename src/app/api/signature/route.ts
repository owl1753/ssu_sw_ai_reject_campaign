import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import firestore from "../../../../firebase/firestore";

interface AddSignatureRequestBody {
  name: string;
  studentId: string;
  department: string;
  signatureBase64: string;
  timestamp: string;
}

export async function PUT(request: NextRequest) {
  const body: AddSignatureRequestBody = await request.json();
  const { name, studentId, department, signatureBase64, timestamp} = body;

  try {
    // 이미 해당 studentId로 서명했는지 확인
    const q = query(
      collection(firestore, "signatureListTable"),
      where("studentId", "==", studentId)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return NextResponse.json({
        status: 400,
        message: "이미 해당 학번으로 서명이 등록되어 있습니다.",
      });
    }

    // 2️⃣ Firestore에 데이터 추가
    await addDoc(collection(firestore, "signatureListTable"), {
      name,
      studentId,
      department,
      signatureBase64,
      timestamp,
    });

    return NextResponse.json({
      status: 201,
      message: "서명이 정상적으로 등록되었습니다!",
    });
  } catch (error) {
    console.error("Firestore 저장 실패:", error);
    return NextResponse.json({
      status: 400,
      message: "오류가 발생했습니다. 다시 시도해주세요.",
    });
  }
}
