export type SignatureDish = {
  category: string;
  name: string;
  price: string;
  description: string;
  image: string;
  offset: string;
};

export const signatureDishes: SignatureDish[] = [
  {
    category: "Signature",
    name: "Murg Makhni",
    price: "₱545",
    description: "Butter chicken · tomato, cream, fenugreek",
    image: "/murg-makhni.png",
    offset: "",
  },
  {
    category: "Dum",
    name: "Biryani Specialties",
    price: "from ₱395",
    description: "Saffron, fried onion, aged basmati",
    image: "/biryani.png",
    offset: "lg:mt-16",
  },
  {
    category: "Tandoor",
    name: "Atishi Murg Tikka",
    price: "₱520",
    description: "Kashmiri chilli, yoghurt, clay oven char",
    image: "/tikka.png",
    offset: "lg:mt-6",
  },
  {
    category: "Vegetarian",
    name: "Dum Aloo Kashmiri",
    price: "₱520",
    description: "Baby potato, fennel, Kashmiri chilli",
    image: "/aloo.png",
    offset: "lg:mt-24",
  },
];

export const signatureDetails: Record<
  string,
  {
    ingredients: string;
    spice: string;
    dietary: string;
    serving: string;
    story: string;
  }
> = {
  "Murg Makhni": {
    ingredients: "Chicken, tomato, cream, fenugreek, butter",
    spice: "Mild",
    dietary: "Gluten-free",
    serving: "2 guests",
    story:
      "Our signature butter chicken: rich tomato, warm spice and a smooth, gently smoky finish.",
  },
  "Biryani Specialties": {
    ingredients: "Aged basmati, saffron, fried onion, spices",
    spice: "Medium",
    dietary: "Gluten-free",
    serving: "1–2 guests",
    story:
      "Aged basmati layered with saffron and slow-cooked spices, sealed over dum until fragrant and fluffy.",
  },
  "Atishi Murg Tikka": {
    ingredients: "Chicken, Kashmiri chilli, yoghurt, lime",
    spice: "Medium–hot",
    dietary: "Gluten-free",
    serving: "2–3 guests",
    story:
      "A smoky tandoor classic with deep Kashmiri colour and a gently lingering heat.",
  },
  "Dum Aloo Kashmiri": {
    ingredients: "Baby potato, fennel, Kashmiri chilli, yoghurt",
    spice: "Medium",
    dietary: "Vegetarian · Gluten-free",
    serving: "2 guests",
    story:
      "Baby potatoes gently cooked with fennel and Kashmiri chilli in a fragrant, lightly spiced sauce.",
  },
};

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const parsePrice = (price: string) =>
  Number(price.replace("from ₱", "").replace("₱", ""));
