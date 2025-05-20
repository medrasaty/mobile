import { useState, useCallback } from "react";
import {
  launchImageLibraryAsync,
  launchCameraAsync,
  getPendingResultAsync,
  ImagePickerOptions,
  ImagePickerAsset,
} from "expo-image-picker";
import { fileUploadType } from "@/types";
import { FieldInputProps } from "formik";

export interface ImagePickerConfig extends ImagePickerOptions {}

export type ImageSource = "library" | "camera";

export interface UseImagePickerReturn {
  imageAsset: ImagePickerAsset | undefined;
  fileUpload: fileUploadType | undefined;
  pickImage: (
    config?: ImagePickerConfig,
    source?: ImageSource
  ) => Promise<fileUploadType | undefined>;
  isLoading: boolean;
  error: Error | undefined;
  reset: () => void;
}

/**
 * Custom hook that combines image picking and file upload preparation.
 * Supports both camera and image library as image sources.
 *
 * @returns {UseImagePickerReturn} An object containing:
 *   - imageAsset: The original image asset from expo-image-picker
 *   - fileUpload: The processed image ready for API upload
 *   - pickImage: Function to open the image picker (library or camera)
 *   - isLoading: Boolean indicating if image picking is in progress
 *   - error: Any error that occurred during picking
 *   - reset: Function to reset the state
 *
 * @example
 * // Using the camera to capture an image
 * const { pickImage, fileUpload } = useImagePicker();
 * const takePicture = () => pickImage({ aspect: [1, 1] }, 'camera');
 */
export default function useImagePicker(): UseImagePickerReturn {
  const [imageAsset, setImageAsset] = useState<ImagePickerAsset | undefined>(
    undefined
  );
  const [fileUpload, setFileUpload] = useState<fileUploadType | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  /**
   * Converts an ImagePickerAsset to a fileUploadType
   */
  const processImageAsset = useCallback(
    (asset: ImagePickerAsset): fileUploadType => {
      const mimeType = asset.mimeType || "image/jpeg";
      const imageType = mimeType.split("/")[1];
      const fileName = asset.fileName || `image_${Date.now()}.${imageType}`;

      return {
        uri: asset.uri,
        name: fileName,
        type: mimeType,
      };
    },
    []
  );

  /**
   * Opens the device image picker or camera and processes the selected/captured image
   *
   * @param config - Configuration options for the image picker
   * @param source - Source of the image ('library' or 'camera')
   * @returns Promise resolving to a boolean indicating success
   */
  const pickImage = useCallback(
    async (
      config?: ImagePickerConfig,
      source: ImageSource = "library"
    ): Promise<fileUploadType | undefined> => {
      setIsLoading(true);
      setError(undefined);

      try {
        const options: ImagePickerOptions = {
          mediaTypes: config?.mediaTypes || "images",
          allowsEditing:
            config?.allowsEditing !== undefined ? config.allowsEditing : true,
          aspect: config?.aspect,
          quality: config?.quality || 0.5,
        };

        // Choose between camera and image library
        const result =
          source === "camera"
            ? await launchCameraAsync(options)
            : await launchImageLibraryAsync(options);

        if (result.canceled) {
          setIsLoading(false);
          return undefined;
        }

        // Original Image asset
        const asset = result.assets[0];
        setImageAsset(asset);

        // Modified version of asset
        const uploadFile = processImageAsset(asset);
        setFileUpload(uploadFile);

        setIsLoading(false);
        return uploadFile;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error(`Failed to pick image from ${source}`);
        setError(error);
        setIsLoading(false);
        return undefined;
      }
    },
    [processImageAsset]
  );

  /**
   * Resets the image picker state
   */
  const reset = useCallback(() => {
    setImageAsset(undefined);
    setFileUpload(undefined);
    setError(undefined);
  }, []);

  return {
    imageAsset,
    fileUpload,
    pickImage,
    isLoading,
    error,
    reset,
  };
}

