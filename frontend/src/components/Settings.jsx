import React, { useState } from 'react';
import { Bell, Lock, Mail, Globe, CreditCard, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Switch } from '../components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Textarea } from '../components/ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';

export function Settings() {
  const [settings, setSettings] = useState({
    storeName: 'My E-Commerce Store',
    storeEmail: 'admin@store.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    emailNotifications: true,
    orderNotifications: true,
    promotionalEmails: false,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl space-y-6 text-white">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white">
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-[#2a2a2a] data-[state=active]:text-white">
            Payment
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="bg-[#2a2a2a] rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Store Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="storeName" className="text-white">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  placeholder="Enter store name"
                  className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeEmail" className="text-white">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                    placeholder="store@example.com"
                    className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="storePhone" className="text-white">Phone</Label>
                  <Input
                    id="storePhone"
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="storeAddress" className="text-white">Store Address</Label>
                <Textarea
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                  placeholder="Enter your store address"
                  rows={3}
                  className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency" className="text-white">Currency</Label>
                  <Select value={settings.currency} onValueChange={(value) => setSettings({ ...settings, currency: value })}>
                    <SelectTrigger className="bg-[#2a2a2a] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700 text-white">
                      <SelectItem value="USD" className="text-white hover:bg-[#2a2a2a]">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR" className="text-white hover:bg-[#2a2a2a]">EUR - Euro</SelectItem>
                      <SelectItem value="GBP" className="text-white hover:bg-[#2a2a2a]">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY" className="text-white hover:bg-[#2a2a2a]">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-white">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings({ ...settings, timezone: value })}>
                    <SelectTrigger className="bg-[#2a2a2a] border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-gray-700 text-white">
                      <SelectItem value="America/New_York" className="text-white hover:bg-[#2a2a2a]">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago" className="text-white hover:bg-[#2a2a2a]">Central Time</SelectItem>
                      <SelectItem value="America/Denver" className="text-white hover:bg-[#2a2a2a]">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles" className="text-white hover:bg-[#2a2a2a]">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="language" className="text-white">Language</Label>
                <Select value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                  <SelectTrigger className="bg-[#2a2a2a] border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] border-gray-700 text-white">
                    <SelectItem value="en" className="text-white hover:bg-[#2a2a2a]">English</SelectItem>
                    <SelectItem value="es" className="text-white hover:bg-[#2a2a2a]">Spanish</SelectItem>
                    <SelectItem value="fr" className="text-white hover:bg-[#2a2a2a]">French</SelectItem>
                    <SelectItem value="de" className="text-white hover:bg-[#2a2a2a]">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                <Save size={18} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="bg-[#2a2a2a] rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex-1">
                  <h4 className="font-medium text-white">Email Notifications</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex-1">
                  <h4 className="font-medium text-white">Order Notifications</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Get notified when new orders are placed
                  </p>
                </div>
                <Switch
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex-1">
                  <h4 className="font-medium text-white">Promotional Emails</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Receive tips, tricks, and promotional content
                  </p>
                </div>
                <Switch
                  checked={settings.promotionalEmails}
                  onCheckedChange={(checked) => setSettings({ ...settings, promotionalEmails: checked })}
                />
              </div>

              <Button onClick={handleSave} className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                <Save size={18} className="mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <div className="bg-[#2a2a2a] rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Security Settings</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-gray-700">
                <div className="flex-1">
                  <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                />
              </div>

              <div>
                <h4 className="font-medium text-white mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      type="password" 
                      placeholder="Enter current password" 
                      className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword" className="text-white">New Password</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="Enter new password" 
                      className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm new password" 
                      className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <div className="bg-[#2a2a2a] rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-yellow-400" size={24} />
              <h3 className="text-lg font-semibold text-white">Payment Methods</h3>
            </div>

            <div className="space-y-6">
              <div className="p-4 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-[#2a2a2a] rounded flex items-center justify-center text-yellow-400 text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium text-white">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-300">Expires 12/2026</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-900 text-green-300 rounded-full">
                    Primary
                  </span>
                </div>
              </div>

              <div className="p-4 border border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-[#2a2a2a] rounded flex items-center justify-center text-yellow-400 text-xs font-bold">
                      MC
                    </div>
                    <div>
                      <p className="font-medium text-white">•••• •••• •••• 8888</p>
                      <p className="text-sm text-gray-300">Expires 08/2027</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium">
                + Add New Payment Method
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}