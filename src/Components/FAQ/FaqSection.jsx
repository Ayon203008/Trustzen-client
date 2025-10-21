import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Shield, Zap } from 'lucide-react';

const faqData = [
  {
    id: 1,
    category: 'General',
    icon: MessageSquare,
    questions: [
      {
        q: 'What makes your review platform different from others?',
        a: 'We prioritize **verified authenticity** by integrating advanced AI to detect fraudulent activity and requiring proof of purchase for certain reviews. We also focus on **direct, constructive engagement** between consumers and businesses.',
      },
      {
        q: 'Is it free to use your service?',
        a: 'Yes, reading and writing reviews is **completely free**. Premium subscriptions are available for businesses to access **advanced analytics**.',
      },
      {
        q: 'How are the star ratings calculated?',
        a: 'Our star ratings are a **simple average** of all legitimate reviews. The calculation updates instantly for accuracy.',
      },
    ],
  },
  {
    id: 2,
    category: 'Trust & Safety',
    icon: Shield,
    questions: [
      {
        q: 'How do you prevent fake reviews?',
        a: 'We use **machine learning** to analyze patterns and IP data, combined with human moderation to investigate flagged reviews.',
      },
      {
        q: 'Can a business remove a negative review?',
        a: 'No. Businesses **cannot remove reviews** unless they violate our community guidelines. They can respond publicly to any review.',
      },
      {
        q: 'How to report a review?',
        a: 'Click the "Report" flag next to the review. Our team usually reviews within **24–48 hours** and takes action if needed.',
      },
    ],
  },
];

const AccordionItem = ({ question, answer, isOpen, toggle }) => (
  // ১. অ্যাকর্ডিয়ন আইটেম বর্ডার: ডার্ক মোডে গাঢ় ধূসর বর্ডার
  <div className="border-b border-gray-200 dark:border-gray-700">
    <button
      onClick={toggle}
      // ২. প্রশ্ন টেক্সট কালার: ডার্ক মোডে সাদা, হোভারে বেগুনি
      className="flex justify-between items-center w-full p-5 text-left font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300 
        dark:text-gray-100 dark:hover:text-purple-400"
      aria-expanded={isOpen}
    >
      <span>{question}</span>
      <ChevronDown
        // ৩. আইকন কালার: ডার্ক মোডে বেগুনি (Purple)
        className={`w-6 h-6 text-purple-600 dark:text-purple-400 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 p-0'
      }`}
    >
      <p
        // ৪. উত্তর টেক্সট কালার: ডার্ক মোডে হালকা ধূসর
        className="text-gray-600 text-sm leading-relaxed pl-1 
          dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: answer }}
      ></p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => setOpenId(openId === id ? null : id);

  return (
    // ৫. সেকশন ব্যাকগ্রাউন্ড: হালকা ধূসর থেকে গাঢ় ধূসর
    <section className="py-20 bg-gray-50 relative 
      dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          {/* ৬. ট্যাগলাইন কালার */}
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2 
            dark:text-emerald-400">
            Need Answers?
          </p>
          {/* ৭. হেডিং কালার */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 
            dark:text-white">
            Frequently Asked Questions
          </h2>
          {/* ৮. সাব-হেডিং কালার */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto 
            dark:text-gray-400">
            Find quick answers to common questions about our platform, security,
            and review process.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {faqData.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-4">
                {/* ৯. ক্যাটেগরি আইকন কালার */}
                <category.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                {/* ১০. ক্যাটেগরি টাইটেল কালার */}
                <h3 className="text-2xl font-bold text-gray-800 
                  dark:text-gray-100">
                  {category.category}
                </h3>
              </div>

              {/* Accordion */}
              {/* ১১. অ্যাকর্ডিয়ন কন্টেইনার স্টাইল: সাদা ব্যাকগ্রাউন্ড থেকে গাঢ় ব্যাকগ্রাউন্ড */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 divide-y divide-gray-100 
                dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
                {category.questions.map((item, idx) => {
                  const itemId = `${category.id}-${idx}`;
                  return (
                    <AccordionItem
                      key={itemId}
                      question={item.q}
                      answer={item.a}
                      isOpen={openId === itemId}
                      toggle={() => toggleItem(itemId)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          {/* ১২. CTA টেক্সট কালার */}
          <p className="text-xl font-semibold text-gray-800 mb-4 
            dark:text-gray-200">
            Still can't find the answer?
          </p>
          {/* CTA বাটন (গ্রেডিয়েন্ট অপরিবর্তিত রাখা হয়েছে) */}
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
          >
            Contact Our Support Team
            <Zap className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;