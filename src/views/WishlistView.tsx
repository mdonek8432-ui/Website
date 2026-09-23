import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, navigateTo } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl text-white">Your Wishlist is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            Bookmark your favorite tactile bags, heavyweight tees, or sensory flavor elixirs to
            revisit them later.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('shop', { category: 'all' })}
          className="px-8 py-3.5 rounded-2xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-xs shadow-lg inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="text-[11px] font-mono text-[#ff5b36] uppercase tracking-widest font-bold">
          Saved Curation
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
          Your Wishlist ({wishlistedProducts.length} items)
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistedProducts.map((prod) => (
          <div
            key={prod.id}
            className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden flex flex-col justify-between group shadow-xl"
          >
            <div className="relative aspect-[4/5] bg-black/40 overflow-hidden">
              <img
                src={prod.images[0]}
                alt={prod.name}
                onClick={() => navigateTo('product-detail', { productId: prod.id })}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
              />
              <button
                type="button"
                onClick={() => toggleWishlist(prod.id)}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-black/60 hover:bg-black text-rose-400 border border-white/10 backdrop-blur-sm"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff5b36]">
                  {prod.category}
                </span>
                <h3
                  onClick={() => navigateTo('product-detail', { productId: prod.id })}
                  className="font-bold text-sm text-white hover:text-[#ff5b36] cursor-pointer transition-colors truncate mt-0.5"
                >
                  {prod.name}
                </h3>
                <p className="text-xs font-mono font-bold text-white mt-1">${prod.price}</p>
              </div>

              <button
                type="button"
                onClick={() => addToCart(prod, {}, 1, true)}
                className="w-full py-3 rounded-xl bg-[#ff5b36] hover:bg-[#f04f29] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
