import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function DonationSection() {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCause, setSelectedCause] = useState<'temple' | 'annadhanam' | null>(null);

  const presetAmounts = [101, 501, 1001];
  const annadhanamAmounts = [250, 500, 1000];

  const handleAmountSelect = (amount: number, cause: 'temple' | 'annadhanam') => {
    setSelectedAmount(amount);
    setSelectedCause(cause);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string, cause: 'temple' | 'annadhanam') => {
    setCustomAmount(value);
    setSelectedAmount(0);
    setSelectedCause(cause);
  };

  const handleDonate = (cause: 'temple' | 'annadhanam') => {
    const amount = selectedCause === cause ? (selectedAmount || parseInt(customAmount) || 0) : 0;
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would integrate with UPI payment gateway
    const upiId = "temple@upi"; // Example UPI ID
    const upiUrl = `upi://pay?pa=${upiId}&pn=Tiruvannamalai Temple&am=${amount}&cu=INR&tn=Donation for ${cause}`;
    
    toast({
      title: "Redirecting to Payment",
      description: `You will be redirected to pay ₹${amount} for ${cause === 'temple' ? 'Temple Maintenance' : 'Annadhanam Support'}.`,
    });

    // Try to open UPI app, fallback to showing UPI ID
    try {
      window.open(upiUrl, '_blank');
    } catch (error) {
      toast({
        title: "UPI Payment",
        description: `Please pay ₹${amount} to UPI ID: ${upiId}`,
      });
    }
  };

  return (
    <section className="px-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation & Support</h3>
      
      <div className="space-y-4">
        {/* Header Card */}
        <Card className="bg-gradient-to-r from-saffron to-gold text-white">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Support Sacred Causes
            </h4>
            <p className="text-sm opacity-90">
              Your contribution helps maintain the temple and support pilgrims
            </p>
          </CardContent>
        </Card>

        {/* Temple Maintenance */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-semibold text-gray-900">Temple Maintenance</CardTitle>
                <p className="text-sm text-gray-600">Support daily temple operations</p>
              </div>
              <svg className="w-8 h-8 text-saffron" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex space-x-2">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => handleAmountSelect(amount, 'temple')}
                    variant={selectedCause === 'temple' && selectedAmount === amount ? 'default' : 'outline'}
                    className={`flex-1 ${
                      selectedCause === 'temple' && selectedAmount === amount 
                        ? 'bg-saffron hover:bg-warm-orange' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={selectedCause === 'temple' ? customAmount : ''}
                  onChange={(e) => handleCustomAmountChange(e.target.value, 'temple')}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleDonate('temple')}
                  className="bg-saffron hover:bg-warm-orange text-white px-6"
                >
                  Donate via UPI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Annadhanam Support */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-semibold text-gray-900">Annadhanam Support</CardTitle>
                <p className="text-sm text-gray-600">Sponsor free meals for pilgrims</p>
              </div>
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.20-1.10-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
              </svg>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex space-x-2">
                {annadhanamAmounts.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => handleAmountSelect(amount, 'annadhanam')}
                    variant={selectedCause === 'annadhanam' && selectedAmount === amount ? 'default' : 'outline'}
                    className={`flex-1 ${
                      selectedCause === 'annadhanam' && selectedAmount === amount 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={selectedCause === 'annadhanam' ? customAmount : ''}
                  onChange={(e) => handleCustomAmountChange(e.target.value, 'annadhanam')}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleDonate('annadhanam')}
                  className="bg-green-500 hover:bg-green-600 text-white px-6"
                >
                  Sponsor Meals
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Information */}
        <Card className="border-gold border-2">
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 text-gold mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Your Impact
            </h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-saffron">₹250</p>
                <p className="text-xs text-gray-600">Feeds 10 pilgrims</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-500">₹500</p>
                <p className="text-xs text-gray-600">Daily temple oil</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900">Secure Payments</p>
              <p className="text-xs text-blue-700">
                All donations are processed securely through UPI. You will receive a receipt for tax purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
