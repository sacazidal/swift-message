"use client";

import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import LoaderComponent from "./LoaderComponent";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { validationReg } from "@/utils/validation";
import { fetchUrlRegister } from "@/utils/fetchUrl";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validationReg(
      email,
      username,
      password,
      passwordTwo
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(fetchUrlRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      push("/login");
    } catch {
      setError("Ошибка при регистрации");
      return;
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
        <h1 className="text-2xl font-bold">Регистрация</h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Почта</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            className="dark:border-neutral-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Логин</Label>
          <Input
            name="username"
            id="username"
            type="text"
            placeholder="darkness"
            className="dark:border-neutral-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            name="password"
            id="password"
            type="password"
            className="dark:border-neutral-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password2">Подтверждение пароля</Label>
          <Input
            name="password"
            id="password2"
            type="password"
            className="dark:border-neutral-700"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-sm text-center text-red-500">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <LoaderComponent title={"Регистрируем..."} />
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        У вас уже есть аккаунт?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Войти
        </Link>
      </div>
    </form>
  );
};
export default SignUpForm;
