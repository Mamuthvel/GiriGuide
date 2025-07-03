import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  MapPinIcon, 
  NavigationIcon, 
  PlayIcon, 
  PauseIcon, 
  HomeIcon, 
  UtensilsIcon, 
  UserIcon,
  ClockIcon,
  RouteIcon,
  CompassIcon
} from "lucide-react";
import type { GirivalamCheckpoint } from "@shared/schema";

interface LocationData {
  lat: number;
  lng: number;
  timestamp: number;
}

interface POI {
  id: string;
  name: string;
  type: 'temple' | 'hotel' | 'restaurant' | 'guru';
  lat: number;
  lng: number;
  description: string;
  distance?: number;
  isOnRoute: boolean;
}

export default function GirivalamMap() {
  const [isNavigationActive, setIsNavigationActive] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [completedDistance, setCompletedDistance] = useState(0);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const watchIdRef = useRef<number | null>(null);

  const { data: checkpoints, isLoading } = useQuery<GirivalamCheckpoint[]>({
    queryKey: ['/api/girivalam/checkpoints'],
  });

  // Complete Girivalam route with detailed POI data
  const girivalamRoute: POI[] = [
    // Temples along the route
    { id: 't1', name: 'Arunachaleswarar Temple', type: 'temple', lat: 12.2253, lng: 79.0717, description: 'Main temple complex - Starting point', isOnRoute: true },
    { id: 't2', name: 'Indra Lingam', type: 'temple', lat: 12.2320, lng: 79.0850, description: 'East direction temple', isOnRoute: true },
    { id: 't3', name: 'Agni Lingam', type: 'temple', lat: 12.2180, lng: 79.0920, description: 'Southeast temple dedicated to fire', isOnRoute: true },
    { id: 't4', name: 'Yama Lingam', type: 'temple', lat: 12.2050, lng: 79.0850, description: 'South direction temple', isOnRoute: true },
    { id: 't5', name: 'Niruthi Lingam', type: 'temple', lat: 12.2000, lng: 79.0720, description: 'Southwest temple', isOnRoute: true },
    { id: 't6', name: 'Varuna Lingam', type: 'temple', lat: 12.2080, lng: 79.0600, description: 'West direction temple', isOnRoute: true },
    { id: 't7', name: 'Vayu Lingam', type: 'temple', lat: 12.2200, lng: 79.0550, description: 'Northwest wind temple', isOnRoute: true },
    { id: 't8', name: 'Kubera Lingam', type: 'temple', lat: 12.2350, lng: 79.0620, description: 'North direction temple', isOnRoute: true },

    // Hotels and accommodations
    { id: 'h1', name: 'Sri Ramanashramam', type: 'hotel', lat: 12.2180, lng: 79.0650, description: 'Free ashram accommodation', isOnRoute: false },
    { id: 'h2', name: 'Hotel Arunachala', type: 'hotel', lat: 12.2270, lng: 79.0730, description: 'Budget hotel near temple', isOnRoute: false },
    { id: 'h3', name: 'Seshadri Ashram', type: 'hotel', lat: 12.2300, lng: 79.0680, description: 'Spiritual retreat center', isOnRoute: false },
    { id: 'h4', name: 'Dharamshala Guest House', type: 'hotel', lat: 12.2200, lng: 79.0800, description: 'Free pilgrim accommodation', isOnRoute: false },

    // Restaurants and food places
    { id: 'r1', name: 'Annadhanam Hall', type: 'restaurant', lat: 12.2260, lng: 79.0720, description: 'Free temple meals', isOnRoute: false },
    { id: 'r2', name: 'Saravana Bhavan', type: 'restaurant', lat: 12.2240, lng: 79.0740, description: 'South Indian vegetarian', isOnRoute: false },
    { id: 'r3', name: 'Temple Food Court', type: 'restaurant', lat: 12.2250, lng: 79.0710, description: 'Variety of vegetarian food', isOnRoute: false },
    { id: 'r4', name: 'Prasadam Counter', type: 'restaurant', lat: 12.2280, lng: 79.0750, description: 'Temple blessed food', isOnRoute: false },

    // Gurus and spiritual teachers
    { id: 'g1', name: 'Ramana Maharshi Cave', type: 'guru', lat: 12.2150, lng: 79.0680, description: 'Sacred meditation cave', isOnRoute: false },
    { id: 'g2', name: 'Seshadri Swamigal Samadhi', type: 'guru', lat: 12.2290, lng: 79.0690, description: 'Saint meditation spot', isOnRoute: false },
    { id: 'g3', name: 'Yogi Ramsuratkumar Ashram', type: 'guru', lat: 12.2320, lng: 79.0670, description: 'Modern sage ashram', isOnRoute: false },
  ];

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Update POI distances from current location
  const updatePOIDistances = (location: LocationData) => {
    return girivalamRoute.map(poi => ({
      ...poi,
      distance: calculateDistance(location.lat, location.lng, poi.lat, poi.lng)
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
  };

  // Calculate progress along the route
  const calculateRouteProgress = (location: LocationData) => {
    const templeRoute = girivalamRoute.filter(poi => poi.type === 'temple' && poi.isOnRoute);
    let minDistance = Infinity;
    let nearestCheckpoint = 0;

    templeRoute.forEach((temple, index) => {
      const distance = calculateDistance(location.lat, location.lng, temple.lat, temple.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCheckpoint = index;
      }
    });

    const totalRouteLength = 14.2; // Total Girivalam distance in KM
    const progress = (nearestCheckpoint / (templeRoute.length - 1)) * totalRouteLength;
    
    setCompletedDistance(progress);
    setCurrentCheckpoint(nearestCheckpoint);
    setTotalDistance(totalRouteLength);
  };

  const handleStartNavigation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: LocationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now()
        };
        setCurrentLocation(location);
        calculateRouteProgress(location);
        setIsNavigationActive(true);

        // Start continuous tracking
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const newLocation: LocationData = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now()
            };
            setCurrentLocation(newLocation);
            calculateRouteProgress(newLocation);
          },
          (error) => {
            console.error('GPS tracking error:', error);
          },
          options
        );
      },
      (error) => {
        console.error('Error getting initial location:', error);
        alert('Please enable location services to start navigation.');
      },
      options
    );
  };

  const handleStopNavigation = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsNavigationActive(false);
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temple': return '🛕';
      case 'hotel': return <HomeIcon className="w-4 h-4" />;
      case 'restaurant': return <UtensilsIcon className="w-4 h-4" />;
      case 'guru': return <UserIcon className="w-4 h-4" />;
      default: return <MapPinIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'temple': return 'bg-orange-500';
      case 'hotel': return 'bg-blue-500';
      case 'restaurant': return 'bg-green-500';
      case 'guru': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const progressPercentage = totalDistance > 0 ? (completedDistance / totalDistance) * 100 : 0;
  const remainingDistance = totalDistance - completedDistance;

  if (isLoading) {
    return (
      <section className="px-4 pb-20">
        <Card className="animate-pulse">
          <CardContent className="p-4">
            <div className="h-80 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="px-4 pb-20">
      <Card className="overflow-hidden">
        {/* Header with Navigation Controls */}
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <CompassIcon className="w-5 h-5" />
                Girivalam Route Map
              </CardTitle>
              <p className="text-sm opacity-90">Real-time GPS navigation around sacred Arunachala</p>
            </div>
            <Button
              onClick={isNavigationActive ? handleStopNavigation : handleStartNavigation}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-white border"
              size="sm"
            >
              {isNavigationActive ? (
                <>
                  <PauseIcon className="w-4 h-4 mr-2" />
                  Stop GPS
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Start GPS
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        {/* Progress Tracking */}
        {isNavigationActive && currentLocation && (
          <div className="bg-orange-50 p-4 border-b">
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium">Journey Progress</span>
                <span className="text-orange-600 font-bold">
                  {completedDistance.toFixed(1)} / {totalDistance} KM
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-orange-600">{completedDistance.toFixed(1)} KM</div>
                <div className="text-xs text-gray-600">Completed</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-blue-600">{remainingDistance.toFixed(1)} KM</div>
                <div className="text-xs text-gray-600">Remaining</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-bold text-green-600">{currentCheckpoint + 1}/8</div>
                <div className="text-xs text-gray-600">Checkpoint</div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Map Display */}
        <div className="relative h-80 bg-gradient-to-br from-orange-100 to-red-100">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
          
          {/* Current Location Indicator */}
          {currentLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                  You are here
                </div>
              </div>
            </div>
          )}

          {/* Route Path Visualization */}
          <div className="absolute inset-4">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              <path
                d="M 200 150 Q 300 100 350 150 Q 350 200 300 250 Q 200 280 100 250 Q 50 200 50 150 Q 50 100 100 100 Q 150 80 200 150"
                stroke="#f97316"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,5"
                className="animate-pulse"
              />
              
              {/* Temple markers along route */}
              {[
                { x: 200, y: 150, name: "Start" },
                { x: 280, y: 120, name: "Indra" },
                { x: 320, y: 180, name: "Agni" },
                { x: 280, y: 240, name: "Yama" },
                { x: 200, y: 260, name: "Niruthi" },
                { x: 120, y: 240, name: "Varuna" },
                { x: 80, y: 180, name: "Vayu" },
                { x: 120, y: 120, name: "Kubera" }
              ].map((temple, index) => (
                <g key={index}>
                  <circle
                    cx={temple.x}
                    cy={temple.y}
                    r="6"
                    fill="#f97316"
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-8 transition-all"
                  />
                  <text
                    x={temple.x}
                    y={temple.y - 15}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700"
                  >
                    {temple.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-lg">
            <div className="text-xs font-medium mb-2">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Temples</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Your location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-orange-500"></div>
                <span>Route path</span>
              </div>
            </div>
          </div>
        </div>

        {/* POI Tabs */}
        <CardContent className="p-4">
          <Tabs defaultValue="temples" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="temples" className="flex items-center gap-1">
                🛕 Temples
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-1">
                <HomeIcon className="w-4 h-4" /> Hotels
              </TabsTrigger>
              <TabsTrigger value="food" className="flex items-center gap-1">
                <UtensilsIcon className="w-4 h-4" /> Food
              </TabsTrigger>
              <TabsTrigger value="gurus" className="flex items-center gap-1">
                <UserIcon className="w-4 h-4" /> Gurus
              </TabsTrigger>
            </TabsList>

            <TabsContent value="temples" className="mt-4">
              <div className="space-y-3">
                {girivalamRoute
                  .filter(poi => poi.type === 'temple')
                  .map((temple, index) => (
                    <Card key={temple.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getTypeColor('temple')}`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{temple.name}</p>
                            <p className="text-sm text-gray-600">{temple.description}</p>
                            {temple.distance && (
                              <p className="text-xs text-orange-600 font-medium">
                                📍 {temple.distance.toFixed(1)} km away
                              </p>
                            )}
                          </div>
                        </div>
                        {temple.isOnRoute && (
                          <Badge variant="secondary" className="text-xs">
                            On Route
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="hotels" className="mt-4">
              <div className="space-y-3">
                {girivalamRoute
                  .filter(poi => poi.type === 'hotel')
                  .map((hotel) => (
                    <Card key={hotel.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getTypeColor('hotel')}`}>
                          <HomeIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{hotel.name}</p>
                          <p className="text-sm text-gray-600">{hotel.description}</p>
                          {hotel.distance && (
                            <p className="text-xs text-blue-600 font-medium">
                              📍 {hotel.distance.toFixed(1)} km away
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="food" className="mt-4">
              <div className="space-y-3">
                {girivalamRoute
                  .filter(poi => poi.type === 'restaurant')
                  .map((restaurant) => (
                    <Card key={restaurant.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getTypeColor('restaurant')}`}>
                          <UtensilsIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{restaurant.name}</p>
                          <p className="text-sm text-gray-600">{restaurant.description}</p>
                          {restaurant.distance && (
                            <p className="text-xs text-green-600 font-medium">
                              📍 {restaurant.distance.toFixed(1)} km away
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="gurus" className="mt-4">
              <div className="space-y-3">
                {girivalamRoute
                  .filter(poi => poi.type === 'guru')
                  .map((guru) => (
                    <Card key={guru.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getTypeColor('guru')}`}>
                          <UserIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{guru.name}</p>
                          <p className="text-sm text-gray-600">{guru.description}</p>
                          {guru.distance && (
                            <p className="text-xs text-purple-600 font-medium">
                              📍 {guru.distance.toFixed(1)} km away
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Navigation Status */}
        {isNavigationActive && (
          <div className="bg-green-50 border-t p-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <NavigationIcon className="w-5 h-5 animate-pulse" />
              <span className="font-medium">GPS Navigation Active</span>
              <span className="text-sm">
                Last updated: {currentLocation ? new Date(currentLocation.timestamp).toLocaleTimeString() : 'Never'}
              </span>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}