import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Phone, Clock, Star, Quote, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { GradientArt } from "@/components/gradient-art";
import { ReservationModal } from "@/components/reservation-modal";

import imgInterior from "@assets/1000385857_1774209331114.jpg";
import imgChickenMandi from "@assets/1000385856_1774209331244.jpg";
import imgMuttonMandi from "@assets/1000385855_1774209331290.jpg";
import imgExteriorNight from "@assets/1000385854_1774209331354.jpg";
import imgExteriorSign from "@assets/1000385853_1774209331400.jpg";

type GradientVariant = "chicken" | "mutton" | "fish" | "prawns";

interface Dish {
  id: number;
  name: string;
  desc: string;
  price: string;
  variant: GradientVariant;
  img: string | null;
}

const REVIEWS = [
  { name: "Rahul S.", role: "IT Professional", text: "Amazing taste, especially the fish fry! Best mandi in Gachibowli." },
  { name: "Priya M.", role: "Food Blogger", text: "Great food, good ambiance, and very friendly staff. Will come again!" },
  { name: "Arjun K.", role: "Software Engineer", text: "Best mandi experience at such a reasonable price. Perfect for a group dinner." },
  { name: "Sneha T.", role: "Teacher", text: "The mutton mandi was absolutely incredible — so tender and flavorful!" },
  { name: "Vikram R.", role: "Business Owner", text: "Loved the crispy fish fry and the warm atmosphere. My family's new go-to place." }
];

const FEATURES = [
  { icon: "🍗", title: "Authentic Recipes", desc: "Traditional flavors passed down through generations." },
  { icon: "🐟", title: "Signature Fish", desc: "Fresh seafood prepared with bold Hyderabadi spices." },
  { icon: "💰", title: "Value for Money", desc: "Premium quality at prices everyone can enjoy." },
  { icon: "👨‍👩‍👧", title: "Perfect for Groups", desc: "Group-friendly seating for families and friends." },
  { icon: "🪑", title: "Comfortable Space", desc: "Relaxed, warm dining environment." },
  { icon: "⭐", title: "4.0 Rated", desc: "Trusted by over 100 happy diners in Gachibowli." }
];

