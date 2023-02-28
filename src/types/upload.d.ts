import { z } from "zod";
import { uploadSchema } from "../utils/validations/uploadValidations";

export type IUploadOutput = z.infer<typeof uploadSchema>;

// the output schema is transformed from the input schema
interface IUploadInput extends Omit<IUploadOutput, "image"> {
  // should be an array even it's a single file
  // it will be transformed to a single file when the form is submitted
  image: File[];
}
