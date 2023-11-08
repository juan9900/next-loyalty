"use client";
import { useGetCard } from "@/hooks/useGetCard";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useState } from "react";
import crypto from "crypto";
import { encrypt, decrypt } from "@/utils";
import CustomForm from "@/components/CustomForm";
import getTerms from "@/utils/getTerms";
import Navbar from "@/components/Navbar";
import { useCardStore } from "@/stores/cardStore";
const api = "2v6fn5SER9FIiD6ILzdqqX";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function page({ params }) {
  const marca = params.marca;
  const { card, isLoading } = useGetCard({ marca });
  const [dataResult, setDataResult] = useState(null);
  const [terms, setTerms] = useState(null);
  const setCard = useCardStore((state) => state.setCard);

  const hookEnroll = useCardStore((state) => state.hookEnroll);
  const hookCheck = useCardStore((state) => state.hookCheck);

  const fetchLoopyLoyaltyTerms = async () => {
    try {
      const { data } = await getTerms({
        marca,
        username: card.username,
        key: card.API_KEY,
        cardId: card.cardId,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!card) return;

    const fetchTerms = async () => {
      const data = await fetchLoopyLoyaltyTerms();
      setDataResult(data);
      setTerms(data.terms.split("\n"));
    };
    fetchTerms();
  }, [card]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  if (!dataResult) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center flex-col items-center">
      <Navbar backgroundColor={card.primaryColor} logo={card.logoUrl} />
      <h1
        className={`text-5xl mt-10 uppercase ${bebasNeue.className}`}
        style={{ color: `${card.primaryColor}` }}
      >
        {card && card.marca}
      </h1>
      <p>{JSON.stringify(card)}</p>
      <p style={{ color: card.secondaryColor }} className="font-bold text-2xl">
        {dataResult.description}
      </p>
      <CustomForm
        terms={terms}
        primaryColor={card.primaryColor}
        secondaryColor={card.secondaryColor}
        hookEnroll={card.hookEnroll}
        hookCheck={card.hookCheck}
        cardId={card.cardId}
        username={card.username}
        apiKey={card.API_KEY}
        marca={card.marca}
      />
    </div>
  );
}
