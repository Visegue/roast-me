"use client";

import { ImageDown } from "lucide-react";
import { useCallback } from "react";
import type { FileRejection } from "react-dropzone";
import { useDropzone } from "react-dropzone";

const ImagePicker: React.FC<{ onPicked?: (image: File) => void }> = ({
  onPicked,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejections: FileRejection[]) => {
      if (rejections.length > 0) {
        rejections.forEach((rejection) => {
          alert(
            `Rejected file: ${rejection.file.name}". \r\n\r\nReasons:\r\n ${rejection.errors.map((error) => error.message).join(",")}`,
          );
        });
        return;
      }

      acceptedFiles.forEach((file) => {
        onPicked?.(file);
      });
    },
    [onPicked],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop,
  });

  return (
    <div
      {...getRootProps({
        className:
          "dark:bg-slate-600 bg-gray-200 rounded-lg border-pink-400 border-dashed border-4 aspect-square flex flex-row items-center",
      })}
    >
      <input {...getInputProps()} />
      <ImageDown className="m-auto h-32 w-32 text-pink-400" />
    </div>
  );
};

export default ImagePicker;
