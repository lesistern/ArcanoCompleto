interface D20IconProps {
  className?: string;
  value?: number | string;
  valueClassName?: string;
}

export function D20Icon({ className = "w-20 h-20", value, valueClassName = "" }: D20IconProps) {
  return (
    <div className={`relative ${className}`}>
      {/* D20 SVG - Icosahedron face shape */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer pentagon/diamond shape of D20 */}
        <polygon
          points="50,5 95,35 80,90 20,90 5,35"
          className="stroke-current"
          strokeWidth="3"
          fill="none"
        />
        {/* Inner triangular lines */}
        <line x1="50" y1="5" x2="50" y2="55" className="stroke-current" strokeWidth="2" />
        <line x1="50" y1="55" x2="95" y2="35" className="stroke-current" strokeWidth="2" />
        <line x1="50" y1="55" x2="5" y2="35" className="stroke-current" strokeWidth="2" />
        <line x1="50" y1="55" x2="80" y2="90" className="stroke-current" strokeWidth="2" />
        <line x1="50" y1="55" x2="20" y2="90" className="stroke-current" strokeWidth="2" />
      </svg>

      {/* Number in center */}
      {value !== undefined && (
        <span className={`absolute inset-0 flex items-center justify-center font-bold ${valueClassName}`}>
          {value}
        </span>
      )}
    </div>
  );
}
