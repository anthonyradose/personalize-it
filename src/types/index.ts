export interface Product {
  product: string;
  description: string;
  price: number | number[];
  options: Option[];
  image: string;
  images?: { [key: string]: string };
}

export interface Option {
  name: string;
  values: string[] | null;
}

export interface ProductSelectorProps {
  products: Product[];
  onProductChange: (product: string) => void;
  selectedProduct: string; // New property
}

export interface OptionFormProps {
  options: Option[];
  selectedOptions: { [key: string]: string };
  onOptionChange: (name: string, value: string) => void;
}

export interface LivePreviewProps {
  selectedProduct: string;
  selectedOptions: { [key: string]: string };
  products: Product[];
  defaultImage?: string; // New property
}

export interface SubmitButtonProps {
  onSubmit: () => void;
}