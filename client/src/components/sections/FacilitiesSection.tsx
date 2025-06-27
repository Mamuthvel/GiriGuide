import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Facility } from "@shared/schema";

export default function FacilitiesSection() {
  const { toast } = useToast();
  const [selectedLocker, setSelectedLocker] = useState<Facility | null>(null);
  const [bookingData, setBookingData] = useState({
    startTime: '',
    endTime: '',
    amount: 0,
  });

  const { data: facilities, isLoading } = useQuery<Facility[]>({
    queryKey: ['/api/facilities'],
  });

  const lockerBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', `/api/lockers/${selectedLocker!.id}/book`, data);
    },
    onSuccess: () => {
      toast({
        title: "Locker Booked",
        description: `Your locker has been reserved successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings/lockers'] });
      setSelectedLocker(null);
      setBookingData({ startTime: '', endTime: '', amount: 0 });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBookLocker = (locker: Facility) => {
    setSelectedLocker(locker);
  };

  const handleConfirmBooking = () => {
    if (!bookingData.startTime || !bookingData.endTime) {
      toast({
        title: "Missing Information",
        description: "Please select start and end times.",
        variant: "destructive",
      });
      return;
    }

    const startTime = new Date(bookingData.startTime);
    const endTime = new Date(bookingData.endTime);
    const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
    const amount = hours * (selectedLocker!.price || 20);

    lockerBookingMutation.mutate({
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      amount,
    });
  };

  const toilets = facilities?.filter(f => f.type === 'toilet') || [];
  const waterPoints = facilities?.filter(f => f.type === 'water') || [];
  const lockers = facilities?.filter(f => f.type === 'locker') || [];

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
      
      <div className="space-y-4">
        {/* Toilets Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              Toilets & Washrooms
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {toilets.length > 0 ? (
                toilets.map((toilet) => (
                  <div key={toilet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{toilet.name}</p>
                      <p className="text-xs text-gray-600">{toilet.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        toilet.isFree ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {toilet.isFree ? 'Free' : `₹${toilet.price}`}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {toilet.walkingDistance} min walk
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                // Default toilet facilities
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Temple Complex Toilets</p>
                      <p className="text-xs text-gray-600">Free • Clean • Well-maintained</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-md">Free</span>
                      <p className="text-xs text-gray-500 mt-1">2 min walk</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Girivalam Route Toilets</p>
                      <p className="text-xs text-gray-600">Pay & use • 24/7 available</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-md">₹5</span>
                      <p className="text-xs text-gray-500 mt-1">Multiple locations</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Water Points Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Water Points
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <svg className="w-6 h-6 text-blue-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 13c3.31 0 6 2.69 6 6H6v-6zM6 5c6.63 0 12 5.37 12 12h-2c0-5.52-4.48-10-10-10V5z"/>
                </svg>
                <p className="text-sm font-medium">Free Water</p>
                <p className="text-xs text-gray-600">Temple & ashrams</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <svg className="w-6 h-6 text-blue-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 18.08V19h.92l9.06-9.06-.92-.92L5 18.08zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                <p className="text-sm font-medium">Bottle Water</p>
                <p className="text-xs text-gray-600">₹10-20 shops</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lockers Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-semibold text-gray-900 flex items-center">
              <svg className="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Locker Services
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {lockers.length > 0 ? (
                lockers.map((locker) => (
                  <div key={locker.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{locker.name}</p>
                      <p className="text-xs text-gray-600">{locker.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">₹{locker.price}</p>
                      <p className="text-xs text-gray-500">per day</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Temple Lockers</p>
                    <p className="text-xs text-gray-600">Small & large sizes available</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">₹20-50</p>
                    <p className="text-xs text-gray-500">per day</p>
                  </div>
                </div>
              )}
              
              <Button
                onClick={() => handleBookLocker(lockers[0] || { 
                  id: 1, 
                  name: 'Temple Lockers', 
                  type: 'locker', 
                  address: 'Temple Complex',
                  price: 30,
                  isAvailable: true
                } as Facility)}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                Book Locker Slot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locker Booking Modal */}
      <Dialog open={!!selectedLocker} onOpenChange={() => setSelectedLocker(null)}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Book Locker</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <Input
                type="datetime-local"
                value={bookingData.startTime}
                onChange={(e) => setBookingData(prev => ({ ...prev, startTime: e.target.value }))}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <Input
                type="datetime-local"
                value={bookingData.endTime}
                onChange={(e) => setBookingData(prev => ({ ...prev, endTime: e.target.value }))}
                min={bookingData.startTime || new Date().toISOString().slice(0, 16)}
              />
            </div>
            {bookingData.startTime && bookingData.endTime && (
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-sm">
                  Total: ₹{Math.ceil((new Date(bookingData.endTime).getTime() - new Date(bookingData.startTime).getTime()) / (1000 * 60 * 60)) * (selectedLocker?.price || 20)}
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setSelectedLocker(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={lockerBookingMutation.isPending}
                className="flex-1 bg-purple-500 hover:bg-purple-600"
              >
                {lockerBookingMutation.isPending ? 'Booking...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
