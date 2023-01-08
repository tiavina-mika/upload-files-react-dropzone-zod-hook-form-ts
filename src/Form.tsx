import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import DropzoneField from "./components/DropzoneField";
import { useEffect } from "react";
import { getFileFromUrl } from "./utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";

// const ACCEPTED_IMAGE_TYPES = ["png"];
// const MAX_SIZE = 10000;
const MAX_UPLOAD = 1;

const schema = z.object({
  image: z
    .any()
    // .instanceof(File)
    // .optional()
    .refine((files: File[]) => {
      return files.length === 0 || files.length === MAX_UPLOAD;
    }, "Upload only one image")
  // .refine((files) => {
  //   console.log('refine files', files);
  //   return files.length >= 1
  // }, "Image is required.")
  // .refine((files) => files?.[0]?.size <= MAX_SIZE, `Max file size is 5MB.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // )
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
          <DropzoneField
            name="image"
            label="Image"
            // maxSize={MAX_SIZE}
            // accept={extensionsToMimeType(ACCEPTED_IMAGE_TYPES)}
          />
          <Box>
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
