import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MiniCart } from './components/MiniCart';
import { NotificationToast } from './components/NotificationToast';
import { QuickViewModal } from './components/QuickViewModal';
import { LiveSearchModal } from './components/LiveSearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { WordPressGuideModal } from './components/WordPressGuideModal';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { AccountView } from './views/AccountView';
import { WishlistView } from './views/WishlistView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FAQView } from './views/FAQView';
import { AdminView } from './views/AdminView';
import { PolicyView } from './views/PolicyView';

const MainRouter: React.FC = () => {
  const { currentView } = useStore();

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0e14] text-slate-100 selection:bg-[#ff5b36] selection:text-white relative">
      {/* Global Modals & Notifications */}
      <NotificationToast />
      <MiniCart />
      <QuickViewModal />
      <LiveSearchModal />
      <SizeGuideModal />
      <WordPressGuideModal />

      {/* Persistent Navigation Header */}
      <Header />

      {/* Main Dynamic View Area */}
      <main className="flex-1 w-full">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'order-confirmation' && <OrderConfirmationView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'faq' && <FAQView />}
        {currentView === 'admin' && <AdminView />}
        {currentView === 'shipping' && <PolicyView type="shipping" />}
        {currentView === 'returns' && <PolicyView type="returns" />}
        {currentView === 'privacy' && <PolicyView type="privacy" />}
        {currentView === 'terms' && <PolicyView type="terms" />}
      </main>

      {/* Persistent Modern Brand Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
