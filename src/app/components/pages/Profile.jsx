import { useState, useEffect } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Shield,
  Eye,
  Globe,
  Trash2,
  Save,
  Camera,
  AlertTriangle,
  CheckCircle,
  LogOut,
  Download,
  Loader2,
  Award,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export function Profile() {
  const [userData, setUserData] = useState({
    name: 'Ahmed Rahman',
    email: 'ahmed.rahman@email.com',
    phone: '+880 1712-345678',
    location: 'Dhaka, Bangladesh',
    joinedDate: '2025-11-15',
    reportsSubmitted: 12,
    reportsResolved: 8
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    reportStatus: true,
    weeklyDigest: true,
    emergencyAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    showActivity: false,
    allowAnalytics: true,
    dataSharing: false
  });

  const [language, setLanguage] = useState('en');
  const [savedMessage, setSavedMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sync with localStorage if available
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    if (savedName || savedEmail) {
      setUserData(prev => ({
        ...prev,
        name: savedName || prev.name,
        email: savedEmail || prev.email
      }));
    }

    // Simulate API Connection
    const fetchSettings = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
      } catch (error) {
        console.error('API Connection failed:', error);
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = () => {
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">My Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your personal information and account preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
              <GlassCard className="p-6 sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
                      <Camera className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-1">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{userData.email}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <Badge className="bg-primary/10 text-primary border-primary/20 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>

                  <div className="w-full space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm p-2 bg-card/40 rounded-lg border border-border">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Joined
                      </div>
                      <span className="font-medium text-green-500">{new Date(userData.joinedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="p-3 bg-card/30 border border-border rounded-lg">
                      <div className="text-xl font-bold text-foreground">{userData.reportsSubmitted}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Reports</div>
                    </div>
                    <div className="p-3 bg-card/30 border border-border rounded-lg">
                      <div className="text-xl font-bold text-foreground">{userData.reportsResolved}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Resolved</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Right Side - Profile Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8"
            >
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="flex bg-card/40 border border-border p-1 gap-1 overflow-x-auto no-scrollbar">
                  <TabsTrigger value="personal" className="flex-1 text-xs sm:text-sm py-2">Personal Info</TabsTrigger>
                  <TabsTrigger value="security" className="flex-1 text-xs sm:text-sm py-2">Security</TabsTrigger>
                  <TabsTrigger value="notifications" className="flex-1 text-xs sm:text-sm py-2">Notifications</TabsTrigger>
                  <TabsTrigger value="preferences" className="flex-1 text-xs sm:text-sm py-2">Preferences</TabsTrigger>
                </TabsList>

                <GlassCard className="p-6">
                  {/* Personal Info */}
                  <TabsContent value="personal" className="mt-0 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
                      <Button onClick={handleSave} size="sm" className="bg-primary hover:bg-primary/90 text-xs h-8">
                        <Save className="w-3 h-3 mr-2" />
                        Save Changes
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-xs">Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={userData.location}
                            onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                            className="pl-10 h-10 text-sm bg-input border-border"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Security */}
                  <TabsContent value="security" className="mt-0 space-y-6">
                    <h3 className="text-lg font-bold text-foreground">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword" className="text-xs">Current Password</Label>
                          <Input id="currentPassword" type="password" className="h-10 text-sm bg-input border-border" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-xs">New Password</Label>
                            <Input id="newPassword" type="password" className="h-10 text-sm bg-input border-border" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-xs">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" className="h-10 text-sm bg-input border-border" />
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs">Update Password</Button>
                    </div>

                    <Separator className="bg-border" />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-semibold">Two-Factor Authentication</h4>
                        <p className="text-xs text-muted-foreground">Secure your account with 2FA</p>
                      </div>
                      <Switch />
                    </div>
                  </TabsContent>

                  {/* Notifications */}
                  <TabsContent value="notifications" className="mt-0 space-y-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'email', label: 'Email Updates', desc: 'Receive platform updates via email', checked: notifications.emailUpdates },
                        { id: 'sms', label: 'SMS Alerts', desc: 'Get critical text message alerts', checked: notifications.smsAlerts },
                        { id: 'reports', label: 'Report Status', desc: 'Notify when report status changes', checked: notifications.reportStatus }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-border/50">
                          <div className="space-y-0.5">
                            <Label htmlFor={item.id} className="text-sm font-medium">{item.label}</Label>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <Switch id={item.id} checked={item.checked} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Preferences */}
                  <TabsContent value="preferences" className="mt-0 space-y-4">
                    <h3 className="text-lg font-bold text-foreground">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium">Language</Label>
                          <p className="text-xs text-muted-foreground">Select your preferred interface language</p>
                        </div>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="bg-input border border-border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="en">English</option>
                          <option value="bn">Bangla</option>
                        </select>
                      </div>
                      <Separator className="bg-border" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm font-medium text-destructive">Delete Account</Label>
                          <p className="text-xs text-muted-foreground">Permanently remove your account and data</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10 text-xs">
                          <Trash2 className="w-3 h-3 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </GlassCard>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      {savedMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-lg shadow-lg flex items-center space-x-2 z-50"
        >
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm">Profile updated successfully!</span>
        </motion.div>
      )}
    </div>
  );
}
