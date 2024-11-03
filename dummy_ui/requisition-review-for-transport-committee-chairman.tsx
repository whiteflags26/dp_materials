import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bus, Eye, ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RequisitionReview() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  // Mock data for new requests
  const [newRequests] = useState([
    {
      id: 1,
      requesterName: 'Dr. Ahmed Rahman',
      department: 'CSE',
      designation: 'Associate Professor',
      travelDate: '2024-10-10',
      timeFrom: '09:00',
      timeTo: '14:00',
      destinations: ['BUET', 'Dhaka University', 'IUT Campus'],
      purpose: 'Inter-university research collaboration meeting',
      passengers: 3,
      contactPerson: 'Dr. Ahmed Rahman',
      contactNumber: '01712345678',
      status: 'pending'
    },
    {
      id: 2,
      requesterName: 'Professor Samira Khan',
      department: 'EEE',
      designation: 'Professor',
      travelDate: '2024-10-11',
      timeFrom: '10:30',
      timeTo: '13:30',
      destinations: ['MIST', 'IUT Campus'],
      purpose: 'Conference attendance and guest lecture',
      passengers: 2,
      contactPerson: 'Professor Samira Khan',
      contactNumber: '01812345678',
      status: 'pending'
    },
  ]);

  // Mock data for processed requests
  const [processedRequests] = useState([
    {
      id: 3,
      requesterName: 'Dr. Karim Chowdhury',
      department: 'ME',
      designation: 'Professor',
      travelDate: '2024-10-12',
      timeFrom: '08:00',
      timeTo: '16:00',
      destinations: ['DUET', 'IUT Campus'],
      purpose: 'External examination committee',
      passengers: 4,
      contactPerson: 'Dr. Karim Chowdhury',
      contactNumber: '01912345678',
      status: 'processed',
      assignedVehicle: 'Toyota Hiace (Dhaka Metro-GA 11-5890)',
      assignedDriver: 'Mohammed Hasan'
    }
  ]);

  const handleApprove = (request) => {
    console.log('Approved request:', request.id);
  };

  const handleReject = (request) => {
    console.log('Rejected request:', request.id, 'Reason:', rejectionReason);
    setShowRejectDialog(false);
    setRejectionReason('');
  };

  const RequestTable = ({ requests, showVehicleInfo = false }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="p-4 text-left font-medium text-gray-600">Requester</th>
            <th className="p-4 text-left font-medium text-gray-600">Travel Schedule</th>
            <th className="p-4 text-left font-medium text-gray-600">Passengers</th>
            {showVehicleInfo && (
              <th className="p-4 text-left font-medium text-gray-600">Assigned Vehicle</th>
            )}
            <th className="p-4 text-center font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{request.requesterName}</div>
                <div className="text-sm text-gray-500">{request.department}</div>
              </td>
              <td className="p-4">
                <div>{request.travelDate}</div>
                <div className="text-sm text-gray-500">{`${request.timeFrom} - ${request.timeTo}`}</div>
              </td>
              <td className="p-4">{request.passengers}</td>
              {showVehicleInfo && (
                <td className="p-4">
                  <div>{request.assignedVehicle}</div>
                  <div className="text-sm text-gray-500">Driver: {request.assignedDriver}</div>
                </td>
              )}
              <td className="p-4 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                  onClick={() => setSelectedRequest(request)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
              Requisition Request Details
            </CardTitle>
            {selectedRequest.status === 'processed' && (
              <Badge className="bg-blue-500">Processed by Transport Officer</Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Requester Information</h3>
                  <div className="mt-2 space-y-1">
                    <p className="font-medium">{selectedRequest.requesterName}</p>
                    <p className="text-gray-600">{selectedRequest.designation}</p>
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

                {selectedRequest.status === 'processed' && (
                  <div>
                    <h3 className="font-semibold text-gray-600">Vehicle Assignment</h3>
                    <div className="mt-2 space-y-1">
                      <p>Vehicle: {selectedRequest.assignedVehicle}</p>
                      <p>Driver: {selectedRequest.assignedDriver}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Journey Details</h3>
                  <div className="mt-2 space-y-1">
                    <p>Number of Passengers: {selectedRequest.passengers}</p>
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
                  <h3 className="font-semibold text-gray-600">Purpose of Travel</h3>
                  <p className="mt-2">{selectedRequest.purpose}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-600 mb-4">Review Decision</h3>
              <div className="flex gap-4">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleApprove(selectedRequest)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve Request
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

        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Requisition Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejectionReason" className="text-sm font-medium">
                  Reason for Rejection (Optional)
                </label>
                <Textarea
                  id="rejectionReason"
                  placeholder="Please provide a reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectionReason('');
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleReject(selectedRequest)}
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
            Vehicle Requisitions Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">
                New Requests
                {newRequests.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{newRequests.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="processed">
                Processed Requests
                {processedRequests.length > 0 && (
                  <Badge className="ml-2 bg-blue-500">{processedRequests.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              {newRequests.length > 0 ? (
                <RequestTable requests={newRequests} />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  No new requests to review
                </div>
              )}
            </TabsContent>
            <TabsContent value="processed">
              {processedRequests.length > 0 ? (
                <RequestTable requests={processedRequests} showVehicleInfo={true} />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  No processed requests to review
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
