import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Creeperkatze",
};

export default function Page()
{
    return (
        <div>
            <h1 className="pt-5">Even this cat couldn&apos;t find the page you were looking for ;(</h1>
            <Image
                src="/images/not-found/soggy-cat-cat.gif"
                alt="Soggy Cat"
                width={300}
                height={300}
                className="pt-10 mx-auto"
            />
            <Link href="/"><h3 className="pt-10">Home</h3></Link>
        </div>
    );
}