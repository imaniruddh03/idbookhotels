import { users } from '../Data';
import { useDarkModeStore } from '../store/useDarkMode';

type TotalUsersProps = {
  loading: boolean;
};

const Totaluser: React.FC<TotalUsersProps> = ({ loading }) => {
  const { darkMode } = useDarkModeStore();

  return (
    <div className={`relative p-6 rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <span className="absolute bottom-2 right-5 text-9xl italic font-extrabold text-gray-300 dark:text-gray-500 opacity-50">
        {loading ? '' : users.length}
      </span>
      <div className="relative z-10">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
        <p className="text-3xl font-bold mt-2">{loading ? '...' : users.length}</p>
      </div>
    </div>
  );
};

export default Totaluser;
