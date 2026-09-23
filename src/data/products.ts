import { Product, Coupon, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // =========================================================================
  // 1. VAPES & PODS (MAIN CATEGORY #1 - ভ্যাপ)
  // =========================================================================
  {
    id: 'vapex-nebula-pod-pro',
    name: 'VAPEX Nebula Pod Pro 15K',
    slug: 'vapex-nebula-pod-pro-15k',
    subtitle: 'Dual Mesh Coil Smart Vape Device with Digital OLED Battery & E-Juice Display',
    category: 'vapes',
    description: 'The flagship VAPEX Nebula Pod Pro features dual-mesh sub-ohm coils, adjustable airflow toggle, and an ultra-bright curved OLED screen displaying exact battery and e-liquid percentages. Delivers up to 15,000 velvety puffs of dense, flavor-rich vapor.',
    story: 'Engineered for vapor enthusiasts who demand peak flavor extraction and zero dry hits. Aerospace-grade aluminum unibody with silicone comfort mouthpiece.',
    specifications: {
      'Puff Count': 'Up to 15,000 Puffs',
      'Coil Type': '0.8Ω Dual Mesh HyperCoil',
      'Battery': '700mAh Pure Cobalt Rechargeable',
      'Charging': 'USB Type-C (30-min Full Charge)',
      'Display': 'Smart Curved OLED Screen (Battery & Liquid)',
      'Airflow': 'Stepless Precision Airflow Switch (MTL to RDL)',
      'Nicotine Strength': '5% (50mg) / 2% (20mg) Smooth Salt Nic'
    },
    features: [
      'Dual Mesh Coil delivers 2x richer vapor density',
      'Curved OLED screen shows real-time liquid & battery status',
      'Fast USB-C charging with 700mAh all-day battery',
      'Anti-leak multi-layer seal technology'
    ],
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.96,
    reviewsCount: 428,
    isBestSeller: true,
    isTrending: true,
    discountBadge: 'Top Seller',
    images: [
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1000&q=80'
    ],
    secondImage: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1000&q=80',
    stock: 84,
    sku: 'VPX-NEBULA-15K',
    variations: {
      colors: [
        { name: 'Neon Mint', hex: '#00F59B' },
        { name: 'Midnight Obsidian', hex: '#161922' },
        { name: 'Electric Violet', hex: '#8B5CF6' },
        { name: 'Sunset Amber', hex: '#F59E0B' }
      ],
      flavors: [
        { name: 'Miami Mint Frost', notes: 'Spearmint, Crushed Ice & Sweet Menthol', intensity: 'Bold', color: '#00F59B' },
        { name: 'Blue Razz Freeze', notes: 'Wild Blue Raspberry & Chilled Sugar', intensity: 'Bold', color: '#3B82F6' },
        { name: 'Watermelon Bubble Lush', notes: 'Juicy Watermelon Nectar & Gum', intensity: 'Medium', color: '#EF4444' },
        { name: 'Tokyo Mango Peach', notes: 'Alphonso Mango & White Peach Pulp', intensity: 'Bold', color: '#F59E0B' }
      ]
    },
    tags: ['Vape', '15000 Puffs', 'Dual Mesh', 'OLED Screen', 'Rechargeable'],
    relatedProductIds: ['vapex-frost-pulse-12k', 'vapex-saltnic-drops-30ml', 'vapex-crystal-cartridges'],
    frequentlyBoughtTogetherIds: ['vapex-saltnic-drops-30ml', 'vapex-crystal-cartridges']
  },
  {
    id: 'vapex-frost-pulse-12k',
    name: 'FrostPulse 12K Transparent Vape Bar',
    slug: 'frostpulse-12k-transparent-vape-bar',
    subtitle: 'Futuristic Cyberpunk Translucent Shell with Dynamic Neon Pulse Lighting',
    category: 'vapes',
    description: 'A revolutionary disposable vape featuring an edge-lit transparent cyberpunk chassis, integrated 1.0Ω mesh coil, and 12,000 smooth puffs. Visual e-liquid tank lets you monitor juice at a glance.',
    story: 'Designed in Tokyo. Combines industrial aesthetics with uncompromised vapor flavor saturation.',
    specifications: {
      'Puff Count': '12,000 Puffs',
      'Coil': '1.0Ω Honeycomb Ceramic Mesh',
      'E-Liquid': '18ml Pre-filled Premium Salt Nic',
      'Battery': '650mAh Rechargeable Type-C',
      'Lighting': 'Ambient Breathing LED on Draw'
    },
    features: [
      'See-through crystal shell with cyber glow accents',
      'Ultra-smooth draw activation with zero spit-back',
      'Instant puff detection in under 0.001 seconds',
      'Pure organic cotton wicking material'
    ],
    price: 19.99,
    originalPrice: 26.00,
    rating: 4.91,
    reviewsCount: 312,
    isNewArrival: true,
    discountBadge: 'New Gen',
    images: [
      'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
    ],
    secondImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    stock: 120,
    sku: 'VPX-FROST-12K',
    variations: {
      colors: [
        { name: 'Cyber Cyan', hex: '#06B6D4' },
        { name: 'Neon Lime', hex: '#84CC16' },
        { name: 'Cherry Ruby', hex: '#F43F5E' }
      ],
      flavors: [
        { name: 'Polar Mint Wave', notes: 'Crisp Arctic Mint & Eucalyptus', intensity: 'Bold', color: '#06B6D4' },
        { name: 'Sour Green Apple Ice', notes: 'Tart Granny Smith with Menthol Hit', intensity: 'Bold', color: '#84CC16' },
        { name: 'Grape Energy Surge', notes: 'Concord Grape Soda & Energy Fizz', intensity: 'Medium', color: '#A855F7' }
      ]
    },
    tags: ['Vape', '12K Puffs', 'Cyberpunk', 'Disposables'],
    relatedProductIds: ['vapex-nebula-pod-pro', 'vapex-saltnic-drops-30ml'],
    frequentlyBoughtTogetherIds: ['vapex-nebula-pod-pro']
  },
  {
    id: 'vapex-saltnic-drops-30ml',
    name: 'SubZero Botanical Salt Nic E-Liquid (30ml)',
    slug: 'subzero-botanical-salt-nic-eliquid',
    subtitle: 'USP-Grade Botanical Terpene & Smooth Nicotine Salt Extraction',
    category: 'vapes',
    description: 'Crafted with cold-distilled botanical flavor extracts and pharmaceutical-grade smooth nicotine salts. Formulated in a balanced 50/50 VG/PG ratio for optimal throat hit and immense pod coil longevity.',
    story: 'Formulated in ISO-7 clean laboratories for unmatched flavor clarity with zero burnt coil residue.',
    specifications: {
      'Bottle Size': '30ml Chubby Gorilla Unicorn Bottle',
      'VG/PG Ratio': '50% VG / 50% PG',
      'Nicotine Strengths': '25mg / 50mg Ultra-Smooth Salts',
      'Origin': 'Certified Cleanroom Distilled'
    },
    features: [
      'No coil-gunking artificial sweeteners',
      'Precision needle-tip dispenser for leak-free filling',
      'Child-resistant cap with tamper-evident seal'
    ],
    price: 14.99,
    originalPrice: 18.00,
    rating: 4.88,
    reviewsCount: 247,
    isBestSeller: true,
    discountBadge: 'Artisan Juice',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1000&q=80'
    ],
    secondImage: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=1000&q=80',
    stock: 95,
    sku: 'VPX-JUICE-30ML',
    variations: {
      flavors: [
        { name: 'Japanese Yuzu Ice', notes: 'Zesty Citrus Blossom & Glacial Menthol', intensity: 'Bold', color: '#EAB308' },
        { name: 'Alpine Forest Berry', notes: 'Blackberry, Raspberry & Mountain Pine', intensity: 'Medium', color: '#EC4899' },
        { name: 'Smoked Vanilla Tobacco', notes: 'Cuban Leaf, Caramelized Oak & Madagascar Vanilla', intensity: 'Bold', color: '#B45309' },
        { name: 'Iced Watermelon Lychee', notes: 'Sweet Lychee Fruit & Chilled Melon', intensity: 'Bold', color: '#F43F5E' }
      ]
    },
    tags: ['E-Liquid', 'Salt Nic', '30ml', 'Vape Juice'],
    relatedProductIds: ['vapex-nebula-pod-pro', 'vapex-crystal-cartridges'],
    frequentlyBoughtTogetherIds: ['vapex-nebula-pod-pro', 'vapex-crystal-cartridges']
  },
  {
    id: 'vapex-crystal-cartridges',
    name: 'VAPEX Crystal Magnetic Pods (Pack of 3)',
    slug: 'vapex-crystal-magnetic-pods-pack',
    subtitle: 'Leakproof Top-Fill Magnetic Pod Cartridges with Organic Mesh Cores',
    category: 'vapes',
    description: 'Pack of 3 replacement pod cartridges engineered with ultra-clear PCTG food-grade material. Features silicone top-fill stopper and neodymium magnetic snap.',
    story: 'Ensures uninterrupted vapor enjoyment with quick 2-second snap-in replacement.',
    specifications: {
      'Pack Quantity': '3 Pods per Box',
      'Resistance': '0.6Ω (Sub-Ohm RDL) / 1.0Ω (Smooth MTL)',
      'Pod Capacity': '3.5ml E-Liquid Capacity',
      'Connection': 'Dual Gold-Plated Magnetic Contacts'
    },
    features: [
      'Zero-leak silicone fill port',
      '3.5ml large capacity reduces refill frequency',
      'Compatible with all VAPEX Nebula & Aura pod devices'
    ],
    variations: {
      packs: [
        { name: 'Pack of 3', price: 11.99, multiplier: 1 },
        { name: 'Pack of 6 (Value)', price: 21.99, multiplier: 2 }
      ]
    },
    price: 11.99,
    originalPrice: 15.00,
    rating: 4.85,
    reviewsCount: 164,
    stock: 150,
    sku: 'VPX-PODS-3PK',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Replacement Pods', 'Cartridges', 'Coils'],
    relatedProductIds: ['vapex-nebula-pod-pro', 'vapex-saltnic-drops-30ml'],
    frequentlyBoughtTogetherIds: ['vapex-nebula-pod-pro']
  },

  // =========================================================================
  // 2. CAPS & HEADWEAR (CATEGORY #2 - ক্যাপ)
  // =========================================================================
  {
    id: 'vapex-corduroy-snapback',
    name: 'Heavy 8-Wale Vintage Corduroy Snapback',
    slug: 'heavy-8wale-vintage-corduroy-snapback',
    subtitle: 'Thick Ridge Vintage Wale Corduroy with Antique Brass Buckle Closure',
    category: 'caps',
    description: 'Crafted from heavy 8-wale textured cotton corduroy with an unstructured 6-panel crown. Features custom tonal embroidery, custom moisture-wicking sweatband, and antique brass strap clasp.',
    story: 'Inspired by retro Japanese street workwear. Develops a gorgeous patina with everyday wear.',
    specifications: {
      'Material': '100% Heavyweight Cotton 8-Wale Corduroy',
      'Profile': 'Medium Crown Unstructured 6-Panel',
      'Visor': 'Curved Vintage Bill with Matching Under-visor',
      'Closure': 'Self-Fabric Strap with Antique Brass Embossed Clasp',
      'Size': 'Adjustable One Size Fits All (54cm - 62cm)'
    },
    features: [
      'Thick tactile corduroy with luxurious velvety finish',
      'Custom interior taped seams with woven brand label',
      'Breathable embroidered tonal eyelets'
    ],
    price: 36.00,
    originalPrice: 45.00,
    rating: 4.93,
    reviewsCount: 178,
    isBestSeller: true,
    discountBadge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=80'
    ],
    secondImage: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=80',
    stock: 55,
    sku: 'VPX-CAP-CORD',
    variations: {
      colors: [
        { name: 'Caramel Rust', hex: '#D97706' },
        { name: 'Obsidian Black', hex: '#111827' },
        { name: 'Forest Moss', hex: '#1E3A2F' }
      ]
    },
    tags: ['Caps', 'Corduroy', 'Streetwear', 'Snapback'],
    relatedProductIds: ['vapex-runner-5panel-cap', 'vapex-modular-sling-bag'],
    frequentlyBoughtTogetherIds: ['vapex-nebula-pod-pro', 'vapex-modular-sling-bag']
  },
  {
    id: 'vapex-runner-5panel-cap',
    name: 'AeroGrid Waterproof 5-Panel Runner Cap',
    slug: 'aerogrid-waterproof-5panel-runner-cap',
    subtitle: 'Ultralight DWR Ripstop Nylon with Magnetic Fidlock Snap Clasp',
    category: 'caps',
    description: 'Weighing only 48 grams, this technical 5-panel cap is engineered from diamond-grid ripstop nylon treated with durable water repellent (DWR) finish. Laser-perforated side ventilation panels keep you cool.',
    story: 'Built for high-energy urban commutes, skate sessions, and outdoor night runs.',
    specifications: {
      'Weight': '48 Grams Featherweight',
      'Fabric': '70D Diamond Ripstop with Eco-DWR Coating',
      'Closure': 'German Fidlock® Magnetic Quick-Release Buckle',
      'Side Panels': 'Laser-Cut Micro Ventilation Ports'
    },
    features: [
      'Water beads off immediately in sudden rain',
      'Packable soft brim can be rolled and stuffed into a bag pocket',
      'Reflective 3M logo on rear strap for nighttime visibility'
    ],
    variations: {
      colors: [
        { name: 'Stealth Black', hex: '#161922' },
        { name: 'Cyber Silver', hex: '#94A3B8' }
      ]
    },
    price: 38.00,
    originalPrice: 48.00,
    rating: 4.87,
    reviewsCount: 94,
    isNewArrival: true,
    stock: 40,
    sku: 'VPX-CAP-5PNL',
    images: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Technical Cap', '5-Panel', 'Waterproof'],
    relatedProductIds: ['vapex-corduroy-snapback', 'vapex-modular-sling-bag'],
    frequentlyBoughtTogetherIds: ['vapex-corduroy-snapback']
  },

  // =========================================================================
  // 3. BAGS & UTILITY (CATEGORY #3 - ব্যাগ)
  // =========================================================================
  {
    id: 'vapex-modular-sling-bag',
    name: 'Modular Tactical Utility Sling (4.5L)',
    slug: 'modular-tactical-utility-sling-45l',
    subtitle: '840D Ballistic Cordura® Nylon with German Fidlock® Magnetic Release',
    category: 'bags',
    description: 'A dedicated urban EDC cross-body sling with quick-access padded compartment for your vape device, phone, wallet, and sunglasses. Features YKK Aquaguard water-resistant zippers and ambidextrous strap.',
    story: 'Engineered specifically for the modern urban wanderer with dedicated slots for vapes, pods, and tech cables.',
    specifications: {
      'Capacity': '4.5 Liters Internal Volume',
      'Outer Fabric': '840D Ballistic Cordura® Nylon with PU Coating',
      'Zippers': 'YKK® Matte Black AquaGuard® Water-Repellent',
      'Hardware': 'German Fidlock® V-Buckle 25mm Magnetic Clasp',
      'Dimensions': '28cm x 17cm x 9cm'
    },
    features: [
      'Custom vape pod internal elastic slot holds devices securely upright',
      'Fidlock magnetic buckle releases with a single fluid pull',
      'Breathable 3D honeycomb back panel prevents sweat buildup',
      'Concealed RFID-blocking passport & card sleeve on back'
    ],
    price: 68.00,
    originalPrice: 85.00,
    rating: 4.95,
    reviewsCount: 289,
    isBestSeller: true,
    discountBadge: 'Flagship EDC',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80'
    ],
    secondImage: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
    stock: 38,
    sku: 'VPX-BAG-SLING',
    variations: {
      colors: [
        { name: 'Matte Stealth Black', hex: '#161922' },
        { name: 'Tactical Olive', hex: '#2E3A2F' },
        { name: 'Cobalt Grey', hex: '#374151' }
      ]
    },
    tags: ['Bags', 'Sling', 'EDC', 'Fidlock', 'Ballistic Nylon'],
    relatedProductIds: ['vapex-rolltop-commuter-backpack', 'vapex-nebula-pod-pro'],
    frequentlyBoughtTogetherIds: ['vapex-nebula-pod-pro', 'vapex-corduroy-snapback']
  },
  {
    id: 'vapex-rolltop-commuter-backpack',
    name: 'Apex Roll-Top Weatherproof Backpack (22L)',
    slug: 'apex-rolltop-weatherproof-backpack-22l',
    subtitle: 'Seam-Sealed Matte Tarpaulin with Magnetic Roll Closure & Padded Laptop Sleeve',
    category: 'bags',
    description: 'The ultimate all-weather commuter backpack. Expandable roll-top volume from 18L to 24L, dedicated side-access 16" laptop compartment, and external daisy-chain lash loops.',
    story: 'Built for cycling commuters and urban explorers through torrential rains and bustling transit.',
    specifications: {
      'Volume': '18L - 24L Expandable',
      'Laptop Compartment': 'Fits up to 16" MacBook Pro with suspended shock padding',
      'Weight': '880 Grams',
      'Material': 'TPU Laminated 600D Poly with Welded Seams'
    },
    features: [
      '100% submersible waterproof main dry-bag compartment',
      'Side-access vertical zipper lets you grab your laptop without unrolling',
      'Ergonomic S-curve EVA padded shoulder straps'
    ],
    variations: {
      colors: [
        { name: 'Matte Obsidian', hex: '#181A20' },
        { name: 'Deep Olive', hex: '#374151' }
      ]
    },
    price: 98.00,
    originalPrice: 125.00,
    rating: 4.89,
    reviewsCount: 142,
    stock: 26,
    sku: 'VPX-BAG-ROLL',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Backpack', 'Waterproof', 'Roll-top', 'Commuter'],
    relatedProductIds: ['vapex-modular-sling-bag', 'vapex-boxy-heavyweight-tee'],
    frequentlyBoughtTogetherIds: ['vapex-modular-sling-bag']
  },

  // =========================================================================
  // 4. T-SHIRTS & APPAREL (CATEGORY #4 - টি-শার্ট ও পোশাক - ZERO HUMANS, FLATLAY ONLY)
  // =========================================================================
  {
    id: 'vapex-boxy-heavyweight-tee',
    name: '280 GSM Heavyweight Boxy Blank Tee',
    slug: '280gsm-heavyweight-boxy-blank-tee',
    subtitle: 'Combed Aegean Organic Cotton with High 1.25" Ribbed Collar',
    category: 't-shirts',
    description: 'The pinnacle streetwear silhouette. Cut from dense 280 GSM dry-touch organic combed cotton with dropped shoulders, wide sleeves, and a boxy relaxed torso that hangs with structured architectural drape.',
    story: 'Pre-shrunk and enzyme-washed for incredible softness that retains its structured silhouette wash after wash.',
    specifications: {
      'Fabric Weight': '280 GSM (8.3 oz/sq yd) Heavyweight Jersey',
      'Fiber Content': '100% Organic Combed Aegean Cotton',
      'Collar': '1.25" Double-Needle High Ribbed Neckband (Zero Sag)',
      'Fit': 'Signature Drop-Shoulder Relaxed Boxy Fit',
      'Care': 'Machine Wash Cold, Hang Dry'
    },
    features: [
      'Dense 280 GSM fabric holds crisp shape without clinging',
      'Twin-needle hem and cuff stitching for lifetime seam strength',
      'Pre-washed with organic pumice stone to eliminate shrinkage'
    ],
    price: 42.00,
    originalPrice: 52.00,
    rating: 4.92,
    reviewsCount: 380,
    isBestSeller: true,
    discountBadge: 'Essential',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    secondImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
    stock: 92,
    sku: 'VPX-TEE-280G',
    variations: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [
        { name: 'Bone Ecru', hex: '#F3EFE0' },
        { name: 'Washed Charcoal', hex: '#262629' },
        { name: 'Sage Green', hex: '#4B5A4B' },
        { name: 'Vintage Black', hex: '#18181B' }
      ]
    },
    tags: ['T-Shirts', 'Heavyweight', 'Boxy Fit', '280 GSM', 'Apparel'],
    relatedProductIds: ['vapex-vintage-mineral-tee', 'vapex-tactical-cargo-shorts'],
    frequentlyBoughtTogetherIds: ['vapex-corduroy-snapback', 'vapex-modular-sling-bag']
  },
  {
    id: 'vapex-vintage-mineral-tee',
    name: 'Vintage Acid-Wash Distressed Tee',
    slug: 'vintage-acidwash-distressed-tee',
    subtitle: 'Custom Pigment Mineral Wash with Soft Micro-Distressed Edges',
    category: 't-shirts',
    description: 'Each piece features an individually unique mineral wash pattern with hand-distressed collar and cuffs. Relaxed street fit with breathable 240 GSM single jersey cotton.',
    story: 'Handcrafted wash process ensures no two garments are identical.',
    specifications: {
      'Weight': '240 GSM Soft Mineral Wash',
      'Material': '100% Ringspun Cotton',
      'Process': 'Individually Pigment Dyed and Ozone Washed'
    },
    features: [
      'Ultra-soft broken-in feel straight out of the box',
      'Ribbed collar with reinforced herringbone neck tape'
    ],
    price: 46.00,
    originalPrice: 58.00,
    rating: 4.86,
    reviewsCount: 165,
    stock: 45,
    sku: 'VPX-TEE-WASH',
    variations: {
      sizes: ['M', 'L', 'XL'],
      colors: [
        { name: 'Smoke Grey Wash', hex: '#4A4E5A' },
        { name: 'Faded Earth Rust', hex: '#6B4C43' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['T-Shirts', 'Vintage Wash', 'Apparel'],
    relatedProductIds: ['vapex-boxy-heavyweight-tee', 'vapex-tactical-cargo-shorts'],
    frequentlyBoughtTogetherIds: ['vapex-boxy-heavyweight-tee']
  },
  {
    id: 'vapex-tactical-cargo-shorts',
    name: 'AeroFlex Ripstop Technical Cargo Shorts',
    slug: 'aeroflex-ripstop-technical-cargo-shorts',
    subtitle: '4-Way Stretch Water-Resistant Techwear Shorts with Magnetic Bellow Pockets',
    category: 't-shirts',
    description: 'High-performance utility shorts cut from four-way stretch ripstop fabric. Features magnetic flap cargo pockets, built-in webbing belt with Duraflex buckle, and reinforced gusseted crotch.',
    story: 'Designed for summer street mobility with ample storage for daily essentials.',
    specifications: {
      'Fabric': '92% Nylon Ripstop / 8% Spandex with DWR',
      'Pockets': '6 Multi-Compartment Utility Pockets',
      'Waistband': 'Integrated Webbing Belt with Quick Cam Lock'
    },
    features: [
      'Water and stain-resistant fabric coating',
      'Magnetic cargo pockets snap shut automatically',
      '4-way stretch allows total freedom of movement'
    ],
    price: 54.00,
    originalPrice: 68.00,
    rating: 4.90,
    reviewsCount: 114,
    stock: 50,
    sku: 'VPX-SHORTS-TECH',
    variations: {
      sizes: ['S (30)', 'M (32)', 'L (34)', 'XL (36)'],
      colors: [
        { name: 'Tactical Black', hex: '#161922' },
        { name: 'Dark Khaki', hex: '#57534E' }
      ]
    },
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Shorts', 'Apparel', 'Cargo', 'Techwear'],
    relatedProductIds: ['vapex-boxy-heavyweight-tee', 'vapex-modular-sling-bag'],
    frequentlyBoughtTogetherIds: ['vapex-boxy-heavyweight-tee', 'vapex-corduroy-snapback']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'VAPEX20',
    discountType: 'percentage',
    value: 20,
    description: '20% off your entire vape & lifestyle order',
    minSpend: 40,
    isActive: true
  },
  {
    code: 'FIRSTDROP',
    discountType: 'fixed',
    value: 10,
    description: '$10 off for new members on orders over $35',
    minSpend: 35,
    isActive: true
  },
  {
    code: 'VIPVAPE',
    discountType: 'percentage',
    value: 25,
    description: '25% VIP discount on 15K puff vape devices',
    minSpend: 60,
    isActive: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'vapex-nebula-pod-pro',
    author: 'Dax R.',
    rating: 5,
    date: '2 days ago',
    title: 'Flavors are unmatched, battery lasts 2 full days',
    comment: 'The dual mesh coil hits so clean without any spitting. The OLED display is crisp and tells you down to the single percent how much juice and battery you have left.',
    verifiedPurchase: true,
    helpfulCount: 38
  },
  {
    id: 'rev-2',
    productId: 'vapex-corduroy-snapback',
    author: 'Kaelen M.',
    rating: 5,
    date: '1 week ago',
    title: 'The best corduroy cap I have ever owned',
    comment: 'Thick ridges, beautiful vintage brass clasp, and it holds its crown shape perfectly. Pair it with the heavyweight 280 GSM tee and the modular sling.',
    verifiedPurchase: true,
    helpfulCount: 24
  },
  {
    id: 'rev-3',
    productId: 'vapex-modular-sling-bag',
    author: 'Tarek S.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Fidlock magnetic buckle is addictive to use',
    comment: 'There is a dedicated upright slot inside that fits my vape pod perfectly so it never leaks or rattles around. 10/10 quality.',
    verifiedPurchase: true,
    helpfulCount: 49
  }
];
