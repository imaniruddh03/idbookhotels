import './App.css';
import { useEffect } from 'react';
import ActiveSessions from './components/ActiveSession';
import Navbar from './components/navbar';
import NewSignup from './components/NewSignup';
import TotalUser from './components/totaluser';
import SignupChart from './components/SignupChart';
import UserTable from './components/UserTable';
import { useDarkModeStore } from './store/useDarkMode';

function App() {
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <TotalUser loading={false} />
        <NewSignup loading={false} />
        <ActiveSessions loading={false}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <SignupChart />
        </div>
        <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default App;
