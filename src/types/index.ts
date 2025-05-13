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
  selectedProduct: string;
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
  defaultImage?: string;
}

export interface SaveDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export interface SavedDesign {
  id: string;
  name: string;
  product: string;
  options: { [key: string]: string };
  savedAt: number;
}

export interface ActionBarProps {
  onSubmit: () => void;
  onSaveClick: () => void;
  onLoadClick: () => void;
}

export interface LoadDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedDesigns: SavedDesign[];
  onLoad: (design: SavedDesign) => void;
  onDelete: (id: string) => void;
}
