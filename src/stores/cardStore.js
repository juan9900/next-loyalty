import { set } from "react-hook-form";
import { create } from "zustand";

const useCardStore = create((set) => ({
  primaryColor: "",
  primaryDarkerColor: "",
  secondaryColor: "",
  hookCheck: "",
  hookEnroll: "",
  apiKey: "",
  username: "",
  cardId: "",
  setCard: (
    primary,
    primaryDarker,
    secondary,
    hookCheck,
    hookEnroll,
    apiKey,
    username,
    cardId
  ) =>
    set((state) => ({
      primaryColor: primary,
      primaryDarkerColor: primaryDarker,
      secondaryColor: secondary,
      hookCheck,
      hookEnroll,
      apiKey,
      username,
      cardId,
    })),
}));

export { useCardStore };
