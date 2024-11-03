import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MapPin, Calendar, Bus, FileText, AlertCircle, Users, Navigation } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TransportOfficerDashboard() {
  const ongoingTrips = [
    {
      id: 1,
      type: 'Subscription',
      route: 'Dhanmondi to IUT Campus',
      vehicle: 'Toyota Hiace (Dhaka Metro-GA 11-5890)',
      driver: 'Mohammed Hasan',
      startTime: '08:30 AM',
      status: 'En Route',
      passengers: 8,
      currentLocation: 'Near Gazipur Chowrasta',
      progress: '65%'
    },
    {
      id: 2,
      type: 'Requisition',
      route: 'IUT to BUET',
      vehicle: 'Toyota Corolla (Dhaka Metro-GA 11-2345)',
      driver: 'Abdul Karim',
      startTime: '09:00 AM',
      status: 'Just Started',
      passengers: 3,
      currentLocation: 'IUT Campus Gate',
      progress: '10%'
    },
    {
      id: 3,
      type: 'One-Time',
      route: 'Uttara to IUT Campus',
      vehicle: 'Toyota Noah (Dhaka Metro-GA 11-7890)',
      driver: 'Kabir Islam',
      startTime: '08:45 AM',
      status: 'En Route',
      passengers: 5,
      currentLocation: 'Uttara Sector 10',
      progress: '25%'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'New requisition request from Dr. Ahmed Rahman',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      message: 'Driver Kamal Hossain reported delay due to traffic',
      time: '10 minutes ago'
    },
    {
      id: 3,
      type: 'success',
      message: 'Vehicle DM-GA-11-5890 picked up all passengers',
      time: '15 minutes ago'
    },
    {
      id: 4,
      type: 'info',
      message: 'New one-time ticket request for tomorrow morning',
      time: '30 minutes ago'
    },
    {
      id: 5,
      type: 'success',
      message: 'All morning route vehicles have started their trips',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl font-bold">Transport Officer Dashboard</h1>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => console.log('Navigate to requisition management')}>
              <FileText className="h-4 w-4 mr-2" />
              Manage Requisitions
            </Button>
            <Button variant="outline" onClick={() => console.log('Navigate to vehicle management')}>
              <Bus className="h-4 w-4 mr-2" />
              Manage Vehicles
            </Button>
            <Button variant="outline" onClick={() => console.log('Navigate to driver management')}>
              <Users className="h-4 w-4 mr-2" />
              Manage Drivers
            </Button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Tracking Section - Spans 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  Live Trip Tracking
                </CardTitle>
                <Button variant="outline" size="sm">
                  View Full Map
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ongoingTrips.map((trip) => (
                    <Card key={trip.id} className="bg-white">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant={
                                trip.type === 'Subscription' ? 'default' : 
                                trip.type === 'Requisition' ? 'secondary' : 
                                'outline'
                              }>
                                {trip.type}
                              </Badge>
                              <span className="font-semibold">{trip.startTime}</span>
                            </div>
                            <h3 className="font-medium">{trip.route}</h3>
                            <div className="text-sm text-gray-600">
                              <p>Vehicle: {trip.vehicle}</p>
                              <p>Driver: {trip.driver}</p>
                              <p>Passengers: {trip.passengers}</p>
                            </div>
                          </div>
                          <Button size="sm">
                            Track Vehicle
                          </Button>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{trip.currentLocation}</span>
                            <span>{trip.status}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: trip.progress }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications Panel */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-8rem)]">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-12rem)]">
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
      </div>
    </div>
  );
}
