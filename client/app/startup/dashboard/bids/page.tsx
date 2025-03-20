"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BidsPage() {
  const bids = [
    {
      id: 1,
      investor: "Tech Ventures Capital",
      amount: "$500,000",
      equity: "8%",
      date: "2024-03-15",
      status: "Pending",
    },
    {
      id: 2,
      investor: "Growth Fund Partners",
      amount: "$750,000",
      equity: "12%",
      date: "2024-03-14",
      status: "Under Review",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Manage Bids
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Review and respond to investor bids
        </p>
      </div>

      <Card className="bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-700">
              <TableHead className="text-gray-900 dark:text-gray-200">
                Investor
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-200">
                Amount
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-200">
                Equity
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-200">
                Date
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-200">
                Status
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-200">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {bid.investor}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {bid.amount}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {bid.equity}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {bid.date}
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-300">
                  {bid.status}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">
                      Respond
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
