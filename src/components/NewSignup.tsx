import React from 'react';
import { users } from '../Data';
import { useDarkModeStore } from '../store/useDarkMode';

type NewSignupsProps = {
  loading: boolean;
};

const NewSignups: React.FC<NewSignupsProps> = ({ loading }) => {
  const { darkMode } = useDarkModeStore();
  const now = new Date();

  const count = users.filter(user => {
    const joinedDate = new Date(user.joinedDate);
    const diffInDays = (now.getTime() - joinedDate.getTime()) / (1000 * 3600 * 24);
    return diffInDays <= 7;
  }).length;

  return (
    <div className={`relative p-6 rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <span className="absolute bottom-2 right-5 text-9xl italic font-extrabold text-gray-300 dark:text-gray-500 opacity-50">
        {loading ? '' : count}
      </span>
      <div className="relative z-10">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">New Signups (7d)</h3>
        <p className="text-3xl font-bold mt-2">{loading ? '...' : count}</p>
      </div>
    </div>
  );
};

export default NewSignups;
