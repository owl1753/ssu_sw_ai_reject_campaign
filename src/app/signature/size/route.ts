import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import firestore from "../../../../firebase/firestore";

export async function GET() {
    try {
        const snapshot = await getDocs(collection(firestore, "signatureListTable"));

        const data = {
            size: snapshot.size,
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error getting documents:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}