/**
 * get the original filename from the url
 * instead of define manually a new name
 */
const getFilenameFromContentDisposition = (res) => {
  let filename = null;

  const disposition = res.headers.get("content-disposition");

  if (disposition?.includes("attachment")) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches?.[1]) {
      filename = matches[1].replace(/['"]/g, "");
      // Sometimes the filename comes in a URI encoded format so decode it
      filename = decodeURIComponent(filename);
      // Sometimes the filename starts with UTF-8, remove that
      filename = filename.replace(/^UTF-8/i, "").trim();
    }
  }

  return filename;
};

/**
 * transform a file url to input file
 */
export const getFileFromUrl = async (url: string): Promise<File> => {
  const fileRes = await fetch(url);
  const blob = await fileRes.blob();

  let fileName = getFilenameFromContentDisposition(fileRes);
  if (!fileName) {
    fileName = url.split("/").pop();
  }

  const file = new File([blob], fileName, {
    type: blob.type
  });

  return file;
};

/**
 * conver bytes to file sizes
 */
export const convertBytesToFileSize = (
  bytes: number,
  unit: "mb" | "kb" | "gb" = "mb",
  withUnit = false
) => {
  let size = 1;
  switch (unit) {
    case "kb":
      size = 1;
      break;
    case "mb":
      size = 2;
      break;
    case "gb":
      size = 3;
      break;
    default:
      size = 2;
  }

  const transformedSize = bytes / Math.pow(1024, size);
  const fixedSize = +transformedSize.toFixed(2);

  if (withUnit) {
    return fixedSize + unit;
  }
  return fixedSize;
};
