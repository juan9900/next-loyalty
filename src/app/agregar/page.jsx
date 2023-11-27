"use client";
import React from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          API Key:
          <input type="text" {...register("apiKey")} />
        </label>
        <label>
          Card ID:
          <input type="text" {...register("cardId")} />
        </label>
        <label>
          Hook Check:
          <input type="text" {...register("hookCheck")} />
        </label>
        <label>
          Hook Enroll:
          <input type="text" {...register("hookEnroll")} />
        </label>
        <label>
          Logo URL:
          <input type="text" {...register("logoUrl")} />
        </label>
        <label>
          Marca:
          <input type="text" {...register("marca")} />
        </label>
        <label>
          Color Primario:
          <input type="text" {...register("colorPrimario")} />
        </label>
        <label>
          Color Secundario:
          <input type="text" {...register("colorSecundario")} />
        </label>
        <label>
          Color Primario Oscuro:
          <input type="text" {...register("colorPrimarioOscuro")} />
        </label>
        <label>
          Nombre de Usuario:
          <input type="text" {...register("nombreUsuario")} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
