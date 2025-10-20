import React from 'react';
import HeroSection from '../Banner/Banner';
import PremiumServices from '../PremiumServices/PremiumServices';
import AboutReviewPlatform from '../About/About';
import ReviewsSection from '../Reviews/ReviewSection';
import FAQSection from '../FAQ/FaqSection';
import PartnersSection from '../Partners/PartnersSection';
import WhyChooseUsSection from '../WhyChooseUS/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <PremiumServices></PremiumServices>
            <AboutReviewPlatform></AboutReviewPlatform>
           
            <ReviewsSection></ReviewsSection>
            <FAQSection></FAQSection>
            <PartnersSection></PartnersSection>
        </div>
    );
};

export default Home;