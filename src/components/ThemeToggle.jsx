import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button onClick={toggleTheme} className={cn("fixed max-sm:hidden top-5 right-5 p-2 rounded-full transition-colors duration-300",
      "focus:outlin-hidden"
    )}>
      {isDarkMode ? (<Sun className='h-6 w-6 text-yellow-300' />
      ) : (
        <Moon className='h-6 w-6 text-blue-900' />
      )}
    </button>
  );
}