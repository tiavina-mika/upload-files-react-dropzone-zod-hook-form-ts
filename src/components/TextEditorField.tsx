import { FC, SyntheticEvent, useState } from "react";

import {
  Box,
  FormHelperText,
  InputLabel,
  Tab,
  Tabs,
  styled
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import parseHtml from "html-react-parser";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "../styles/text-editor.css";
import { getMUIColorsList } from "../utils/utils";

export const EDITOR_CONFIG = {
  colors: getMUIColorsList(),
  fonts: ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"]
};

// ------------------------------------------ //
// ------------- Quil config ---------------- //
// ------------------------------------------ //
// ----------- load fonts ----------- //
const Font = Quill.import("formats/font");
Font.whitelist = EDITOR_CONFIG.fonts;
Quill.register(Font, true);

// ----------- toolbar ----------- //
const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: EDITOR_CONFIG.colors }, { background: EDITOR_CONFIG.colors }], // dropdown with defaults from theme

  ["link"],
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  [{ font: Font.whitelist }],
  [{ align: [] }]
];

// ------------------------------------------ //
// --------------- Tabs --------------------- //
// ------------------------------------------ //
interface StyledTabsProps {
  children?: React.ReactNode;
  value: "editor" | "preview";
  onChange: (event: SyntheticEvent, newValue: "editor" | "preview") => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "transparent"
  }
});

interface StyledTabProps {
  label: string;
  value: "editor" | "preview";
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#000",
    backgroundColor: "#ededed",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)"
  }
}));

// ------------------------------------------ //
// -------------- component ----------------- //
// ------------------------------------------ //
type Props = {
  name: string;
  label?: string;
  helperText?: string;
};

const TextEditorField: FC<Props> = ({ name, label, helperText }) => {
  const [tab, setTab] = useState<"editor" | "preview">("editor");
  const [editorValue, setEditorValue] = useState<string>("");

  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const handleTabChange = (_: SyntheticEvent, value: "editor" | "preview") =>
    setTab(value);

  return (
    <>
      {/* ----------- label ----------- */}
      {label && (
        <InputLabel sx={{ mb: 0.8, color: "#000" }}>{label}</InputLabel>
      )}

      {/* ----------- tabs ----------- */}
      <StyledTabs
        value={tab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <StyledTab label="Editor" value="editor" />
        <StyledTab label="Preview" value="preview" />
      </StyledTabs>

      {/* ----------- editor tab ----------- */}
      {tab === "editor" && (
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <Box>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={(value) => {
                  onChange(value);
                  setEditorValue(value);
                }}
                modules={{ toolbar: toolbarOptions }}
              />
              {errors[name] && (
                <FormHelperText error>{(errors as any)[name]}</FormHelperText>
              )}
              {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </Box>
          )}
        />
      )}

      {/* ----------- preview tab ----------- */}
      {tab === "preview" && parseHtml(editorValue)}
    </>
  );
};

export default TextEditorField;
