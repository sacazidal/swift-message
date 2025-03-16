import { poppins } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-medium">
      <div className="flex relative h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-md bg-primary">
        <Image
          src={"https://i.ibb.co/R47KV0KK/logo.webp"}
          alt="SM"
          fill
          priority
          className="filter invert-0 dark:invert"
        />
      </div>
      <span className={`md:text-lg text-base font-bold ${poppins.className}`}>
        Swift Message
      </span>
    </Link>
  );
};
export default Logo;
