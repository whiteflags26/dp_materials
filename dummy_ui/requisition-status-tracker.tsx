import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  User, 
  Users, 
  Bus, 
  ShieldCheck 
} from 'lucide-react';

const StatusStep = ({ title, status, icon: Icon, rejectionReason, isLast }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle2,
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-500',
          label: 'Approved'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-500',
          label: 'Rejected'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-500',
          label: 'Pending'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-300',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Waiting'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center">
        <div className={`p-3 rounded-full ${config.bgColor}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
        {!isLast && (
          <div className={`h-full w-0.5 ${status === 'waiting' ? 'bg-gray-200' : config.borderColor}`} />
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center mb-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <Badge className={`ml-2 ${config.bgColor} ${config.color}`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
        {rejectionReason && status === 'rejected' && (
          <p className="text-sm text-red-600 mt-1">
            Reason: {rejectionReason}
          </p>
        )}
        <div className="h-8" />
      </div>
    </div>
  );
};

export default function RequisitionStatusTracker() {
  const requisitionData = {
    id: "REQ-2024-001",
    requesterName: "Dr. Ahmed Rahman",
    department: "CSE",
    travelDate: "2024-10-15",
    currentStatus: "in-progress",
    stages: [
      {
        title: "Department Head Approval",
        status: "approved",
        icon: User
      },
      {
        title: "Initial Transport Committee Review",
        status: "approved",
        icon: Users
      },
      {
        title: "Transport Officer Assignment",
        status: "rejected",
        icon: Bus,
        rejectionReason: "No vehicles available for the requested date and time"
      },
      {
        title: "Final Transport Committee Approval",
        status: "waiting",
        icon: Users
      },
      {
        title: "Vice Chancellor Approval",
        status: "waiting",
        icon: ShieldCheck
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Requisition Status</CardTitle>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="font-medium">Request ID:</span> {requisitionData.id}
            </p>
            <p className="text-sm">
              <span className="font-medium">Requester:</span> {requisitionData.requesterName}
            </p>
            <p className="text-sm">
              <span className="font-medium">Department:</span> {requisitionData.department}
            </p>
            <p className="text-sm">
              <span className="font-medium">Travel Date:</span> {requisitionData.travelDate}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {requisitionData.stages.map((stage, index) => (
              <StatusStep
                key={index}
                title={stage.title}
                status={stage.status}
                icon={stage.icon}
                rejectionReason={stage.rejectionReason}
                isLast={index === requisitionData.stages.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
