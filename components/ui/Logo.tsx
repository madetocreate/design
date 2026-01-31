export function Logo({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* S letterform */}
      <path
        d="M22 13C18.5 13 16 15 16 17.5C16 21 22 21.5 24 23C26 24.5 26 26 26 27C26 29.5 23.5 31 20 31"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* M letterform */}
      <path
        d="M25 31V17L30 25L35 17V31"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Accent dot */}
      <circle cx="38" cy="13" r="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
