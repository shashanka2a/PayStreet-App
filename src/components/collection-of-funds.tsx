import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Wallet,
  DollarSign,
  Building2,
  ArrowRight,
  Shield,
  ArrowUpRight
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import type { Screen } from '@/types';

interface CollectionOfFundsProps {
  onNavigate: (screen: Screen) => void;
}

export function CollectionOfFunds({ onNavigate }: CollectionOfFundsProps) {
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('HSBC');
  const [currency, setCurrency] = useState('USD');

  const handleCollectFunds = () => {
    toast.success('Collection request initiated');
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
          <h1 className="font-clash text-white text-3xl mb-2">Collection of Funds</h1>
          <p className="text-gray-400">Collect payments from global clients securely</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => onNavigate('dashboard')}
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <Card className="p-6 bg-glassmorphic border-white/10 lg:col-span-2">
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-gray-300">Amount</Label>
              <div className="mt-2 flex gap-3">
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <select
                  className="bg-white/5 border border-white/10 text-white rounded-md px-3"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Receiving Bank</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {['HSBC', 'J.P. Morgan', 'Citibank', 'Barclays', 'Deutsche Bank', 'BNP Paribas'].map((bank) => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedBank === bank ? 'border-paystreet-green bg-paystreet-green/10' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-300" />
                      <span className="text-white text-sm">{bank}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-6 bg-white/10" />

            <div className="flex gap-3">
              <Button className="bg-paystreet-green hover:bg-paystreet-green/90 text-black" onClick={handleCollectFunds}>
                <Wallet className="h-4 w-4 mr-2" />
                Collect Funds
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <CreditCard className="h-4 w-4 mr-2" />
                Request Payment Link
              </Button>
            </div>
          </div>
        </Card>

        {/* Right: Summary */}
        <div className="space-y-6">
          <Card className="p-6 bg-glassmorphic border-white/10">
            <h3 className="text-white font-medium mb-4">Collection Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Bank</span>
                <span className="text-white">{selectedBank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="text-white">{amount || '0.00'} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fees</span>
                <span className="text-white">$2.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Time</span>
                <span className="text-white">2-3 business days</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-glassmorphic border-white/10">
            <h3 className="text-white font-medium mb-4">Security & Compliance</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-gray-300 text-sm">256-bit encryption for all transactions</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300 text-sm">Compliant with global AML/CFT regulations</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}