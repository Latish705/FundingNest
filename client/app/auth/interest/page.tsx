"use client";
import { useState } from "react";
import { getCurrentUserToken } from "@/config/firebase";
import { BackendUrl } from "@/utils/contants";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronRight,
  Leaf,
  Lightbulb,
  Rocket,
  Building,
  Globe,
  Code,
  Zap,
  Heart,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InterestSelectionPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const categories = [
    { name: "Tech", icon: <Code className="h-4 w-4" /> },
    { name: "Consumer", icon: <Globe className="h-4 w-4" /> },
    { name: "Enterprise", icon: <Building className="h-4 w-4" /> },
    { name: "SaaS", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Marketplace", icon: <Rocket className="h-4 w-4" /> },
    { name: "Artificial Intelligence", icon: <Zap className="h-4 w-4" /> },
    { name: "Software", icon: <Lightbulb className="h-4 w-4" /> },
    { name: "Social Impact", icon: <Heart className="h-4 w-4" /> },
    { name: "Blockchain", icon: <Leaf className="h-4 w-4" /> },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const submitCategories = async () => {
    try {
      setIsSubmitting(true);
      const token = await getCurrentUserToken();
      await axios.post(
        `${BackendUrl}/api/user/register`,
        { interests: selectedCategories },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Redirect to dashboard or next step after successful submission
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Select Your Interests
            </CardTitle>
            <CardDescription>
              Choose sectors you're interested in to personalize your investment
              dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  type="button"
                  variant={
                    selectedCategories.includes(category.name)
                      ? "default"
                      : "outline"
                  }
                  className={cn(
                    "h-auto py-3 px-4 justify-start",
                    selectedCategories.includes(category.name)
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center">
                    <div className="mr-2">{category.icon}</div>
                    <span>{category.name}</span>
                    {selectedCategories.includes(category.name) && (
                      <Check className="h-4 w-4 ml-auto" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => router.push("/user/dashboard")}
            >
              Skip for now
            </Button>
            <Button
              onClick={submitCategories}
              className="w-full sm:w-auto"
              disabled={selectedCategories.length === 0 || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Continue"}
              {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>
            You can always update your interests later from your profile
            settings
          </p>
        </div>
      </div>
    </div>
  );
}
