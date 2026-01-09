import { buttonTypes } from './button.types';
import { clsx } from 'clsx';
import './button.css';

export function Button({ 
  variant = 'primary', 
  size = 'md',
  className,
  children,
  ...props 
}: buttonTypes.ButtonProps) {
  return (
    <button
      className={clsx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

