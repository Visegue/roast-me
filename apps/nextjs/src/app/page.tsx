"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

import type { RoastLevel } from "@roastme/api";
import { Alert, AlertDescription, AlertTitle } from "@roastme/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@roastme/ui/select";

import { api } from "~/trpc/react";
import Spinner from "./_components/spinner";

export const runtime = "edge";

export default function HomePage() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>();
  const { data, isSuccess, isFetching, isError } = api.roast.getRoast.useQuery(
    { level: roastLevel ?? "Nice" },
    { enabled: !!roastLevel },
  );

  const onSelectChange = (value: RoastLevel) => {
    setRoastLevel(value);
  };

  return (
    <main className="container h-screen max-w-xl py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Roast <span className="text-primary">Me</span>
        </h1>
        <Image src="/dave.jpeg" width={512} height={512} alt="Caveman Dave" />
        <div className="w-full max-w-2xl">
          <Select onValueChange={onSelectChange}>
            <SelectTrigger className="mx-auto w-[512px] border-pink-600">
              <SelectValue placeholder="Roast level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nice">Nice</SelectItem>
              <SelectItem value="Borderline">Borderline</SelectItem>
              <SelectItem value="Ruthless">Ruthless</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isSuccess && (
          <div className="flex w-full flex-col gap-4 bg-pink-300 p-2 font-semibold leading-loose">
            {data}
          </div>
        )}
        {isFetching && <Spinner />}
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fetch Error</AlertTitle>
            <AlertDescription>
              Unable to fetch roast from server
            </AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  );
}
