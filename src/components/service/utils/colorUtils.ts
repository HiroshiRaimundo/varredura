
import { ClientType } from "@/components/client/ClientTypes";

export interface ColorClasses {
  bg: string;
  light: string;
  text: string;
  border: string;
}

export const getColorClasses = (type: ClientType): ColorClasses => {
  const colorMap: Record<ClientType, ColorClasses> = {
    observatory: { bg: "bg-blue-600", light: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    researcher: { bg: "bg-indigo-600", light: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
    politician: { bg: "bg-green-600", light: "bg-green-50", text: "text-green-600", border: "border-green-200" },
    institution: { bg: "bg-purple-600", light: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
    journalist: { bg: "bg-red-600", light: "bg-red-50", text: "text-red-600", border: "border-red-200" },
    press: { bg: "bg-amber-600", light: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" }
  };
  return colorMap[type];
};
