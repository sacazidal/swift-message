import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HouseIcon } from "lucide-react";
import Image from "next/image";
import { poppins } from "@/utils/fonts";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-foreground">
      <div className="space-y-6 text-center">
        {/* Логотип */}
        <div className="flex items-center justify-center">
          <Image
            src={"/logo.webp"}
            alt="logo"
            width={48}
            height={48}
            className="filter invert dark:invert-0"
          />
        </div>

        {/* Заголовок с анимацией */}
        <h1
          className={`text-9xl font-bold text-primary animate-bounce ${poppins.className}`}
        >
          404
        </h1>
        <p className="text-2xl font-medium">Страница не найдена</p>

        {/* Описание */}
        <p className="text-muted-foreground">
          Кажется, вы заблудились. Давайте вернёмся на главную страницу.
        </p>

        {/* Кнопка для возврата на главную */}
        <Button asChild className="mt-6">
          <Link href="/" className="flex items-center gap-2">
            <HouseIcon className="h-4 w-4" />
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  );
}
