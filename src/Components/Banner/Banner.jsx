import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react'; 

// ডানে দেখানো হেক্সাগোনাল গ্রাফিক্সের জন্য একটি ডামি কম্পোনেন্ট
const HexagonGraphic = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none aspect-[1.2] lg:aspect-auto">
      {/* মূল গ্রাফিক্স ডিজাইন - পজিশনিং এর জন্য টেইলউইন্ডের 'absolute' ব্যবহার করা হয়েছে */}
      
      {/* বাম-উপরের হেক্সাগন: লাল ওভারলে সহ */}
      <div className="absolute top-0 left-1/4 w-3/5 h-3/5 bg-gray-900 rounded-lg shadow-xl overflow-hidden transform rotate-6 scale-95" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
          <div className="absolute inset-0 bg-red-700 opacity-60 mix-blend-multiply"></div>
          {/* ইমেজ 1 (উদাহরণস্বরূপ, বাম দিকে অন্ধকারে কিছু একটা) */}
          <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1517457210348-1834240751e8?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
      </div>

      {/* ডান-উপরের হেক্সাগন: উজ্জ্বল হলুদ গাড়ি */}
      <div className="absolute top-1/4 right-0 w-3/5 h-3/5 bg-yellow-500 rounded-lg shadow-xl overflow-hidden transform rotate-3 scale-95" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
        {/* ইমেজ 2 (উদাহরণস্বরূপ, হলুদ স্পোর্টস কার) */}
        <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1549399580-cb03f6f96f7c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
      </div>

      {/* নিচের হেক্সাগন: সাদা-কালো থিম */}
      <div className="absolute bottom-0 left-1/3 w-3/5 h-3/5 bg-gray-200 rounded-lg shadow-xl overflow-hidden transform -rotate-6 scale-95" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
        {/* ইমেজ 3 (উদাহরণস্বরূপ, একজন মানুষ কাজ করছেন) */}
        <div className="w-full h-full bg-cover bg-center grayscale" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1499996489379-8d8a7065971a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
      </div>

      {/* হেক্সাগনগুলোকে যুক্তকারী লাইন (ছবিতে ছিল) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
            <div className="absolute top-[25%] left-[45%] w-1 h-[50%] bg-red-600 transform -translate-x-1/2 -rotate-12"></div>
            <div className="absolute top-[20%] right-[30%] w-1 h-[50%] bg-red-600 transform translate-x-1/2 rotate-12"></div>
            <div className="absolute bottom-[35%] right-[20%] w-1 h-[40%] bg-red-600 transform translate-x-1/2 rotate-90"></div>
        </div>
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
                Explore top-rated attractions
            </button>
          
            {/* প্রধান হেডিং */}
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Let us help you <br/>
                <span className="text-red-600">Find, Buy & Own</span> Dreams
            </h1>

            {/* সংক্ষিপ্ত বিবরণ */}
            <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                Country's most loved and trusted classified ad listing website. Browse thousands of items near you.
            </p>

            {/* সার্চ ফর্ম */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-full max-w-xl mx-auto lg:mx-0">
                
                {/* ক্যাটাগরি ড্রপডাউন */}
                <div className="relative w-full sm:w-1/3">
                    <select className="block w-full py-3 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none text-gray-700 cursor-pointer bg-white">
                        <option>Choose Category</option>
                        <option>Cars</option>
                        <option>Real Estate</option>
                        <option>Jobs</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                </div>
                
                {/* লোকেশন ইনপুট */}
                <div className="relative w-full sm:w-1/3">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Choose Location"
                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-700"
                    />
                </div>
                
                {/* সার্চ বাটন */}
                <button
                    type="button"
                    className="w-full sm:w-1/3 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition duration-150 shadow-red-500/50 shadow-md"
                >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                </button>
            </div>
        </div>

        {/* ডান দিকের গ্রাফিক্স সেকশন */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end mt-10 lg:mt-0 relative z-0">
          <HexagonGraphic />
        </div>
      </div>
      
      {/* ছবির মতো ব্যাকগ্রাউন্ডের কোণা থেকে শুরু হওয়া ডিজাইন এলিমেন্ট (ঐচ্ছিক) */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-white opacity-80 rounded-bl-[150px] hidden lg:block"></div>
      
    </section>
  );
};

export default HeroSection;