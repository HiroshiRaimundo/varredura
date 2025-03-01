
export interface PressReleaseFormProps {
  clientType: string;
}

export interface FormValues {
  title: string;
  subtitle: string;
  author: string;
  content: string;
  targetOutlet: string;
  mediaLinks: string[];
}

export interface OutletOption {
  id: string;
  name: string;
  category: string; 
  region: string;
}
