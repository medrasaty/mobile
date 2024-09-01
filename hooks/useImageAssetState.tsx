import { fileUploadType } from "@/types";
import { ImagePickerAsset } from "expo-image-picker";
import { useState, useEffect, useCallback } from "react";

type imageType = ImagePickerAsset | null | undefined;

export type useImageAssetStateHook<T> = [
  T | null | undefined,
  (image: imageType) => void
];

export default function useImageAssetState(): useImageAssetStateHook<fileUploadType> {
  /**
   * TODO: write usefull description
   */

  const [image, setImage] = useState<fileUploadType | null | undefined>();

  const setImageValue = useCallback(
    (image: imageType) => {
      if (!image) {
        setImage(null);
        return;
      }

      const mimeType = image.mimeType;
      const imageType = mimeType?.split("/")[1];

      const fileName = image.fileName ?? `${new Date()}.${imageType}`; // generate new file name in case you couldn't access fileName.
      console.log(fileName);

      setImage({
        uri: image.uri,
        name: fileName,
        type: mimeType ?? "image/*", // default image type
      });
    },
    [image]
  );

  return [image, setImageValue];
}
