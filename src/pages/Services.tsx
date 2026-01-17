import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2,
  Wrench,
  Sparkles,
  Zap,
  PaintBucket,
  Bug,
  Wind,
  ChevronDown,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

const categories = [
  { id: "all", name: "All Services", icon: Sparkles },
  { id: "plumbing", name: "Plumbing", icon: Wrench },
  { id: "cleaning", name: "Cleaning", icon: Sparkles },
  { id: "electrical", name: "Electrical", icon: Zap },
  { id: "painting", name: "Painting", icon: PaintBucket },
  { id: "pest", name: "Pest Control", icon: Bug },
  { id: "hvac", name: "AC & Heating", icon: Wind },
];

const providers = [
  {
    id: 1,
    name: "John's Plumbing Pro",
    category: "plumbing",
    rating: 4.9,
    reviews: 234,
    price: "$50-80/hr",
    location: "Downtown Area",
    availability: "Available Today",
    verified: true,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    specialties: ["Pipe Repair", "Installation", "Emergency"],
  },
  {
    id: 2,
    name: "Clean Experts NYC",
    category: "cleaning",
    rating: 4.8,
    reviews: 456,
    price: "$30-50/hr",
    location: "All Areas",
    availability: "Next Day",
    verified: true,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
    specialties: ["Deep Clean", "Move-out", "Regular"],
  },
  {
    id: 3,
    name: "PowerFix Electrical",
    category: "electrical",
    rating: 4.9,
    reviews: 189,
    price: "$60-100/hr",
    location: "Metro Area",
    availability: "Available Today",
    verified: true,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    specialties: ["Wiring", "Panel Upgrade", "Safety"],
  },
  {
    id: 4,
    name: "ColorPro Painting",
    category: "painting",
    rating: 4.7,
    reviews: 145,
    price: "$40-70/hr",
    location: "City Wide",
    availability: "Schedule Ahead",
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    specialties: ["Interior", "Exterior", "Commercial"],
  },
  {
    id: 5,
    name: "BugBusters Pro",
    category: "pest",
    rating: 4.8,
    reviews: 98,
    price: "$100-200/visit",
    location: "All Areas",
    availability: "Same Day",
    verified: true,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    specialties: ["Termites", "Rodents", "Insects"],
  },
  {
    id: 6,
    name: "CoolAir HVAC",
    category: "hvac",
    rating: 4.9,
    reviews: 267,
    price: "$70-120/hr",
    location: "Metro Area",
    availability: "Available Today",
    verified: true,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    specialties: ["AC Repair", "Heating", "Installation"],
  },
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProviders = providers.filter((provider) => {
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Find <span className="gradient-text">Expert Services</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our verified professionals and book the perfect service for your home
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background/50">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search services or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                className="gap-2 sm:w-auto w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Providers Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProviders.length}</span> providers found
            </p>
            <Button variant="ghost" size="sm" className="gap-2">
              Sort by: <span className="font-medium">Top Rated</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                          {provider.name}
                        </h3>
                        {provider.verified && (
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium text-foreground">{provider.rating}</span>
                        </div>
                        <span>({provider.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-6 pb-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-accent font-medium">{provider.availability}</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between bg-muted/20">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <p className="font-semibold text-lg text-accent">{provider.price}</p>
                  </div>
                  <Button variant="hero" size="sm">
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProviders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No providers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
