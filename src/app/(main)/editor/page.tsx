import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design Your Resume",
};

const Page = () => {
  return <ResumeEditor />;
};

export default Page;
