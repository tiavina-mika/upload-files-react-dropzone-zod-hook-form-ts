import { z } from "zod";
import { hasAcceptedFileTypes, hasFilesMaxSize } from "../fileUtils";

const ACCEPTED_IMAGE_TYPES = ["svg", "png"];
const MAX_SIZE = 5;
const MAX_UPLOAD = 1;

export const uploadSchema = z.object({
  image: z
    .any()
    .refine((files: File[]) => {
      return files.length === 0 || files.length === MAX_UPLOAD;
    }, "Upload only one image")
    .refine((files) => {
      return !hasFilesMaxSize(files, MAX_SIZE);
    }, "Max file required is " + MAX_SIZE + "MB")
    .refine((files: File[]): boolean => {
      if (!files.length) return true;
      return hasAcceptedFileTypes(files, ACCEPTED_IMAGE_TYPES);
    }, ACCEPTED_IMAGE_TYPES.map((type: string) => "." + type) + " are accepted")
    .transform((files: File[]) => {
      return files[0];
    })
});
