export interface Product {
  title: string;
  id: string;
  price: number;
  rating: number;
  pic: string;
  description: string;
  material: string;
  brand: string;
  size: string | string[];
  product_type: string;
  color?: string;
  weight?: string;
  inStock: boolean;
}


