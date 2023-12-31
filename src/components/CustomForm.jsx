"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "./PhoneInput";
import { useFlagStore } from "../stores/flagStore";
import { useCardStore } from "../stores/cardStore";
import enrollProcess from "../utils/enrollProcess";
import useUserSubscription from "@/hooks/useUserSuscription";
import CustomSpinner from "./spinner";

export default function CustomForm({
  terms,
  primaryColor,
  secondaryColor,
  hookEnroll,
  hookCheck,
  cardId,
  username,
  apiKey,
  marca,
}) {
  const [termsAccepted, setTermsAccepted] = useState("true");
  const flag = useFlagStore((state) => state);
  const { subscribe, isLoading, error } = useUserSubscription();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.phone = `${flag.code}${data.phone}`;
    const payload = {
      customerData: {
        Nombre: data.name,
        "Número telefónico": data.phone,
        "Correo electrónico": data.email,
      },
    };
    await subscribe(
      hookCheck,
      hookEnroll,
      payload,
      cardId,
      username,
      apiKey,
      marca
    );
  };

  return (
    <div className="w-2/5">
      {error && (
        <div className="flex bg-red-100 p-2 rounded-md mt-3">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <form
        action=""
        id="user-form"
        className="needs-validation"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-5 ">
          <label
            className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="nombre"
          >
            Nombre y apellido:
          </label>
          <input
            className=" form-input border-2 rounded-md w-full"
            {...register("name", {
              required: {
                value: true,
                message: "Por favor ingresa tu nombre y apellido.",
              },
              maxLength: {
                value: 50,
                message: "El nombre no puede tener más de 50 caracteres.",
              },
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres.",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "El nombre solo puede contener letras.",
              },
            })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div className="my-5 d-flex flex-column">
          <label
            className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="numero"
          >
            Número telefónico:
          </label>
          <div className="flex flex-row form-input form-control border-2 rounded-md">
            <PhoneInput />
            <input
              placeholder={flag.placeholder}
              className="pl-2  w-full"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Por favor ingresa tu número telefónico.",
                },
                maxLength: {
                  value: parseInt(flag.length),
                  message: "El número excede el largo permitido.",
                },
                minLength: {
                  value: parseInt(flag.length),
                  message: "El número debe contener 11 caracteres.",
                },
                pattern: {
                  value: flag.regex,
                  message: "El número ingresado no es válido.",
                },
              })}
            />
          </div>

          {errors.phone && (
            <p className="text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div className="my-5">
          <label
            className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            htmlFor="correo"
          >
            Correo electrónico:
          </label>
          <input
            className=" form-input form-control rounded-md border-2 w-full"
            {...register("email", {
              required: {
                value: true,
                message: "Por favor ingresa tu correo electrónico.",
              },
              maxLength: {
                value: 50,
                message: "El correo no puede tener más de 50 caracteres.",
              },
              minLength: {
                value: 2,
                message: "El correo debe tener al menos 2 caracteres.",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "El correo ingresado no es válido.",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <h2 style={{ color: secondaryColor }} className="font-bold text-xl">
          Términos y condiciones
        </h2>
        <div>
          <ul>
            {terms.map((term, index) => (
              <li className="my-3" key={index}>
                {term}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3 form-check">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms-check"
              value="aggree"
              defaultChecked
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label
              className="block ml-2 text-sm font-medium text-gray-900 "
              htmlFor="terms-check"
            >
              Estoy de acuerdo con los términos y condiciones.
            </label>
          </div>
        </div>

        <div id="registered-container" className="text-red-600 mb-2"></div>

        <button
          style={{
            backgroundColor: `${primaryColor}`,
            color: "white",
          }}
          id="submit-btn"
          className="mb-4 btn btn-primary px-2 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex flex-row items-center justify-center"
          type="submit"
          disabled={!termsAccepted || isLoading}
        >
          {isLoading && <CustomSpinner />}
          Enviar
        </button>
      </form>
    </div>
  );
}
