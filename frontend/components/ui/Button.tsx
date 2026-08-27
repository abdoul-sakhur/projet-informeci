import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface BaseProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

interface LinkButtonProps extends BaseProps {
  href: string;
}

interface ClickButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

type ButtonProps = LinkButtonProps | ClickButtonProps;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg',
  secondary:
    'bg-secondary text-white hover:brightness-110 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-white bg-white text-primary-dark shadow-md hover:bg-neutral hover:shadow-lg',
  ghost: 'text-primary hover:bg-secondary-light',
};

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary';

export default function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '' } = props;
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const rest = { ...(props as ClickButtonProps) };
  delete rest.href;
  delete rest.variant;
  delete rest.children;
  delete rest.className;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
