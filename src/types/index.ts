export type Option = {
    name: string;
    values: string[] | null;
  };
  
  export type Product = {
    product: string;
    description: string;
    price: number | number[];
    options: Option[];
    image: string;
  };

  export interface ProductSelectorProps {
    products: Product[];
    onProductChange: (product: string) => void;
  }


 export  interface OptionFormProps {
    options: Option[];
    selectedOptions: { [optionName: string]: string };
    onOptionChange: (optionName: string, value: string) => void;
  }
  