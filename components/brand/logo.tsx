export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Caribbean Azure"
    >
      {/* Icon - Neural network node with connections */}
      <g>
        {/* Central node */}
        <circle
          cx="24"
          cy="24"
          r="8"
          fill="url(#brandGradient)"
          className="animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <circle
          cx="24"
          cy="24"
          r="8"
          fill="none"
          stroke="url(#brandGradient)"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Outer nodes */}
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="12" cy="36" r="3" fill="currentColor" opacity="0.7" />
        <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.7" />

        {/* Connection lines */}
        <line x1="24" y1="24" x2="12" y2="12" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="36" y2="12" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="12" y2="36" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="24" y1="24" x2="36" y2="36" stroke="url(#brandGradient)" strokeWidth="1.5" opacity="0.5" />

        {/* Orbital ring */}
        <circle
          cx="24"
          cy="24"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.2"
          strokeDasharray="2 4"
        />
      </g>

      {/* Text */}
      <text
        x="54"
        y="29"
        fill="currentColor"
        fontSize="18"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        Caribbean
      </text>
      <text
        x="140"
        y="29"
        fill="url(#brandGradient)"
        fontSize="18"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        Azure
      </text>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F5E9C" />
          <stop offset="100%" stopColor="#4BA3F7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Caribbean Azure"
    >
      {/* Central node */}
      <circle
        cx="24"
        cy="24"
        r="8"
        fill="url(#markGradient)"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      <circle
        cx="24"
        cy="24"
        r="8"
        fill="none"
        stroke="url(#markGradient)"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Outer nodes */}
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="36" cy="12" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="12" cy="36" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.7" />

      {/* Connection lines */}
      <line x1="24" y1="24" x2="12" y2="12" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="24" x2="36" y2="12" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="24" x2="12" y2="36" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="24" x2="36" y2="36" stroke="url(#markGradient)" strokeWidth="1.5" opacity="0.5" />

      {/* Orbital ring */}
      <circle
        cx="24"
        cy="24"
        r="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
        strokeDasharray="2 4"
      />

      <defs>
        <linearGradient id="markGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F5E9C" />
          <stop offset="100%" stopColor="#4BA3F7" />
        </linearGradient>
      </defs>
    </svg>
  )
}
