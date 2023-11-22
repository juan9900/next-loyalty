import { useState } from "react";
import { callWebhook, enrollUser } from "@/utils/utils";
const useUserSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const subscribe = async (
    urlCheck,
    urlEnroll,
    payload,
    cardId,
    username,
    apiKey,
    marca
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const userExists = await callWebhook(urlCheck, payload);

      // Exit the function if the user is already registered
      console.log(userExists.data.isRegistered);
      if (userExists.data.isRegistered) {
        throw new Error("El usuario ya se encuentra registrado");
      }
      // const enroll = await enrollUser(payload, apiKey, cardId, marca);
      // console.log({ enroll });
      // console.log(`Enroll ok: ${enroll.ok}`);
      // if (!enroll.ok) {
      //   console.log("Enroll error");
      //   setError(enroll.error);
      //   setIsLoading(false);
      //   return;
      // }

      // const addPayload = {
      //   ...payload,
      //   pid: enroll.data.pid,
      //   cardLink: enroll.data.url,
      // };

      // console.log(`urlEnroll: ${urlEnroll}`);
      // const addToList = await callWebhook(urlEnroll, addPayload);
      // console.log(addToList);
      // if (!addToList.ok) {
      //   setError(addToList.error);
      //   setIsLoading(false);
      //   return;
      // }
      // console.log(addToList);
      // console.log(addToList.data.url);
      // setIsLoading(false);
      // window.location.href = `${addToList.data.url}`;
    } catch (Error) {
      console.log(`err: ${JSON.stringify(Error.message)}`);
      console.log("se detecto un error");
      setError(Error.message);
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading, error };
};

export default useUserSubscription;
