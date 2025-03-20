'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, TrendingUp } from 'lucide-react';

type Startup = {
  id: string;
  name: string;
  description: string;
  funding_goal: number;
  current_funding: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  founder: {
    email: string;
  };
};

// Mock data
const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    description: 'Sustainable energy solutions for homes',
    funding_goal: 500000,
    current_funding: 350000,
    status: 'approved',
    created_at: '2024-03-15',
    founder: {
      email: 'founder@ecotech.com',
    },
  },
  {
    id: '2',
    name: 'HealthAI',
    description: 'AI-powered health diagnostics',
    funding_goal: 1000000,
    current_funding: 750000,
    status: 'approved',
    created_at: '2024-03-14',
    founder: {
      email: 'founder@healthai.com',
    },
  },
  {
    id: '3',
    name: 'SmartFarm',
    description: 'IoT solutions for agriculture',
    funding_goal: 300000,
    current_funding: 50000,
    status: 'pending',
    created_at: '2024-03-13',
    founder: {
      email: 'founder@smartfarm.com',
    },
  },
  {
    id: '4',
    name: 'CyberShield',
    description: 'Next-gen cybersecurity platform',
    funding_goal: 800000,
    current_funding: 0,
    status: 'rejected',
    created_at: '2024-03-12',
    founder: {
      email: 'founder@cybershield.com',
    },
  },
  {
    id: '5',
    name: 'UrbanMobility',
    description: 'Electric vehicle sharing platform',
    funding_goal: 1500000,
    current_funding: 100000,
    status: 'pending',
    created_at: '2024-03-11',
    founder: {
      email: 'founder@urbanmobility.com',
    },
  },
];

export default function StartupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [startups, setStartups] = useState<Startup[]>(mockStartups);

  const filteredStartups = startups.filter((startup) =>
    startup.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFunding = startups.reduce(
    (sum, startup) => sum + startup.current_funding,
    0
  );

  const approvedStartups = startups.filter(
    (startup) => startup.status === 'approved'
  ).length;

  const pendingStartups = startups.filter(
    (startup) => startup.status === 'pending'
  ).length;

  const handleStatusChange = (startupId: string, newStatus: 'approved' | 'rejected') => {
    setStartups(startups.map(startup => 
      startup.id === startupId 
        ? { ...startup, status: newStatus }
        : startup
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFunding.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedStartups}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingStartups}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Startups</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>Add Startup</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Founder</TableHead>
              <TableHead>Funding Goal</TableHead>
              <TableHead>Current Funding</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStartups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No startups found
                </TableCell>
              </TableRow>
            ) : (
              filteredStartups.map((startup) => (
                <TableRow key={startup.id}>
                  <TableCell className="font-medium">{startup.name}</TableCell>
                  <TableCell>{startup.founder.email}</TableCell>
                  <TableCell>${startup.funding_goal.toLocaleString()}</TableCell>
                  <TableCell>${startup.current_funding.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        startup.status === 'approved'
                          ? 'success'
                          : startup.status === 'rejected'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {startup.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(startup.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Startup</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(startup.id, 'approved')}>
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(startup.id, 'rejected')}
                          className="text-destructive"
                        >
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}