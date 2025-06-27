import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon, BookOpenIcon, UtensilsIcon, HomeIcon, HandHelpingIcon, AlertTriangleIcon, Star, Phone } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Girivalam Helper</h1>
              <p className="text-sm text-gray-600">Tiruvannamalai Pilgrimage Guide</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-orange-300 text-orange-700 hover:bg-orange-50 font-semibold"
          >
            தமிழ் | English
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Star className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Sacred Journey<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Awaits You
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            Navigate the holy 14 KM Girivalam path around sacred Arunachala Mountain 
            with GPS guidance, find accommodation, food, and complete spiritual support.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              🕉 Begin Sacred Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-10 py-4 text-xl font-semibold"
            >
              📖 Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">14 KM</div>
              <div className="text-gray-600 font-medium">Sacred Path</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">8</div>
              <div className="text-gray-600 font-medium">Holy Checkpoints</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600 font-medium">Hotels & Stays</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete Pilgrimage Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a meaningful and safe Girivalam journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapIcon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800">GPS Navigation</CardTitle>
                <CardDescription className="text-gray-600">14 KM Sacred Route</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  Real-time GPS guidance with audio checkpoints in Tamil and English. 
                  Never lose your way on the sacred Girivalam path.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <HomeIcon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800">Accommodation</CardTitle>
                <CardDescription className="text-gray-600">Hotels & Dharamshalas</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  Book from free dharamshalas to luxury hotels. Filter by price, 
                  distance, and amenities near the temple.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <UtensilsIcon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800">Annadhanam</CardTitle>
                <CardDescription className="text-gray-600">Free Sacred Meals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  Locate blessed free meals (Annadhanam) and restaurants 
                  with ratings, timings, and walking distances.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpenIcon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800">Audio Guide</CardTitle>
                <CardDescription className="text-gray-600">Spiritual Stories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  Listen to temple legends, spiritual stories, and devotional 
                  content in Tamil and English as you walk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <HandHelpingIcon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800">Donations</CardTitle>
                <CardDescription className="text-gray-600">Support Temple</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  Support temple maintenance, sponsor free meals, and 
                  contribute to pilgrim services with secure UPI payments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <AlertTriangleIcon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl text-orange-800">Emergency SOS</CardTitle>
                <CardDescription className="text-gray-600">24/7 Safety</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-center leading-relaxed">
                  Quick access to police, medical services, temple security, 
                  and tourist helpline with location sharing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-12">
            Trusted by Thousands of Pilgrims
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <p className="text-lg mb-4 italic">
                "This app made my first Girivalam so peaceful. The GPS never failed, 
                and finding free food was so easy!"
              </p>
              <div className="font-semibold">- Priya from Chennai</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <p className="text-lg mb-4 italic">
                "The audio stories enhanced my spiritual experience. 
                Perfect companion for the sacred journey."
              </p>
              <div className="font-semibold">- Raj from Bangalore</div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/api/login'}
            className="bg-white text-orange-600 hover:bg-orange-50 px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
          >
            🙏 Start Your Sacred Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Girivalam Helper</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted companion for the sacred Tiruvannamalai pilgrimage. 
                Built with devotion for spiritual seekers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Temple Timings</li>
                <li>Girivalam Route</li>
                <li>Emergency Contacts</li>
                <li>Donation Options</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  📧 support@girivalamhelper.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +91 4175 234567
                </li>
                <li>🕐 24/7 Emergency Helpline</li>
                <li>🏛️ Temple Information Center</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Tiruvannamalai Girivalam Helper. Built with 🙏 for pilgrims worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
