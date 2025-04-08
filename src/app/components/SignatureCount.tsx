import {collection, getDocs} from "firebase/firestore";
import firestore from "../../../firebase/firestore";

export const dynamic = 'force-dynamic';

export default async function SignatureCount() {
    const {size} = await getDocs(collection(firestore, "signatureListTable"));

    return size;
}