import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MapPin, Calendar, Share2, X, Bus, FileText, AlertCircle, Ticket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NonSubscriberDashboard() {
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);
  const [selectedTrip, setSelectedTrip] = React.useState(null);
  const [cancelReason, setCancelReason] = React.useState('');
  const [isLocationSharing, setIsLocationSharing] = React.useState(false);

  const upcomingTrips = [
    {
      id: 1,
      type: 'One-Time',
      startTime: '08:30 AM',
      date: '2024-10-08',
      route: 'Home to IUT Campus',
      startAddress: 'Dhanmondi 27, Road 16, Dhaka',
      endAddress: 'IUT Campus, Gazipur',
      vehicleInfo: 'Toyota Hiace (Dhaka Metro-GA 11-5890)',
      driverName: 'Mohammed Hasan',
      driverPhone: '01712345678',
      status: 'Vehicle En Route',
      ticketId: 'TKT-2024100801',
      fare: '150 BDT',
      currentLocation: { lat: 23.7937, lng: 90.4066 }
    },
    {
      id: 2,
      type: 'Requisition',
      startTime: '02:00 PM',
      date: '2024-10-08',
      route: 'IUT to BUET',
      startAddress: 'IUT Campus, Gazipur',
      endAddress: 'BUET Campus, Dhaka',
      vehicleInfo: 'Toyota Corolla (Dhaka Metro-GA 11-2345)',
      driverName: 'Abdul Karim',
      driverPhone: '01812345678',
      status: 'Scheduled',
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      message: 'One-time ticket TKT-2024100801 confirmed for tomorrow 8:30 AM',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'Your vehicle for 8:30 AM trip has started its journey',
      time: '10 minutes ago'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Limited seats available for tomorrow morning route',
      time: '1 hour ago'
    }
  ];

  const handleTripCancel = () => {
    console.log('Cancelling trip:', selectedTrip?.id, 'Reason:', cancelReason);
    setShowCancelDialog(false);
    setCancelReason('');
    setSelectedTrip(null);
  };

  const toggleLocationSharing = () => {
    setIsLocationSharing(!isLocationSharing);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transport Dashboard</h1>
          <div className="space-x-4">
            <Button 
              variant="outline"
              onClick={() => console.log('Navigate to one-time ticket request')}
            >
              <Ticket className="h-4 w-4 mr-2" />
              Request One-Time Ticket
            </Button>
            <Button onClick={() => console.log('Navigate to requisition form')}>
              <FileText className="h-4 w-4 mr-2" />
              New Requisition
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Upcoming Trips Section */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <Card key={trip.id} className="bg-white">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={trip.type === 'One-Time' ? 'default' : 'secondary'}>
                                {trip.type}
                              </Badge>
                              <span className="font-semibold">{trip.startTime}</span>
                              {trip.ticketId && (
                                <Badge variant="outline" className="ml-2">
                                  {trip.ticketId}
                                </Badge>
                              )}
                            </div>
                            <h3 className="mt-2 font-medium">{trip.route}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              <MapPin className="h-4 w-4 inline mr-1" />
                              {trip.startAddress}
                            </p>
                            {trip.fare && (
                              <p className="text-sm text-gray-600 mt-1">
                                Fare: {trip.fare}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => console.log('View details:', trip.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => {
                                setSelectedTrip(trip);
                                setShowCancelDialog(true);
                              }}
                            >
                              Cancel Trip
                            </Button>
                          </div>
                        </div>
                        {trip.status === 'Vehicle En Route' && (
                          <div className="mt-3 p-2 bg-blue-50 rounded-md flex justify-between items-center">
                            <span className="text-sm text-blue-700">
                              <Bus className="h-4 w-4 inline mr-1" />
                              Vehicle en route
                            </span>
                            <Button
                              size="sm"
                              variant={isLocationSharing ? "default" : "outline"}
                              onClick={toggleLocationSharing}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              {isLocationSharing ? 'Sharing Location' : 'Share Location'}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Routes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Bus className="h-5 w-5 mr-2" />
                  Available Routes with Seats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      route: 'Dhanmondi to IUT Campus',
                      time: '7:30 AM',
                      availableSeats: 2,
                      fare: '150 BDT'
                    },
                    {
                      route: 'Uttara to IUT Campus',
                      time: '8:00 AM',
                      availableSeats: 1,
                      fare: '200 BDT'
                    }
                  ].map((route, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <h4 className="font-medium">{route.route}</h4>
                        <p className="text-sm text-gray-500">
                          {route.time} • {route.availableSeats} seats available • {route.fare}
                        </p>
                      </div>
                      <Button size="sm">
                        Book Ticket
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications Section */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 bg-white rounded-lg border shadow-sm"
                      >
                        <div className="flex items-start space-x-2">
                          <AlertCircle className={`h-5 w-5 ${
                            notification.type === 'info' ? 'text-blue-500' :
                            notification.type === 'success' ? 'text-green-500' :
                            'text-yellow-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cancel Trip Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Trip</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="cancelReason" className="text-sm font-medium">
                  Reason for Cancellation
                </label>
                <Textarea
                  id="cancelReason"
                  placeholder="Please provide a reason for cancellation..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCancelDialog(false);
                  setCancelReason('');
                  setSelectedTrip(null);
                }}
              >
                Keep Trip
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleTripCancel}
              >
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
