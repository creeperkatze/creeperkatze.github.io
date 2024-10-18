import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Superslide | Creeperkatze",
};

export default function Page() {
  return (
    <div>
      <Image
        src="/images/superslide/GameTitle1024.png"
        alt="SUPERSLIDE"
        width="800"
        height="0"
        className="mx-auto"
      />
      <p>
        Mirror version of the{" "}
        <a href="https://creeperkatze.itch.io/superslide">Itch.io game</a>{" "}
        coming here soon...
      </p>

      <a href="/">
        <h3 className="pt-5">Home</h3>
      </a>
    </div>
  );
}
