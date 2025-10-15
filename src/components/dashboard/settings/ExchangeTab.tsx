"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExchangeType, APIConnection, EXCHANGE_INFO } from "@/types/settings";
import { toast } from "sonner";
import { Plus, ExternalLink, Trash2 } from "lucide-react";

const apiConnectionSchema = z.object({
  exchange: z.nativeEnum(ExchangeType),
  api_key: z.string().min(1, "API Key is required"),
  api_secret: z.string().min(1, "API Secret is required"),
});

type APIConnectionFormValues = z.infer<typeof apiConnectionSchema>;

export interface ExchangeTabProps {
  connections?: APIConnection[];
  onConnectExchange?: (data: APIConnectionFormValues) => Promise<void>;
  onDisconnectExchange?: (connectionId: string) => Promise<void>;
}

export function ExchangeTab({ 
  connections = [], 
  onConnectExchange, 
  onDisconnectExchange 
}: ExchangeTabProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<APIConnectionFormValues>({
    resolver: zodResolver(apiConnectionSchema),
    defaultValues: {
      exchange: ExchangeType.BINANCE,
      api_key: "",
      api_secret: "",
    },
  });

  const onSubmit = async (values: APIConnectionFormValues) => {
    try {
      setLoading(true);
      if (onConnectExchange) {
        await onConnectExchange(values);
        toast.success("Exchange connected successfully");
        form.reset();
        setOpen(false);
      } else {
        // Mock connection for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Exchange connected successfully");
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to connect exchange");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      if (onDisconnectExchange) {
        await onDisconnectExchange(connectionId);
        toast.success("Exchange disconnected successfully");
      } else {
        // Mock disconnection for demo
        toast.success("Exchange disconnected successfully");
      }
    } catch (error) {
      toast.error("Failed to disconnect exchange");
    }
  };

  const getConnectionStatus = (exchange: ExchangeType) => {
    const connection = connections.find(c => c.exchange === exchange);
    return connection ? {
      isConnected: connection.is_connected,
      lastSync: connection.last_sync,
    } : { isConnected: false, lastSync: null };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Exchange Connections</h3>
          <p className="text-sm text-muted-foreground">
            Connect your exchange accounts to automatically import trading history.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Connect Exchange</DialogTitle>
              <DialogDescription>
                Add your API credentials to connect your exchange account.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="exchange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exchange</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exchange" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ExchangeType).map((exchange) => (
                            <SelectItem key={exchange} value={exchange}>
                              {EXCHANGE_INFO[exchange].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="api_key"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your API key" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="api_secret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Secret</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your API secret" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Connecting..." : "Connect Exchange"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(ExchangeType).map((exchange) => {
          const status = getConnectionStatus(exchange);
          const info = EXCHANGE_INFO[exchange];
          
          return (
            <Card key={exchange}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{info.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={status.isConnected ? "default" : "secondary"}>
                      {status.isConnected ? "Connected" : "Not Connected"}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  {info.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status.isConnected ? (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Last sync: {status.lastSync ? new Date(status.lastSync).toLocaleDateString() : "Never"}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Sync Now
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDisconnect("mock-id")}
                        className="px-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => setOpen(true)}
                  >
                    Connect
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
