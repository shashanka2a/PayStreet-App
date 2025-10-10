import { Menu, Bell, User, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import type { Screen } from '@/types';

interface PWANavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  onMenuClick: () => void;
  onReturnToLanding?: () => void;
}

export function PWANavbar({ currentScreen, onNavigate, onMenuClick, onReturnToLanding }: PWANavbarProps) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-glassmorphic border-b border-white/10"
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onReturnToLanding}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-paystreet-green flex items-center justify-center">
                <span className="font-clash text-black text-sm">P</span>
              </div>
              <span className="font-clash text-white text-lg">Payflow</span>
            </button>
          </div>

          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions, beneficiaries..."
              className="pl-10 w-80 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative text-white hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Live Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Live</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}