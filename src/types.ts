export type ProductCategory = 'vapes' | 'caps' | 'bags' | 't-shirts' | 'flavors' | 'accessories' | 'kitchenware' | 'cookware' | 'drinkware';

export interface ProductVariationColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductVariationFlavor {
  name: string;
  notes: string;
  intensity: 'Mild' | 'Medium' | 'Bold';
  color: string;
  image?: string;
}

export interface ProductVariationPack {
  name: string;
  multiplier: number;
  price: number;
  savingsLabel?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: ProductCategory;
  description: string;
  story: string;
  specifications: Record<string, string>;
  features: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  discountBadge?: string;
  images: string[];
  secondImage?: string;
  stock: number;
  sku: string;
  variations: {
    sizes?: string[];
    colors?: ProductVariationColor[];
    flavors?: ProductVariationFlavor[];
    packs?: ProductVariationPack[];
  };
  tags: string[];
  relatedProductIds: string[];
  frequentlyBoughtTogetherIds: string[];
}

export interface CartItem {
  id: string; // unique cart item id (e.g. prodId-size-color-flavor)
  productId: string;
  name: string;
  category: ProductCategory;
  image: string;
  unitPrice: number;
  originalPrice?: number;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFlavor?: string;
  selectedPack?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 20 for 20% or 15 for $15
  minSpend?: number;
  description: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface CustomerAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  items: CartItem[];
  shippingMethod: string;
  shippingCost: number;
  discountAmount: number;
  subtotal: number;
  total: number;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  estimatedDelivery: string;
}

export type SortOption = 'popularity' | 'latest' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: string; // 'all' or category
  searchQuery: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  flavors: string[];
  onlyInStock: boolean;
  onlyOnSale: boolean;
  minRating: number;
  sortBy: SortOption;
}
