
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const LoginDemoAlert: React.FC = () => {
  return (
    <Alert className="mb-4 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-600">
        Para fins de demonstração, use um dos seguintes emails com a senha "password123":
        <ul className="list-disc ml-5 mt-2 text-sm">
          <li>observatory@example.com</li>
          <li>researcher@example.com</li>
          <li>politician@example.com</li>
          <li>institution@example.com</li>
          <li>journalist@example.com</li>
          <li>press@example.com</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default LoginDemoAlert;
