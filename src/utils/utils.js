import LOOPY_ROUTES from "@/data/apiRoutes";

export const callWebhook = async (url, payload = {}) => {
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
};

export const enrollUser = async (data, key, cardId, marca) => {
  try {
    const response = await fetch(
      "/api/enroll?" +
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
};
