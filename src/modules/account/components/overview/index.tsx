"use client"

import { useState } from 'react'
import { User, MapPin, Package, LogOut } from 'lucide-react'
import { Button } from '@modules/layout/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@modules/layout/components/ui/card'
import { Input } from '@modules/layout/components/ui/input'
import { Label } from '@modules/layout/components/ui/label'

export default function AccountManagement({ customer, orders }: any) {
  const [activeTab, setActiveTab] = useState('overview')

  const getProfileCompletion = () => {
    let count = 0
    if (customer.email) count++
    if (customer.first_name && customer.last_name) count++
    if (customer.phone) count++
    if (customer.billing_address) count++
    return (count / 4) * 100
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getProfileCompletion()}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Saved Addresses</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customer.shipping_addresses?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
              </CardContent>
            </Card>
          </div>
        )
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={customer.first_name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={customer.last_name} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={customer.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue={customer.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        )
      case 'addresses':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Shipping Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              {customer.shipping_addresses && customer.shipping_addresses.length > 0 ? (
                <div className="space-y-4">
                  {customer.shipping_addresses.map((address: any, index: any) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <p className="font-semibold">{address.first_name} {address.last_name}</p>
                        <p>{address.address_1}</p>
                        <p>{address.city}, {address.postal_code}</p>
                        <p>{address.country}</p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No addresses saved yet.</p>
              )}
              <Button className="mt-4">Add New Address</Button>
            </CardContent>
          </Card>
        )
      case 'orders':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order: any, index: any) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p>Total: ${order.total}</p>
                      </div>
                      <Button variant="outline">View Details</Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No orders yet.</p>
              )}
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="relative right-24 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hello {customer.first_name}</h1>
        <p className="text-sm text-gray-500">
          Signed in as: <span className="font-semibold">{customer.email}</span>
        </p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 space-y-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('overview')}
          >
            <User className="mr-2 h-4 w-4" /> Overview
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('profile')}
          >
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button
            variant={activeTab === 'addresses' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin className="mr-2 h-4 w-4" /> Addresses
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('orders')}
          >
            <Package className="mr-2 h-4 w-4" /> Orders
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => console.log('Logout')}>
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Button>
        </div>

        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}