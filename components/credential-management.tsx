"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Lock, 
  Key, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2, 
  Edit2,
  CheckCircle,
  AlertCircle,
  Fingerprint,
  Smartphone,
  Chrome,
  Globe,
  Mail,
  User
} from "lucide-react"

interface Credential {
  id: string
  type: 'password' | 'payment'
  name: string
  website?: string
  username?: string
  lastUsed?: Date
  cardLast4?: string
  cardType?: string
}

export function CredentialManagement() {
  const [showPasswords, setShowPasswords] = useState(false)
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: '1',
      type: 'password',
      name: 'Google Account',
      website: 'google.com',
      username: 'user@gmail.com',
      lastUsed: new Date('2025-01-06')
    },
    {
      id: '2',
      type: 'password',
      name: 'LinkedIn',
      website: 'linkedin.com',
      username: 'professional@email.com',
      lastUsed: new Date('2025-01-05')
    },
    {
      id: '3',
      type: 'payment',
      name: 'Primary Card',
      cardLast4: '4242',
      cardType: 'Visa',
      lastUsed: new Date('2025-01-04')
    },
    {
      id: '4',
      type: 'payment',
      name: 'Business Card',
      cardLast4: '8888',
      cardType: 'Mastercard',
      lastUsed: new Date('2025-01-03')
    }
  ])

  const passwords = credentials.filter(c => c.type === 'password')
  const payments = credentials.filter(c => c.type === 'payment')

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Credential Management</h2>
        <p className="text-muted-foreground">
          Secure, encrypted storage for passwords and payment methods with biometric protection
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5 text-purple-600" />
              Password Vault
            </CardTitle>
            <CardDescription>
              Securely stored passwords with automatic form filling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Lock className="w-3 h-3 mr-1" />
                  256-bit AES Encrypted
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <Fingerprint className="w-3 h-3 mr-1" />
                  Biometric Protected
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>

            <div className="space-y-3">
              {passwords.map((cred) => (
                <div key={cred.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border">
                        {cred.website?.includes('google') ? (
                          <Chrome className="w-5 h-5 text-blue-500" />
                        ) : cred.website?.includes('linkedin') ? (
                          <Globe className="w-5 h-5 text-blue-700" />
                        ) : (
                          <Globe className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{cred.name}</h4>
                        <p className="text-sm text-muted-foreground">{cred.username}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last used: {cred.lastUsed?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {showPasswords && (
                    <div className="mt-3 p-2 bg-white rounded border border-slate-200">
                      <code className="text-xs">••••••••••••</code>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Password</DialogTitle>
                  <DialogDescription>
                    Securely store a new password in your vault
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="example.com" />
                  </div>
                  <div>
                    <Label htmlFor="username">Username/Email</Label>
                    <Input id="username" placeholder="user@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Lock className="w-4 h-4 mr-2" />
                    Save Securely
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              Secure payment storage with PCI DSS compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Shield className="w-3 h-3 mr-1" />
                  PCI DSS Compliant
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  <Smartphone className="w-3 h-3 mr-1" />
                  3D Secure
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              {payments.map((cred) => (
                <div key={cred.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{cred.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cred.cardType} •••• {cred.cardLast4}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last used: {cred.lastUsed?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Securely store a payment method for faster checkout
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardname">Card Name</Label>
                    <Input id="cardname" placeholder="Personal Card" />
                  </div>
                  <div>
                    <Label htmlFor="cardnumber">Card Number</Label>
                    <Input id="cardnumber" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Save Securely
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Security Features</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">End-to-end encryption with 256-bit AES</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Biometric authentication (Face ID / Touch ID)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Zero-knowledge architecture - we never see your data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Automatic form detection and secure autofill</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-600 text-white">
                <Shield className="w-3 h-3 mr-1" />
                Bank-Level Security
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}