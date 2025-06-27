import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Hotel } from "@shared/schema";

export default function HotelsSection() {
  const { toast } = useToast();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    totalAmount: 0,
  });

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', `/api/hotels/${selectedHotel!.id}/book`, data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed",
        description: `Your stay at ${selectedHotel?.name} has been booked successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings/hotels'] });
      setSelectedHotel(null);
      setBookingData({ checkInDate: '', checkOutDate: '', totalAmount: 0 });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBookNow = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleConfirmBooking = () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      toast({
        title: "Missing Information",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * selectedHotel!.pricePerNight;

    bookingMutation.mutate({
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
      totalAmount,
    });
  };

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Hotels & Stays</h3>
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        {hotels?.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0 8c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  </svg>
                  <p className="text-xs">{hotel.name}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                  <p className="text-xs text-gray-600">
                    {hotel.distanceFromTemple} km from temple
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-saffron">₹{hotel.pricePerNight}</p>
                  <p className="text-xs text-gray-500">per night</p>
                </div>
              </div>
              
              {hotel.rating && (
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < Math.floor(Number(hotel.rating)) ? 'text-yellow-400' : 'text-gray-300'
                        }`} 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                    <span className="text-xs text-gray-600 ml-1">
                      {hotel.rating} ({hotel.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              )}
              
              {hotel.amenities && (
                <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                  {hotel.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
              
              <Button
                onClick={() => handleBookNow(hotel)}
                className="w-full bg-saffron hover:bg-warm-orange text-white"
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        )) || (
          <div className="text-center py-8">
            <p className="text-gray-500">No hotels available at the moment.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Book {selectedHotel?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in Date
              </label>
              <Input
                type="date"
                value={bookingData.checkInDate}
                onChange={(e) => setBookingData(prev => ({ ...prev, checkInDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out Date
              </label>
              <Input
                type="date"
                value={bookingData.checkOutDate}
                onChange={(e) => setBookingData(prev => ({ ...prev, checkOutDate: e.target.value }))}
                min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            {bookingData.checkInDate && bookingData.checkOutDate && (
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-sm">
                  Total: ₹{Math.ceil((new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)) * selectedHotel!.pricePerNight}
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedHotel(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={bookingMutation.isPending}
                className="flex-1 bg-saffron hover:bg-warm-orange"
              >
                {bookingMutation.isPending ? 'Booking...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
