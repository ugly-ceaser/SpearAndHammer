'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import { ReactNode } from 'react';

interface LoadingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const LoadingLink = ({ 
  href, 
  children, 
  className = '', 
  onClick, 
  onKeyDown,
  ...props 
}: LoadingLinkProps) => {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();

  const handleClick = (e: React.MouseEvent) => {
    console.log('LoadingLink clicked:', href);
    
    // For external links or anchor links, use default behavior
    if (href.startsWith('http') || href.startsWith('#')) {
      console.log('External link, using default behavior');
      if (onClick) onClick();
      return;
    }

    console.log('Internal link, preventing default');
    e.preventDefault();
    
    // Execute onClick handler
    if (onClick) {
      console.log('Executing onClick handler');
      onClick();
    }
    
    console.log('Starting navigation to:', href);
    startLoading();
    
    // Use a more reliable navigation approach
    setTimeout(() => {
      console.log('Navigating now...');
      router.push(href);
      
      setTimeout(() => {
        console.log('Stopping loading');
        stopLoading();
      }, 500);
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  return (
    <Link 
      href={href} 
      className={`transition-all duration-200 hover:text-gray-600 ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </Link>
  );
};