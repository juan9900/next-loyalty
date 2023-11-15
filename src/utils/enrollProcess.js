import { useCardStore } from "@/stores/cardStore";
import getEnv from "./getEnv";

export default async function enrollProcess(
  hookEnroll,
  hookCheck,
  name,
  email,
  phone,
  cardId,
  username,
  apiKey,
  marca
) {
  let payload = {
    customerData: {
      Nombre: name,
      "Número telefónico": phone,
      "Correo electrónico": email,
    },
    dataConsentOptIn: true,
  };
  try {
    const responseCheck = callWebhook(hookCheck, payload);
    const { isRegistered } = responseCheck.data;
    if (isRegistered) {
      return {
        ok: false,
        error:
          "El número telefónico o correo electrónico ya se encuentra registrado",
      };
    }
  } catch (e) {
    console.log(e);
  }
  // if (isRegistered) {
  //   return {
  //     ok: false,
  //     error:
  //       "El número telefónico o correo electrónico ya se encuentra registrado",
  //   };
  // } else {
  //   console.log("not registered");
  //   enrollUser("/api/enroll?", payload, apiKey, cardId, marca).then(
  //     (response) => {
  //       if (response.error?.includes("is not valid")) {
  //         return;
  //       }
  //       const { pid, url: cardLink } = response.data;
  //       const hookPayload = { ...payload, pid, cardLink };
  //       callWebhook(hookEnroll, hookPayload).then((response) => {
  //         if (!response.ok) {
  //           return;
  //         }

  //         console.log(response);
  //       });
  //     }
  //   );
  // }
  // });
}

async function callWebhook(url, payload = {}) {
  console.log(`Calling webhook ${url}`);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Add CORS headers to allow requests from any origin
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log({ check: data });
    return { data, ok: response.ok };
  } catch (e) {
    console.log({ webhook: e });
    return false;
  }
}

async function enrollUser(url, data, key, cardId, marca) {
  try {
    const response = await fetch(
      url +
        new URLSearchParams({
          key,
          cardId,
          marca,
          payload: JSON.stringify(data),
        }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (e) {
    console.log(e);
    return e;
  }
}
