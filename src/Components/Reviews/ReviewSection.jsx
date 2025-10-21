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
    <section className="relative py-28 bg-gradient-to-b from-white to-teal-50 overflow-hidden 
      dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      
      {/* Animated gradient background blob */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-40 w-[700px] h-[700px] bg-gradient-to-tr from-teal-300 via-blue-400 to-indigo-500 opacity-20 blur-[120px] rounded-full 
          dark:from-teal-600/40 dark:via-blue-600/40 dark:to-indigo-600/40"></div>
      </div>

      <div className="mx-auto w-11/12 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-teal-600 font-semibold tracking-widest uppercase text-sm 
              dark:text-teal-400"
          >
            What Our Users Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mt-4 
              dark:text-white"
          >
            Trusted by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-700 
              dark:from-teal-400 dark:to-blue-500">
              Thousands Worldwide
            </span>
          </motion.h2>
          <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg 
            dark:text-gray-400">
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
              // এখানে hover:shadow-2xl, hover:-translate-y-2, hover:scale-[1.02] ক্লাসগুলো সরানো হয়েছে
              className="relative group bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg 
                transition-all duration-500 p-8 
                dark:bg-gray-800/80 dark:border-gray-700/50 dark:shadow-xl"
            >
              {/* Floating quote icon */}
              <Quote className="absolute top-5 right-5 text-teal-500/30 w-10 h-10 
                dark:text-teal-400/20" />

              {/* Avatar */}
              <motion.img
                src={r.image}
                alt={r.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-teal-500 shadow-md mb-5 
                  dark:border-teal-400"
                // এখানে whileHover={{ rotate: 5, scale: 1.1 }} সরানো যেতে পারে যদি আপনি ইমেজ হোভার অ্যানিমেশনও না চান
                // তবে আপনি শুধু কার্ডের হোভার না চাইলে এটি রাখতে পারেন।
              />

              {/* Review */}
              <p className="text-gray-700 italic mb-6 leading-relaxed 
                dark:text-gray-300">
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
                <p className="font-bold text-gray-900 text-lg 
                  dark:text-white">{r.name}</p>
                <p className="text-sm text-gray-500 
                  dark:text-gray-400">{r.title}</p>
              </div>

              {/* Glowing border animation */}
              {/* এই অংশটি `group-hover:opacity-100` এর মাধ্যমে নিয়ন্ত্রিত ছিল।
                  আপনি যদি এই গ্লোয়িং ইফেক্টটি সম্পূর্ণভাবে সরাতে চান, তাহলে এই `motion.div` টি সম্পূর্ণরূপে বাদ দিতে পারেন।
                  অথবা যদি এটি সবসময় স্থিরভাবে দেখাতে চান (হোভার ছাড়া), তাহলে `group-hover:opacity-100` এবং `opacity-0` সরিয়ে `opacity-100` রাখতে পারেন।
                  বর্তমানে এটি `group-hover:` ক্লাস দিয়ে নিয়ন্ত্রিত হওয়ায়, কার্ডের মূল হোভার ইফেক্টগুলো সরানোর ফলে এটিও ইনঅ্যাক্টিভ হয়ে যাবে।
                  যদি এই গ্লো সবসময় দেখানোর ইচ্ছা থাকে, তবে `opacity-0 group-hover:opacity-100` এর বদলে শুধু `opacity-100` ব্যবহার করতে পারেন।
              */}
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
          className="absolute -bottom-10 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-[100px] 
            dark:bg-teal-600/30"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute top-0 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-[120px] 
            dark:bg-blue-600/30"
        ></motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;