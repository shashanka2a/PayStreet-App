import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Globe,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  CreditCard,
  Zap
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
type Screen = 'dashboard' | 'beneficiaries' | 'conversion' | 'send' | 'collect' | 'analytics';

interface AdvancedAnalyticsProps {
  onNavigate: (screen: Screen) => void;
}

const analyticsData = {
  overview: {
    totalVolume: 2485600,
    totalTransactions: 1247,
    avgTransactionSize: 1993.75,
    successRate: 99.2,
    monthlyGrowth: 18.5,
    activeCountries: 23
  },
  topCountries: [
    { country: 'United States', flag: '🇺🇸', volume: 892340, percentage: 35.9, trend: 'up' },
    { country: 'United Kingdom', flag: '🇬🇧', volume: 456780, percentage: 18.4, trend: 'up' },
    { country: 'Germany', flag: '🇩🇪', volume: 342150, percentage: 13.8, trend: 'down' },
    { country: 'Japan', flag: '🇯🇵', volume: 298420, percentage: 12.0, trend: 'up' },
    { country: 'Canada', flag: '🇨🇦', volume: 185230, percentage: 7.5, trend: 'up' }
  ],
  paymentMethods: [
    { method: 'SWIFT Wire', volume: 45.2, transactions: 425, avgTime: '2.3 days' },
    { method: 'ACH Transfer', volume: 28.7, transactions: 312, avgTime: '1.2 days' },
    { method: 'SEPA', volume: 18.1, transactions: 298, avgTime: '0.8 days' },
    { method: 'Faster Payments', volume: 8.0, transactions: 212, avgTime: 'Instant' }
  ],
  recentActivity: [
    { id: 'ACT001', type: 'conversion', description: 'USD to EUR conversion', amount: '$12,500', time: '2 minutes ago', status: 'completed' },
    { id: 'ACT002', type: 'transfer', description: 'Wire to Microsoft Corp', amount: '$45,200', time: '15 minutes ago', status: 'processing' },
    { id: 'ACT003', type: 'beneficiary', description: 'New beneficiary added', amount: '', time: '1 hour ago', status: 'completed' },
    { id: 'ACT004', type: 'conversion', description: 'GBP to USD conversion', amount: '£8,750', time: '2 hours ago', status: 'completed' }
  ]
};

