import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron via-warm-orange to-deep-red text-white">
      <div className="cultural-pattern absolute inset-0"></div>
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Tiruvannamalai</h1>
          <h2 className="text-2xl font-semibold mb-1">Girivalam Helper</h2>
          <p className="text-lg opacity-90">திருவண்ணாமலை கிரிவலம்</p>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Spiritual Journey Companion</h3>
            <p className="text-base opacity-90 leading-relaxed mb-6">
              Navigate the sacred Girivalam path, discover Annadhanam locations, 
              book accommodations, and enhance your pilgrimage experience with 
              spiritual audio guides in Tamil and English.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className="bg-white bg-opacity-20 border-0">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9L14 14.74L15.18 22L12 18.27L8.82 22L10 14.74L2 9L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">14 KM Route</p>
                <p className="text-xs opacity-80">GPS Navigation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white bg-opacity-20 border-0">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Hotel Booking</p>
                <p className="text-xs opacity-80">Dharamshala & Hotels</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white bg-opacity-20 border-0">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97L6.5 22h3l-.25-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5l1.5 6h2l-1.5-6H22V6h-6z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Free Annadhanam</p>
                <p className="text-xs opacity-80">Food Locations</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white bg-opacity-20 border-0">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1l3.5 5L22 7.5 19 10.5l.5 6.5L12 14l-7.5 3 .5-6.5L2 7.5 8.5 6z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Audio Guide</p>
                <p className="text-xs opacity-80">Tamil & English</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Login Button */}
        <div className="p-6">
          <Button 
            onClick={() => window.location.href = '/api/login'}
            className="w-full bg-white text-saffron hover:bg-gray-100 font-semibold py-3 text-lg"
            size="lg"
          >
            Begin Sacred Journey
          </Button>
          <p className="text-center text-sm opacity-80 mt-4">
            Sign in to access all features and personalize your pilgrimage experience
          </p>
        </div>
      </div>
    </div>
  );
}
