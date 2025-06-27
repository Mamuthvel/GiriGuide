import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GirivalamCheckpoint } from "@shared/schema";

export default function GirivalamMap() {
  const [isNavigationActive, setIsNavigationActive] = useState(false);

  const { data: checkpoints, isLoading } = useQuery<GirivalamCheckpoint[]>({
    queryKey: ['/api/girivalam/checkpoints'],
  });

  const handleStartNavigation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsNavigationActive(true);
          // In a real app, this would start GPS navigation
          console.log('Starting navigation from:', position.coords);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Please enable location services to start navigation.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="px-4 mb-6">
      <Card className="overflow-hidden">
        <CardHeader className="p-4 bg-saffron text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Girivalam Route</h3>
            <Button
              onClick={handleStartNavigation}
              className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-md"
              disabled={isNavigationActive}
            >
              {isNavigationActive ? 'GPS Active' : 'Start GPS'}
            </Button>
          </div>
          <div className="flex items-center space-x-4 mt-2 text-sm">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5z"/>
              </svg>
              14.2 KM
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              4h 30m
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
              Walking
            </span>
          </div>
        </CardHeader>

        {/* Map Placeholder */}
        <div className="h-64 bg-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="bg-white shadow-lg max-w-xs">
              <CardContent className="p-3 text-center">
                <svg className="w-6 h-6 text-red-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <p className="text-sm font-medium">Current Location</p>
                <p className="text-xs text-gray-600">Arunachaleswarar Temple</p>
                {isNavigationActive && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    🟢 GPS Navigation Active
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Checkpoints */}
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Key Checkpoints</h4>
            <span className="text-xs text-gray-500">
              {checkpoints?.length || 8} temples
            </span>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {checkpoints?.slice(0, 3).map((checkpoint, index) => (
              <div key={checkpoint.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                  {checkpoint.orderIndex}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{checkpoint.name}</p>
                  <p className="text-xs text-gray-600">
                    {checkpoint.tamilName} • {checkpoint.distanceFromStart} KM
                  </p>
                </div>
                {checkpoint.audioGuideUrl && (
                  <button className="text-saffron hover:text-warm-orange">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                    </svg>
                  </button>
                )}
              </div>
            )) || (
              // Default checkpoints if no data
              <>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium text-sm">Arunachaleswarar Temple</p>
                    <p className="text-xs text-gray-600">Starting point • 0 KM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium text-sm">Indra Lingam</p>
                    <p className="text-xs text-gray-600">East Gate • 3.5 KM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium text-sm">Agni Lingam</p>
                    <p className="text-xs text-gray-600">Southeast • 7 KM</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
