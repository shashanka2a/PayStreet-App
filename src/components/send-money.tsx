import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Upload, 
  Calculator,
  Clock,
  Users,
  Calendar,
  Plus,
  Eye
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import type { Screen } from '@/types';

interface SendMoneyProps {
  onNavigate: (screen: Screen) => void;
}

type SendStep = 'recipient' | 'bank' | 'amount' | 'method' | 'schedule' | 'review' | 'complete';

interface SendData {
  recipientType: 'saved' | 'manual' | 'ocr';
  recipientId?: string;
  recipientName: string;
  bankName: string;
  accountNumber: string;
  swiftCode: string;
  currency: string;
  amount: string;
  purpose: string;
  paymentMethod: 'swift' | 'ach' | 'sepa' | 'faster';
  isRecurring: boolean;
  frequency?: string;
  scheduledDate?: string;
  fee: number;
  exchangeRate?: number;
  expectedArrival: string;
  referenceId?: string;
}

const savedBeneficiaries = [
  { id: 'BEN001', name: 'Microsoft Corporation', bank: 'JP Morgan Chase', flag: '🇺🇸', lastUsed: '2 hours ago' },
  { id: 'BEN002', name: 'Shopify Inc.', bank: 'Deutsche Bank', flag: '🇩🇪', lastUsed: '1 day ago' },
  { id: 'BEN003', name: 'Amazon Web Services', bank: 'HSBC', flag: '🇬🇧', lastUsed: '3 days ago' },
];

const paymentMethods = [
  { id: 'swift', name: 'SWIFT Wire', fee: 25, time: '1-2 business days', icon: '🌍' },
  { id: 'ach', name: 'ACH Transfer', fee: 5, time: '2-3 business days', icon: '🏦' },
  { id: 'sepa', name: 'SEPA Transfer', fee: 2, time: 'Same day', icon: '🇪🇺' },
  { id: 'faster', name: 'Faster Payments', fee: 1, time: 'Instant', icon: '⚡' },
];

