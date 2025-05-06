import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href={"/ua"}>
    <Image src="/logo-2.svg" alt="My SVG" width={80} height={60} />
  </Link>
);
