import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpDown, 
  Clock, 
  CheckCircle, 
  Download, 
  Share, 
  Lock,
  Crown,
  RefreshCw
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import type { Screen } from '@/types';

interface CurrencyConversionProps {
  onNavigate: (screen: Screen) => void;
}

type ConversionStep = 'quote' | 'review' | 'complete';

interface ConversionData {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  rate: number;
  markup: number;
  fee: number;
  convertedAmount: number;
  referenceId?: string;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', balance: 24580.00 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', balance: 8420.50 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', balance: 5230.75 },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', balance: 1250000 },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', balance: 0 },
];

export function CurrencyConversion({ onNavigate }: CurrencyConversionProps) {
  const [currentStep, setCurrentStep] = useState<ConversionStep>('quote');
  const [timer, setTimer] = useState(300); // 5 minutes
  const [rateLocked, setRateLocked] = useState(false);
  
  const [conversionData, setConversionData] = useState<ConversionData>({
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    amount: '',
    rate: 0.85,
    markup: 0.5,
    fee: 5.00,
    convertedAmount: 0
  });

  useEffect(() => {
    if (currentStep === 'review' && !rateLocked) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCurrentStep('quote');
            return 300;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentStep, rateLocked]);

  useEffect(() => {
    if (conversionData.amount) {
      const amount = parseFloat(conversionData.amount);
      const converted = amount * conversionData.rate;
      const finalAmount = converted - conversionData.fee;
      setConversionData(prev => ({ ...prev, convertedAmount: Math.max(0, finalAmount) }));
    }
  }, [conversionData.amount, conversionData.rate, conversionData.fee]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGetQuote = () => {
    if (conversionData.amount && parseFloat(conversionData.amount) > 0) {
      setCurrentStep('review');
      setTimer(300);
    }
  };

  const handleConfirmConversion = () => {
    const referenceId = `CNV${Date.now().toString().slice(-8)}`;
    setConversionData(prev => ({ ...prev, referenceId }));
    setCurrentStep('complete');
  };

  const handleLockRate = () => {
    setRateLocked(true);
    setTimer(300); // Reset to 5 minutes
  };

  const swapCurrencies = () => {
    setConversionData(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
      rate: 1 / prev.rate
    }));
  };

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code);
  };

  const renderQuoteStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-2xl mx-auto p-8 bg-glassmorphic border-white/10">
        <div className="text-center mb-8">
          <h2 className="font-clash text-white text-2xl mb-2">Currency Conversion</h2>
          <p className="text-gray-400">Get real-time exchange rates with transparent pricing</p>
        </div>

        <div className="space-y-6">
          {/* From Currency */}
          <div>
            <Label className="text-white mb-2 block">From</Label>
            <div className="flex gap-3">
              <Select 
                value={conversionData.fromCurrency}
                onValueChange={(value) => setConversionData(prev => ({ ...prev, fromCurrency: value }))}
              >
                <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                placeholder="0.00"
                value={conversionData.amount}
                onChange={(e) => setConversionData(prev => ({ ...prev, amount: e.target.value }))}
                className="flex-1 bg-white/5 border-white/10 text-white text-right text-xl"
              />
            </div>
            
            <div className="mt-2 text-sm text-gray-400">
              Available: {getCurrencyInfo(conversionData.fromCurrency)?.flag} {getCurrencyInfo(conversionData.fromCurrency)?.balance.toLocaleString()} {conversionData.fromCurrency}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={swapCurrencies}
              className="rounded-full w-10 h-10 p-0 border-white/20 hover:bg-white/10"
            >
              <ArrowUpDown className="h-4 w-4 text-white" />
            </Button>
          </div>

          {/* To Currency */}
          <div>
            <Label className="text-white mb-2 block">To</Label>
            <div className="flex gap-3">
              <Select 
                value={conversionData.toCurrency}
                onValueChange={(value) => setConversionData(prev => ({ ...prev, toCurrency: value }))}
              >
                <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex-1 h-12 bg-white/5 border border-white/10 rounded-md flex items-center justify-end px-3">
                <span className="text-paystreet-green text-xl font-medium">
                  {conversionData.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Exchange Rate Info */}
          {conversionData.amount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 rounded-lg bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Exchange Rate</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <RefreshCw className="h-3 w-3 text-gray-400" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Interbank Rate</span>
                  <span className="text-white">1 {conversionData.fromCurrency} = {conversionData.rate.toFixed(4)} {conversionData.toCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paystreet Markup</span>
                  <span className="text-white">{conversionData.markup}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conversion Fee</span>
                  <span className="text-white">${conversionData.fee.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}

          <Button
            onClick={handleGetQuote}
            disabled={!conversionData.amount || parseFloat(conversionData.amount) <= 0}
            className="w-full bg-paystreet-green hover:bg-paystreet-green-hover text-black disabled:opacity-50"
          >
            Get Quote
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-2xl mx-auto p-8 bg-glassmorphic border-white/10">
        <div className="text-center mb-6">
          <h2 className="font-clash text-white text-2xl mb-2">Review Conversion</h2>
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400">Rate expires in {formatTime(timer)}</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Conversion Summary */}
          <div className="text-center p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-2xl">{getCurrencyInfo(conversionData.fromCurrency)?.flag}</span>
                  <span className="text-2xl font-clash text-white">{parseFloat(conversionData.amount).toLocaleString()}</span>
                  <span className="text-gray-400">{conversionData.fromCurrency}</span>
                </div>
              </div>
              <ArrowUpDown className="h-6 w-6 text-paystreet-green" />
              <div className="text-center">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-2xl">{getCurrencyInfo(conversionData.toCurrency)?.flag}</span>
                  <span className="text-2xl font-clash text-paystreet-green">{conversionData.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className="text-gray-400">{conversionData.toCurrency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Lock Option */}
          {!rateLocked && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="flex items-start gap-3">
                <Crown className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-yellow-400 font-medium">Lock Rate for 5 Minutes (Premium)</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Protect against rate fluctuations for an additional $2.50
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLockRate}
                    className="mt-3 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    <Lock className="h-3 w-3 mr-1" />
                    Lock Rate
                  </Button>
                </div>
              </div>
            </div>
          )}

          {rateLocked && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-green-400" />
                <div>
                  <span className="text-green-400 font-medium">Rate Locked</span>
                  <p className="text-gray-400 text-sm">Protected until {formatTime(timer)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown */}
          <div className="space-y-3">
            <h3 className="text-white font-medium">Transaction Breakdown</h3>
            <div className="space-y-2 p-4 rounded-lg bg-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">You Send</span>
                <span className="text-white">{parseFloat(conversionData.amount).toLocaleString()} {conversionData.fromCurrency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="text-white">1 {conversionData.fromCurrency} = {conversionData.rate.toFixed(4)} {conversionData.toCurrency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Conversion Fee</span>
                <span className="text-white">-${conversionData.fee.toFixed(2)}</span>
              </div>
              {rateLocked && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rate Lock Fee</span>
                  <span className="text-white">-$2.50</span>
                </div>
              )}
              <Separator className="bg-white/10" />
              <div className="flex justify-between font-medium">
                <span className="text-white">You Receive</span>
                <span className="text-paystreet-green">{conversionData.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {conversionData.toCurrency}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('quote')}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Back to Quote
            </Button>
            <Button
              onClick={handleConfirmConversion}
              className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
            >
              Confirm Conversion
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderCompleteStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-2xl mx-auto p-8 bg-glassmorphic border-white/10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-paystreet-green/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-10 w-10 text-paystreet-green" />
        </motion.div>

        <h2 className="font-clash text-white text-2xl mb-2">Conversion Complete!</h2>
        <p className="text-gray-400 mb-6">Your currency conversion has been processed successfully</p>

        <div className="p-6 rounded-lg bg-white/5 border border-white/10 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Reference ID</span>
              <span className="text-white font-mono">{conversionData.referenceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Converted</span>
              <span className="text-white">{parseFloat(conversionData.amount).toLocaleString()} {conversionData.fromCurrency} → {conversionData.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {conversionData.toCurrency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Rate Used</span>
              <span className="text-white">{conversionData.rate.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Processing Time</span>
              <span className="text-paystreet-green">Instant</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <Share className="h-4 w-4 mr-2" />
            Share Receipt
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => {
              setCurrentStep('quote');
              setConversionData(prev => ({ ...prev, amount: '', referenceId: undefined }));
              setRateLocked(false);
            }}
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            New Conversion
          </Button>
          <Button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
          >
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-6 pt-22">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {currentStep === 'quote' && (
            <motion.div key="quote">
              {renderQuoteStep()}
            </motion.div>
          )}
          {currentStep === 'review' && (
            <motion.div key="review">
              {renderReviewStep()}
            </motion.div>
          )}
          {currentStep === 'complete' && (
            <motion.div key="complete">
              {renderCompleteStep()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}