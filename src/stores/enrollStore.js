import { set } from "react-hook-form";
import { create } from "zustand";

const useCardStore = create((set) => ({
  name: "",
  email: "",
  phone: "",
  setData: (name, email, phone) =>
    set((state) => ({
      name,
      email,
      phone,
    })),
}));

export { useCardStore };
