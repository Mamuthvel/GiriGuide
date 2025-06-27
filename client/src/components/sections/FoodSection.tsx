import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FoodPlace } from "@shared/schema";

export default function FoodSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'annadhanam' | 'restaurant'>('all');

  const { data: foodPlaces, isLoading } = useQuery<FoodPlace[]>({
    queryKey: ['/api/food-places', activeTab === 'all' ? undefined : activeTab],
  });

  const freeFood = foodPlaces?.filter(place => place.isFree) || [];
  const paidFood = foodPlaces?.filter(place => !place.isFree) || [];

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Food & Annadhanam</h3>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={activeTab === 'annadhanam' ? 'default' : 'outline'}
            onClick={() => setActiveTab('annadhanam')}
            className={activeTab === 'annadhanam' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            Free
          </Button>
          <Button
            size="sm"
            variant={activeTab === 'restaurant' ? 'default' : 'outline'}
            onClick={() => setActiveTab('restaurant')}
            className="text-xs"
          >
            Paid
          </Button>
        </div>
      </div>

      {/* Free Annadhanam Section */}
      {(activeTab === 'all' || activeTab === 'annadhanam') && (
        <div className="mb-6">
          <h4 className="font-semibold text-green-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Free Annadhanam
          </h4>
          <div className="space-y-3">
            {freeFood.length > 0 ? (
              freeFood.map((place) => (
                <Card key={place.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">{place.name}</h5>
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-md">
                        {place.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        </svg>
                        {place.openTime} - {place.closeTime}
                      </span>
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
                        </svg>
                        {place.walkingDistance} min walk
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Default free food places
              <>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">Sri Ramanashram</h5>
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-md">Open Now</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Traditional South Indian meals</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/>
                        </svg>
                        11:30 AM - 2:30 PM
                      </span>
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
                        </svg>
                        5 min walk
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900">Seshadri Ashram</h5>
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-md">6:00 PM</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Evening prasadam & dinner</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/>
                        </svg>
                        6:00 PM - 8:00 PM
                      </span>
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
                        </svg>
                        8 min walk
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      )}

      {/* Paid Food Section */}
      {(activeTab === 'all' || activeTab === 'restaurant') && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
            Food Stalls & Restaurants
          </h4>
          <div className="space-y-3">
            {paidFood.length > 0 ? (
              paidFood.map((place) => (
                <Card key={place.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-gray-900">{place.name}</h5>
                        {place.rating && (
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < Math.floor(Number(place.rating)) ? 'text-yellow-400' : 'text-gray-300'
                                }`} 
                                fill="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                            <span className="text-xs text-gray-600 ml-1">{place.rating}</span>
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-saffron">{place.priceRange}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/>
                        </svg>
                        {place.openTime} - {place.closeTime}
                      </span>
                      <span className="text-gray-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
                        </svg>
                        {place.walkingDistance} min walk
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Default paid food place
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-semibold text-gray-900">Tamil Nadu Meals</h5>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className="w-3 h-3 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">4.8</span>
                      </div>
                    </div>
                    <span className="font-bold text-saffron">₹50-80</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Authentic vegetarian meals</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/>
                      </svg>
                      7:00 AM - 10:00 PM
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
                      </svg>
                      3 min walk
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
