import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { EmergencyContact } from "@shared/schema";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Get user's location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // Fetch emergency contacts
  const { data: emergencyContacts, isLoading } = useQuery<EmergencyContact[]>({
    queryKey: ['/api/emergency-contacts'],
    enabled: isOpen,
  });

  // Create SOS alert
  const sosAlertMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!location) {
        getCurrentLocation();
      }
      
      return await apiRequest('POST', '/api/sos', {
        message,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });
    },
    onSuccess: () => {
      toast({
        title: "SOS Alert Sent",
        description: "Emergency services have been notified of your location and situation.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to Send SOS",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEmergencyCall = (number: string, type: string) => {
    // Create SOS alert first
    sosAlertMutation.mutate(`Emergency call requested: ${type}`);
    
    // Open phone dialer
    window.location.href = `tel:${number}`;
  };

  if (!isOpen) return null;

  const policeContacts = emergencyContacts?.filter(c => c.type === 'police') || [];
  const medicalContacts = emergencyContacts?.filter(c => c.type === 'medical') || [];
  const templeContacts = emergencyContacts?.filter(c => c.type === 'temple') || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            Emergency SOS
          </DialogTitle>
          <p className="text-sm text-gray-600 text-center">Need immediate help?</p>
        </DialogHeader>

        <div className="space-y-3">
          {/* Default Emergency Numbers */}
          <Button
            onClick={() => handleEmergencyCall('100', 'Police')}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 flex items-center justify-center space-x-2"
            disabled={sosAlertMutation.isPending}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <span>Call Police (100)</span>
          </Button>

          <Button
            onClick={() => handleEmergencyCall('108', 'Medical Emergency')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 flex items-center justify-center space-x-2"
            disabled={sosAlertMutation.isPending}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 18h10v-1c0-.8-.7-1.5-1.5-1.5h-7c-.8 0-1.5.7-1.5 1.5v1zm6-6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
            </svg>
            <span>Call Ambulance (108)</span>
          </Button>

          {/* Temple Security */}
          {templeContacts.length > 0 && (
            <Button
              onClick={() => handleEmergencyCall(templeContacts[0].number, 'Temple Security')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 flex items-center justify-center space-x-2"
              disabled={sosAlertMutation.isPending}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              <span>Temple Security</span>
            </Button>
          )}

          {/* Additional Contacts */}
          {isLoading && (
            <div className="text-center py-4">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-saffron rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Loading emergency contacts...</p>
            </div>
          )}
        </div>

        <Button
          onClick={onClose}
          variant="outline"
          className="w-full mt-4"
          disabled={sosAlertMutation.isPending}
        >
          Cancel
        </Button>

        <p className="text-xs text-gray-500 text-center mt-2">
          Your location will be shared with emergency services when you make a call.
        </p>
      </DialogContent>
    </Dialog>
  );
}
