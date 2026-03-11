import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  Lock, 
  CreditCard,
  Shield,
  Eye,
  Type,
  HelpCircle,
  MessageSquare,
  Save,
  Upload,
  Camera
} from "lucide-react";
import { Language } from "../data/translations";

interface GeneralSettingsProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function GeneralSettings({ language, onLanguageChange }: GeneralSettingsProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-5xl">
      <div className="mb-8">
        <h2 className="mb-2">General Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl">
                  🕉️
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h4 className="mb-1">Profile Picture</h4>
                <p className="text-sm text-muted-foreground mb-2">Upload a new profile picture</p>
                <Button size="sm" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" defaultValue="Devotee Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="your@email.com" className="pl-10" defaultValue="devotee@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="pl-10" defaultValue="+91 98765 43210" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Your city" defaultValue="Mumbai" />
              </div>
            </div>

            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Language & Theme Settings */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language Preference
              </CardTitle>
              <CardDescription>Choose your display language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Language</Label>
                <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🌐 English</SelectItem>
                    <SelectItem value="hi">🇮🇳 हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="ta">🇮🇳 தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="te">🇮🇳 తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</SelectItem>
                    <SelectItem value="ml">🇮🇳 മലയാളം (Malayalam)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Interface will be displayed in the selected language
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                Theme Settings
              </CardTitle>
              <CardDescription>Customize your visual experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-xs text-muted-foreground">
                      {isDarkMode ? "Dark theme enabled" : "Light theme active"}
                    </p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
              <p className="text-xs text-muted-foreground">
                Toggle between light and dark themes for better visibility
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Manage how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Get alerts via text message</p>
                  </div>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">App Notifications</p>
                    <p className="text-sm text-muted-foreground">Push notifications in the app</p>
                  </div>
                </div>
                <Switch checked={appNotifications} onCheckedChange={setAppNotifications} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Protect your account and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5" />
                    <h4>Change Password</h4>
                  </div>
                  <Button size="sm" variant="outline">Update</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last changed: 30 days ago
                </p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5" />
                    <div>
                      <h4>Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5" />
                    <div>
                      <h4>Saved Payment Methods</h4>
                      <p className="text-sm text-muted-foreground">
                        2 cards saved
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Accessibility Options
            </CardTitle>
            <CardDescription>Customize for better accessibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select value={fontSize} onValueChange={setFontSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (14px)</SelectItem>
                  <SelectItem value="medium">Medium (16px)</SelectItem>
                  <SelectItem value="large">Large (18px)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (20px)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">High Contrast Mode</p>
                  <p className="text-sm text-muted-foreground">Enhanced visibility for text</p>
                </div>
              </div>
              <Switch checked={highContrast} onCheckedChange={setHighContrast} />
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </CardTitle>
            <CardDescription>Get assistance and provide feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <MessageSquare className="h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <HelpCircle className="h-4 w-4" />
              FAQs & Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <MessageSquare className="h-4 w-4" />
              Send Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Save All Changes */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
