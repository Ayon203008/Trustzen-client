import React from "react";
import HeroSection from "../Banner/Banner";
import PremiumServices from "../PremiumServices/PremiumServices";
import AboutReviewPlatform from "../About/About";
import ReviewsSection from "../Reviews/ReviewSection";
import FAQSection from "../FAQ/FaqSection";
import PartnersSection from "../Partners/PartnersSection";
import AdvancedStats from "../Stats/AdvancedStats";
import { ThemeProvider } from "../../Context/ThemeContext";

const Home = () => {
  return (
    <div>
        <HeroSection></HeroSection>
        <PremiumServices></PremiumServices>
        <AboutReviewPlatform></AboutReviewPlatform>

        <ReviewsSection></ReviewsSection>
        <AdvancedStats></AdvancedStats>
        <FAQSection></FAQSection>
        <PartnersSection></PartnersSection>
     
    </div>
  );
};

export default Home;
