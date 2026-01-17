import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  MessageSquare,
  Briefcase,
  Star,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

const opportunities = [
  {
    id: 1,
    title: "Carpentry Work Needed",
    postedBy: "John's Painting Co.",
    postedByImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    category: "Carpentry",
    description: "Looking for a skilled carpenter to help with prep work for a large painting project. Need door and window frame repairs.",
    budget: "$500 - $800",
    location: "Brooklyn, NY",
    deadline: "Jan 20, 2024",
    applicants: 4,
    rating: 4.8,
    verified: true,
    urgent: true,
  },
  {
    id: 2,
    title: "Electrical Setup for Renovation",
    postedBy: "Elite Renovations",
    postedByImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    category: "Electrical",
    description: "Major kitchen renovation project. Need licensed electrician for complete rewiring and fixture installation.",
    budget: "$1,200 - $1,500",
    location: "Manhattan, NY",
    deadline: "Jan 25, 2024",
    applicants: 7,
    rating: 4.9,
    verified: true,
    urgent: false,
  },
  {
    id: 3,
    title: "Plumbing Installation",
    postedBy: "Green Home Services",
    postedByImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    category: "Plumbing",
    description: "Bathroom renovation requires new plumbing installation. Experience with modern fixtures preferred.",
    budget: "$600 - $900",
    location: "Queens, NY",
    deadline: "Jan 22, 2024",
    applicants: 3,
    rating: 4.7,
    verified: true,
    urgent: false,
  },
  {
    id: 4,
    title: "HVAC Ductwork",
    postedBy: "Complete Remodeling",
    postedByImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    category: "HVAC",
    description: "New construction project needs HVAC ductwork installation. Must have commercial experience.",
    budget: "$2,000 - $3,000",
    location: "Bronx, NY",
    deadline: "Feb 1, 2024",
    applicants: 2,
    rating: 4.6,
    verified: true,
    urgent: false,
  },
];

const categories = ["All", "Electrical", "Plumbing", "Carpentry", "HVAC", "Painting", "Flooring"];

const CollabHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              ✨ Provider-to-Provider Collaboration
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              The <span className="gradient-text-teal">Collab Hub</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with fellow professionals, find sub-contract opportunities, and grow your network
            </p>
          </motion.div>

          {/* Search & Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex-1 glass-card rounded-2xl p-2 flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground ml-3" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-2"
              />
            </div>
            <Button
              variant="hero"
              size="lg"
              className="gap-2"
              onClick={() => setShowPostModal(true)}
            >
              <Plus className="w-5 h-5" />
              Post Opportunity
            </Button>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="text-sm font-medium">{category}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Opportunities List */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredOpportunities.length}</span> opportunities
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">Live updates</span>
            </div>
          </div>

          <motion.div layout className="space-y-4">
            {filteredOpportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={opp.postedByImage}
                      alt={opp.postedBy}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                          {opp.title}
                        </h3>
                        {opp.urgent && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">
                            Urgent
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{opp.postedBy}</span>
                        {opp.verified && (
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {opp.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    {opp.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {opp.description}
                </p>

                {/* Details */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-medium text-foreground">{opp.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Due: {opp.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{opp.applicants} applicants</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                  </Button>
                  <Button variant="hero" size="sm" className="gap-2">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredOpportunities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or post a new opportunity
              </p>
              <Button variant="hero" onClick={() => setShowPostModal(true)}>
                Post Opportunity
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Post Modal */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold">Post Opportunity</h2>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Carpentry Work Needed"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Select category</option>
                    {categories.filter(c => c !== "All").map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the work needed..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <input
                      type="text"
                      placeholder="$500 - $800"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="e.g., Brooklyn, NY"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Post Opportunity
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CollabHub;
