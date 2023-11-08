import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "/src/firebase/firestore";
export async function GET(request) {
  const url = new URL(request.url);
  const marca = url.searchParams.get("marca");

  const docRef = doc(db, "cards", marca);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const API_SECRET = `NEXT_PUBLIC_${marca.toUpperCase()}_LOOPY_LOYALTY_API_SECRET`;
    const body = docSnap.data();
    console.log(body);
    const responseBody = {
      ...body,
      apiSecret: API_SECRET,
    };
    console.log(responseBody);
    return new Response(
      JSON.stringify({
        status: 200,
        body: responseBody,
      })
    );
  } else {
    return new Response(JSON.stringify({ status: 404, body: "Not found" }));
  }
}
