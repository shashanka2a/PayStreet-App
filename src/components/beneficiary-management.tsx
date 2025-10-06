import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Star, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  CheckCircle, 
  Upload,
  Search,
  Filter
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import type { Screen } from '@/types';

interface BeneficiaryManagementProps {
  onNavigate: (screen: Screen) => void;
}

type Step = 1 | 2 | 3 | 4 | 5;
type View = 'list' | 'add';

interface Beneficiary {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  country: string;
  flag: string;
  lastUsed: string;
  isFavorite: boolean;
  isDefault: boolean;
  status: 'verified' | 'pending' | 'failed';
}

const beneficiaries: Beneficiary[] = [
  {
    id: 'BEN001',
    name: 'Microsoft Corporation',
    bankName: 'JP Morgan Chase',
    accountNumber: '****1234',
    country: 'United States',
    flag: '🇺🇸',
    lastUsed: '2 hours ago',
    isFavorite: true,
    isDefault: true,
    status: 'verified'
  },
  {
    id: 'BEN002',
    name: 'Shopify Inc.',
    bankName: 'Deutsche Bank',
    accountNumber: '****5678',
    country: 'Germany',
    flag: '🇩🇪',
    lastUsed: '1 day ago',
    isFavorite: true,
    isDefault: false,
    status: 'verified'
  },
  {
    id: 'BEN003',
    name: 'Amazon Web Services',
    bankName: 'HSBC',
    accountNumber: '****9012',
    country: 'United Kingdom',
    flag: '🇬🇧',
    lastUsed: '3 days ago',
    isFavorite: false,
    isDefault: false,
    status: 'pending'
  }
];

