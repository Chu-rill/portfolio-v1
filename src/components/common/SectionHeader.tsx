interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, center = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 md:mb-12 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl ${center ? 'mx-auto' : ''}">
          {subtitle}
        </p>
      )}
    </div>
  );
}
