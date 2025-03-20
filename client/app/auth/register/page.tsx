"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackendUrl } from "@/utils/contants";
import { getCurrentUserToken, signInWithGoogle } from "@/config/firebase";

// User role selection component
const RoleSelector = ({
  selectedRole,
  onRoleSelect,
}: {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">I am a...</h3>
      <div className="grid grid-cols-1 gap-3">
        <RoleCard
          title="Investor"
          description="I want to invest in startups"
          isSelected={selectedRole === "investor"}
          onClick={() => onRoleSelect("investor")}
        />
        <RoleCard
          title="Startup Founder"
          description="I want to showcase my startup"
          isSelected={selectedRole === "startup"}
          onClick={() => onRoleSelect("startup")}
        />
        <RoleCard
          title="Financial Advisor"
          description="I provide financial expertise"
          isSelected={selectedRole === "advisor"}
          onClick={() => onRoleSelect("advisor")}
        />
      </div>
    </div>
  );
};

// Individual role card component
const RoleCard = ({
  title,
  description,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected
          ? "border-primary bg-primary/10 ring-2 ring-primary"
          : "border-border hover:border-primary/50"
      }`}
      onClick={onClick}
    >
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

// Form schema for personal details
const personalDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const form = useForm<z.infer<typeof personalDetailsSchema>>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const proceedToDetailsStep = () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }
    setStep(2);
  };

  const userGoogleRegister = async () => {
    try {
      if (!selectedRole) {
        toast.error("Please select a role first");
        return;
      }

      signInWithGoogle();
      const token = await getCurrentUserToken();
      console.log("loggin success" + token);

      router.push("/auth/interest");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Google login failed");
    }
  };

  const startupRegister = async () => {
    try {
      if (!selectedRole) {
        toast.error("Please select a role first");
        return;
      }
      const token = await getCurrentUserToken();
      console.log("loggin success" + token);

      router.push("/auth/startupData");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Google login failed");
    }
  };

  const advisorRegister = async () => {
    try {
      if (!selectedRole) {
        toast.error("Please select a role first");
        return;
      }
      const token = await getCurrentUserToken();
      console.log("loggin success" + token);

      router.push("/auth/request");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Google login failed");
    }
  };

  async function onSubmit(values: z.infer<typeof personalDetailsSchema>) {
    if (!selectedRole) {
      toast.error("Role selection is required");
      return;
    }

    try {
      setIsLoading(true);

      // Combine role with personal details
      const userData = {
        ...values,
        role: selectedRole,
      };

      // Here you would normally send registration data to your backend
      // const response = await axios.post(`${BackendUrl}/auth/register`, userData);

      // Redirect based on role
      if (selectedRole === "investor") {
        router.push("/user/interest");
      } else if (selectedRole === "startup") {
        router.push("/auth/startupData");
      } else if (selectedRole === "advisor") {
        router.push("/admin/request");
      } else if (values.role === "admin") {
        router.push("/auth/request");
      }

      toast.success("Welcome to StartupFund!");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Join StartupFund to connect with startups and investors
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <>
              <RoleSelector
                selectedRole={selectedRole}
                onRoleSelect={handleRoleSelect}
              />
              <Button className="w-full mt-6" onClick={proceedToDetailsStep}>
                Continue
              </Button>
            </>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="bg-muted p-3 rounded-md mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Selected role: </span>
                    <span className="text-primary font-semibold capitalize">
                      {selectedRole}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                    Change
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => userGoogleRegister()}
          >
            Continue with Google
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => router.push("/auth/login")}
            >
              Sign in
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