export function BeneficiaryManagement({ onNavigate }: BeneficiaryManagementProps) {
  const [view, setView] = useState<View>('list');
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    legalName: '',
    bankName: '',
    accountNumber: '',
    swiftCode: '',
    routingNumber: '',
    address: '',
    country: '',
    currency: ''
  });

  const stepTitles = [
    'Legal Name',
    'Bank Details', 
    'Review Summary',
    'Confirm Details',
    'Manage Beneficiary'
  ];

  const getStepProgress = (step: Step) => (step / 5) * 100;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleFinish = () => {
    setView('list');
    setCurrentStep(1);
    setFormData({
      legalName: '',
      bankName: '',
      accountNumber: '',
      swiftCode: '',
      routingNumber: '',
      address: '',
      country: '',
      currency: ''
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: 'bg-green-500/20 text-green-400 border-green-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    beneficiary.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="legalName" className="text-white">Legal Name</Label>
              <Input
                id="legalName"
                value={formData.legalName}
                onChange={(e) => setFormData(prev => ({ ...prev, legalName: e.target.value }))}
                placeholder="Enter legal business name"
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="country" className="text-white">Country</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="us">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="de">🇩🇪 Germany</SelectItem>
                  <SelectItem value="jp">🇯🇵 Japan</SelectItem>
                  <SelectItem value="in">🇮🇳 India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Upload className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h3 className="text-blue-400 font-medium">OCR Upload (Optional)</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Upload an invoice to auto-fill beneficiary details
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  >
                    Upload Invoice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="bankName" className="text-white">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                placeholder="Enter bank name"
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <Label htmlFor="accountNumber" className="text-white">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="Enter account number"
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>

            <div>
              <Label htmlFor="swiftCode" className="text-white">SWIFT Code</Label>
              <Input
                id="swiftCode"
                value={formData.swiftCode}
                onChange={(e) => setFormData(prev => ({ ...prev, swiftCode: e.target.value }))}
                placeholder="Enter SWIFT/BIC code"
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
              <div className="mt-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">SWIFT code validated</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="routingNumber" className="text-white">Routing Number (US only)</Label>
              <Input
                id="routingNumber"
                value={formData.routingNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, routingNumber: e.target.value }))}
                placeholder="Enter routing number"
                className="mt-2 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-white font-medium mb-4">Review Beneficiary Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Legal Name:</span>
                  <span className="text-white">{formData.legalName || 'Not entered'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bank Name:</span>
                  <span className="text-white">{formData.bankName || 'Not entered'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Number:</span>
                  <span className="text-white">{formData.accountNumber || 'Not entered'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SWIFT Code:</span>
                  <span className="text-white">{formData.swiftCode || 'Not entered'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Country:</span>
                  <span className="text-white">{formData.country || 'Not selected'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-400 text-sm">
                Please review all details carefully. Changes will require re-verification.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-paystreet-green/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-paystreet-green" />
              </div>
              <h3 className="text-white font-medium text-lg mb-2">Confirm Beneficiary</h3>
              <p className="text-gray-400">
                Click confirm to add this beneficiary to your list
              </p>
            </div>

            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-paystreet-green/20 flex items-center justify-center">
                  <span className="text-paystreet-green font-medium">
                    {formData.legalName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium">{formData.legalName}</h4>
                  <p className="text-gray-400 text-sm">{formData.bankName}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="favorite" className="text-white">Mark as Favorite</Label>
                  <Switch id="favorite" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="default" className="text-white">Set as Default</Label>
                  <Switch id="default" />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-paystreet-green/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-paystreet-green" />
              </div>
              <h3 className="text-white font-medium text-xl mb-2">Beneficiary Added Successfully!</h3>
              <p className="text-gray-400">
                {formData.legalName} has been added to your beneficiary list
              </p>
            </motion.div>

            <div className="flex gap-3">
              <Button
                onClick={() => onNavigate('send')}
                className="flex-1 bg-paystreet-green hover:bg-paystreet-green-hover text-black"
              >
                Send Money
              </Button>
              <Button
                onClick={handleFinish}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                View All Beneficiaries
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (view === 'add') {
    return (
      <div className="p-6 pt-22">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView('list')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-clash text-white text-2xl">Add Beneficiary</h1>
              <p className="text-gray-400">Step {currentStep} of 5: {stepTitles[currentStep - 1]}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={getStepProgress(currentStep)} className="h-2" />
            <div className="flex justify-between mt-2">
              {stepTitles.map((title, index) => (
                <span
                  key={title}
                  className={`text-xs ${
                    index + 1 <= currentStep ? 'text-paystreet-green' : 'text-gray-500'
                  }`}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

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
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                Back
              </Button>
              
              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  className="bg-paystreet-green hover:bg-paystreet-green-hover text-black"
                >
                  {currentStep === 4 ? 'Confirm' : 'Next'}
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  className="bg-paystreet-green hover:bg-paystreet-green-hover text-black"
                >
                  Finish
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-22">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-clash text-white text-3xl mb-2">Beneficiary Management</h1>
            <p className="text-gray-400">Manage your payment recipients</p>
          </div>
          
          <Button
            onClick={() => setView('add')}
            className="bg-paystreet-green hover:bg-paystreet-green-hover text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search beneficiaries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Select>
            <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Beneficiaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBeneficiaries.map((beneficiary, index) => (
            <motion.div
              key={beneficiary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{beneficiary.flag}</span>
                    <div>
                      <h3 className="text-white font-medium">{beneficiary.name}</h3>
                      <p className="text-gray-400 text-sm">{beneficiary.bankName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {beneficiary.isFavorite && (
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    )}
                    {beneficiary.isDefault && (
                      <Badge className="bg-paystreet-green/20 text-paystreet-green text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Account:</span>
                    <span className="text-white">{beneficiary.accountNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last used:</span>
                    <span className="text-white">{beneficiary.lastUsed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <Badge className={`${getStatusBadge(beneficiary.status)} text-xs`}>
                      {beneficiary.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('send')}
                    className="flex-1 border-paystreet-green text-paystreet-green hover:bg-paystreet-green/10"
                  >
                    Send Money
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}