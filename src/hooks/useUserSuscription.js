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

      // if (!userExists) {
      //   await enrollUser(name, email, phone, cardId, username, apiKey, marca);
      //   await subscribeUser(name, email, phone);
      // }
      console.log(userExists);
      if (userExists) {
        setError("El usuario ya existe");
      }
      // setError("El usuario ya existe");
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading, error };
};

export default useUserSubscription;
