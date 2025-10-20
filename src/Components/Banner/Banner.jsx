import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

// আপনার প্রদত্ত তিনটি ছবির URL
const IMAGE_URLS = [
  '../../../public/images/Code review-bro.png', // ছবি ১: কোড রিভিউ বা যাচাইকরণ বোঝাতে পারে
  '../../../public/images/Growth curve-bro.png', // ছবি ২: ব্যবসার বৃদ্ধি বোঝাতে পারে
  '../../../public/images/Verified-rafiki.png', // ছবি ৩: যাচাইকৃত/Verified বোঝাতে পারে
];
// NOTE: একটি স্ট্যান্ডার্ড React পরিবেশে এই আপেক্ষিক পাথগুলি (../../../) সরাসরি কাজ নাও করতে পারে।
// অ্যাসেট লোড করার জন্য হয় পাবলিক ফোল্ডার থেকে রুট পাথ ব্যবহার করুন অথবা ছবিগুলিকে ইমপোর্ট করুন।

// নতুন ডাইনামিক ইমেজ ডিসপ্লে কম্পোনেন্ট
const DynamicImageDisplay = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // প্রতি ৩ সেকেন্ডে ছবি পরিবর্তনের জন্য setInterval ব্যবহার করা হয়েছে
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % IMAGE_URLS.length);
    }, 3000); // 3000ms = 3 সেকেন্ড

    // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভাল পরিষ্কার করার জন্য
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden border-8 border-white transform rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-[1.05]">
      {/* ছবির মসৃণ ট্রানজিশনের জন্য map এবং opacity ব্যবহার করা হয়েছে */}
      {IMAGE_URLS.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Hero Image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover 
                      transition-opacity duration-1000 ease-in-out ${ // 1 সেকেন্ডের ফেড ট্রানজিশন
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
        />
      ))}
      
      {/* ছবির নিচে একটি ওভারলে যোগ করা হয়েছে যাতে এটি আরও প্রিমিয়াম দেখায় */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none"></div>

      {/* ছবির উপরে বর্তমানে প্রদর্শিত ইমেজ নম্বর দেখানোর জন্য (ঐচ্ছিক) */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        {IMAGE_URLS.map((_, index) => (
          <span
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              index === currentImageIndex ? 'bg-red-600' : 'bg-white/50'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};


const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 lg:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* বাম দিকের কন্টেন্ট: টেক্সট এবং ফর্ম */}
        <div className="lg:w-1/2 w-full text-center lg:text-left relative z-10">
            {/* ছোট বাটন */}
            <button className="inline-flex items-center justify-center rounded-full bg-slate-700 px-6 py-2 mb-4 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-slate-800">
                Verified Reviews from a Global Community
            </button>
          
            {/* প্রধান হেডিং */}
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Find Trustworthy <br/>
                <span className="text-blue-600">Businesses.</span> Share Your Voice.
            </h1>

            {/* সংক্ষিপ্ত বিবরণ */}
            <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                The most transparent platform to read genuine customer experiences and rate services worldwide. Make smarter choices today.
            </p>

            {/* সার্চ ফর্ম - একটি রিভিউ সাইটের জন্য উপযোগী, সহজে কোম্পানি সার্চ করার ব্যবস্থা */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-2xl border border-red-200 w-full max-w-xl mx-auto lg:mx-0">
                
                {/* সার্চ ইনপুট - কোম্পানি বা সার্ভিস খোঁজা */}
                <div className="relative w-full sm:w-2/3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for a company or service..."
                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                    />
                </div>
                
                {/* লোকেশন/রিভিউ বাটন */}
                <button
                    type="button"
                    className="w-full sm:w-1/3 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-150 shadow-red-500/50 shadow-lg"
                >
                    <MapPin className="w-5 h-5 mr-2 hidden sm:block" />
                    Find Reviews
                </button>
            </div>
        </div>

        {/* ডান দিকের ডাইনামিক ইমেজ সেকশন */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mt-10 lg:mt-0 relative z-10">
          <DynamicImageDisplay />
        </div>
      </div>
      
      {/* ছবির মতো ব্যাকগ্রাউন্ডের কোণা থেকে শুরু হওয়া ডিজাইন এলিমেন্ট (ঐচ্ছিক) */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-red-100 opacity-50 rounded-bl-[150px] hidden lg:block z-0"></div>
      
    </section>
  );
};

export default HeroSection;
