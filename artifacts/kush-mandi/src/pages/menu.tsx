import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Star, Flame, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

type MenuItem = { name: string; price: string; desc?: string; badge?: string };
type MenuSection = { title: string; items: MenuItem[] };
type MenuCategory = {
  id: string;
  label: string;
  icon: string;
  sections: MenuSection[];
  note?: string;
};

const MENU: MenuCategory[] = [
  {
    id: "chicken-mandi",
    label: "Chicken Mandis",
    icon: "🍗",
    sections: [
      {
        title: "Spl Chicken Mandis",
        items: [
          { name: "Chicken Fry Mandi", price: "₹499 H / ₹749 F", desc: "Chicken cooked in traditional mandi spices and deep fried." },
          { name: "Single Chicken Mandi", price: "₹349" },
          { name: "Chicken Faham Mandi", price: "₹599 (2P) / ₹1099 (4P)", desc: "Chicken soaked in traditional mandi spices and roasted on barbeque grill." },
          { name: "Crispy Chicken Mandi", price: "₹549 H / ₹799 F", desc: "Chicken coated with batter and crispy breadcrumbs and deep fried." },
          { name: "Chicken Masala Mandi", price: "₹549 H / ₹799 F", desc: "Rich gravy chicken masala cooked with arabian spices." },
          { name: "Chicken Banjara Kebab Mandi", price: "₹549 H / ₹799 F", desc: "Delicious spicy kebab fully loaded with the fresh spices, cilantro, mint and cumin flavor and grilled." },
          { name: "Chicken Sheekh Kebab Mandi", price: "₹549 H / ₹799 F", desc: "Minced boneless chicken is ground with spices and aromatics and then wrapped around a skewer." },
          { name: "Kush Special Double Sheekh Kebab Mandi", price: "₹559 H / ₹819 F", desc: "Minced boneless chicken & mutton together grounded with spices and aromatics and then wrapped around a skewer.", badge: "Chef's Special" },
        ],
      },
      {
        title: "Chicken Barbeque & Kebab Mandis",
        items: [
          { name: "Tandoori Chicken Mandi", price: "₹549 H / ₹799 F", desc: "Tandoori marinade is a mixture of Greek yogurt, garlic, lemon juice, garam masala, paprika, cumin, coriander and ginger." },
          { name: "Reshmi Kebab Mandi", price: "₹549 H / ₹799 F", desc: "Creamy grilled chicken kebabs marinated in fresh cream, mild spices and nuts." },
          { name: "Chicken Tikka Kebab Mandi", price: "₹549 H / ₹799 F", desc: "Chicken pieces marinated in yogurt along with lime juice with Kashmir chilli and grilled on a skewer." },
          { name: "Chicken Tangdi Kebab Mandi", price: "₹549 H / ₹799 F", desc: "Soft, moist chicken leg part marinated in aromatic Indian spices and grilled to perfection." },
          { name: "Malai Tikka Mandi", price: "₹549 H / ₹799 F", desc: "Chicken tikka smothered in a wet rub of yogurt and grilled." },
          { name: "Chicken Zaafrani Kebab Mandi", price: "₹549 H / ₹799 F", desc: "Marinated together with SAFFRON, garlic, red chili, olive oil, mint leaves and lemon juice and grilled." },
          { name: "Chicken Tikka Masala Mandi", price: "₹549 H / ₹799 F", desc: "Chicken pieces marinated in yogurt along with lime juice with Kashmir chilli and cooked with rich gravy masala." },
          { name: "Chicken Hariyali Kebab Mandi", price: "₹499 H / ₹799 F", desc: "Boneless chicken pieces are marinated in the mixture of Curd, Spinach and Mint leaves and grilled." },
        ],
      },
      {
        title: "Chicken Chinese Mandis",
        items: [
          { name: "Chicken Tikka Masala Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chicken-65 Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chicken-555 Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chicken Manchurian Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chilli Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Ginger Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Pepper Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chicken Majestic Mandi", price: "₹549 H / ₹799 F" },
          { name: "Schezwan Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chicken Drumstick Mandi", price: "₹549 H / ₹799 F" },
          { name: "Chicken Lollipop Mandi", price: "₹549 H / ₹799 F" },
          { name: "Dragon Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Crispy Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Popcorn Chicken Mandi", price: "₹549 H / ₹799 F" },
          { name: "Sesame Chicken Mandi", price: "₹549 H / ₹799 F" },
        ],
      },
    ],
    note: "H = Half (Serves 2) · F = Full (Serves 3)",
  },
  {
    id: "mutton-mandi",
    label: "Mutton Mandis",
    icon: "🥩",
    sections: [
      {
        title: "Mutton Mandis",
        items: [
          { name: "Mutton Arabian Mandi", price: "₹679 H / ₹999 F", desc: "Tender mutton pieces in steam cooked in arabian traditional spices." },
          { name: "Ghee Roasted Mutton Mandi", price: "₹749 H / ₹1049 F", desc: "Tender mutton steam cooked in arabian traditional spices and roasted in drizzling ghee." },
          { name: "Mutton Juicy Mandi", price: "₹749 H / ₹1049 F", desc: "Succulent mutton pieces cooked in rich gravy along with arabian spices." },
          { name: "Mutton Sheekh Kebab Mandi", price: "₹749 H / ₹1049 F", desc: "Minced boneless mutton is ground with spices and aromatics and then wrapped around a skewer." },
          { name: "Crispy Mutton Mandi", price: "₹749 H / ₹1049 F", desc: "Mutton cooked in arabian spices later coated with batter and crispy breadcrumbs and deep fried." },
          { name: "Mutton Masala Mandi", price: "₹749 H / ₹1049 F", desc: "Tender mutton pieces in steam cooked in rich red gravy along with arabian traditional spices." },
          { name: "Mutton Madfoon Mandi", price: "₹799 H / ₹1099 F", desc: "Marinated tender mutton cooked in an underground hole where it is placed on the sand and surrounded by charcoal.", badge: "Traditional" },
        ],
      },
    ],
    note: "H = Half (Serves 2) · F = Full (Serves 3)",
  },
  {
    id: "starters",
    label: "Non-Veg Starters",
    icon: "🔥",
    sections: [
      {
        title: "Chicken Starters",
        items: [
          { name: "Chicken-65", price: "₹349" },
          { name: "Chicken-555", price: "₹349" },
          { name: "Chicken Manchuria", price: "₹349" },
          { name: "Chilli Chicken", price: "₹349" },
          { name: "Ginger Chicken", price: "₹349" },
          { name: "Pepper Chicken", price: "₹349" },
          { name: "Chicken Majestic", price: "₹349" },
          { name: "Schezwan Chicken", price: "₹349" },
          { name: "Chicken Drumsticks", price: "₹349" },
          { name: "Chicken Lollipop", price: "₹349" },
          { name: "Dragon Chicken", price: "₹349" },
          { name: "Crispy Chicken", price: "₹349" },
          { name: "Popcorn Chicken", price: "₹349" },
          { name: "Sesame Chicken", price: "₹349" },
          { name: "Chicken Pakodi", price: "₹349" },
        ],
      },
      {
        title: "Fish & Prawns",
        items: [
          { name: "Fish Fry", price: "₹399" },
          { name: "Fish Crispy", price: "₹399" },
          { name: "Chilli Fish", price: "₹399" },
          { name: "Dragon Fish", price: "₹399" },
          { name: "Apollo Fish", price: "₹399" },
          { name: "Chilli Loose Prawns", price: "₹399" },
          { name: "Crispy Prawns", price: "₹399", badge: "Chef's Special", desc: "Prawn coated in spicy masala, batter, crispy breadcrumbs and deep fried." },
          { name: "Masala Prawns", price: "₹399" },
          { name: "Tandoori Prawns", price: "₹449" },
        ],
      },
    ],
    note: "Make any starter a Mandi — add ₹199 for mandi rice!",
  },
  {
    id: "bbq-kebabs",
    label: "BBQ & Kebabs",
    icon: "🍢",
    sections: [
      {
        title: "BBQ & Chicken Kebabs",
        items: [
          { name: "Tandoori Chicken", price: "₹349 H / ₹649 F" },
          { name: "Malai Tikka", price: "₹349" },
          { name: "Reshmi Kebab", price: "₹349" },
          { name: "Chicken Zaafrani", price: "₹349" },
          { name: "Chicken Tikka Kebab", price: "₹349" },
          { name: "Chicken Tangdi Kebab", price: "₹349" },
          { name: "Chicken Haryali Kebab", price: "₹349" },
          { name: "Chicken Banjara Kebab", price: "₹349" },
          { name: "Chicken Sheekh Kebab", price: "₹349" },
          { name: "Masala Grilled Chicken", price: "₹349" },
          { name: "Kush Special Double Sheekh Kebab (Chicken+Mutton)", price: "₹349", badge: "Signature" },
        ],
      },
    ],
    note: "Make any kebab a Mandi — add ₹199 for mandi rice!",
  },
  {
    id: "biryani",
    label: "Kush Biryanis",
    icon: "🍚",
    sections: [
      {
        title: "Kush Special Biryanis",
        items: [
          { name: "Chicken Biryani", price: "₹199" },
          { name: "Spl Chicken Biryani", price: "₹229" },
          { name: "Chicken Fry Piece Biryani", price: "₹199" },
          { name: "Chicken Lollipop Biryani", price: "₹199" },
          { name: "Mutton Fry Piece Biryani", price: "₹249" },
        ],
      },
    ],
    note: "All items for single person only.",
  },
  {
    id: "veg",
    label: "Veg Mandis",
    icon: "🥦",
    sections: [
      {
        title: "Veg Mandis",
        items: [
          { name: "Mix Veg Mandi", price: "₹499 H / ₹679 F" },
          { name: "Panner BBQ Tikka Mandi", price: "₹549 H / ₹749 F" },
          { name: "Crispy Sweet Corn Mandi", price: "₹499 H / ₹679 F" },
          { name: "Panner Chilli Potato Mandi", price: "₹499 H / ₹679 F" },
          { name: "Panner Tikka Masala Mandi (Gravy)", price: "₹499 H / ₹679 F" },
          { name: "Panner Butter Masala Mandi (Gravy)", price: "₹499 H / ₹679 F" },
          { name: "Kadai Panner Masala Mandi (Gravy)", price: "₹499 H / ₹679 F" },
          { name: "Baby Corn Masala Mandi (Gravy)", price: "₹499 H / ₹679 F" },
          { name: "Mushroom Masala Mandi (Gravy)", price: "₹499 H / ₹679 F" },
          { name: "Capsicum Masala Mandi (Gravy)", price: "₹499 H / ₹679 F" },
          { name: "Egg Omlette Mandi", price: "₹499 H / ₹679 F" },
        ],
      },
      {
        title: "Chinese Veg Mandis",
        items: [
          { name: "Veg Machurian Mandi", price: "₹499 H / ₹679 F" },
          { name: "Veg-65 Mandi", price: "₹499 H / ₹679 F" },
          { name: "Gobi-65 Mandi", price: "₹499 H / ₹679 F" },
          { name: "Aaloo-65 Mandi", price: "₹499 H / ₹679 F" },
          { name: "Mushroom-65 Mandi", price: "₹499 H / ₹679 F" },
          { name: "Mushroom Machurian Mandi", price: "₹499 H / ₹679 F" },
          { name: "Chilli Machurian Mandi", price: "₹499 H / ₹679 F" },
          { name: "Chilli Babycorn Mandi", price: "₹499 H / ₹679 F" },
          { name: "Corn Chilli Machurian Mandi", price: "₹499 H / ₹679 F" },
          { name: "Chilli Panner Mandi", price: "₹499 H / ₹679 F" },
          { name: "Panner Majestic Mandi", price: "₹499 H / ₹679 F" },
        ],
      },
    ],
    note: "H = Half (Serves 2) · F = Full (Serves 3)",
  },
  {
    id: "curries-breads",
    label: "Curries & Breads",
    icon: "🫓",
    sections: [
      {
        title: "Curries",
        items: [
          { name: "Mix Veg Curry", price: "₹249" },
          { name: "Veg Kadai Curry", price: "₹249" },
          { name: "Chicken Masala Curry", price: "₹319" },
          { name: "Chicken Tikka Curry", price: "₹349" },
          { name: "Andhra Mutton Curry", price: "₹399" },
          { name: "Hyd Mutton Masala", price: "₹429" },
          { name: "Mutton Roghan Josh", price: "₹429" },
          { name: "Mutton Kheema Curry", price: "₹429" },
        ],
      },
      {
        title: "Naan & Rotis",
        items: [
          { name: "Tandoori Roti", price: "₹59" },
          { name: "Butter Naan", price: "₹69" },
          { name: "Hyderabad Naan", price: "₹59" },
          { name: "Aaloo Parata", price: "₹79" },
          { name: "Gobi Parata", price: "₹79" },
          { name: "Garlic Naan", price: "₹69" },
          { name: "Laccha Parata", price: "₹79" },
          { name: "Pudina Parata", price: "₹79" },
          { name: "Panner Kulcha", price: "₹89" },
        ],
      },
      {
        title: "Add Ons",
        items: [
          { name: "Extra Mandi Rice", price: "₹199" },
          { name: "Extra Chicken Juicy Fry Piece", price: "₹199" },
          { name: "Extra Crispy Chicken Piece", price: "₹199" },
          { name: "Extra Crispy Faham Piece", price: "₹349" },
          { name: "Extra Mutton Piece", price: "₹249" },
          { name: "Extra Crispy Mutton Piece", price: "₹259" },
          { name: "Extra Fish Piece", price: "₹249" },
          { name: "Extra Mayonnaise", price: "₹49" },
          { name: "Extra Soup", price: "₹49" },
          { name: "Extra Tomato Gravy", price: "₹29" },
          { name: "Extra Salad", price: "₹49" },
          { name: "Extra Toppings", price: "₹49" },
          { name: "Extra Raitha", price: "₹49" },
        ],
      },
    ],
  },
  {
    id: "combos",
    label: "Combos",
    icon: "👥",
    sections: [
      {
        title: "Group Combos",
        items: [
          {
            name: "Kush Arabian Special Mandi",
            price: "₹1,799 (5P) / ₹2,999 (8P)",
            desc: "Chicken + Mutton + Fish + Prawns + Batair — the ultimate feast platter.",
            badge: "Best Value",
          },
          {
            name: "Assorted Mixed Veg Mandi",
            price: "₹1,499 (5P) / ₹2,499 (8P)",
            desc: "A rich assortment of vegetarian delights on a grand mandi platter.",
          },
          {
            name: "Mutton Raann Faham Mandi",
            price: "₹3,999 (6P)",
            desc: "Marinated whole mutton leg slow cooked to perfection.",
            badge: "Pre-Order Only",
          },
          {
            name: "Sabit Bakara Mandi",
            price: "₹19,999 (30P)",
            desc: "Full goat mandi — the grandest feast for large celebrations.",
            badge: "Pre-Order Only",
          },
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts & Drinks",
    icon: "🍮",
    sections: [
      {
        title: "Desserts",
        items: [
          { name: "Arabian Kunafa", price: "₹299", badge: "Signature" },
          { name: "Kaddu Ki Kheer", price: "₹69" },
          { name: "Kashmiri Ki Kheer", price: "₹149" },
          { name: "Double Ka Meetha", price: "₹69" },
          { name: "Badam Firni", price: "₹99" },
          { name: "Rabdi", price: "—" },
          { name: "Gulab Jamun (3 Pcs)", price: "—" },
          { name: "Apricot Delight", price: "—" },
        ],
      },
      {
        title: "Beverages",
        items: [
          { name: "Water", price: "Complimentary" },
          { name: "Goli Soda", price: "₹20" },
          { name: "Soft Drinks", price: "₹25 – ₹59" },
        ],
      },
    ],
  },
];

const BADGE_STYLES: Record<string, string> = {
  "Chef's Special": "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  "Signature": "bg-primary/20 text-primary border border-primary/30",
  "Traditional": "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  "Best Value": "bg-green-500/20 text-green-400 border border-green-500/30",
  "Pre-Order Only": "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(MENU[0].id);
  const [, navigate] = useLocation();

  const currentCategory = MENU.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-display text-xl font-bold">
              <span className="text-primary">Kush</span> Mandi
            </span>
          </button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span>4.0 · Gachibowli</span>
          </div>
        </div>

        {/* CATEGORY TABS — horizontal scroll */}
        <div className="max-w-7xl mx-auto px-4 pb-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 w-max">
            {MENU.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PAGE HERO */}
      <div className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl">{currentCategory.icon}</span>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">{currentCategory.label}</h1>
                {currentCategory.note && (
                  <p className="text-sm text-primary mt-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {currentCategory.note}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MENU CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {currentCategory.sections.map((section) => (
              <div key={section.title}>
                {currentCategory.sections.length > 1 && (
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-display text-xl font-bold text-foreground whitespace-nowrap">{section.title}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {section.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="group bg-card border border-border/40 rounded-2xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-foreground leading-snug">{item.name}</h3>
                            {item.badge && (
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${BADGE_STYLES[item.badge] ?? "bg-muted text-muted-foreground"}`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                          )}
                        </div>
                        <span className="text-primary font-bold text-sm whitespace-nowrap shrink-0">{item.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* "Make it a Mandi" callout for starters/kebabs */}
            {(activeCategory === "starters" || activeCategory === "bbq-kebabs") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 border border-primary/30 rounded-2xl bg-primary/5 p-6 flex items-center gap-6"
              >
                <div className="text-5xl">🍽️</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-5 h-5 text-primary" />
                    <span className="font-display text-xl font-bold">Make it a Mandi!</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Choose any starter or kebab and we'll serve it on a bed of fragrant mandi rice.
                  </p>
                  <p className="text-primary font-bold mt-2">Only ₹199 extra for the rice</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* STICKY BOTTOM CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/90 backdrop-blur-xl border-t border-border/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground hidden sm:block">
            <span className="text-foreground font-medium">Kush Mandi</span> · Building 12&13, Sri Balaji Complex, Gachibowli
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <a href="tel:+919000000000" className="flex-1 sm:flex-none">
              <Button variant="outline" className="w-full">📞 Call to Order</Button>
            </a>
            <Button className="flex-1 sm:flex-none" onClick={() => navigate("/")}>
              Reserve a Table
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
