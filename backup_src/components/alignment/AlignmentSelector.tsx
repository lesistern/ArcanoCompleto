'use client';

import { ALIGNMENT_CONFIG, ALIGNMENT_GRID } from '@/lib/data/alignments';

interface AlignmentSelectorProps {
  value: string;
  onChange: (code: string) => void;
  showGrid?: boolean;
  disabled?: boolean;
}

export function AlignmentSelector({
  value,
  onChange,
  showGrid = false,
  disabled = false,
}: AlignmentSelectorProps) {
  if (showGrid) {
    return (
      <div className="space-y-4">
        {ALIGNMENT_GRID.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-2">
            {row.map((alignment) => (
              <button
                key={alignment.code}
                onClick={() => onChange(alignment.code)}
                disabled={disabled}
                style={{
                  backgroundColor: alignment.hex + '40',
                  borderColor:
                    value === alignment.code ? alignment.hex : 'transparent',
                  borderWidth: '2px',
                }}
                className="p-3 rounded font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                title={alignment.description}
              >
                <div className="text-center">
                  <div className="font-bold text-sm">{alignment.code}</div>
                  <div className="text-xs opacity-75">{alignment.label}</div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Dropdown mode
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{
        borderColor: ALIGNMENT_CONFIG[value]?.hex || '#3d3d3d',
        backgroundColor: ALIGNMENT_CONFIG[value]?.hex + '20' || '#3d3d3d',
      }}
      className="w-full px-3 py-2 border-2 rounded-lg text-dungeon-100 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-gold-400 transition-colors"
    >
      <option value="">Seleccionar alineamiento...</option>
      {Object.entries(ALIGNMENT_CONFIG).map(([code, config]) => (
        <option key={code} value={code}>
          {config.label}
        </option>
      ))}
    </select>
  );
}
