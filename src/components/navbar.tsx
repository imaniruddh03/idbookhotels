import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkModeStore } from '../store/useDarkMode';

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkModeStore();

  return (
    <div className="w-full h-[10vh]  flex items-center p-4 justify-between">
      <div>
        <img
          src="https://www.idbookhotels.com/_next/image?url=%2Fidbook-text-logo.png&w=1200&q=75"
          className="w-[10vw]"
          alt="IDBook Logo"
        />
      </div>
      <div className="text-grey cursor-pointer" onClick={toggleDarkMode}>
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </div>
    </div>
  );
};

export default Navbar;
