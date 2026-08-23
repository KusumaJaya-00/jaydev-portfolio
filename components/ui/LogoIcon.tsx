import React from 'react'

export type LogoVariant = 'minimal' | 'monogram' | 'notch'

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: LogoVariant
  size?: number
}

export function LogoIcon({ variant = 'minimal', size = 26, className, ...props }: LogoIconProps) {
  if (variant === 'monogram') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <defs>
          <linearGradient id="grad-monogram" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.6" stopColor="#3D7FFF" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <path
          d="M8.5 10.5L3 16L8.5 21.5"
          stroke="#7FAEFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <path
          d="M20 7.5L15.5 18C14.8 19.8 13.2 21.2 11 21.2C9.2 21.2 7.8 20.2 7.5 19.5"
          stroke="url(#grad-monogram)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.5 10.5L29 16L23.5 21.5"
          stroke="#38BDF8"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (variant === 'notch') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <defs>
          <linearGradient id="grad-notch" x1="2" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#3D7FFF" />
          </linearGradient>
        </defs>
        <path d="M10 8.5H7L2 16L7 23.5H10L5.8 16L10 8.5Z" fill="url(#grad-notch)" />
        <path d="M18 6.5L12 25.5H14.2L20.2 6.5H18Z" fill="#7FAEFF" />
        <path d="M22 8.5H25L30 16L25 23.5H22L26.2 16L22 8.5Z" fill="url(#grad-notch)" />
      </svg>
    )
  }

  // Default: 'minimal'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="brandTagGrad" x1="2" y1="8" x2="30" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#7FAEFF" />
          <stop offset="100%" stopColor="#3D7FFF" />
        </linearGradient>
        <linearGradient id="slashGrad" x1="18.5" y1="6.5" x2="13.5" y2="25.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3D7FFF" />
        </linearGradient>
      </defs>
      {/* Left Chevron < */}
      <path
        d="M8.5 10.5L3 16L8.5 21.5"
        stroke="url(#brandTagGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center Slash / */}
      <path
        d="M18 6.5L14 25.5"
        stroke="url(#slashGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Right Chevron > */}
      <path
        d="M23.5 10.5L29 16L23.5 21.5"
        stroke="url(#brandTagGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
