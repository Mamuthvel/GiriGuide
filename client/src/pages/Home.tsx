import { useState } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import LiveTempleInfo from "@/components/sections/LiveTempleInfo";
import GirivalamMap from "@/components/sections/GirivalamMap";
import HotelsSection from "@/components/sections/HotelsSection";
import FoodSection from "@/components/sections/FoodSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import AudioGuideSection from "@/components/sections/AudioGuideSection";
import DonationSection from "@/components/sections/DonationSection";

export type Section = 'home' | 'map' | 'audio' | 'hotels' | 'food' | 'facilities' | 'donation';

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>('home');

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return (
          <>
            <HeroSection onStartGirivalam={() => setCurrentSection('map')} />
            <div className="px-4 py-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  className="bg-red-500 text-white p-4 rounded-xl shadow-lg flex flex-col items-center space-y-2 hover:bg-red-600 transition-colors"
                  onClick={() => {/* SOS functionality handled in Layout */}}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                  <span className="font-semibold">Emergency SOS</span>
                </button>
                <button 
                  className="bg-green-500 text-white p-4 rounded-xl shadow-lg flex flex-col items-center space-y-2 hover:bg-green-600 transition-colors"
                  onClick={() => setCurrentSection('map')}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="font-semibold">Start Girivalam</span>
                </button>
              </div>
            </div>
            <LiveTempleInfo />
            
            {/* Feature Grid */}
            <section className="px-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore Services</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow text-left"
                  onClick={() => setCurrentSection('map')}
                >
                  <div className="w-12 h-12 bg-saffron bg-opacity-20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-saffron" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Girivalam Route</h4>
                  <p className="text-xs text-gray-600">GPS navigation & audio guide</p>
                </button>

                <button 
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow text-left"
                  onClick={() => setCurrentSection('hotels')}
                >
                  <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8-4c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 4c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41v2h9v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Hotels & Stays</h4>
                  <p className="text-xs text-gray-600">Book dharamshala & hotels</p>
                </button>

                <button 
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow text-left"
                  onClick={() => setCurrentSection('food')}
                >
                  <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Food & Annadhanam</h4>
                  <p className="text-xs text-gray-600">Free meals & food stalls</p>
                </button>

                <button 
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow text-left"
                  onClick={() => setCurrentSection('facilities')}
                >
                  <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Facilities</h4>
                  <p className="text-xs text-gray-600">Toilets, water & lockers</p>
                </button>
              </div>
            </section>
          </>
        );
      case 'map':
        return <GirivalamMap />;
      case 'audio':
        return <AudioGuideSection />;
      case 'hotels':
        return <HotelsSection />;
      case 'food':
        return <FoodSection />;
      case 'facilities':
        return <FacilitiesSection />;
      case 'donation':
        return <DonationSection />;
      default:
        return null;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderContent()}
    </Layout>
  );
}
