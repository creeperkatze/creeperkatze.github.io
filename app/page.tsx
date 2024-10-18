import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home | Creeperkatze",
};

export default function Page()
{
    return (
        <div>
            <Image
                src="/images/index/LogoBanner128.png"
                alt="Next.js logo"
                width={800}
                height={0}
                className="mx-auto"
                style={{ imageRendering: 'pixelated' }} // Ensures the image rendering is pixelated
            />
            <p className="pt-10">
                Hello! I&apos;m Creeperkatze
                <br />A Unity game developer from Germany, with my current big project being Superslide.
            </p>

            <h2 className="pt-5">My projects</h2>
            <ul className="pt-5 list-disc">
                <h3><li><a href="/superslide">Superslide</a></li></h3>
            </ul>
        </div>
    );
};