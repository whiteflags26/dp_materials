import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bus, CalendarClock, MapPin, Users, Plus, X, Phone } from 'lucide-react';

export default function RequisitionForm() {
  const [formData, setFormData] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    destinations: [''],
    purpose: '',
    passengers: '',
    inChargeContact: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...formData.destinations];
    newDestinations[index] = value;
    setFormData(prev => ({
      ...prev,
      destinations: newDestinations
    }));
  };

  const addDestination = () => {
    setFormData(prev => ({
      ...prev,
      destinations: [...prev.destinations, '']
    }));
  };

  const removeDestination = (index) => {
    if (formData.destinations.length > 1) {
      const newDestinations = formData.destinations.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        destinations: newDestinations
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Bus className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Vehicle Requisition Request</CardTitle>
          <CardDescription className="text-center">
            Submit your transport requisition for approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date Required</Label>
              <div className="relative">
                <CalendarClock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="date"
                  type="date"
                  className="pl-8"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeFrom">Time Required (From)</Label>
                <Input
                  id="timeFrom"
                  type="time"
                  value={formData.timeFrom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeTo">Time Required (To)</Label>
                <Input
                  id="timeTo"
                  type="time"
                  value={formData.timeTo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Destinations</Label>
              {formData.destinations.map((destination, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder={`Destination ${index + 1}`}
                      className="pl-8"
                      value={destination}
                      onChange={(e) => handleDestinationChange(index, e.target.value)}
                      required
                    />
                  </div>
                  {formData.destinations.length > 1 && (
                    <Button 
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeDestination(index)}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDestination}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Destination
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Travel</Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose of your travel"
                className="min-h-[100px]"
                value={formData.purpose}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers</Label>
                <div className="relative">
                  <Users className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="passengers"
                    type="number"
                    className="pl-8"
                    placeholder="Total passengers"
                    value={formData.passengers}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inChargeContact">Contact Number (Person in Charge)</Label>
                <div className="relative">
                  <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="inChargeContact"
                    type="tel"
                    className="pl-8"
                    placeholder="Contact number"
                    value={formData.inChargeContact}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSubmit}>Submit Requisition</Button>
          <div className="text-sm text-center text-gray-500">
            Your request will be processed through the approval system
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
