// Reusable notification toggle component
import { NotificationToggleConfig } from '@/lib/data/profile-settings';

interface NotificationToggleProps {
  config: NotificationToggleConfig;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function NotificationToggle({
  config,
  value,
  onChange,
}: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-dungeon-100">{config.label}</p>
        <p className="text-xs text-dungeon-500 mt-1">{config.description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-gold-500' : 'bg-dungeon-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
