import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Bus, Eye, ArrowLeft, Check, X } from 'lucide-react';

export default function SubscriptionReview() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  
  // Mock data for subscription requests
  const [requests] = useState([
    {
      id: 1,
      requesterName: 'Dr. Ahmed Rahman',
      department: 'CSE',
      designation: 'Associate Professor',
      route: 'Route 1 - Uttara',
      pickupAddress: 'House 7, Road 14, Sector 4, Uttara, Dhaka',
      reason: 'Daily commute to IUT for classes and research work',
      status: 'pending'
    },
    {
      id: 2,
      requesterName: 'Professor Samira Khan',
      department: 'EEE',
      designation: 'Professor',
      route: 'Route 2 - Mirpur',
      pickupAddress: 'Flat B3, House 12, Road 3, Block A, Mirpur 10, Dhaka',
      reason: 'Regular transportation needed for academic duties',
      status: 'pending'
    },
  ]);

  const handleApprove = (request) => {
    console.log('Approved subscription request:', request.id);
  };

  const handleReject = (request) => {
    console.log('Rejected subscription request:', request.id, 'Reason:', rejectionReason);
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
              Transport Subscription Request Details
            </CardTitle>
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
                  <h3 className="font-semibold text-gray-600">Route Information</h3>
                  <div className="mt-2 space-y-1">
                    <p className="font-medium">{selectedRequest.route}</p>
                    <p className="text-gray-600">Pickup Address:</p>
                    <p className="text-gray-600">{selectedRequest.pickupAddress}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Reason for Subscription</h3>
                  <p className="mt-2">{selectedRequest.reason}</p>
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
                  Approve Subscription
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Subscription Request</DialogTitle>
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
            Pending Transport Subscription Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-left font-medium text-gray-600">Requester</th>
                  <th className="p-4 text-left font-medium text-gray-600">Route</th>
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
                      {request.route}
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review Request
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
