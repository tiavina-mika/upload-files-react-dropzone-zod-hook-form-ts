import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import DropzoneField from "./components/DropzoneField";
import { useEffect } from "react";
import {
  getFileFromUrl,
  hasAcceptedFileTypes,
  hasFilesMaxSize
} from "./utils/fileUtils";
import { zodResolver } from "@hookform/resolvers/zod";

const ACCEPTED_IMAGE_TYPES = ["svg", "png"];
const MAX_SIZE = 5;
const MAX_UPLOAD = 1;

const schema = z.object({
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

const imageUrls = [
  // "https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg?quality=75&auto=webp"
];

/**
 * get form initial values
 */
const getInitialValues = async () => {
  const images = await Promise.all(
    imageUrls.map((url: string) => getFileFromUrl(url))
  );

  return {
    image: images
  };
};

const Form = () => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    // async default values
    const init = async () => {
      const defaultValues = await getInitialValues();
      form.reset(defaultValues);
    };
    init();
  }, [form]);

  const { handleSubmit } = form;

  const onSubmit = (values) => console.log("values", values);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DropzoneField name="image" label="Image" inputLabel="Add image" />
          <Box mt={1}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </FormProvider>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <a href="https://www.linkedin.com/in/tiavina-michael-ralainirina/">
          <Typography>By Tiavina Michael Ralainirina</Typography>
        </a>
      </Box>
    </Box>
  );
};

export default Form;
