
import React, { useState } from 'react';
import { Screen } from './types';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useSmartSpend } from './hooks/useSmartSpend';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const smartSpendData = useSmartSpend();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen {...smartSpendData} />;
      case 'history':
        return <HistoryScreen {...smartSpendData} />;
      case 'add':
        return <AddTransactionScreen {...smartSpendData} />;
      case 'analytics':
        return <AnalyticsScreen {...smartSpendData} />;
      case 'profile':
        return <ProfileScreen {...smartSpendData} />;
      default:
        return <HomeScreen {...smartSpendData} />;
    }
  };

  return (
    <div className="bg-background min-h-screen font-sans text-gray-800">
      <div className="max-w-md mx-auto min-h-screen shadow-lg bg-white flex flex-col">
        <main className="flex-grow p-4 pb-24">
            {renderScreen()}
        </main>
        <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
};

export default App;
