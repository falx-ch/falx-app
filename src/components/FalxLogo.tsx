interface FalxLogoProps {
  size?: number;
  className?: string;
}

export default function FalxLogo({ size = 40, className = "" }: FalxLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Falx Logo"
    >
      <defs>
        <clipPath id="falx-clip">
          <rect y="0" width="128" height="128" />
        </clipPath>
      </defs>
      <g clipPath="url(#falx-clip)">
        <rect className="fill-red-600" width="128" height="128" transform="translate(128 128) rotate(180)" />
        <rect className="fill-white" x="-26.51" y="54.63" width="181.02" height="18.67" transform="translate(-26.49 63.99) rotate(-45)" />
        <rect className="fill-red-600" x="118.37" y="-9.14" width="34.79" height="63.66" transform="translate(23.72 102.64) rotate(-45)" />
        <rect className="fill-white" x="85.99" y="32.72" width="62.88" height="18.16" transform="translate(63.95 -70.79) rotate(45)" />
        <rect className="fill-red-600" x="84.17" y="46.99" width="36.94" height="34.96" transform="translate(75.65 -53.70) rotate(45)" />
        <rect className="fill-white" x="57.17" y="91.31" width="88.16" height="18.67" transform="translate(100.82 -42.12) rotate(45)" />
        <circle className="fill-white" cx="64.28" cy="76.85" r="15.11" />
        <circle className="fill-red-600" cx="64.28" cy="98.25" r="15.11" />
        <circle className="fill-white" cx="101.91" cy="38.98" r="15.11" />
        <circle className="fill-red-600" cx="101.91" cy="60.39" r="15.11" />
      </g>
    </svg>
  );
}