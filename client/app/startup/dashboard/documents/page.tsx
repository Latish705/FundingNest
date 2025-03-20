"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Trash2 } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Business Plan.pdf",
      size: "2.4 MB",
      uploadedAt: "2024-03-15",
      type: "PDF",
    },
    {
      id: 2,
      name: "Financial Projections.xlsx",
      size: "1.8 MB",
      uploadedAt: "2024-03-14",
      type: "Spreadsheet",
    },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <p className="text-gray-500">Upload and manage your startup documents</p>
      </div>

      <Card className="p-6">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              multiple
              onChange={(e) => {
                // Handle file upload
                console.log(e.target.files);
              }}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="mt-2">
                Upload Documents
              </Button>
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop files here, or click to select files
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Uploaded Documents
          </h3>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.size} • Uploaded on {doc.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}