import React, { useState, useMemo } from 'react';
import { users as allUsers } from '../Data';
import { useDarkModeStore } from '../store/useDarkMode';
import { ArrowDown, ArrowUp } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

const UserTable: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'joinedDate' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: 'name' | 'joinedDate') => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const sortedUsers = useMemo(() => {
    if (!sortBy) return filteredUsers;
    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredUsers, sortBy, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  return (
    <div className={`p-6 mt-4 rounded-lg shadow-md overflow-x-auto transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">User List</h3>
      </div>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md transition-colors duration-300 dark:bg-gray-700 dark:text-white"
      />

      <table className="min-w-full table-auto text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="py-2 px-3">ID</th>
            <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortBy === 'name' && (sortOrder === 'asc' ? <ArrowUp className="inline w-3 h-3" /> : <ArrowDown className="inline w-3 h-3" />)}
            </th>
            <th className="py-2 px-3">Email</th>
            <th className="py-2 px-3">Role</th>
            <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('joinedDate')}>
              Joined {sortBy === 'joinedDate' && (sortOrder === 'asc' ? <ArrowUp className="inline w-3 h-3" /> : <ArrowDown className="inline w-3 h-3" />)}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                No users found.
              </td>
            </tr>
          ) : (
            paginatedUsers.map(user => (
              <tr key={user.id} className=" border-gray-100 dark:border-gray-700  transition-colors duration-300">
                <td className="py-2 px-3">{user.id}</td>
                <td className="py-2 px-3">{user.name}</td>
                <td className="py-2 px-3">{user.email}</td>
                <td className="py-2 px-3">{user.role}</td>
                <td className="py-2 px-3">{user.joinedDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 transition-colors duration-300"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
