import { generateJWT } from "@/utils/generateJWT";
import { typescript } from "../../../../next.config";
import LOOPY_ROUTES from "@/data/apiRoutes";

export async function GET(request) {
  const url = new URL(request.url);
  const marca = url.searchParams.get("marca");
  const key = url.searchParams.get("key");
  const cardId = url.searchParams.get("cardId");
  const username = url.searchParams.get("username");
  const envVariableName = `NEXT_PUBLIC_${marca.toUpperCase()}_LOOPY_LOYALTY_API_SECRET`;

  const apiSecret = process.env[envVariableName];

  const JWT = generateJWT(key, apiSecret, username);

  try {
    const response = await fetch(`${LOOPY_ROUTES.terms}${cardId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JWT,
      },
    });
    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data));
  } catch (e) {}
  console.log(JWT);
  console.log(JSON.stringify(JWT));
  return new Response(JSON.stringify({ status: 200, body: "hola" }));
}
