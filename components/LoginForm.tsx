"use client";

import { cn } from "@/lib/utils";
import { fetchUrlLogin } from "@/utils/fetchUrl";
import { validationLog } from "@/utils/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import LoaderComponent from "./LoaderComponent";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validationLog(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(fetchUrlLogin, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      replace("/");
    } catch {
      setError("Ошибка при входе");
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
        <h1 className="text-2xl font-bold">Вход</h1>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Имя пользователя</Label>
          <Input
            id="username"
            type="username"
            name="username"
            placeholder="darkness"
            className="dark:border-neutral-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Пароль</Label>
            <Link
              href="/recovery"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Забыли пароль?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            className="dark:border-neutral-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-sm text-center text-red-500">{error}</div>
        )}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? <LoaderComponent title={"Входим..."} /> : "Войти"}
        </Button>
      </div>
      <div className="text-center text-sm">
        У вас еще нет аккаунта?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Зарегистрироваться
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
