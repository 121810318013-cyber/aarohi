export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  discountPercent?: number;
  images: string[];
  category: string;
  fabricType: string;
  colors: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PromoCode {
  code: string;
  discount: number;
  minPurchase: number;
  description: string;
}
