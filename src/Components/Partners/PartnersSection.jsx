import React from 'react';

// আপনার পার্টনারদের লোগো ডেটা।
// বাস্তব জীবনে, এই URL-গুলি আপনার কোম্পানির পার্টনারদের হাই-রেজোলিউশন লোগো হবে।
const partnerLogos = [
  { id: 1, name: 'Brand A', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+A' },
  { id: 2, name: 'Brand B', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+B' },
  { id: 3, name: 'Brand C', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+C' },
  { id: 4, name: 'Brand D', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+D' },
  { id: 5, name: 'Brand E', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+E' },
  { id: 6, name: 'Brand F', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+F' },
  { id: 7, name: 'Brand G', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+G' },
  { id: 8, name: 'Brand H', url: 'https://placehold.co/150x60/F0F0F0/000000?text=Brand+H' },
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6 lg:px-8">
        
        {/* সেকশনের শিরোনাম */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-2">
            Trusted by Industry Leaders
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Meet Our Esteemed Partners
          </h2>
          <p className="text-lg text-gray-600">
            These businesses use our platform to build transparency, gather genuine feedback, and connect directly with their customers.
          </p>
        </div>
        
        {/* পার্টনার লোগো গ্রিড */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {partnerLogos.map((partner) => (
            <div
              key={partner.id}
              className="group flex items-center justify-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 
              transform transition duration-500 ease-in-out hover:shadow-xl hover:bg-gray-50 hover:-translate-y-1"
            >
              <img
                src={partner.url}
                alt={`${partner.name} Logo`}
                // ডায়নামিক স্টাইল: প্রথমে ধূসর (grayscale) এবং হোভার করলে রঙ ফিরে আসে
                className="h-8 sm:h-10 w-auto object-contain transition duration-500 ease-in-out filter grayscale group-hover:filter-none"
              />
            </div>
          ))}
        </div>

        {/* ফুটার CTA */}
        <div className="mt-16 text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
                Want to join the network of trusted brands?
            </p>
            <a 
                href="/business-signup" 
                className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg 
                hover:bg-emerald-700 transition duration-300 transform hover:scale-[1.05]"
            >
                Get Started as a Partner
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </a>
        </div>
        
      </div>
    </section>
  );
};

export default PartnersSection;