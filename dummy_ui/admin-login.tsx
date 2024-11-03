import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Access</CardTitle>
          <CardDescription className="text-center">
            Restricted to authorized administrators only
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Admin Password</Label>
            <div className="relative">
              <Key className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type="password"
                className="pl-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-red-600 hover:bg-red-700">
            Authenticate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
