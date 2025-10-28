
import React from 'react';
import { Screen } from '../types';
import { HomeIcon, HistoryIcon, PlusIcon, AnalyticsIcon, ProfileIcon } from './Icons';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  label: Screen;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isCentral?: boolean;
}> = ({ label, icon, isActive, onClick, isCentral = false }) => {
  if (isCentral) {
    return (
      <button
        onClick={onClick}
        className="absolute left-1/2 -translate-x-1/2 -top-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors"
        aria-label="Add Transaction"
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-1/5 transition-colors ${
        isActive ? 'text-primary' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs mt-1 capitalize">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { label: 'home' as Screen, icon: <HomeIcon /> },
    { label: 'history' as Screen, icon: <HistoryIcon /> },
    { label: 'add' as Screen, icon: <PlusIcon />, isCentral: true },
    { label: 'analytics' as Screen, icon: <AnalyticsIcon /> },
    { label: 'profile' as Screen, icon: <ProfileIcon /> },
  ];

  const centralItem = navItems.find(item => item.isCentral)!;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-t-lg">
      <div className="flex justify-around items-center h-16 relative">
        {/* The items for the flex layout */}
        {navItems.map((item) => {
           if (item.isCentral) {
            return <div key="placeholder" className="w-1/5"></div>
           }
           return <NavItem key={item.label} {...item} isActive={activeScreen === item.label} onClick={() => setActiveScreen(item.label)} />;
        })}
        {/* The absolutely positioned central item */}
        <NavItem {...centralItem} isActive={activeScreen === centralItem.label} onClick={() => setActiveScreen(centralItem.label)} />
      </div>
    </nav>
  );
};

export default BottomNav;
