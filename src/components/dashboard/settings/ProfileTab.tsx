"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/types/settings";
import { toast } from "sonner";
import { Key } from "lucide-react";

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required").max(100, "Name is too long"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export interface ProfileTabProps {
  profile?: UserProfile;
  onUpdateProfile?: (data: ProfileFormValues) => Promise<void>;
}

export function ProfileTab({ profile, onUpdateProfile }: ProfileTabProps) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setLoading(true);
      if (onUpdateProfile) {
        await onUpdateProfile(values);
        toast.success("Profile updated successfully");
      } else {
        // Mock update for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    // This would open a change password dialog
    toast.info("Change password feature coming soon");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and account settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Email Address</FormLabel>
                <Input
                  value={profile?.email || ""}
                  disabled
                  className="bg-muted"
                />
                <p className="text-sm text-muted-foreground">
                  Email address cannot be changed. Contact support if you need to update it.
                </p>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your account security settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Password</h4>
              <p className="text-sm text-muted-foreground">
                Change your account password
              </p>
            </div>
            <Button variant="outline" onClick={handleChangePassword}>
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
