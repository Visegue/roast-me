import Image from "next/image";

import { api } from "~/trpc/server";

export const runtime = "edge";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const roast = await api.roast.getRoast();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Roast <span className="text-primary">Me</span>
        </h1>
        <Image src="/dave.jpeg" width={512} height={512} alt="Caveman Dave" />
        <div className="w-full max-w-2xl">
          <div className="flex w-full flex-col gap-4 bg-pink-300 leading-loose p-2 font-semibold">{roast}</div>
        </div>
      </div>
    </main>
  );
}
