"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { fetchUrlLogout } from "@/utils/fetchUrl";
import { useRouter } from "next/navigation";
import LoaderComponent from "./LoaderComponent";

const LogoutBtn = () => {
  const [loading, setLoading] = useState(false);

  const { replace } = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(fetchUrlLogout, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Ошибка при выходе");
      }
      replace("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} onClick={handleClick}>
      {loading ? <LoaderComponent title={"Выходим..."} /> : "Выйти"}
    </Button>
  );
};
export default LogoutBtn;
