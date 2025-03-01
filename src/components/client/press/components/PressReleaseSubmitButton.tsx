
import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const PressReleaseSubmitButton: React.FC = () => {
  return (
    <div className="flex justify-end">
      <Button type="submit" className="flex items-center gap-2">
        <Send className="h-4 w-4" />
        Enviar Release
      </Button>
    </div>
  );
};

export default PressReleaseSubmitButton;
