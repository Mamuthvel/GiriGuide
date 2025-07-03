import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CalendarIcon, MapPinIcon, StarIcon, WifiIcon, FilterIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import type { Hotel } from "@shared/schema";

export default function HotelsSection() {
  const { toast } = useToast();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState<string>("distance");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: hotels, isLoading } = useQuery<Hotel[]>({
    queryKey: ['/api/hotels'],
  });

  // Mock data for development since hotels array is empty
  const mockHotels: Hotel[] = [
    {
      id: 1,
      name: "Sri Ramanashramam Guest House",
      description: "Peaceful ashram accommodation near the holy mountain with meditation facilities",
      address: "Tiruvannamalai, Tamil Nadu 606601",
      pricePerNight: 800,
      rating: "4.5",
      reviewCount: 127,
      imageUrl: "/images/ashram1.jpg",
      amenities: ["Free WiFi", "Meditation Hall", "Vegetarian Meals", "Garden"],
      distanceFromTemple: "0.5",
      contactNumber: "+91 4175 237292",
      isAvailable: true,
      createdAt: new Date()
    },
    {
      id: 2,
      name: "Hotel Arunachala Palace",
      description: "Comfortable hotel with modern amenities and temple views",
      address: "Car Street, Tiruvannamalai 606601",
      pricePerNight: 2500,
      rating: "4.2",
      reviewCount: 89,
      imageUrl: "/images/hotel1.jpg",
      amenities: ["AC Rooms", "Restaurant", "Parking", "Room Service"],
      distanceFromTemple: "1.2",
      contactNumber: "+91 4175 223456",
      isAvailable: true,
      createdAt: new Date()
    },
    {
      id: 3,
      name: "Free Dharamshala",
      description: "Traditional free accommodation for pilgrims with basic amenities",
      address: "Temple Street, Tiruvannamalai 606601",
      pricePerNight: 0,
      rating: "3.8",
      reviewCount: 203,
      imageUrl: "/images/dharamshala1.jpg",
      amenities: ["Basic Rooms", "Shared Bathroom", "Free Meals", "Community Kitchen"],
      distanceFromTemple: "0.8",
      contactNumber: "+91 4175 234567",
      isAvailable: true,
      createdAt: new Date()
    },
    {
      id: 4,
      name: "Shiva Guest House",
      description: "Budget-friendly accommodation with spiritual atmosphere",
      address: "Gandhi Road, Tiruvannamalai 606601",
      pricePerNight: 600,
      rating: "4.0",
      reviewCount: 156,
      imageUrl: "/images/guesthouse1.jpg",
      amenities: ["Fan Rooms", "Shared Kitchen", "Prayer Room", "Rooftop"],
      distanceFromTemple: "1.5",
      contactNumber: "+91 4175 245678",
      isAvailable: true,
      createdAt: new Date()
    },
    {
      id: 5,
      name: "Luxury Temple Resort",
      description: "Premium accommodation with spa and fine dining facilities",
      address: "Bypass Road, Tiruvannamalai 606601",
      pricePerNight: 4500,
      rating: "4.8",
      reviewCount: 67,
      imageUrl: "/images/resort1.jpg",
      amenities: ["AC Rooms", "Swimming Pool", "Spa", "Fine Dining", "Gym", "Free WiFi"],
      distanceFromTemple: "3.0",
      contactNumber: "+91 4175 256789",
      isAvailable: true,
      createdAt: new Date()
    }
  ];

  const displayHotels = hotels?.length ? hotels : mockHotels;

  // Filter and sort hotels
  const filteredHotels = useMemo(() => {
    let filtered = displayHotels.filter((hotel) => {
      // Price filter
      if (hotel.pricePerNight < priceRange[0] || hotel.pricePerNight > priceRange[1]) {
        return false;
      }
      
      // Search filter
      if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !hotel.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasRequiredAmenities = selectedAmenities.every(amenity => 
          hotel.amenities?.includes(amenity)
        );
        if (!hasRequiredAmenities) return false;
      }
      
      return true;
    });

    // Sort hotels
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        filtered.sort((a, b) => parseFloat(b.rating || "0") - parseFloat(a.rating || "0"));
        break;
      case "distance":
      default:
        filtered.sort((a, b) => parseFloat(a.distanceFromTemple || "0") - parseFloat(b.distanceFromTemple || "0"));
        break;
    }

    return filtered;
  }, [displayHotels, priceRange, searchQuery, selectedAmenities, sortBy]);

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
      setCheckInDate(undefined);
      setCheckOutDate(undefined);
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
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "Missing Information",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * selectedHotel!.pricePerNight;

    bookingMutation.mutate({
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      totalAmount,
    });
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const allAmenities = ["Free WiFi", "AC Rooms", "Parking", "Restaurant", "Pool", "Spa", "Gym"];

  if (isLoading) {
    return (
      <section className="px-4 pb-20">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-20">
      {/* Header with Search and Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Hotels & Stays</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <FilterIcon className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search hotels, dharamshalas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Sort and Quick Stats */}
        <div className="flex items-center justify-between mb-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="text-sm text-gray-600">
            {filteredHotels.length} of {displayHotels.length} stays
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <Card className="mb-4 p-4 bg-orange-50 border-orange-200">
            <div className="space-y-4">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range (₹ per night)</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Amenities Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {allAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAmenity(amenity)}
                      className="text-xs"
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setPriceRange([0, 5000]);
                  setSelectedAmenities([]);
                  setSearchQuery("");
                }}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Hotels Grid */}
      <div className="space-y-4">
        {filteredHotels.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No hotels found</h3>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          </Card>
        ) : (
          filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Hotel Image */}
              <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <WifiIcon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium">{hotel.name}</p>
                  </div>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white text-orange-600 font-bold">
                    {hotel.pricePerNight === 0 ? "FREE" : `₹${hotel.pricePerNight}/night`}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{hotel.description}</p>
                  </div>
                </div>

                {/* Rating and Distance */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                    <span className="text-xs text-gray-500">({hotel.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{hotel.distanceFromTemple} km from temple</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities?.slice(0, 4).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities && hotel.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Contact and Book */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    📞 {hotel.contactNumber}
                  </div>
                  <Button 
                    onClick={() => handleBookNow(hotel)}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    size="sm"
                  >
                    {hotel.pricePerNight === 0 ? "Reserve Now" : "Book Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={!!selectedHotel} onOpenChange={() => setSelectedHotel(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book {selectedHotel?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Hotel Summary */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{selectedHotel?.name}</h4>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Price per night:</span>
                <span className="font-semibold">
                  {selectedHotel?.pricePerNight === 0 ? "FREE" : `₹${selectedHotel?.pricePerNight}`}
                </span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "dd/MM/yy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "dd/MM/yy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      disabled={(date) => date <= (checkInDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Total Calculation */}
            {checkInDate && checkOutDate && selectedHotel && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                  </span>
                  <span className="font-bold text-lg">
                    {selectedHotel.pricePerNight === 0 
                      ? "FREE" 
                      : `₹${Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) * selectedHotel.pricePerNight}`
                    }
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedHotel(null)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmBooking} 
                disabled={bookingMutation.isPending}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}