import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bus, ArrowLeft, CheckCircle2, Clock, X, Calendar } from 'lucide-react';

export default function RequisitionAssignment() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showAlternativeDialog, setShowAlternativeDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [assignmentDetails, setAssignmentDetails] = useState({
    vehicleId: '',
    driverId: '',
  });
  const [alternativeDetails, setAlternativeDetails] = useState({
    date: '',
    timeFrom: '',
    timeTo: '',
    reason: '',
  });
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data - replace with actual data from your backend
  const [approvedRequests] = useState([
    {
      id: 1,
      requesterName: 'Dr. Ahmed Rahman',
      department: 'CSE',
      travelDate: '2024-10-10',
      timeFrom: '09:00',
      timeTo: '14:00',
      destinations: ['BUET', 'Dhaka University', 'IUT Campus'],
      purpose: 'Inter-university research collaboration meeting',
      passengers: 3,
      status: 'approved_by_committee'
    },
    {
      id: 2,
      requesterName: 'Professor Samira Khan',
      department: 'EEE',
      travelDate: '2024-10-11',
      timeFrom: '10:30',
      timeTo: '13:30',
      destinations: ['MIST', 'IUT Campus'],
      purpose: 'Conference attendance',
      passengers: 2,
      status: 'approved_by_committee'
    },
  ]);

  // Mock vehicle and driver data
  const vehicles = [
    { id: 'v1', name: 'Toyota Hiace (DM-TA-11-1234)', capacity: 11 },
    { id: 'v2', name: 'Toyota Noah (DM-TA-11-5678)', capacity: 7 },
  ];

  const drivers = [
    { id: 'd1', name: 'Abdul Karim' },
    { id: 'd2', name: 'Md. Rafiq Islam' },
  ];

  const handleAssign = () => {
    console.log('Assigned:', assignmentDetails);
    setShowAssignDialog(false);
    setAssignmentDetails({ vehicleId: '', driverId: '' });
  };

  const handleSuggestAlternative = () => {
    console.log('Alternative suggested:', alternativeDetails);
    setShowAlternativeDialog(false);
    setAlternativeDetails({ date: '', timeFrom: '', timeTo: '', reason: '' });
  };

  const handleReject = () => {
    console.log('Rejected:', rejectionReason);
    setShowRejectDialog(false);
    setRejectionReason('');
  };

  if (selectedRequest) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="space-y-1">
            <Button 
              variant="ghost" 
              className="mb-2 text-gray-600"
              onClick={() => setSelectedRequest(null)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Requests
            </Button>
            <CardTitle className="text-2xl font-bold">
              Assign Vehicle for Approved Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Requester Information</h3>
                  <div className="mt-2 space-y-1">
                    <p className="font-medium">{selectedRequest.requesterName}</p>
                    <p className="text-gray-600">{selectedRequest.department}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-600">Travel Schedule</h3>
                  <div className="mt-2 space-y-1">
                    <p>Date: {selectedRequest.travelDate}</p>
                    <p>Time: {selectedRequest.timeFrom} - {selectedRequest.timeTo}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Journey Details</h3>
                  <div className="mt-2 space-y-1">
                    <p>Passengers: {selectedRequest.passengers}</p>
                    <div className="mt-2">
                      <p className="font-medium">Destinations:</p>
                      <ul className="list-disc list-inside mt-1">
                        {selectedRequest.destinations.map((dest, index) => (
                          <li key={index}>{dest}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-600">Purpose</h3>
                  <p className="mt-2">{selectedRequest.purpose}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-600 mb-4">Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setShowAssignDialog(true)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Assign Vehicle
                </Button>
                <Button
                  variant="outline"
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                  onClick={() => setShowAlternativeDialog(true)}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Suggest Alternative Time
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assign Vehicle Dialog */}
        <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Vehicle and Driver</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Vehicle</Label>
                <Select
                  value={assignmentDetails.vehicleId}
                  onValueChange={(value) => 
                    setAssignmentDetails(prev => ({ ...prev, vehicleId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map(vehicle => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} (Capacity: {vehicle.capacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Driver</Label>
                <Select
                  value={assignmentDetails.driverId}
                  onValueChange={(value) => 
                    setAssignmentDetails(prev => ({ ...prev, driverId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map(driver => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssign}>
                Confirm Assignment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Suggest Alternative Dialog */}
        <Dialog open={showAlternativeDialog} onOpenChange={setShowAlternativeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suggest Alternative Time</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Alternative Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="date"
                    className="pl-8"
                    value={alternativeDetails.date}
                    onChange={(e) => 
                      setAlternativeDetails(prev => ({ ...prev, date: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time From</Label>
                  <Input
                    type="time"
                    value={alternativeDetails.timeFrom}
                    onChange={(e) => 
                      setAlternativeDetails(prev => ({ ...prev, timeFrom: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time To</Label>
                  <Input
                    type="time"
                    value={alternativeDetails.timeTo}
                    onChange={(e) => 
                      setAlternativeDetails(prev => ({ ...prev, timeTo: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Reason for Alternative Suggestion</Label>
                <Textarea
                  placeholder="Explain why an alternative time is suggested..."
                  value={alternativeDetails.reason}
                  onChange={(e) => 
                    setAlternativeDetails(prev => ({ ...prev, reason: e.target.value }))
                  }
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAlternativeDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSuggestAlternative}>
                Send Suggestion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Request Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Reason for Rejection</Label>
                <Textarea
                  placeholder="Provide a reason for rejecting the request..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleReject}
              >
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Bus className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Approved Requisitions Pending Assignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-left font-medium text-gray-600">Requester</th>
                  <th className="p-4 text-left font-medium text-gray-600">Travel Schedule</th>
                  <th className="p-4 text-left font-medium text-gray-600">Passengers</th>
                  <th className="p-4 text-center font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvedRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{request.requesterName}</div>
                      <div className="text-sm text-gray-500">{request.department}</div>
                    </td>
                    <td className="p-4">
                      <div>{request.travelDate}</div>
                      <div className="text-sm text-gray-500">{`${request.timeFrom} - ${request.timeTo}`}</div>
                    </td>
                    <td className="p-4">
                      {request.passengers}
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        Manage Request
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}