import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Review, Order } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_REVIEWS } from '../data/products';

interface NotificationState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreUser {
  name: string;
  email: string;
  membershipTier: string;
}

interface StoreContextType {
  user: StoreUser;
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  reviews: Review[];
  currentView: string;
  selectedProductId: string | null;
  selectedOrderId: string | null;
  lastCompletedOrder: Order | null;
  isMiniCartOpen: boolean;
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isSizeGuideOpen: boolean;
  isWpGuideOpen: boolean;
  activeCategory: string;
  notification: NotificationState | null;

  // Navigation
  navigateTo: (view: string, params?: { category?: string; productId?: string; orderId?: string }) => void;
  setActiveCategory: (cat: string) => void;
  setSelectedOrderId: (id: string | null) => void;

  // Cart operations
  addToCart: (
    product: Product,
    options?: { size?: string; color?: string; flavor?: string; pack?: string },
    quantity?: number,
    openMiniCart?: boolean
  ) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  discountAmount: number;
  cartDiscount: number;
  cartGrandTotal: number;
  cartTotal: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Checkout & Orders
  createOrder: (orderPayload: {
    customer: Order['customer'];
    shippingMethod: string;
    shippingCost: number;
    paymentMethod: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Reviews
  getProductReviews: (productId: string) => Review[];
  addReview: (reviewData: { productId: string; author: string; rating: number; title: string; comment: string }) => void;
  markReviewHelpful: (reviewId: string) => void;

  // Admin Product Operations
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  updateProductStock: (productId: string, stock: number) => void;
  deleteProduct: (id: string) => void;
  resetData: () => void;

  // UI state controls
  setIsMiniCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setIsWpGuideOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  showNotification: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 75;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_wishlist');
      return saved ? JSON.parse(saved) : ['kroma-crossbody-01', 'kroma-flavor-yuzu-01'];
    } catch {
      return ['kroma-crossbody-01', 'kroma-flavor-yuzu-01'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_orders');
      if (saved) return JSON.parse(saved);
      // Seed an initial demo order so user immediately sees past orders in account
      return [
        {
          id: 'KR-83921',
          date: '2026-09-18',
          customer: {
            fullName: 'Alex Vance',
            email: 'alex.vance@studio.design',
            phone: '+1 (555) 392-8172',
            address: '428 Mercer Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            postalCode: '10013',
            country: 'United States'
          },
          items: [
            {
              id: 'kroma-crossbody-01-Obsidian Black',
              productId: 'kroma-crossbody-01',
              name: 'KROMA Modular Utility Sling',
              category: 'bags',
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
              unitPrice: 88,
              quantity: 1,
              selectedColor: 'Obsidian Black'
            },
            {
              id: 'kroma-flavor-yuzu-01-Single 30ml',
              productId: 'kroma-flavor-yuzu-01',
              name: 'KROMA Botanical Sensory Drops: Yuzu & Bergamot',
              category: 'flavors',
              image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
              unitPrice: 28,
              quantity: 2,
              selectedFlavor: 'Yuzu & Bergamot',
              selectedPack: 'Single 30ml Dropper'
            }
          ],
          shippingMethod: 'Express Carbon-Neutral Delivery',
          shippingCost: 0,
          discountAmount: 20,
          subtotal: 144,
          total: 124,
          paymentMethod: 'Credit Card (•••• 8421)',
          status: 'Shipped',
          trackingNumber: 'TRK-US-942817240',
          estimatedDelivery: 'Sep 24, 2026'
        }
      ];
    } catch {
      return [];
    }
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('kroma_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // UI state
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWpGuideOpen, setIsWpGuideOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const user = {
    name: 'Alex Vance',
    email: 'alex.vance@studio.design',
    membershipTier: 'Black'
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kroma_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kroma_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kroma_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('kroma_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kroma_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('kroma_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(7);
    setNotification({ id, message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.id === id ? null : curr));
    }, 3800);
  };

  const navigateTo = (view: string, params?: { category?: string; productId?: string; orderId?: string }) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (params?.category) {
      setActiveCategory(params.category);
    }
    if (params?.productId) {
      setSelectedProductId(params.productId);
    }
    if (params?.orderId) {
      setSelectedOrderId(params.orderId);
    }
    setCurrentView(view);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    setCart((prev) => {
      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== cartItemId);
      }
      return prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item));
    });
  };

  const updateProductStock = (productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: Math.max(0, stock) } : p))
    );
    showNotification('Inventory stock updated', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    showNotification(`Promo code "${coupon.code}" activated`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showNotification(`Promo code "${code}" removed`, 'info');
  };

  const resetData = () => {
    localStorage.removeItem('kroma_products');
    localStorage.removeItem('kroma_cart');
    localStorage.removeItem('kroma_wishlist');
    localStorage.removeItem('kroma_orders');
    localStorage.removeItem('kroma_coupons');
    localStorage.removeItem('kroma_reviews');
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setWishlist(['kroma-crossbody-01', 'kroma-flavor-yuzu-01']);
    setCoupons(INITIAL_COUPONS);
    setReviews(INITIAL_REVIEWS);
    showNotification('Store data restored to clean studio baseline', 'success');
  };

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && appliedCoupon.isActive) {
    if (!appliedCoupon.minSpend || cartSubtotal >= appliedCoupon.minSpend) {
      if (appliedCoupon.discountType === 'percentage') {
        discountAmount = (cartSubtotal * appliedCoupon.value) / 100;
      } else {
        discountAmount = Math.min(appliedCoupon.value, cartSubtotal);
      }
    }
  }

  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || appliedCoupon?.code === 'FREESHIP';
  const shippingCost = cart.length === 0 ? 0 : isFreeShipping ? 0 : 5.95;
  const cartGrandTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  // Cart Operations
  const addToCart = (
    product: Product,
    options?: { size?: string; color?: string; flavor?: string; pack?: string },
    quantity = 1,
    openMiniCart = true
  ) => {
    // Determine unit price based on pack variation if applicable
    let finalUnitPrice = product.price;
    if (options?.pack && product.variations.packs) {
      const matchedPack = product.variations.packs.find((p) => p.name === options.pack);
      if (matchedPack) {
        finalUnitPrice = matchedPack.price;
      }
    }

    // Determine representative image
    let representativeImage = product.images[0];
    if (options?.color && product.variations.colors) {
      const matchedColor = product.variations.colors.find((c) => c.name === options.color);
      if (matchedColor?.image) {
        representativeImage = matchedColor.image;
      }
    } else if (options?.flavor && product.variations.flavors) {
      const matchedFlavor = product.variations.flavors.find((f) => f.name === options.flavor);
      if (matchedFlavor?.image) {
        representativeImage = matchedFlavor.image;
      }
    }

    // Unique key for the cart item
    const cartItemId = `${product.id}-${options?.size || ''}-${options?.color || ''}-${options?.flavor || ''}-${options?.pack || ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex] = {
          ...nextCart[existingIndex],
          quantity: nextCart[existingIndex].quantity + quantity
        };
        return nextCart;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: representativeImage,
          unitPrice: finalUnitPrice,
          originalPrice: product.originalPrice,
          quantity,
          selectedSize: options?.size,
          selectedColor: options?.color,
          selectedFlavor: options?.flavor,
          selectedPack: options?.pack
        };
        return [...prevCart, newItem];
      }
    });

    showNotification(`Added "${product.name}" to your bag`, 'success');

    if (openMiniCart) {
      setIsMiniCartOpen(true);
    }
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
    showNotification('Item removed from your bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification('Saved to your Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Pick first available options
    const defaultColor = product.variations.colors?.[0]?.name;
    const defaultSize = product.variations.sizes?.[0];
    const defaultFlavor = product.variations.flavors?.[0]?.name;
    const defaultPack = product.variations.packs?.[0]?.name;

    addToCart(product, {
      color: defaultColor,
      size: defaultSize,
      flavor: defaultFlavor,
      pack: defaultPack
    });

    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  // Coupons
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed);

    if (!found) {
      return { success: false, message: 'Invalid promotional code.' };
    }

    if (!found.isActive) {
      return { success: false, message: 'This coupon has expired.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Requires a minimum subtotal of $${found.minSpend}.`
      };
    }

    setAppliedCoupon(found);
    showNotification(`Coupon ${found.code} applied!`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Promotional code removed', 'info');
  };

  // Order Placement
  const createOrder = (orderPayload: {
    customer: Order['customer'];
    shippingMethod: string;
    shippingCost: number;
    paymentMethod: string;
  }): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `KR-${randomNum}`;
    const trackingNumber = `TRK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Delivery 3-4 days ahead
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customer: orderPayload.customer,
      items: [...cart],
      shippingMethod: orderPayload.shippingMethod,
      shippingCost: orderPayload.shippingCost,
      discountAmount,
      subtotal: cartSubtotal,
      total: Math.max(0, cartSubtotal - discountAmount + orderPayload.shippingCost),
      paymentMethod: orderPayload.paymentMethod,
      status: 'Processing',
      trackingNumber,
      estimatedDelivery
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);

    // Reduce stock counts for products
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        const orderedItem = cart.find((item) => item.productId === prod.id);
        if (orderedItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - orderedItem.quantity)
          };
        }
        return prod;
      })
    );

    // Clear cart
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    showNotification(`Order ${orderId} marked as ${status}`, 'info');
  };

  // Reviews
  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const addReview = (reviewData: {
    productId: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: reviewData.productId,
      author: reviewData.author,
      rating: reviewData.rating,
      date: 'Just now',
      title: reviewData.title,
      comment: reviewData.comment,
      verifiedPurchase: true,
      helpfulCount: 0
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const currentTotal = p.rating * p.reviewsCount;
          const newCount = p.reviewsCount + 1;
          const newRating = Number(((currentTotal + reviewData.rating) / newCount).toFixed(2));
          return {
            ...p,
            rating: newRating,
            reviewsCount: newCount
          };
        }
        return p;
      })
    );

    showNotification('Thank you! Your verified review has been published.', 'success');
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showNotification('Marked review as helpful', 'info');
  };

  // Admin CRUD for products
  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showNotification(`Created product "${product.name}"`, 'success');
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    showNotification(`Updated product "${product.name}"`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification('Product deleted from inventory', 'info');
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        products,
        cart,
        wishlist,
        orders,
        coupons,
        appliedCoupon,
        reviews,
        currentView,
        selectedProductId,
        selectedOrderId,
        lastCompletedOrder,
        isMiniCartOpen,
        isSearchOpen,
        isQuickViewOpen,
        quickViewProduct,
        isSizeGuideOpen,
        isWpGuideOpen,
        activeCategory,
        notification,
        navigateTo,
        setActiveCategory,
        setSelectedOrderId,
        addToCart,
        updateCartQuantity,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingCost,
        discountAmount,
        cartDiscount: discountAmount,
        cartGrandTotal,
        cartTotal: cartGrandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        toggleWishlist,
        isWishlisted,
        moveToCartFromWishlist,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        createOrder,
        updateOrderStatus,
        getProductReviews,
        addReview,
        markReviewHelpful,
        addProduct,
        updateProduct,
        updateProductStock,
        deleteProduct,
        resetData,
        setIsMiniCartOpen,
        setIsSearchOpen,
        setIsSizeGuideOpen,
        setIsWpGuideOpen,
        openQuickView,
        closeQuickView,
        showNotification
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
