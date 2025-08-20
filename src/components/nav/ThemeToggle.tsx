import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`
        inline-flex items-center justify-center rounded-lg p-2 
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        hover:text-gray-900 dark:hover:text-white
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
        focus:ring-offset-white dark:focus:ring-offset-background-dark
        ${className}
      `}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-5 w-5" />
          {showLabel && <span className="ml-2 text-sm font-medium">Light</span>}
        </>
      ) : (
        <>
          <Moon className="h-5 w-5" />
          {showLabel && <span className="ml-2 text-sm font-medium">Dark</span>}
        </>
      )}
    </button>
  );
}
