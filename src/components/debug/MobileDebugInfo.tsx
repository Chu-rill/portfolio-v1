import { useState, useEffect } from 'react';

export function MobileDebugInfo() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [sectionsFound, setSectionsFound] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const checkSections = () => {
      const sections = ['skills', 'projects', 'about', 'experience', 'contact'];
      const found = sections.filter(id => {
        const element = document.getElementById(id);
        if (!element) return false;
        
        const styles = window.getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden';
      });
      setSectionsFound(found);
    };

    window.addEventListener('resize', handleResize);
    
    // Check sections after a delay to ensure they're rendered
    const timer = setTimeout(checkSections, 1000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // Only show on mobile devices (width < 768px)
  if (windowSize.width >= 768) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="mb-2">
        <strong>Mobile Debug Info</strong>
      </div>
      <div>Screen: {windowSize.width}x{windowSize.height}</div>
      <div>Sections found: {sectionsFound.length}</div>
      <div className="text-green-400">
        {sectionsFound.includes('skills') ? '✓ Skills' : '✗ Skills'}
      </div>
      <div className="text-green-400">
        {sectionsFound.includes('projects') ? '✓ Projects' : '✗ Projects'}
      </div>
      <div className="mt-2 text-xs text-gray-300">
        Tap to dismiss
      </div>
    </div>
  );
}
