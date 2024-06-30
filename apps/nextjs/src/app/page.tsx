"use client";

import { AlertCircle } from "lucide-react";
import { useState } from "react";

import type { RoastLevel } from "@roastme/api";
import { Alert, AlertDescription, AlertTitle } from "@roastme/ui/alert";
import { Button } from "@roastme/ui/button";
import Spinner from "@roastme/ui/spinner";

import ImagePicker from "~/components/roasts/image-picker";
import LevelPicker from "~/components/roasts/level-picker";
import Roast from "~/components/roasts/roast";
import { api } from "~/trpc/react";
import { resizedataURL } from "~/utils/resize-image";

export const runtime = "edge";

export default function HomePage() {
  const [imageFile, setImageFile] = useState<File>();
  const [imageDataUrl, setImageDataUrl] = useState<string | null>();
  const [roastLevel, setRoastLevel] = useState<RoastLevel>();

  const roast = api.roast.getRoast.useMutation();

  const onImagePicked = (imageFile: File) => {
    setImageFile(imageFile);

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target) {
        setImageDataUrl(e.target.result?.toString());
      }
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <main className="container h-screen max-w-xl py-16">
      <div className="flex flex-col items-stretch justify-center gap-4">
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Roast <span className="text-primary">Me</span>
        </h1>
        {!imageFile && <ImagePicker onPicked={onImagePicked} />}
        {imageDataUrl && (
          <div className="rounded-lg border-4 border-dashed border-pink-400 bg-gray-200 dark:bg-slate-600">
            <img src={imageDataUrl} className="w-full object-cover" />
          </div>
        )}
        <LevelPicker
          onChange={(level: RoastLevel) => {
            setRoastLevel(level);
          }}
          disabled={!roast.isIdle}
        />
        {roast.isIdle && (
          <Button
            disabled={!roastLevel || !imageDataUrl}
            onClick={async () => {
              const resizedData = await resizedataURL({
                data: imageDataUrl ?? "",
                maxSide: 512,
              });

              roast.mutate({
                level: roastLevel ?? "Nice",
                imageData: resizedData ?? "",
              });
            }}
          >
            Do me
          </Button>
        )}
        {roast.isPending && <Spinner />}
        {roast.isSuccess && <Roast text={roast.data ?? ""} />}
        {roast.isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fetch Error</AlertTitle>
            <AlertDescription>
              Unable to fetch roast from server: {roast.error.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  );
}
