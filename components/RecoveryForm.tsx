"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import LoaderComponent from "./LoaderComponent";
import { fetchUrlRecovery } from "@/utils/fetchUrl";
import { validationRecovery } from "@/utils/validation";

const RecoveryForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validationRecovery(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(fetchUrlRecovery, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
    } catch {
      setError("Ошибка при восстановлении пароля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6")}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Восстановление пароля</h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Имя пользователя</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            className="dark:border-neutral-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-sm text-center text-red-500">{error}</div>
        )}
        <div className="text-center text-sm flex justify-between">
          <Link href="/login" className="underline underline-offset-4">
            Войти
          </Link>
          <Link href="/signup" className="underline underline-offset-4">
            Зарегистрироваться
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? (
            <LoaderComponent title={"Восстанавливаем пароль..."} />
          ) : (
            "Восстановить"
          )}
        </Button>
      </div>
    </form>
  );
};
export default RecoveryForm;
