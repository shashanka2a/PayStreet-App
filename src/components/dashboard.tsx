import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpDown, 
  Send, 
  Download, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Screen } from '@/types';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
}

const walletData = [
  { currency: 'USD', balance: 24580.00, flag: '🇺🇸', change: '+2.5%', converted: '₹20,45,670' },
  { currency: 'EUR', balance: 8420.50, flag: '🇪🇺', change: '+1.8%', converted: '₹7,42,805' },
  { currency: 'GBP', balance: 5230.75, flag: '🇬🇧', change: '-0.3%', converted: '₹5,48,230' },
  { currency: 'JPY', balance: 1250000, flag: '🇯🇵', change: '+3.2%', converted: '₹7,12,500' },
];

const recentTransactions = [
  { id: 'TXN001', recipient: 'Microsoft Corporation', amount: '$12,500.00', status: 'completed', date: '2 hours ago', method: 'SWIFT' },
  { id: 'TXN002', recipient: 'Shopify Inc.', amount: '€3,200.50', status: 'pending', date: '5 hours ago', method: 'SEPA' },
  { id: 'TXN003', recipient: 'Amazon Web Services', amount: '$8,750.00', status: 'completed', date: '1 day ago', method: 'ACH' },
  { id: 'TXN004', recipient: 'Google Cloud Platform', amount: '£2,450.75', status: 'failed', date: '2 days ago', method: 'Faster Payments' },
  { id: 'TXN005', recipient: 'Adobe Systems', amount: '$5,680.00', status: 'completed', date: '3 days ago', method: 'SWIFT' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  return (
    <div className="p-6 space-y-6 pt-22">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-clash text-white text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your global payments and currency conversion</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={() => onNavigate('conversion')}
            className="bg-paystreet-green hover:bg-paystreet-green-hover text-black"
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Convert
          </Button>
          <Button
            onClick={() => onNavigate('send')}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Money
          </Button>
        </div>
      </motion.div>

      {/* Wallet Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-clash text-white text-xl">Multi-Currency Wallets</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setBalanceVisible(!balanceVisible)}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {walletData.map((wallet, index) => (
            <motion.div
              key={wallet.currency}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{wallet.flag}</span>
                    <span className="text-white font-medium">{wallet.currency}</span>
                  </div>
                  <Badge 
                    variant={wallet.change.startsWith('+') ? 'default' : 'destructive'}
                    className={wallet.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : ''}
                  >
                    {wallet.change}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-clash text-white">
                    {balanceVisible 
                      ? `${wallet.currency === 'JPY' ? '¥' : wallet.currency === 'EUR' ? '€' : wallet.currency === 'GBP' ? '£' : '$'}${wallet.balance.toLocaleString()}`
                      : '••••••'
                    }
                  </div>
                  <div className="text-sm text-gray-400">
                    {balanceVisible ? `≈ ${wallet.converted}` : '≈ ••••••'}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-paystreet-green hover:bg-paystreet-green/10"
                  onClick={() => onNavigate('conversion')}
                >
                  Convert {wallet.currency}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="font-clash text-white text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="p-6 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate('send')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-paystreet-green/20 flex items-center justify-center group-hover:bg-paystreet-green/30 transition-colors">
                <Send className="h-6 w-6 text-paystreet-green" />
              </div>
              <div>
                <h3 className="text-white font-medium">Send Money</h3>
                <p className="text-gray-400 text-sm">Transfer to beneficiaries</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate('collect')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Download className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Collect Funds</h3>
                <p className="text-gray-400 text-sm">Receive payments</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate('analytics')}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Analytics</h3>
                <p className="text-gray-400 text-sm">View insights</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <h2 className="font-clash text-white text-xl">Recent Transactions</h2>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                className="pl-10 w-64 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Select>
              <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="bg-glassmorphic border-white/10">
          <div className="divide-y divide-white/10">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                    </div>
                    <div>
                      <div className="text-white font-medium">{transaction.recipient}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-2">
                        <span>{transaction.id}</span>
                        <span>•</span>
                        <span>{transaction.method}</span>
                        <span>•</span>
                        <span>{transaction.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-white font-medium">{transaction.amount}</div>
                      <Badge className={`${getStatusBadge(transaction.status)} text-xs`}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}