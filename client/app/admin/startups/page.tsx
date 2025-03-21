"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Startup {
  _id: string;
  company_name: string;
  unified_sector: string;
  total_equity_funding: number;
  latest_post_money_valuation: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function AdminStartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/startups");
        
        if (!response.ok) {
          throw new Error("Failed to fetch startups");
        }
        
        const data = await response.json();
        setStartups(data.startups);
      } catch (error: any) {
        setError(error.message || "Failed to load startups");
      } finally {
        setLoading(false);
      }
    };
    
    fetchStartups();
  }, []);

  const filteredStartups = startups.filter(startup => 
    startup.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.unified_sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (startupId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/startups/${startupId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update status");
      }

      setStartups(prevStartups => 
        prevStartups.map(startup => 
          startup._id === startupId ? { ...startup, status: newStatus } : startup
        )
      );

      toast.success(`Startup ${newStatus} successfully`);
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const totalFunding = startups.reduce(
    (sum, startup) => sum + (startup.total_equity_funding || 0),
    0
  );

  const approvedStartups = startups.filter(
    (startup) => startup.status === 'approved'
  ).length;

  const pendingStartups = startups.filter(
    (startup) => startup.status === 'pending'
  ).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/admin/startups/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Startup
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Funding</TableHead>
              <TableHead>Valuation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : filteredStartups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No startups found
                </TableCell>
              </TableRow>
            ) : (
              filteredStartups.map((startup) => (
                <TableRow key={startup._id}>
                  <TableCell className="font-medium">{startup.company_name}</TableCell>
                  <TableCell>{startup.unified_sector}</TableCell>
                  <TableCell>${startup.total_equity_funding?.toLocaleString() || 0}</TableCell>
                  <TableCell>${startup.latest_post_money_valuation?.toLocaleString() || 0}</TableCell>
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
                        <DropdownMenuItem>
                          <Link href={`/admin/startups/${startup._id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/admin/startups/${startup._id}/edit`}>Edit Startup</Link>
                        </DropdownMenuItem>
                        {startup.status === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusChange(startup._id, 'approved')}>
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(startup._id, 'rejected')}
                              className="text-destructive"
                            >
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
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