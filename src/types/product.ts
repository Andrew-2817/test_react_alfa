export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isLiked: boolean;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}