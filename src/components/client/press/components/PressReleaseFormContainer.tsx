
import React from "react";
import { Form } from "@/components/ui/form";
import { PressReleaseFormProps } from "../types/pressReleaseTypes";
import PressReleaseFormFields from "./PressReleaseFormFields";
import MediaLinksSection from "./MediaLinksSection";
import PressReleaseSubmitButton from "./PressReleaseSubmitButton";
import { usePressReleaseForm } from "../hooks/usePressReleaseForm";

const PressReleaseFormContainer: React.FC<PressReleaseFormProps> = ({ clientType }) => {
  const { form, mediaLinks, setMediaLinks, onSubmit, handleFormatText } = usePressReleaseForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PressReleaseFormFields 
          form={form} 
          onFormatText={handleFormatText} 
        />

        <MediaLinksSection 
          mediaLinks={mediaLinks} 
          setMediaLinks={setMediaLinks} 
        />

        <PressReleaseSubmitButton />
      </form>
    </Form>
  );
};

export default PressReleaseFormContainer;
