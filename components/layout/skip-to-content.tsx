'use client'

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed
        focus:top-4
        focus:left-4
        focus:z-[9999]
        focus:inline-flex
        focus:items-center
        focus:gap-2
        focus:rounded-xl
        focus:bg-[color:var(--brand)]
        focus:px-6
        focus:py-3
        focus:text-base
        focus:font-semibold
        focus:text-white
        focus:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-[color:var(--brand-400)]
        focus:ring-offset-2
        focus:transition-all
      "
    >
      Spring naar hoofdinhoud
    </a>
  )
}