export function SendMoney({ onNavigate }: SendMoneyProps) {
  const [currentStep, setCurrentStep] = useState<SendStep>('recipient');
  const [sendData, setSendData] = useState<SendData>({
    recipientType: 'saved',
    recipientName: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    currency: 'USD',
    amount: '',
    purpose: '',
    paymentMethod: 'swift',
    isRecurring: false,
    fee: 25,
    expectedArrival: '1-2 business days',
    referenceId: undefined
  });

  const steps: SendStep[] = ['recipient', 'bank', 'amount', 'method', 'schedule', 'review', 'complete'];
  const stepTitles = {
    recipient: 'Select Recipient',
    bank: 'Bank Details',
    amount: 'Amount & Purpose',
    method: 'Payment Method',
    schedule: 'Schedule Payment',
    review: 'Review & Confirm',
    complete: 'Payment Sent'
  };

  const getCurrentStepIndex = () => steps.indexOf(currentStep);
  const getProgress = () => ((getCurrentStepIndex() + 1) / steps.length) * 100;

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSelectBeneficiary = (beneficiary: any) => {
    setSendData(prev => ({
      ...prev,
      recipientType: 'saved',
      recipientId: beneficiary.id,
      recipientName: beneficiary.name,
      bankName: beneficiary.bank
    }));
    handleNext();
  };

  const handleSendPayment = () => {
    const referenceId = `PAY${Date.now().toString().slice(-8)}`;
    setSendData(prev => ({ ...prev, referenceId }));
    setCurrentStep('complete');
  };

  const renderRecipientStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-clash text-white text-xl mb-2">Who are you sending money to?</h2>
        <p className="text-gray-400">Choose from saved beneficiaries or add a new recipient</p>
      </div>

      {/* Recipient Type Tabs */}
      <div className="flex rounded-lg bg-white/5 p-1">
        {[
          { id: 'saved', label: 'Saved', icon: Users },
          { id: 'manual', label: 'Manual', icon: Plus },
          { id: 'ocr', label: 'OCR Upload', icon: Upload }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSendData(prev => ({ ...prev, recipientType: id as any }))}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
              sendData.recipientType === id 
                ? 'bg-paystreet-green text-black' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content based on selected type */}
      {sendData.recipientType === 'saved' && (
        <div className="space-y-3">
          {savedBeneficiaries.map((beneficiary) => (
            <motion.div
              key={beneficiary.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="p-4 bg-white/5 border-white/10 hover:border-paystreet-green/30 cursor-pointer transition-all"
                onClick={() => handleSelectBeneficiary(beneficiary)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{beneficiary.flag}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{beneficiary.name}</h3>
                    <p className="text-gray-400 text-sm">{beneficiary.bank} • {beneficiary.lastUsed}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Verified</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {sendData.recipientType === 'manual' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="recipientName" className="text-white">Recipient Name</Label>
            <Input
              id="recipientName"
              value={sendData.recipientName}
              onChange={(e) => setSendData(prev => ({ ...prev, recipientName: e.target.value }))}
              placeholder="Enter recipient name"
              className="mt-2 bg-white/5 border-white/10 text-white"
            />
          </div>
          <Button
            onClick={handleNext}
            disabled={!sendData.recipientName}
            className="w-full bg-paystreet-green hover:bg-paystreet-green-hover text-black disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      )}

      {sendData.recipientType === 'ocr' && (
        <div className="p-6 border-2 border-dashed border-white/20 rounded-lg text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-white font-medium mb-2">Upload Invoice or Document</h3>
          <p className="text-gray-400 text-sm mb-4">
            We'll automatically extract recipient details from your document
          </p>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Choose File
          </Button>
        </div>
      )}
    </div>
  );

  const renderBankStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-clash text-white text-xl mb-2">Bank Details</h2>
        <p className="text-gray-400">Enter the recipient's banking information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bankName" className="text-white">Bank Name</Label>
          <Input
            id="bankName"
            value={sendData.bankName}
            onChange={(e) => setSendData(prev => ({ ...prev, bankName: e.target.value }))}
            placeholder="Enter bank name"
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <Label htmlFor="accountNumber" className="text-white">Account Number</Label>
          <Input
            id="accountNumber"
            value={sendData.accountNumber}
            onChange={(e) => setSendData(prev => ({ ...prev, accountNumber: e.target.value }))}
            placeholder="Enter account number"
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>

        <div>
          <Label htmlFor="swiftCode" className="text-white">SWIFT Code</Label>
          <Input
            id="swiftCode"
            value={sendData.swiftCode}
            onChange={(e) => setSendData(prev => ({ ...prev, swiftCode: e.target.value }))}
            placeholder="Enter SWIFT/BIC code"
            className="mt-2 bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!sendData.bankName || !sendData.accountNumber}
          className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderAmountStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-clash text-white text-xl mb-2">Amount & Purpose</h2>
        <p className="text-gray-400">Specify the amount and reason for payment</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-white mb-2 block">Amount</Label>
          <div className="flex gap-3">
            <Select 
              value={sendData.currency}
              onValueChange={(value) => setSendData(prev => ({ ...prev, currency: value }))}
            >
              <SelectTrigger className="w-24 bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                <SelectItem value="USD">🇺🇸 USD</SelectItem>
                <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                <SelectItem value="JPY">🇯🇵 JPY</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              type="number"
              placeholder="0.00"
              value={sendData.amount}
              onChange={(e) => setSendData(prev => ({ ...prev, amount: e.target.value }))}
              className="flex-1 bg-white/5 border-white/10 text-white text-right text-xl"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="purpose" className="text-white">Payment Purpose</Label>
          <Select onValueChange={(value) => setSendData(prev => ({ ...prev, purpose: value }))}>
            <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              <SelectItem value="business">Business Services</SelectItem>
              <SelectItem value="goods">Goods & Products</SelectItem>
              <SelectItem value="invoice">Invoice Payment</SelectItem>
              <SelectItem value="salary">Salary & Wages</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Real-time Fee Estimator */}
        {sendData.amount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 rounded-lg bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-4 w-4 text-paystreet-green" />
              <span className="text-white font-medium">Fee Estimate</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Transfer Amount</span>
                <span className="text-white">{parseFloat(sendData.amount).toLocaleString()} {sendData.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transfer Fee</span>
                <span className="text-white">${sendData.fee.toFixed(2)}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between font-medium">
                <span className="text-white">Total Cost</span>
                <span className="text-paystreet-green">{(parseFloat(sendData.amount) + sendData.fee).toLocaleString()} {sendData.currency}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!sendData.amount || !sendData.purpose}
          className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderMethodStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-clash text-white text-xl mb-2">Payment Method</h2>
        <p className="text-gray-400">Choose how you want to send the payment</p>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`p-4 cursor-pointer transition-all ${
                sendData.paymentMethod === method.id
                  ? 'bg-paystreet-green/10 border-paystreet-green'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
              onClick={() => setSendData(prev => ({ 
                ...prev, 
                paymentMethod: method.id as any,
                fee: method.fee,
                expectedArrival: method.time
              }))}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{method.name}</h3>
                    <p className="text-gray-400 text-sm">{method.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-white font-medium">${method.fee}</span>
                  <p className="text-gray-400 text-xs">fee</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-clash text-white text-xl mb-2">Schedule Payment</h2>
        <p className="text-gray-400">Send now or schedule for later</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
          <div>
            <Label className="text-white">Send Immediately</Label>
            <p className="text-gray-400 text-sm">Payment will be processed right away</p>
          </div>
          <Switch 
            checked={!sendData.scheduledDate}
            onCheckedChange={(checked) => setSendData(prev => ({ 
              ...prev, 
              scheduledDate: checked ? undefined : new Date().toISOString().split('T')[0]
            }))}
          />
        </div>

        {sendData.scheduledDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div>
              <Label htmlFor="scheduledDate" className="text-white">Scheduled Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={sendData.scheduledDate}
                onChange={(e) => setSendData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
          <div>
            <Label className="text-white">Recurring Payment</Label>
            <p className="text-gray-400 text-sm">Set up automatic recurring transfers</p>
          </div>
          <Switch 
            checked={sendData.isRecurring}
            onCheckedChange={(checked) => setSendData(prev => ({ ...prev, isRecurring: checked }))}
          />
        </div>

        {sendData.isRecurring && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div>
              <Label className="text-white">Frequency</Label>
              <Select onValueChange={(value) => setSendData(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-clash text-white text-xl mb-2">Review Payment</h2>
        <p className="text-gray-400">Confirm all details before sending</p>
      </div>

      <div className="space-y-4">
        {/* Payment Summary */}
        <Card className="p-6 bg-white/5 border border-white/10">
          <h3 className="text-white font-medium mb-4">Payment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Recipient</span>
              <span className="text-white">{sendData.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bank</span>
              <span className="text-white">{sendData.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount</span>
              <span className="text-white">{parseFloat(sendData.amount).toLocaleString()} {sendData.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Method</span>
              <span className="text-white">{paymentMethods.find(m => m.id === sendData.paymentMethod)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expected Arrival</span>
              <span className="text-paystreet-green">{sendData.expectedArrival}</span>
            </div>
          </div>
        </Card>

        {/* Cost Breakdown */}
        <Card className="p-6 bg-white/5 border border-white/10">
          <h3 className="text-white font-medium mb-4">Cost Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Transfer Amount</span>
              <span className="text-white">{parseFloat(sendData.amount).toLocaleString()} {sendData.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transfer Fee</span>
              <span className="text-white">${sendData.fee.toFixed(2)}</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between font-medium">
              <span className="text-white">Total</span>
              <span className="text-paystreet-green">{(parseFloat(sendData.amount) + sendData.fee).toLocaleString()} {sendData.currency}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          onClick={handleSendPayment}
          className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
        >
          Send Payment
        </Button>
      </div>
    </div>
  );

  const renderCompleteStep = () => (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-20 h-20 rounded-full bg-paystreet-green/20 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="h-10 w-10 text-paystreet-green" />
      </motion.div>

      <h2 className="font-clash text-white text-2xl mb-2">Payment Sent Successfully!</h2>
      <p className="text-gray-400 mb-6">Your payment is being processed</p>

      <Card className="p-6 bg-white/5 border border-white/10 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Reference ID</span>
            <span className="text-white font-mono">{sendData.referenceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Amount Sent</span>
            <span className="text-white">{parseFloat(sendData.amount).toLocaleString()} {sendData.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Expected Arrival</span>
            <span className="text-paystreet-green">{sendData.expectedArrival}</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => onNavigate('dashboard')}
          className="flex-1 border-white/20 text-white hover:bg-white/10"
        >
          Back to Dashboard
        </Button>
        <Button
          onClick={() => {
            setCurrentStep('recipient');
            setSendData({
              recipientType: 'saved',
              recipientName: '',
              bankName: '',
              accountNumber: '',
              swiftCode: '',
              currency: 'USD',
              amount: '',
              purpose: '',
              paymentMethod: 'swift',
              isRecurring: false,
              fee: 25,
              expectedArrival: '1-2 business days',
              referenceId: undefined
            });
          }}
          className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
        >
          Send Another
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 pt-22">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {currentStep !== 'complete' && (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              {getCurrentStepIndex() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h1 className="font-clash text-white text-2xl">Send Money</h1>
                <p className="text-gray-400">{stepTitles[currentStep]}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <Progress value={getProgress()} className="h-2" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">Step {getCurrentStepIndex() + 1} of {steps.length}</span>
                <span className="text-xs text-gray-400">{Math.round(getProgress())}% Complete</span>
              </div>
            </div>
          </>
        )}

        {/* Step Content */}
        <Card className="max-w-2xl mx-auto p-8 bg-glassmorphic border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 'recipient' && renderRecipientStep()}
              {currentStep === 'bank' && renderBankStep()}
              {currentStep === 'amount' && renderAmountStep()}
              {currentStep === 'method' && renderMethodStep()}
              {currentStep === 'schedule' && renderScheduleStep()}
              {currentStep === 'review' && renderReviewStep()}
              {currentStep === 'complete' && renderCompleteStep()}
            </motion.div>
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
}