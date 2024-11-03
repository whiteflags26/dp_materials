import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bus, Mail, Phone, User, Briefcase, Key } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    designation: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Bus className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Register to access IUT Transport Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faculty" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="faculty">Faculty/Staff</TabsTrigger>
              <TabsTrigger value="driver">Driver</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faculty">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-8"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">IUT Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      placeholder="your.name@iut-dhaka.edu"
                      type="email"
                      className="pl-8"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">CSE</SelectItem>
                        <SelectItem value="eee">EEE</SelectItem>
                        <SelectItem value="me">ME</SelectItem>
                        <SelectItem value="ce">CE</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, designation: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="associate_professor">Associate Professor</SelectItem>
                        <SelectItem value="assistant_professor">Assistant Professor</SelectItem>
                        <SelectItem value="lecturer">Lecturer</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="officer">Officer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Key className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-8"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Key className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="pl-8"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="driver">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="driverName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="driverName"
                      placeholder="Full Name"
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="phone"
                      placeholder="01XXXXXXXXX"
                      type="tel"
                      className="pl-8"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driverPassword">Password</Label>
                    <div className="relative">
                      <Key className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="driverPassword"
                        type="password"
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverConfirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Key className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="driverConfirmPassword"
                        type="password"
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Register</Button>
          <div className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
