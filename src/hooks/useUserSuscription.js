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
    console.log({
      urlCheck,
      urlEnroll,
      payload,
      cardId,
      username,
      apiKey,
      marca,
    });

    try {
      const userExists = await callWebhook(urlCheck, payload);

      // Exit the function if the user is already registered
      if (userExists.isRegistered) {
        setError("El usuario ya existe");
        setIsLoading(false);
        return;
      }
      const enroll = await enrollUser(payload, apiKey, cardId, marca);
      console.log({ enroll });
      console.log(`Enroll ok: ${enroll.ok}`);
      if (!enroll.ok) {
        setError(enroll.error);
        setIsLoading(false);
        return;
      }
      const { pid, url: cardLink } = enroll.data;
      console.log({ pid, url });
      const addPayload = {
        payload,
        pid,
        cardLink,
      };

      const addToList = await callWebhook(urlEnroll, addPayload);
      // if (!addToList.ok) {
      //   setError(addToList.error);
      //   setIsLoading(false);
      //   return;
      // }

      // setError("El usuario ya existe");
      setIsLoading(false);
      window.location.href = check.url;
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading, error };
};

export default useUserSubscription;
