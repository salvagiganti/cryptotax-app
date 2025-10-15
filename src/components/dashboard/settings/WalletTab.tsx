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
import { Separator } from "@/components/ui/separator";
import { 
  WalletConnection, 
  Blockchain, 
  WalletType, 
  HardwareWallet,
  BLOCKCHAIN_INFO, 
  HARDWARE_WALLET_INFO 
} from "@/types/settings";
import { toast } from "sonner";
import { Plus, ExternalLink, Trash2, Wallet, Cpu } from "lucide-react";

const walletConnectionSchema = z.object({
  address: z.string().min(1, "Wallet address is required"),
  blockchain: z.nativeEnum(Blockchain),
  label: z.string().optional(),
  auto_sync: z.boolean().default(true),
});

type WalletConnectionFormValues = z.infer<typeof walletConnectionSchema>;

export interface WalletTabProps {
  connections?: WalletConnection[];
  onAddWallet?: (data: WalletConnectionFormValues) => Promise<void>;
  onRemoveWallet?: (walletId: string) => Promise<void>;
  onConnectHardwareWallet?: (wallet: HardwareWallet) => Promise<void>;
  onDisconnectHardwareWallet?: (wallet: HardwareWallet) => Promise<void>;
}

export function WalletTab({ 
  connections = [], 
  onAddWallet,
  onRemoveWallet,
  onConnectHardwareWallet,
  onDisconnectHardwareWallet
}: WalletTabProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<WalletConnectionFormValues>({
    resolver: zodResolver(walletConnectionSchema),
    defaultValues: {
      address: "",
      blockchain: Blockchain.ETHEREUM,
      label: "",
      auto_sync: true,
    },
  });

  const onSubmit = async (values: WalletConnectionFormValues) => {
    try {
      setLoading(true);
      if (onAddWallet) {
        await onAddWallet(values);
        toast.success("Wallet added successfully");
        form.reset();
        setOpen(false);
      } else {
        // Mock addition for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Wallet added successfully");
        form.reset();
        setOpen(false);
      }
    } catch (error) {
      toast.error("Failed to add wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWallet = async (walletId: string) => {
    try {
      if (onRemoveWallet) {
        await onRemoveWallet(walletId);
        toast.success("Wallet removed successfully");
      } else {
        // Mock removal for demo
        toast.success("Wallet removed successfully");
      }
    } catch (error) {
      toast.error("Failed to remove wallet");
    }
  };

  const handleHardwareWallet = async (wallet: HardwareWallet, action: 'connect' | 'disconnect') => {
    try {
      if (action === 'connect' && onConnectHardwareWallet) {
        await onConnectHardwareWallet(wallet);
        toast.success(`${HARDWARE_WALLET_INFO[wallet].name} connected successfully`);
      } else if (action === 'disconnect' && onDisconnectHardwareWallet) {
        await onDisconnectHardwareWallet(wallet);
        toast.success(`${HARDWARE_WALLET_INFO[wallet].name} disconnected successfully`);
      } else {
        // Mock action for demo
        toast.success(`${HARDWARE_WALLET_INFO[wallet].name} ${action}ed successfully`);
      }
    } catch (error) {
      toast.error(`Failed to ${action} ${HARDWARE_WALLET_INFO[wallet].name}`);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Hardware Wallets */}
      <div>
        <h3 className="text-lg font-medium mb-4">Hardware Wallets</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.values(HardwareWallet).map((wallet) => {
            const info = HARDWARE_WALLET_INFO[wallet];
            const isConnected = false; // Mock status
            
            return (
              <Card key={wallet}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      {info.name}
                    </CardTitle>
                    <Badge variant={isConnected ? "default" : "secondary"}>
                      {isConnected ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {info.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={isConnected ? "outline" : "default"}
                      className="flex-1"
                      onClick={() => handleHardwareWallet(wallet, isConnected ? 'disconnect' : 'connect')}
                    >
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Software Wallets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Software Wallets</h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Wallet Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Wallet Address</DialogTitle>
                <DialogDescription>
                  Add a wallet address to track transactions automatically.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet Name/Label</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., My Ethereum Wallet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="blockchain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blockchain</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blockchain" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(Blockchain).map((blockchain) => (
                              <SelectItem key={blockchain} value={blockchain}>
                                {BLOCKCHAIN_INFO[blockchain].name}
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wallet Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter wallet address" {...field} />
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
                      {loading ? "Adding..." : "Add Wallet"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {connections.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wallet className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No wallets connected</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Add your wallet addresses to automatically track transactions and calculate taxes.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {connections.map((wallet) => (
              <Card key={wallet.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{wallet.label || "Unnamed Wallet"}</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {truncateAddress(wallet.address)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {BLOCKCHAIN_INFO[wallet.blockchain].name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={wallet.is_connected ? "default" : "secondary"}>
                        {wallet.is_connected ? "Connected" : "Not Connected"}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveWallet(wallet.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
