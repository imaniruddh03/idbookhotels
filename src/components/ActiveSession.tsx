import { users } from '../Data';
import { useDarkModeStore } from '../store/useDarkMode';

type ActiveSessionsProps = {
  loading: boolean;
};

const ActiveSessions: React.FC<ActiveSessionsProps> = ({ loading }) => {
  const { darkMode } = useDarkModeStore();
  const count = users.filter(user => (user as any).active).length;

  return (
    <div className={`relative p-6 rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <span className="absolute bottom-2 right-2 text-9xl italic font-extrabold text-gray-300 dark:text-gray-500 opacity-50">
        {loading ? '' : count}
      </span>
      <div className="relative z-10">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Active Sessions</h3>
        <p className="text-3xl font-bold mt-2">{loading ? '...' : count}</p>
      </div>
    </div>
  );
};

export default ActiveSessions;
