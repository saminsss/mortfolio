import { ResumeValues } from "./validation";

export type EditorFormProps = {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
};
