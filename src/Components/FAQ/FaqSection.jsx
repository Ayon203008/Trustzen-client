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
  <div className="border-b border-gray-200 dark:border-gray-700">
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full p-4 sm:p-5 text-left font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300 
        dark:text-gray-100 dark:hover:text-purple-400"
      aria-expanded={isOpen}
    >
      <span className="text-sm sm:text-base">{question}</span>
      <ChevronDown
        className={`w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400 transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 p-4 sm:p-5 pt-0' : 'max-h-0 opacity-0 p-0'
      }`}
    >
      <p
        className="text-gray-600 text-sm sm:text-base leading-relaxed pl-1 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: answer }}
      ></p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2 dark:text-emerald-400">
            Need Answers?
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight mb-4 sm:mb-5">
            <span className='mr-2 sm:mr-5'>Frequently</span>
            <span className='text-blue-600 mr-2 sm:mr-5'>Asked</span> Questions
          </h2>
          <p className="text-sm sm:text-lg text-gray-700 max-w-2xl mx-auto dark:text-gray-400">
            Find quick answers to common questions about our platform, security,
            and review process.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {faqData.map((category) => (
            <div key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                  <category.icon className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                  {category.category}
                </h3>
              </div>

              {/* Accordion */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 divide-y divide-gray-200/60 dark:bg-gray-800/90 dark:border-gray-700/60 dark:divide-gray-700/60">
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
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-200/50 dark:bg-gray-800/80 dark:border-gray-700/50">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">
              Still can't find the answer?
            </p>
            <p className="text-gray-600 mb-6 max-w-md mx-auto dark:text-gray-400">
              Our support team is here to help you with any additional questions you might have.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
            >
              Contact Our Support Team
              <Zap className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;