import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Ticket, Clock, Users, MapPin, ArrowRight } from 'lucide-react';

function RouteInfoCard({ tripInfo }) {
  if (!tripInfo.isComplete) return null;

  return (
    <Card className="mt-6 bg-blue-50">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">{tripInfo.startLocation}</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <ArrowRight className="h-6 w-6 text-gray-400 mb-2" />
              <div className="text-xs text-gray-500">{tripInfo.duration}</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-red-600 mb-2" />
              <span className="text-sm font-medium">{tripInfo.endLocation}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-blue-600 mb-2" />
              <h3 className="text-sm font-semibold">Start Time</h3>
              <p className="text-lg font-bold">{tripInfo.startTime}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-blue-600 mb-2" />
              <h3 className="text-sm font-semibold">Available Seats</h3>
              <p className="text-lg font-bold">{tripInfo.availableSeats}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Ticket className="h-5 w-5 text-blue-600 mb-2" />
              <h3 className="text-sm font-semibold">Fare</h3>
              <p className="text-lg font-bold">{tripInfo.fare}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Available Seats</h3>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-t-lg border-2 ${
                    i < tripInfo.availableSeats 
                      ? 'border-green-500 bg-green-100' 
                      : 'border-gray-300 bg-gray-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OneTimeTicketForm() {
  const [formData, setFormData] = useState({
    route: '',
    tripType: '',
    destination: ''
  });
  
  const [tripInfo, setTripInfo] = useState({
    isComplete: false,
    startLocation: '',
    endLocation: '',
    startTime: '',
    duration: '',
    availableSeats: 0,
    fare: ''
  });

  const routes = [
    { id: 'route1', name: 'Route 1 - Uttara' },
    { id: 'route2', name: 'Route 2 - Mirpur' },
    { id: 'route3', name: 'Route 3 - Dhanmondi' },
    { id: 'route4', name: 'Route 4 - Mohammadpur' }
  ];

  const tripTypes = [
    { id: 'going', name: 'Going to IUT' },
    { id: 'returning', name: 'Returning from IUT' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update trip info when all fields are filled
    const updatedFormData = { ...formData, [field]: value };
    if (updatedFormData.route && updatedFormData.tripType && updatedFormData.destination) {
      // Simulate API call to get route information
      const routeName = routes.find(r => r.value === updatedFormData.route)?.name || 'Selected Route';
      const isGoingTrip = updatedFormData.tripType === 'going';
      
      setTripInfo({
        isComplete: true,
        startLocation: isGoingTrip ? routeName.split(' - ')[1] : 'IUT',
        endLocation: isGoingTrip ? 'IUT' : routeName.split(' - ')[1],
        startTime: isGoingTrip ? '8:00 AM' : '5:00 PM',
        duration: '45 mins',
        availableSeats: Math.floor(Math.random() * 10) + 1,
        fare: '৳50'
      });
    } else {
      setTripInfo(prev => ({ ...prev, isComplete: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('One-time ticket form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Ticket className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">One-Time Ticket Booking</CardTitle>
          <CardDescription className="text-center">
            Book an available seat for a single trip
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="route">Select Route</Label>
              <Select onValueChange={(value) => handleInputChange('route', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your route" />
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
              <Label htmlFor="tripType">Trip Type</Label>
              <Select onValueChange={(value) => handleInputChange('tripType', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select trip type" />
                </SelectTrigger>
                <SelectContent>
                  {tripTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Exact Destination</Label>
              <Input 
                id="destination" 
                placeholder="Enter your exact pickup/drop-off location"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                required
              />
            </div>

            <RouteInfoCard tripInfo={tripInfo} />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSubmit}>Book Ticket</Button>
          <div className="text-sm text-center text-gray-500">
            Booking is subject to seat availability and confirmation
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
