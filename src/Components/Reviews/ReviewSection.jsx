"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Samantha Lee",
    title: "Product Designer, Figma",
    review:
      "This platform completely changed how we collect and showcase feedback. The design transparency tools are next-level.",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    id: 2,
    name: "Alex Turner",
    title: "Software Engineer, Spotify",
    review:
      "The review verification system ensures authentic voices. Our credibility skyrocketed since integrating it.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    id: 3,
    name: "Emily Davis",
    title: "Marketing Lead, Notion",
    review:
      "I love the visual appeal and trust this brings to our community. Clean, transparent, and powerful.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "Ryan Brooks",
    title: "UX Researcher, Google",
    review:
      "The analytics dashboard gave us the deepest understanding of customer sentiment we’ve ever had.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const ReviewsSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-teal-50 overflow-hidden">
      {/* Animated gradient background blob */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-teal-300 via-blue-400 to-indigo-500 opacity-20 blur-[120px] rounded-full"></div>
      </div>

      <div className="mx-auto w-11/12 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-teal-600 font-semibold tracking-widest uppercase text-sm"
          >
            What Our Users Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4"
          >
            Trusted by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-700">
              Thousands Worldwide
            </span>
          </motion.h2>
          <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg">
            Real people. Real impact. See how we’ve helped teams around the globe
            improve trust and engagement.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 relative">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative group bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg hover:shadow-2xl 
              transition-all duration-500 p-8 hover:-translate-y-2 hover:scale-[1.02]"
            >
              {/* Floating quote icon */}
              <Quote className="absolute top-5 right-5 text-teal-500/30 w-10 h-10" />

              {/* Avatar */}
              <motion.img
                src={r.image}
                alt={r.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-teal-500 shadow-md mb-5"
                whileHover={{ rotate: 5, scale: 1.1 }}
              />

              {/* Review */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{r.review}"
              </p>

              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-current mr-1"
                  />
                ))}
              </div>

              {/* Name & Title */}
              <div>
                <p className="font-bold text-gray-900 text-lg">{r.name}</p>
                <p className="text-sm text-gray-500">{r.title}</p>
              </div>

              {/* Glowing border animation */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 -z-10"
                layoutId="glow"
              ></motion.div>
            </motion.div>
          ))}
        </div>

        {/* Floating accent orbs */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute -bottom-10 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-[100px]"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute top-0 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-[120px]"
        ></motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