export function AdvancedAnalytics({ onNavigate }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'conversion': return <ArrowUpRight className="h-4 w-4 text-blue-400" />;
      case 'transfer': return <CreditCard className="h-4 w-4 text-green-400" />;
      case 'beneficiary': return <Users className="h-4 w-4 text-purple-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const StatCard = ({ title, value, change, icon, trend }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    trend: 'up' | 'down';
  }) => (
    <Card className="p-6 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-paystreet-green/20 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <h3 className="font-clash text-white text-xl">{value}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend === 'up' ? 
            <TrendingUp className="h-3 w-3" /> : 
            <TrendingDown className="h-3 w-3" />
          }
          <span className="text-xs font-medium">{change}</span>
        </div>
      </div>
    </Card>
  );

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
          <h1 className="font-clash text-white text-3xl mb-2">Advanced Analytics</h1>
          <p className="text-gray-400">Deep insights into your global payment operations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/10">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total Volume"
          value={`$${analyticsData.overview.totalVolume.toLocaleString()}`}
          change={`+${analyticsData.overview.monthlyGrowth}%`}
          icon={<DollarSign className="h-5 w-5 text-paystreet-green" />}
          trend="up"
        />
        <StatCard
          title="Transactions"
          value={analyticsData.overview.totalTransactions.toLocaleString()}
          change="+12.3%"
          icon={<Activity className="h-5 w-5 text-blue-400" />}
          trend="up"
        />
        <StatCard
          title="Success Rate"
          value={`${analyticsData.overview.successRate}%`}
          change="+0.3%"
          icon={<Zap className="h-5 w-5 text-green-400" />}
          trend="up"
        />
        <StatCard
          title="Active Countries"
          value={analyticsData.overview.activeCountries.toString()}
          change="+2"
          icon={<Globe className="h-5 w-5 text-purple-400" />}
          trend="up"
        />
      </motion.div>

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger value="overview" className="data-[state=active]:bg-paystreet-green data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-paystreet-green data-[state=active]:text-black">
              <MapPin className="h-4 w-4 mr-2" />
              Geography
            </TabsTrigger>
            <TabsTrigger value="methods" className="data-[state=active]:bg-paystreet-green data-[state=active]:text-black">
              <CreditCard className="h-4 w-4 mr-2" />
              Methods
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-paystreet-green data-[state=active]:text-black">
              <Clock className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Volume Trend Chart */}
              <Card className="p-6 bg-glassmorphic border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-medium">Transaction Volume Trend</h3>
                  <Badge className="bg-green-500/20 text-green-400">+18.5% vs last month</Badge>
                </div>
                <div className="h-64 flex items-end justify-center space-x-2">
                  {[65, 78, 82, 45, 89, 95, 88, 76, 92, 87, 94, 100].map((height, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-t from-paystreet-green to-paystreet-green/50 rounded-t-sm w-6"
                      style={{ height: `${height}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  ))}
                </div>
              </Card>

              {/* Transaction Types */}
              <Card className="p-6 bg-glassmorphic border-white/10">
                <h3 className="text-white font-medium mb-6">Transaction Distribution</h3>
                <div className="space-y-4">
                  {[
                    { type: 'International Wire', percentage: 42, color: 'bg-paystreet-green' },
                    { type: 'Currency Exchange', percentage: 28, color: 'bg-blue-400' },
                    { type: 'Domestic Transfer', percentage: 20, color: 'bg-purple-400' },
                    { type: 'Bill Payments', percentage: 10, color: 'bg-yellow-400' }
                  ].map((item, index) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.type}</span>
                        <span className="text-white">{item.percentage}%</span>
                      </div>
                      <motion.div
                        className="w-full bg-white/10 rounded-full h-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className={`h-2 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card className="p-6 bg-glassmorphic border-white/10">
              <h3 className="text-white font-medium mb-6">Top Countries by Volume</h3>
              <div className="space-y-4">
                {analyticsData.topCountries.map((country, index) => (
                  <motion.div
                    key={country.country}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <h4 className="text-white font-medium">{country.country}</h4>
                        <p className="text-gray-400 text-sm">${country.volume.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{country.percentage}%</span>
                      <div className={`flex items-center gap-1 ${
                        country.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {country.trend === 'up' ? 
                          <ArrowUpRight className="h-4 w-4" /> : 
                          <ArrowDownRight className="h-4 w-4" />
                        }
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-6">
            <Card className="p-6 bg-glassmorphic border-white/10">
              <h3 className="text-white font-medium mb-6">Payment Methods Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analyticsData.paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.method}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{method.method}</h4>
                      <Badge className="bg-paystreet-green/20 text-paystreet-green text-xs">
                        {method.volume}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Transactions:</span>
                        <span className="text-white">{method.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg. Time:</span>
                        <span className="text-white">{method.avgTime}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={method.volume} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="p-6 bg-glassmorphic border-white/10">
              <h3 className="text-white font-medium mb-6">Recent Activity Feed</h3>
              <div className="space-y-3">
                {analyticsData.recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.description}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <span className="text-paystreet-green font-medium text-sm">{activity.amount}</span>
                    )}
                    <Badge 
                      className={`text-xs ${
                        activity.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="font-clash text-white text-xl mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card 
            className="p-4 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate('conversion')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Convert Currency</h3>
                <p className="text-gray-400 text-sm">Optimize exchange rates</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate('send')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <CreditCard className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Send Payment</h3>
                <p className="text-gray-400 text-sm">Transfer to beneficiaries</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 bg-glassmorphic border-white/10 hover:border-paystreet-green/30 transition-all duration-300 cursor-pointer group"
            onClick={() => onNavigate('beneficiaries')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Manage Recipients</h3>
                <p className="text-gray-400 text-sm">Add or edit beneficiaries</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}