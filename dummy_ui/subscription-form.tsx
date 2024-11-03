import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bus, MapPin } from 'lucide-react';

export default function SubscriptionForm() {
  const [formData, setFormData] = useState({
    route: '',
    pickupAddress: '',
    reason: ''
  });

  const routes = [
    { id: 'route1', name: 'Route 1 - Uttara' },
    { id: 'route2', name: 'Route 2 - Mirpur' },
    { id: 'route3', name: 'Route 3 - Dhanmondi' },
    { id: 'route4', name: 'Route 4 - Mohammadpur' }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleRouteChange = (value) => {
    setFormData(prev => ({
      ...prev,
      route: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscription form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Bus className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Transport Subscription Request</CardTitle>
          <CardDescription className="text-center">
            Apply for regular transport service between your residence and IUT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="route">Preferred Route</Label>
              <Select onValueChange={handleRouteChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map(route => (
                    <SelectItem key={route.id} value={route.id}>
                      {route.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupAddress">Detailed Pickup Address</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Textarea
                  id="pickupAddress"
                  placeholder="Enter your detailed pickup address"
                  className="pl-8 min-h-[80px]"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Subscription</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a brief reason for requesting transport subscription"
                className="min-h-[100px]"
                value={formData.reason}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSubmit}>Submit Subscription Request</Button>
          <div className="text-sm text-center text-gray-500">
            Your subscription request will be reviewed by the Transport Committee
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
