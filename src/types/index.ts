export type Option = {
  name: string;
  values: string[] | null;
};

export type Product = {
  product: string;
  description: string;
  price: number | number[];
  options: Option[];
  images?: { [key: string]: string }; 
  image: string; 
};

export interface ProductSelectorProps {
  products: Product[];
  onProductChange: (product: string) => void;
}

export interface OptionFormProps {
  options: Option[];
  selectedOptions: { [optionName: string]: string };
  onOptionChange: (optionName: string, value: string) => void;
}

export interface LivePreviewProps {
  selectedProduct: string;
  selectedOptions: { [key: string]: string };
  products: Product[];
}

export interface SubmitButtonProps {
  onSubmit: () => void;
}