const SIGNATURE_DISHES: Dish[] = [
  { id: 1, name: "Chicken Mandi", desc: "Tender slow-cooked chicken on fragrant basmati rice, seasoned with our secret spice blend.", price: "₹320", variant: "chicken", img: imgChickenMandi },
  { id: 2, name: "Mutton Mandi", desc: "Premium mutton slow-roasted to perfection on aromatic saffron rice.", price: "₹450", variant: "mutton", img: imgMuttonMandi },
  { id: 3, name: "Crispy Fish Fry", desc: "Golden crispy fish coated in a signature Hyderabadi masala blend, fried to perfection.", price: "₹280", variant: "fish", img: null },
  { id: 4, name: "Signature Prawns", desc: "Jumbo prawns marinated in bold coastal spices and grilled over charcoal.", price: "₹380", variant: "prawns", img: null },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [, navigate] = useLocation();
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      <button onClick={() => navigate("/menu")} className="text-sm font-medium hover:text-primary transition-colors">Menu</button>
      <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
      <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">Gallery</a>
      <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
    </>
  );

  return (
    <div className="bg-background min-h-screen">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-4 shadow-xl" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display text-2xl font-bold tracking-wider text-foreground flex items-center gap-2">
            <span className="text-primary">Kush</span> Mandi
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <Button onClick={() => setReservationOpen(true)} className="rounded-full px-6">
              Reserve a Table
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20"
          >
            <NavLinks />
            <Button onClick={() => { setReservationOpen(true); setMobileMenuOpen(false); }} className="mt-4">
              Reserve a Table
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img src={imgExteriorNight} alt="Kush Mandi Restaurant" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium"
          >
            <Star className="w-4 h-4 fill-primary" />
            4.0 Rating | Loved by 100+ Food Lovers
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight mb-6 text-balance"
          >
            Experience the True Taste of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">Authentic Mandi</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            Juicy, flavorful mandi and signature seafood delights — crafted for unforgettable dining in Gachibowli.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate("/menu")}>
              View Menu
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setReservationOpen(true)}>
              Reserve a Table
            </Button>
          </motion.div>
        </div>

        {/* Gradient Fade to next section */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* SIGNATURE DISHES */}
      <section id="menu" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Signature Dishes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover the dishes that made us a local favorite.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNATURE_DISHES.map((dish, i) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              <div className="h-48 relative overflow-hidden">
                {dish.img ? (
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <GradientArt variant={dish.variant} className="group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-primary font-bold text-sm">
                  {dish.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold mb-2 text-foreground">{dish.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{dish.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="group" onClick={() => navigate("/menu")}>
            Explore Full Menu 
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* ABOUT & WHY CHOOSE US */}
      <section id="about" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Where Flavor <br/><span className="text-primary italic">Meets Comfort</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                Kush Mandi brings you authentic mandi flavors with a modern dining experience in the heart of Gachibowli. Known for its perfectly cooked rice, tender meats, and crowd-favorite seafood dishes, it's a go-to destination for food lovers who crave bold, satisfying meals.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { label: "5+ Years", sub: "Serving Joy" },
                  { label: "10,000+", sub: "Happy Guests" },
                  { label: "100%", sub: "Fresh Ingredients" },
                ].map((stat, i) => (
                  <div key={i} className="flex-1 min-w-[120px]">
                    <div className="text-3xl font-display font-bold text-foreground">{stat.label}</div>
                    <div className="text-sm text-primary">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {FEATURES.map((feature, i) => (
                <div key={i} className="bg-background p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section id="reviews" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Loved by Locals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it.</p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[300px] md:min-w-[400px] snap-center bg-card p-8 rounded-3xl border border-border/50 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-lg text-foreground/90 mb-8 italic">"{review.text}"</p>
              <div>
                <p className="font-bold text-foreground">{review.name}</p>
                <p className="text-sm text-primary">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-card px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">The Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A glimpse into our warm, inviting atmosphere and rich culinary creations.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[280px]">
            {/* Large feature: Interior */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img src={imgInterior} alt="Kush Mandi Dining Area" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-3xl font-bold text-white">Group Dining</h3>
              </div>
            </motion.div>

            {/* Chicken Mandi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img src={imgChickenMandi} alt="Chicken Mandi" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-xl font-bold text-white">Chicken Mandi</h3>
              </div>
            </motion.div>

            {/* Mutton Mandi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img src={imgMuttonMandi} alt="Mutton Mandi" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-xl font-bold text-white">Mutton Mandi</h3>
              </div>
            </motion.div>

            {/* Exterior Sign 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img src={imgExteriorNight} alt="Kush Mandi at Night" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-xl font-bold text-white">Our Location</h3>
              </div>
            </motion.div>

            {/* Exterior Sign 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="col-span-2 md:col-span-1 rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img src={imgExteriorSign} alt="Kush Mandi Arabian Kitchen" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-display text-xl font-bold text-white">Arabian Kitchen</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION & CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Visit Us</h2>
              <p className="text-muted-foreground">Conveniently located in Gachibowli, perfect for a quick lunch or a relaxed dinner feast.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Address</h4>
                  <p className="text-muted-foreground">Building 12&13, Sri Balaji Complex, 1st Floor,<br/>Gachibowli Rd, Hyderabad</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Hours</h4>
                  <div className="grid grid-cols-2 gap-x-8 text-muted-foreground">
                    <span>Dine-in:</span> <span>11:00 AM – 11:00 PM</span>
                    <span>Takeout:</span> <span>09:00 AM – 11:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Contact</h4>
                  <a href="tel:+919392201156" className="text-primary hover:underline text-lg font-medium">+91 93922 01156</a>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full sm:w-auto mt-4" onClick={() => window.open('https://maps.google.com', '_blank')}>
              Get Directions
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden relative border border-border/50 shadow-2xl"
          >
            {/* Mock Map using Gradient Art */}
            <GradientArt variant="map" animate={false} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center shadow-2xl border border-primary/20">
                <MapPin className="w-10 h-10 text-primary mb-2" />
                <span className="font-bold text-sm tracking-wide">KUSH MANDI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden border-t border-border">
        <GradientArt variant="hero" animate={false} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-background/80 z-0" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">Craving Mandi?<br/>Let's Serve You Today.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button size="lg" onClick={() => setReservationOpen(true)}>Book a Table</Button>
            <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white hover:text-black">Order Online</Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-card py-16 border-t border-border/50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="font-display text-3xl font-bold tracking-wider text-foreground block mb-6">
              <span className="text-primary">Kush</span> Mandi
            </a>
            <p className="text-muted-foreground max-w-sm">
              The true taste of authentic mandi in Hyderabad. Join us for a feast that brings people together.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#menu" className="hover:text-primary transition-colors">Our Menu</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#gallery" className="hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-foreground">Connect</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Zomato</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Swiggy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-border/50 text-center md:text-left text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Kush Mandi. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
