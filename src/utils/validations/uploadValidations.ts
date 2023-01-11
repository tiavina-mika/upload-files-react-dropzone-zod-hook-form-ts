import { z } from "zod";

import { hasAcceptedFileTypes, hasFilesMaxSize } from "../fileUtils";

const ACCEPTED_IMAGE_TYPES = ["jpeg", "png"];
const ACCEPTED_CSV_TYPES = ["csv"];
const MAX_IMAGE_SIZE = 5;
export const MAX_IMAGE_UPLOAD = 1;
export const MAX_IMAGES_UPLOAD = 3;
const MAX_CSV_UPLOAD = 1;

export const uploadSchema = z.object({
  image: z
    .any()
    // file size validation
    .refine((files) => {
      return !hasFilesMaxSize(files, MAX_IMAGE_SIZE);
    }, "Max file required is " + MAX_IMAGE_SIZE + "MB")
    // file types validation
    .refine((files: File[]): boolean => {
      if (!files.length) return true;
      return hasAcceptedFileTypes(files, ACCEPTED_IMAGE_TYPES);
    }, ACCEPTED_IMAGE_TYPES.map((type: string) => "." + type) + " are accepted")
    // get only one file from list
    .transform((files: File[]) => {
      if (!files || files?.length === 0) return;
      return files[0];
    }),
  images: z
    .any()
    // file count validation
    // .refine((files: File[]) => {
    //   return files.length === 0 || files.length === MAX_IMAGES_UPLOAD;
    // }, "Upload only one image")
    // file size validation
    .refine((files: File[]) => {
      return !hasFilesMaxSize(files, MAX_IMAGE_SIZE);
    }, "Max file required is " + MAX_IMAGE_SIZE + "MB")
    // file types validation
    .refine((files: File[]): boolean => {
      if (!files.length) return true;
      return hasAcceptedFileTypes(files, ACCEPTED_IMAGE_TYPES);
    }, ACCEPTED_IMAGE_TYPES.map((type: string) => "." + type) + " are accepted"),
  // get only one file from list
  csv: z
    .any()
    // file count validation
    .refine((files: File[]) => {
      if (!files) return true;
      return files.length === 0 || files.length === MAX_CSV_UPLOAD;
    }, "Upload only one csv file")
    // file size validation
    .refine((files: File[]) => {
      if (!files) return true;
      return !hasFilesMaxSize(files, MAX_IMAGE_SIZE);
    }, "Max file required is " + MAX_IMAGE_SIZE + "MB")
    // file types validation
    .refine((files: File[]): boolean => {
      if (!files || !files.length) return true;
      return hasAcceptedFileTypes(files, ACCEPTED_CSV_TYPES);
    }, ACCEPTED_CSV_TYPES.map((type: string) => "." + type) + " are accepted")
    // get only one file from list
    .transform((files: File[]) => {
      if (!files || files?.length === 0) return;
      return files[0];
    })
});
