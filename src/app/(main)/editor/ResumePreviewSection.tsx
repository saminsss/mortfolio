import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import React from "react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";

type ResumePreviewSectionProps = {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
};

const ResumePreviewSection = ({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) => {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-1 top-1 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-3 lg:top-3 2xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          className="max-w-2xl shadow-md"
          resumeData={resumeData}
        />
      </div>
    </div>
  );
};

export default ResumePreviewSection;
