
import React from "react";
import { PressReleaseFormProps } from "./types/pressReleaseTypes";
import PressReleaseFormContainer from "./components/PressReleaseFormContainer";

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({ clientType }) => {
  return <PressReleaseFormContainer clientType={clientType} />;
};

export default PressReleaseForm;
