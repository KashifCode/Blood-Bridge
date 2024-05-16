"use client";

// IMPORTS -
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

// PARTIALS -
interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      key={process.env.UPLOADTHING_SECRET}
      endpoint={endpoint}
      onClientUploadComplete={(res: any) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
