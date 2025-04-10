import React from 'react';
import { weeklySignups } from '../Data';
import { useDarkModeStore } from '../store/useDarkMode';

const SignupChart: React.FC = () => {
  const { darkMode } = useDarkModeStore();
  const data = weeklySignups;
  const height = 300;
  const width = 600;
  const padding = 40;

  const maxSignups = Math.max(...data.map(d => d.signups));
  const minSignups = Math.min(...data.map(d => d.signups));

  const xScale = (index: number) => padding + (index * ((width - padding * 2) / (data.length - 1)));
  const yScale = (value: number) => height - padding - ((value - minSignups) * ((height - padding * 2) / (maxSignups - minSignups)));

  const linePath = data.map((d, i) => {
    const x = xScale(i);
    const y = yScale(d.signups);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className={`p-6 rounded-2xl shadow-lg mt-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">📈 Weekly Signups</h3>
      <div className="overflow-x-auto">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {[...Array(5)].map((_, i) => {
            const y = padding + i * ((height - padding * 2) / 4);
            return (
              <line
                key={i}
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke={darkMode ? '#374151' : '#e5e7eb'}
                strokeDasharray="4 4"
              />
            );
          })}

          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={darkMode ? '#6b7280' : '#9ca3af'} />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={darkMode ? '#6b7280' : '#9ca3af'} />

          {data.map((d, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={height - padding + 20}
              textAnchor="middle"
              fontSize="12"
              fill={darkMode ? '#d1d5db' : '#4b5563'}
            >
              {d.week}
            </text>
          ))}
          {[...Array(5)].map((_, i) => {
            const value = minSignups + i * ((maxSignups - minSignups) / 4);
            return (
              <text
                key={i}
                x={padding - 12}
                y={yScale(value) + 5}
                textAnchor="end"
                fontSize="12"
                fill={darkMode ? '#d1d5db' : '#4b5563'}
              >
                {Math.round(value)}
              </text>
            );
          })}
          <path
            d={linePath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.signups)}
              r="5"
              fill="#3b82f6"
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SignupChart;
