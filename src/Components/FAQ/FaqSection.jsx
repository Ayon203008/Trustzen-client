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
  <div className="border-b border-gray-200">
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full p-5 text-left font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300"
      aria-expanded={isOpen}
    >
      <span>{question}</span>
      <ChevronDown
        className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${
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
        className="text-gray-600 text-sm leading-relaxed pl-1"
        dangerouslySetInnerHTML={{ __html: answer }}
      ></p>
    </div>
  </div>
);

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleItem = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">
            Need Answers?
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                <category.icon className="w-6 h-6 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-800">
                  {category.category}
                </h3>
              </div>

              {/* Accordion */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 divide-y divide-gray-100">
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
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Still can't find the answer?
          </p>
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
