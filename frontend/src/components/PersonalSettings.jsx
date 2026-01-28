import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';

export function PersonalSettings() {
  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    bio: 'E-commerce admin managing store operations.',
  });

  const handleSave = () => {
    alert('Personal settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Personal Settings</h2>
        <p className="text-gray-400">Manage your personal information and preferences</p>
      </div>

      {/* Profile Picture */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-black text-3xl font-bold">
            AD
          </div>
          <div>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium mb-2">
              <Camera size={18} className="mr-2" />
              Upload New Photo
            </Button>
            <p className="text-sm text-gray-400">JPG, PNG or GIF. Max size of 5MB.</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User size={20} className="text-yellow-400" />
          Personal Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">First Name</Label>
              <Input
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="bg-[#1a1a1a] border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Last Name</Label>
              <Input
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="bg-[#1a1a1a] border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              <Mail size={16} />
              Email Address
            </Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              <Phone size={16} />
              Phone Number
            </Label>
            <Input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="bg-[#1a1a1a] border-gray-700 text-white"
            />
          </div>

          <div>
            <Label className="text-gray-300 flex items-center gap-2">
              <MapPin size={16} />
              Address
            </Label>
            <Textarea
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="bg-[#1a1a1a] border-gray-700 text-white"
              rows={2}
            />
          </div>

          <div>
            <Label className="text-gray-300">Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="bg-[#1a1a1a] border-gray-700 text-white"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-gray-300">Current Password</Label>
            <Input
              type="password"
              placeholder="Enter current password"
              className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Label className="text-gray-300">New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <div>
            <Label className="text-gray-300">Confirm New Password</Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
            Update Password
          </Button>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
          <Save size={18} className="mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
