import {collection, onSnapshot} from "firebase/firestore";
import {NextResponse} from "next/server";
import firestore from "../../../../firebase/firestore"

export async function GET() {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const unsubscribe = onSnapshot(
                collection(firestore, "signatureListTable"),
                (snapshot) => {
                    const data = {
                        size: snapshot.size,
                    };
                    const message = `data: ${JSON.stringify(data)}\n\n`;
                    controller.enqueue(encoder.encode(message));
                },
                (error) => {
                    console.error('Stream error:', error);
                    controller.close();
                }
            );

            return () => {
                unsubscribe();
            };
        }
    });

    // 응답 반환 시 헤더와 스트림을 포함
    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
}