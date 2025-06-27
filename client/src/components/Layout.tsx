import { ReactNode, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import BottomNavigation from "./BottomNavigation";
import EmergencyModal from "./EmergencyModal";
import type { Section } from "@/pages/Home";

interface LayoutProps {
  children: ReactNode;
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function Layout({ children, currentSection, onSectionChange }: LayoutProps) {
  const { user } = useAuth();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [language, setLanguage] = useState<'tamil' | 'english'>('english');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tamil' ? 'english' : 'tamil');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40 border-b-2 border-saffron">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-saffron" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Girivalam Helper</h1>
              <p className="text-xs text-gray-600">
                {language === 'tamil' ? 'திருவண்ணாமலை' : 'Tiruvannamalai'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleLanguage}
              className="text-saffron text-xl hover:text-warm-orange transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
              </svg>
            </button>
            <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
              {user?.profileImageUrl ? (
                <img 
                  src={user.profileImageUrl} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentSection={currentSection} 
        onSectionChange={onSectionChange}
        onEmergency={() => setIsEmergencyModalOpen(true)}
      />

      {/* Emergency Modal */}
      <EmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}
