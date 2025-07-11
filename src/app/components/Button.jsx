'use client';
import Link from 'next/link';

export default function Button({
  href,
  type = 'button',
  children,
  className = '',
  ...props
}) {
  const classes = `btn bg-black text-white px-6 py-2 h-[50px] w-[200px] rounded-full flex items-center justify-center text-lg ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
