// ============================================
// fatosistore.com — Products Database
// Edit this file to add/change products
// ============================================

const products = [
  {
    id: 1,
    name: "Bamboo Artificial Plant",
    category: "artificial-plants",
    categoryLabel: "Artificial Plants",
    price: 45.00,
    image: "images/placeholder-plant.svg",
    description: "Beautiful artificial bamboo plant that adds a fresh, natural touch to any room. No watering needed — stays green all year round. Perfect for living rooms, offices, and entryways.",
    details: [
      "Height: 120cm",
      "Material: Silk leaves, plastic pot",
      "Lifelike appearance",
      "No maintenance required",
      "Comes in a decorative pot"
    ]
  },
  {
    id: 2,
    name: "Artificial Monstera Leaf Plant",
    category: "artificial-plants",
    categoryLabel: "Artificial Plants",
    price: 38.00,
    image: "images/placeholder-plant2.svg",
    description: "Stunning artificial Monstera plant with large, split leaves. Brings tropical vibes to your home decor without the hassle of real plant care.",
    details: [
      "Height: 90cm",
      "6 large Monstera leaves",
      "UV-resistant material",
      "Realistic texture and color",
      "Comes in a stylish ceramic pot"
    ]
  },
  {
    id: 3,
    name: "Artificial Lavender Bush",
    category: "artificial-plants",
    categoryLabel: "Artificial Plants",
    price: 28.00,
    image: "images/placeholder-plant3.svg",
    description: "A beautiful bunch of artificial lavender flowers. Perfect for adding a pop of purple and a rustic feel to your kitchen, bedroom, or balcony.",
    details: [
      "Height: 45cm",
      "Multi-stem lavender bush",
      "Fade-resistant colors",
      "Can be displayed in a vase or pot",
      "Lightweight and easy to arrange"
    ]
  },
  {
    id: 4,
    name: "Kids Electric Car Remote - Audi R8",
    category: "toys-remote",
    categoryLabel: "Remote Cars & Toys",
    price: 89.00,
    image: "images/placeholder-remote.svg",
    description: "Remote-controlled electric Audi R8 for kids aged 2-5 years. Realistic design, easy to operate, and safe for indoor use. Includes rechargeable battery.",
    details: [
      "Age: 2-5 years",
      "2.4GHz remote control",
      "Rechargeable battery (6V)",
      "Max speed: 3 km/h",
      "Working headlights",
      "Suitable for indoor use"
    ]
  },
  {
    id: 5,
    name: "12V Kids Ride-On Jeep",
    category: "toys-remote",
    categoryLabel: "Remote Cars & Toys",
    price: 189.00,
    image: "images/placeholder-remote2.svg",
    description: "Powerful 12V ride-on Jeep for adventurous kids aged 3-8 years. Features parental remote control, MP3 player, and working lights. Drives on grass and pavement.",
    details: [
      "Age: 3-8 years",
      "12V battery with charger",
      "Parental remote control included",
      "MP3/USB/SD card input",
      "Working headlights and horn",
      "Max speed: 5 km/h",
      "Max weight: 30kg"
    ]
  },
  {
    id: 6,
    name: "Remote Control Monster Truck",
    category: "toys-remote",
    categoryLabel: "Remote Cars & Toys",
    price: 35.00,
    image: "images/placeholder-toy.svg",
    description: "High-speed RC monster truck with giant wheels. Perfect for off-road adventures. Durable construction that can handle bumps and crashes.",
    details: [
      "Age: 6-12 years",
      "2.4GHz remote (30m range)",
      "Rechargeable battery",
      "All-terrain tires",
      "Shock-absorbing suspension",
      "LED lights"
    ]
  },
  {
    id: 7,
    name: "Educational Building Blocks Set (200pcs)",
    category: "toys",
    categoryLabel: "Toys",
    price: 24.00,
    image: "images/placeholder-toy2.svg",
    description: "200-piece colorful building blocks set that helps develop creativity and motor skills. Compatible with major brands. Hours of constructive fun!",
    details: [
      "Age: 3+ years",
      "200 pieces in assorted colors",
      "Compatible with LEGO and major brands",
      "Non-toxic materials",
      "Comes with storage box",
      "Great for STEM learning"
    ]
  },
  {
    id: 8,
    name: "Plush Teddy Bear (Large 80cm)",
    category: "toys",
    categoryLabel: "Toys",
    price: 32.00,
    image: "images/placeholder-toy3.svg",
    description: "Super soft and cuddly teddy bear standing 80cm tall. Made from high-quality plush material. A perfect gift and bedtime companion for any child.",
    details: [
      "Height: 80cm",
      "Super soft plush material",
      "Hypoallergenic filling",
      "Machine washable",
      "Suitable for all ages",
      "Available in brown and white"
    ]
  },
  {
    id: 9,
    name: "Wooden Montessori Puzzle",
    category: "toys",
    categoryLabel: "Toys",
    price: 18.00,
    image: "images/placeholder-toy4.svg",
    description: "Educational wooden puzzle designed with Montessori principles. Helps develop fine motor skills, shape recognition, and problem-solving abilities.",
    details: [
      "Age: 1-4 years",
      "Natural wood materials",
      "Non-toxic paint",
      "12 shape pieces",
      "Smooth, splinter-free edges",
      "Includes shape sorter tray"
    ]
  },
  {
    id: 10,
    name: "Ceramic Vase Set (3 Pieces)",
    category: "home-decor",
    categoryLabel: "Home Decor",
    price: 42.00,
    image: "images/placeholder-decor.svg",
    description: "Elegant set of 3 ceramic vases in graduated sizes. Minimalist design that complements any interior style. Perfect for displaying fresh or artificial flowers.",
    details: [
      "Set of 3 vases: small, medium, large",
      "Matte ceramic finish",
      "Available in white, beige, and terracotta",
      "Small: 15cm, Medium: 22cm, Large: 30cm",
      "Handcrafted quality"
    ]
  },
  {
    id: 11,
    name: "Scented Soy Candle Set (4 Pack)",
    category: "home-decor",
    categoryLabel: "Home Decor",
    price: 26.00,
    image: "images/placeholder-decor2.svg",
    description: "Hand-poured soy wax candles in 4 delightful scents: Vanilla, Lavender, Citrus, and Fresh Linen. Burns cleanly for up to 40 hours each.",
    details: [
      "100% natural soy wax",
      "Cotton wicks (lead-free)",
      "Burn time: 35-40 hours each",
      "Scents: Vanilla, Lavender, Citrus, Fresh Linen",
      "In glass jars with bamboo lids",
      "Hand-poured"
    ]
  },
  {
    id: 12,
    name: "Macrame Wall Hanging",
    category: "home-decor",
    categoryLabel: "Home Decor",
    price: 34.00,
    image: "images/placeholder-decor3.svg",
    description: "Handmade macrame wall hanging with a boho-chic design. Adds texture and warmth to any wall. Each piece is uniquely crafted.",
    details: [
      "Size: 50cm x 80cm",
      "100% cotton rope",
      "Handmade — each piece is unique",
      "Includes wooden dowel for hanging",
      "Perfect for living room or bedroom",
      "Boho style"
    ]
  }
];

// Helper functions
function getProductById(id) {
  return products.find(p => p.id === id);
}

function getProductsByCategory(category) {
  return category ? products.filter(p => p.category === category) : products;
}

function getCategories() {
  const cats = {};
  products.forEach(p => {
    if (!cats[p.category]) {
      cats[p.category] = { id: p.category, label: p.categoryLabel };
    }
  });
  return Object.values(cats);
}

function formatPrice(price) {
  return price.toFixed(2) + ' €';
}