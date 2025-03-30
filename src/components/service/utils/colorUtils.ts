
export interface ColorClasses {
  light: string;
  dark: string;
  text: string;
  hover: string;
  border: string;
  bg: string;
  main: string;
}

export const getColorClasses = (clientType: string): ColorClasses => {
  switch (clientType) {
    case 'observatory':
      return {
        light: 'bg-blue-50',
        dark: 'bg-blue-600',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-100',
        border: 'border-blue-600',
        bg: 'bg-blue-600',
        main: 'blue'
      };
    case 'researcher':
      return {
        light: 'bg-green-50',
        dark: 'bg-green-600',
        text: 'text-green-600',
        hover: 'hover:bg-green-100',
        border: 'border-green-600',
        bg: 'bg-green-600',
        main: 'green'
      };
    case 'politician':
      return {
        light: 'bg-amber-50',
        dark: 'bg-amber-600',
        text: 'text-amber-600',
        hover: 'hover:bg-amber-100',
        border: 'border-amber-600',
        bg: 'bg-amber-600',
        main: 'amber'
      };
    case 'institution':
      return {
        light: 'bg-purple-50',
        dark: 'bg-purple-600',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-100',
        border: 'border-purple-600',
        bg: 'bg-purple-600',
        main: 'purple'
      };
    case 'journalist':
      return {
        light: 'bg-orange-50',
        dark: 'bg-orange-600',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-100',
        border: 'border-orange-600',
        bg: 'bg-orange-600',
        main: 'orange'
      };
    case 'press':
      return {
        light: 'bg-rose-50',
        dark: 'bg-rose-600',
        text: 'text-rose-600',
        hover: 'hover:bg-rose-100',
        border: 'border-rose-600',
        bg: 'bg-rose-600',
        main: 'rose'
      };
    default:
      return {
        light: 'bg-slate-50',
        dark: 'bg-slate-600',
        text: 'text-slate-600',
        hover: 'hover:bg-slate-100',
        border: 'border-slate-600',
        bg: 'bg-slate-600',
        main: 'slate'
      };
  }
};

export const getColorByType = (clientType: string): string => {
  switch (clientType) {
    case 'observatory':
      return 'blue';
    case 'researcher':
      return 'green';
    case 'politician':
      return 'amber';
    case 'institution':
      return 'purple';
    case 'journalist':
      return 'orange';
    case 'press':
      return 'rose';
    default:
      return 'slate';
  }
};
