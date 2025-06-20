import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  return (
    <div className="flex items-center gap-2">
      <MoonIcon className="h-6 w-6 text-gray-500 dark:text-yellow-400" />
      
      <div
        onClick={() => setIsDark(!isDark)}
        className={`w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full px-1 cursor-pointer transition duration-300`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDark ? 'translate-x-7' : ''
          }`}
        ></div>
      </div>

      <SunIcon className="h-6 w-6 text-yellow-400 dark:text-gray-500" />
    </div>
  );
}
