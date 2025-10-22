"use client";
import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaServicestack, FaStar, FaProjectDiagram } from "react-icons/fa";

const AdvancedStats = () => {
  const stats = [
    { 
      icon: <FaUsers />, 
      title: "Happy Clients", 
      value: 12500,
      suffix: "+",
      description: "Satisfied customers worldwide",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500"
    },
    { 
      icon: <FaServicestack />, 
      title: "Services", 
      value: 320,
      suffix: "+",
      description: "Professional services offered",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-500"
    },
    { 
      icon: <FaStar />, 
      title: "Reviews", 
      value: 4780,
      suffix: "+",
      description: "5-star rated reviews",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconColor: "text-amber-500"
    },
    { 
      icon: <FaProjectDiagram />, 
      title: "Projects", 
      value: 1560,
      suffix: "+",
      description: "Successful projects delivered",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      iconColor: "text-emerald-500"
    },
  ];

  return (
    <div className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Simple Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            Trusted by Thousands
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl  font-extrabold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Numbers
            </span>{" "}
            That Matter
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust our premium services
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className={`relative rounded-2xl ${stat.bgColor} p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${stat.bgColor} mb-6 group-hover:scale-105 transition-transform duration-300`}>
                    <div className={`text-2xl ${stat.iconColor}`}>
                      {stat.icon}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                        <CountUp 
                          end={stat.value} 
                          duration={2.5} 
                          separator="," 
                        />
                      </span>
                      {stat.suffix && (
                        <span className={`text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>

                  {/* Simple Progress Bar */}
                  <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trusted by industry leaders
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStats;