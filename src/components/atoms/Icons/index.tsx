import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const ASTERISK_ANGLES = [0, 45, 90, 135];

export function AsteriskShape(props: SVGProps<SVGGElement>) {
  return (
    <g fill="currentColor" {...props}>
      {ASTERISK_ANGLES.map((angle) => (
        <rect key={angle} x="9.5" y="0" width="5" height="24" transform={`rotate(${angle} 12 12)`} />
      ))}
    </g>
  );
}

export function AsteriskIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <AsteriskShape />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true" {...props}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 2l11 6-11 6z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 2h4v12H3zM9 2h4v12H9z" />
    </svg>
  );
}

export function PreviousIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 2h2v12H3zM14 2v12L6 8z" />
    </svg>
  );
}

export function NextIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M11 2h2v12h-2zM2 2v12l8-6z" />
    </svg>
  );
}
