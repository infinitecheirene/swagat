export type MenuItem = { name: string; price: number; description: string };
export type MenuCategory = { title: string; slug: string; items: MenuItem[] };
export type SelectedDish = MenuItem & { category: string };
export type DishDetail = {
  ingredients: string;
  spice: string;
  dietary: string;
  serving: string;
  story: string;
};

export const formatPrice = (price: number) => `₱${price}`;

export const categories: MenuCategory[] = [
  {
    title: "Small Plates",
    slug: "small-plates",
    items: [
      {
        name: "Aloo Nazarat",
        price: 420,
        description: "Spiced potato, yoghurt, tamarind",
      },
      {
        name: "Dahi Puri",
        price: 420,
        description: "Crisp puri, yoghurt, chutneys",
      },
      {
        name: "Butte ki Pankhidiya",
        price: 420,
        description: "Sweet corn, chilli, toasted spices",
      },
    ],
  },
  {
    title: "From the Tandoor",
    slug: "tandoor",
    items: [
      {
        name: "Amritsari Paneer Tikka",
        price: 460,
        description: "Paneer, ajwain, charred peppers",
      },
      {
        name: "Atishi Murg Tikka",
        price: 520,
        description: "Kashmiri chilli, yoghurt, clay oven char",
      },
      {
        name: "Chicken Seekh Kebab",
        price: 670,
        description: "Minced chicken, ginger, herbs",
      },
    ],
  },
  {
    title: "Curries & Specialties",
    slug: "curries",
    items: [
      {
        name: "Murg Makhni",
        price: 545,
        description: "Butter chicken, tomato, cream, fenugreek",
      },
      {
        name: "Murg Changezi Korma",
        price: 545,
        description: "Chicken, yoghurt, browned onion",
      },
      {
        name: "Murg Tikka Masala",
        price: 545,
        description: "Tandoori chicken, tomato, smoked spices",
      },
    ],
  },
  {
    title: "Biryani",
    slug: "biryani",
    items: [
      {
        name: "Chicken Biryani",
        price: 395,
        description: "Aged basmati, saffron, fried onion",
      },
      {
        name: "Mutton Biryani",
        price: 595,
        description: "Slow-cooked mutton, mint, saffron",
      },
      {
        name: "Vegetable Biryani",
        price: 395,
        description: "Garden vegetables, basmati, aromatic spice",
      },
    ],
  },
];

export const dishDetails: Record<string, DishDetail> = {
  "Aloo Nazarat": {
    ingredients: "Baby potato, yoghurt, tamarind, toasted cumin",
    spice: "Mild",
    dietary: "Vegetarian",
    serving: "2–3 guests",
    story:
      "A crisp, bright potato plate finished with tangy tamarind and cooling yoghurt.",
  },
  "Dahi Puri": {
    ingredients: "Puri, yoghurt, chickpea, mint chutney, tamarind",
    spice: "Mild",
    dietary: "Vegetarian",
    serving: "2–3 guests",
    story:
      "Classic crisp puri filled at the table for a lively mix of sweet, sour and spice.",
  },
  "Butte ki Pankhidiya": {
    ingredients: "Sweet corn, chilli, coriander, onion, lemon",
    spice: "Medium",
    dietary: "Vegetarian",
    serving: "2–3 guests",
    story:
      "Sweet corn brought to life with herbs, chilli and a squeeze of fresh citrus.",
  },
  "Amritsari Paneer Tikka": {
    ingredients: "Paneer, ajwain, yoghurt, peppers, spices",
    spice: "Medium",
    dietary: "Vegetarian",
    serving: "2–3 guests",
    story:
      "Paneer marinated in ajwain and yoghurt, then charred over the intense heat of the tandoor.",
  },
  "Atishi Murg Tikka": {
    ingredients: "Chicken, Kashmiri chilli, yoghurt, lime",
    spice: "Medium–hot",
    dietary: "Gluten-free",
    serving: "2–3 guests",
    story:
      "A smoky tandoor classic with deep Kashmiri colour and a gently lingering heat.",
  },
  "Chicken Seekh Kebab": {
    ingredients: "Minced chicken, ginger, herbs, roasted spices",
    spice: "Medium",
    dietary: "Gluten-free",
    serving: "2–3 guests",
    story:
      "Seasoned minced chicken grilled on skewers until smoky outside and tender within.",
  },
  "Murg Makhni": {
    ingredients: "Chicken, tomato, cream, fenugreek, butter",
    spice: "Mild",
    dietary: "Gluten-free",
    serving: "2 guests",
    story:
      "Our signature butter chicken: rich tomato, warm spice and a smooth, gently smoky finish.",
  },
  "Murg Changezi Korma": {
    ingredients: "Chicken, yoghurt, browned onion, cardamom",
    spice: "Mild",
    dietary: "Gluten-free",
    serving: "2 guests",
    story:
      "A slow, aromatic korma where yoghurt and browned onion create a deep, mellow sauce.",
  },
  "Murg Tikka Masala": {
    ingredients: "Tandoori chicken, tomato, spices, cream",
    spice: "Medium",
    dietary: "Gluten-free",
    serving: "2 guests",
    story:
      "Charred tikka folded through a vibrant tomato masala balanced with cream.",
  },
  "Chicken Biryani": {
    ingredients: "Chicken, aged basmati, saffron, fried onion",
    spice: "Medium",
    dietary: "Gluten-free",
    serving: "1–2 guests",
    story:
      "Aged basmati and tender chicken layered and sealed under dum until aromatic and fluffy.",
  },
  "Mutton Biryani": {
    ingredients: "Mutton, aged basmati, mint, saffron, spices",
    spice: "Medium",
    dietary: "Gluten-free",
    serving: "1–2 guests",
    story:
      "Slow-cooked mutton layered with fragrant basmati and saffron for a richly spiced biryani.",
  },
  "Vegetable Biryani": {
    ingredients: "Garden vegetables, basmati, saffron, fried onion",
    spice: "Medium",
    dietary: "Vegetarian · Gluten-free",
    serving: "1–2 guests",
    story:
      "Seasonal vegetables and fragrant basmati cooked together over a gentle dum.",
  },
};

export const isVegetarian = (name: string) =>
  dishDetails[name]?.dietary.includes("Vegetarian") ?? false;
