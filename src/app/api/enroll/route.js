import { generateJWT } from "@/utils/generateJWT";
import { typescript } from "../../../../next.config";
import LOOPY_ROUTES from "@/data/apiRoutes";
import getEnv from "@/utils/getEnv";

export async function POST(request) {
  const url = new URL(request.url);
  const payload = url.searchParams.get("payload");
  const marca = url.searchParams.get("marca");
  const key = url.searchParams.get("key");
  const cardId = url.searchParams.get("cardId");
  const username = url.searchParams.get("username");
  const envVariableName = marca.split(" ")[0];

  console.log({ env: envVariableName });
  const apiSecret = getEnv(envVariableName);
  const JWT = generateJWT(key, apiSecret, username);
  try {
    const response = await fetch(`${LOOPY_ROUTES.enroll}${cardId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: JWT,
      },
      body: payload,
    });

    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify({ status: 200, ok: true, data }));
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({
        status: 500,
        ok: false,
        error: "Error durante el proceso de suscripción",
      })
    );
  }
}
