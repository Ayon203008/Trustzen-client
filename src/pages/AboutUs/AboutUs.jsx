import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Lucide icons
import { 
  Users, Search, Handshake, Target, PenTool, Shield, Rocket, Quote, 
  CheckCircle, Eye, Star, Globe, TrendingUp, Award, Heart, Zap,
  ArrowRight, ArrowLeft, Play, Pause,
  ChevronDown
} from "lucide-react";

// CountUp Component with improved animation
const AdvancedCountUp = ({ end, duration = 2, separator = ',', prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration * 60); // 60 FPS
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return (
    <span ref={ref}>
      {prefix}{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)}{suffix}
    </span>
  );
};

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 80, 
      damping: 15,
      duration: 0.8
    } 
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AboutUs = () => {
  // States
  const [startCount, setStartCount] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [tIndex, setTIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const statsRef = useRef(null);

  // Enhanced stats data
  const stats = [
    { 
      label: "Community Users", 
      end: 5300, 
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      description: "Active members"
    },
    { 
      label: "Verified Reviews", 
      end: 12500, 
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      description: "Authentic feedback"
    },
    { 
      label: "Integrated Services", 
      end: 200, 
      icon: Globe,
      color: "from-purple-500 to-pink-500",
      description: "Platforms connected"
    },
    { 
      label: "Fraud Cases Blocked", 
      end: 850, 
      icon: Shield,
      color: "from-orange-500 to-red-500",
      description: "Protected integrity"
    },
  ];

  // Enhanced FAQs
  const faqs = [
    { 
      q: "How does TrustZen verify reviews?", 
      a: "We use both automated AI detection and manual moderation to ensure reviews are authentic and unbiased, giving you confidence in every rating.",
      icon: Shield
    },
    { 
      q: "Can businesses influence their ratings?", 
      a: "No. Our algorithms prioritize genuine user input and we strictly penalize any attempts at artificial manipulation to maintain absolute integrity.",
      icon: Target
    },
    { 
      q: "Is TrustZen free to use?", 
      a: "Absolutely! All reviews, comparisons, and ratings are 100% free for our users. We believe in open and accessible transparency.",
      icon: Heart
    },
    { 
      q: "What devices does TrustZen support?", 
      a: "TrustZen is fully responsive and optimized for use on desktop, tablets, and mobile devices with native app experience.",
      icon: Zap
    },
  ];

  // Enhanced testimonials
  const testimonials = [
    { 
      name: "Rafi Ahmed", 
      role: "Tech Entrepreneur", 
      text: "TrustZen made my buying decisions easier. I love the clean and trustworthy experience. It's the future of consumer decisions.",
      rating: 5,
      avatar: "/images/avatars/avatar1.jpg"
    },
    { 
      name: "Mitu Rahman", 
      role: "Small Business Owner", 
      text: "Finally, a review platform that actually focuses on honesty and clarity. Impressive! The moderation is top-notch.",
      rating: 5,
      avatar: "/images/avatars/avatar2.jpg"
    },
    { 
      name: "Sakib Hasan", 
      role: "Marketing Specialist", 
      text: "The compare feature is brilliant — it saved me hours before choosing a service! Highly recommend this platform to everyone.",
      rating: 5,
      avatar: "/images/avatars/avatar3.jpg"
    },
  ];

  // Enhanced core values
  const coreValues = [
    { 
      icon: Handshake, 
      title: "Integrity", 
      description: "Unwavering commitment to honesty in all data and interactions.",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Search, 
      title: "Transparency", 
      description: "Openness about our methods, moderation, and data sources.",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: Target, 
      title: "Accuracy", 
      description: "Ensuring reviews reflect true user experiences and verified data.",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: Users, 
      title: "Community Focus", 
      description: "Building a platform that serves the needs of users, not just businesses.",
      gradient: "from-orange-500 to-red-500"
    },
  ];

  // Enhanced process steps
  const processSteps = [
    { 
      icon: PenTool, 
      title: "Submit Review", 
      description: "Users share their honest, detailed service experience with verification.",
      step: "01"
    },
    { 
      icon: Shield, 
      title: "AI & Manual Verification", 
      description: "Advanced screening for fraud with human oversight for authenticity.",
      step: "02"
    },
    { 
      icon: Rocket, 
      title: "Published & Rated", 
      description: "Validated review impacts the overall rating instantly and fairly.",
      step: "03"
    },
  ];

  // Enhanced carousel controls
  const nextTestimonial = () => {
    setTIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play testimonials
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  // Intersection Observer for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-200/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* --- Enhanced Header Section --- */}
        <motion.header
          variants={itemVariants}
          className="text-center pb-20 pt-12 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20"
          ></motion.div>
          
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 mb-8"
          >
            <Award className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Most Trusted Review Platform 2024
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6"
          >
            Building{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Digital Trust
            </span>{" "}
            Together
          </motion.h1>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Welcome to TrustZen — where every review is verified, every rating matters, 
            and transparency isn't just a feature, it's our foundation.
          </motion.p>
        </motion.header>

        {/* --- Enhanced Core Values Section --- */}
        <motion.section
          variants={containerVariants}
          className="mb-32 relative"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Core Principles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The foundation upon which we build trust and deliver exceptional value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Enhanced Team Section --- */}
        <motion.section 
          variants={itemVariants}
          className="mb-32"
        >
          <div className="bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.h3 
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Global Team of Innovators
                </motion.h3>
                <motion.p 
                  variants={fadeInUp}
                  className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                >
                  We're a diverse, dedicated group of engineers, data scientists, and community moderators 
                  committed to fighting review fraud globally. Our proprietary AI technology ensures every 
                  rating you see is genuine, allowing real user voices to be heard.
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4"
                >
                  {['AI Experts', 'Data Scientists', 'Community Managers', 'Security Specialists'].map((role, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </motion.div>
              </div>
              <motion.div 
                className="lg:w-1/2 w-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-lg opacity-20"></div>
                  <img 
                    src="/images/Team goals-bro.png" 
                    alt="Global Team Collaboration" 
                    className="relative w-full max-w-md h-auto rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* --- Enhanced Animated Stats --- */}
        <motion.section
          ref={statsRef}
          variants={containerVariants}
          className="mb-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 group-hover:shadow-xl transition-all duration-300"></div>
                <div className="relative p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {startCount && <AdvancedCountUp end={stat.end} duration={2.5} />}+
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Enhanced Process Section --- */}
        <motion.section 
          variants={containerVariants}
          className="mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Verification Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to ensure every review is authentic and trustworthy
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline */}
            <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Enhanced Testimonials Carousel --- */}
        <motion.section
          variants={containerVariants}
          className="mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See what our community members are saying about their experience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={tIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <Quote className="absolute top-6 left-6 text-blue-200 dark:text-blue-800 text-6xl opacity-50" />
                
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[tIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 text-center italic leading-relaxed mb-8">
                  "{testimonials[tIndex].text}"
                </p>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {testimonials[tIndex].name}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {testimonials[tIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                {autoPlay ? (
                  <Pause className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Play className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              <button
                onClick={nextTestimonial}
                className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === tIndex 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Enhanced FAQ Section --- */}
        <motion.section
          variants={containerVariants}
          className="mb-32"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Quick answers to common questions about TrustZen
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  className="border-b border-gray-200/50 dark:border-gray-700/50 last:border-b-0"
                >
                  <motion.button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="flex items-center justify-between w-full text-left p-6 sm:p-8 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <faq.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openFAQ === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                          <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Enhanced CTA Section --- */}
        <motion.section
          variants={itemVariants}
          className="text-center"
        >
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-12 sm:p-16 shadow-2xl overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <Handshake className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to Experience Trust?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who make smarter decisions with verified, 
                authentic reviews. Your journey to transparent decision-making starts here.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                Start Exploring Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AboutUs;