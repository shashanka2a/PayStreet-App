import { 
  LayoutDashboard, 
  Users, 
  ArrowUpDown, 
  Send, 
  Download, 
  BarChart3,
  Settings,
  HelpCircle,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import type { Screen } from '@/types';

interface SidebarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'beneficiaries' as Screen, label: 'Beneficiaries', icon: Users },
  { id: 'conversion' as Screen, label: 'Convert', icon: ArrowUpDown },
  { id: 'send' as Screen, label: 'Send Money', icon: Send },
  { id: 'collect' as Screen, label: 'Collect Funds', icon: Download },
  { id: 'analytics' as Screen, label: 'Analytics', icon: BarChart3 },
];

export function Sidebar({ currentScreen, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-glassmorphic border-r border-white/10 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        initial={{ x: -256 }}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-paystreet-green flex items-center justify-center">
                <span className="font-clash text-black text-sm">P</span>
              </div>
              <span className="font-clash text-white text-lg">Paystreet</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive 
                          ? 'bg-paystreet-green text-black hover:bg-paystreet-green-hover' 
                          : 'text-white hover:bg-white/10'
                      }`}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white text-sm font-medium mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Available Balance</span>
                  <span className="text-paystreet-green font-medium">$24,580.00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Pending Transfers</span>
                  <span className="text-yellow-400 font-medium">3</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">This Month</span>
                  <span className="text-white font-medium">$156,240</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/10"
              >
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}