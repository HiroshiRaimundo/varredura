
import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isActive?: boolean;
  steps: string[];
  isLast?: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ 
  number, 
  title, 
  description, 
  icon: Icon,
  isActive = false,
  steps,
  isLast = false
}) => {
  return (
    <div className={`relative pl-8 ${isLast ? '' : 'pb-8 border-l-2 border-gray-200'}`}>
      <div className={`absolute left-[-9px] top-0 ${isActive ? 'bg-primary' : 'bg-gray-300'} text-white rounded-full h-4 w-4 flex items-center justify-center text-xs`}>
        {number}
      </div>
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
        {title}
      </h3>
      <p className="text-muted-foreground">
        {description}
      </p>
      <ol className="list-decimal pl-5 mt-2 space-y-2 text-sm text-muted-foreground">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default StepItem;
