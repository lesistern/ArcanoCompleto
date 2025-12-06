'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Github, Twitter, Globe, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SaveStatusIndicator, SaveStatus } from '@/components/ui/SaveStatusIndicator';

interface SocialLinksEditorProps {
  userId: string;
  currentData: {
    github_url: string | null;
    twitter_url: string | null;
    website_url: string | null;
  };
  onUpdate: (data: Partial<SocialLinksEditorProps['currentData']>) => void;
}

interface LinkConfig {
  id: keyof SocialLinksEditorProps['currentData'];
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  prefix?: string;
  pattern?: RegExp;
  errorMessage?: string;
  color: string;
  bgColor: string;
  focusRing: string;
}

const SOCIAL_LINKS: LinkConfig[] = [
  {
    id: 'github_url',
    label: 'GitHub',
    icon: <Github className="w-4 h-4" />,
    placeholder: 'tu-usuario',
    prefix: 'https://github.com/',
    pattern: /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/,
    errorMessage: 'Nombre de usuario inválido',
    color: 'text-gray-300',
    bgColor: 'bg-gray-500/20',
    focusRing: 'focus:ring-gray-500/30 focus:border-gray-500/50',
  },
  {
    id: 'twitter_url',
    label: 'Twitter / X',
    icon: <Twitter className="w-4 h-4" />,
    placeholder: 'tu_usuario',
    prefix: 'https://twitter.com/',
    pattern: /^[a-zA-Z0-9_]{1,15}$/,
    errorMessage: 'Máximo 15 caracteres',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/20',
    focusRing: 'focus:ring-sky-500/30 focus:border-sky-500/50',
  },
  {
    id: 'website_url',
    label: 'Sitio Web',
    icon: <Globe className="w-4 h-4" />,
    placeholder: 'https://tu-sitio.com',
    pattern: /^https?:\/\/.+/,
    errorMessage: 'Debe empezar con http:// o https://',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20',
    focusRing: 'focus:ring-cyan-500/30 focus:border-cyan-500/50',
  },
];

export function SocialLinksEditor({
  userId,
  currentData,
  onUpdate,
}: SocialLinksEditorProps) {
  const [values, setValues] = useState({
    github_url: extractUsername(currentData.github_url, 'https://github.com/'),
    twitter_url: extractUsername(currentData.twitter_url, 'https://twitter.com/'),
    website_url: currentData.website_url || '',
  });

  const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({
    github_url: 'idle',
    twitter_url: 'idle',
    website_url: 'idle',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const saveTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const supabase = createClient();

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(saveTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  function extractUsername(url: string | null, prefix: string): string {
    if (!url) return '';
    if (url.startsWith(prefix)) {
      return url.replace(prefix, '');
    }
    return url;
  }

  function buildUrl(linkConfig: LinkConfig, value: string): string | null {
    if (!value.trim()) return null;
    if (linkConfig.id === 'website_url') {
      return value.trim();
    }
    return `${linkConfig.prefix}${value.trim()}`;
  }

  const validateField = useCallback((linkConfig: LinkConfig, value: string): boolean => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [linkConfig.id]: '' }));
      return true;
    }

    if (linkConfig.pattern && !linkConfig.pattern.test(value.trim())) {
      setErrors((prev) => ({
        ...prev,
        [linkConfig.id]: linkConfig.errorMessage || 'Valor inválido',
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, [linkConfig.id]: '' }));
    return true;
  }, []);

  const autoSave = useCallback(async (linkConfig: LinkConfig, value: string) => {
    // Clear existing timeout
    if (saveTimeouts.current[linkConfig.id]) {
      clearTimeout(saveTimeouts.current[linkConfig.id]);
    }

    // Validate first
    if (!validateField(linkConfig, value)) {
      setSaveStatus(prev => ({ ...prev, [linkConfig.id]: 'error' }));
      return;
    }

    // Set saving status
    setSaveStatus(prev => ({ ...prev, [linkConfig.id]: 'saving' }));

    // Debounce the save
    saveTimeouts.current[linkConfig.id] = setTimeout(async () => {
      try {
        const fullUrl = buildUrl(linkConfig, value);

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ [linkConfig.id]: fullUrl })
          .eq('id', userId);

        if (updateError) throw updateError;

        setSaveStatus(prev => ({ ...prev, [linkConfig.id]: 'saved' }));
        onUpdate({ [linkConfig.id]: fullUrl });

        // Reset to idle after 2 seconds
        setTimeout(() => {
          setSaveStatus(prev => ({ ...prev, [linkConfig.id]: 'idle' }));
        }, 2000);
      } catch (err: any) {
        console.error(`Error saving ${linkConfig.id}:`, err);
        setSaveStatus(prev => ({ ...prev, [linkConfig.id]: 'error' }));
        setErrors((prev) => ({
          ...prev,
          [linkConfig.id]: err.message || 'Error al guardar',
        }));
      }
    }, 800);
  }, [userId, supabase, onUpdate, validateField]);

  const getPreviewUrl = (linkConfig: LinkConfig): string | null => {
    const value = values[linkConfig.id];
    if (!value.trim()) return null;
    return buildUrl(linkConfig, value);
  };

  return (
    <div className="space-y-6">
      {SOCIAL_LINKS.map((link) => {
        const previewUrl = getPreviewUrl(link);
        const hasError = !!errors[link.id];

        return (
          <div key={link.id} className="space-y-3">
            {/* Label Row */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-dungeon-200">
                <div className={`p-1.5 ${link.bgColor} rounded-lg`}>
                  <span className={link.color}>{link.icon}</span>
                </div>
                {link.label}
              </label>
              <SaveStatusIndicator status={saveStatus[link.id]} />
            </div>

            {/* Input */}
            <div className="relative">
              {link.prefix && link.id !== 'website_url' && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dungeon-500 text-sm select-none pointer-events-none">
                  {link.prefix}
                </span>
              )}
              <input
                type={link.id === 'website_url' ? 'url' : 'text'}
                value={values[link.id]}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setValues((prev) => ({ ...prev, [link.id]: newValue }));
                  setErrors((prev) => ({ ...prev, [link.id]: '' }));
                  autoSave(link, newValue);
                }}
                placeholder={link.placeholder}
                className={`w-full px-4 py-3 bg-dungeon-800/50 border rounded-xl text-dungeon-100
                           placeholder-dungeon-500 focus:outline-none focus:ring-2 transition-all
                           ${link.prefix && link.id !== 'website_url' ? 'pl-[180px]' : ''}
                           ${hasError ? 'border-red-500/50 focus:ring-red-500/30' : `border-dungeon-700 ${link.focusRing}`}`}
              />
            </div>

            {/* Error or Preview */}
            <div className="flex items-center justify-between text-xs">
              {hasError ? (
                <p className="text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors[link.id]}
                </p>
              ) : previewUrl ? (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dungeon-400 hover:text-dungeon-200 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {previewUrl.length > 40 ? `${previewUrl.slice(0, 40)}...` : previewUrl}
                </a>
              ) : (
                <span className="text-dungeon-500">Deja vacío si no quieres mostrarlo</span>
              )}
            </div>
          </div>
        );
      })}

      {/* Info Box */}
      <div className="flex items-start gap-3 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl mt-8">
        <div className="p-1.5 bg-cyan-500/20 rounded-lg flex-shrink-0">
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <p className="text-sm text-cyan-300 font-medium">Enlaces públicos</p>
          <p className="text-xs text-dungeon-400 mt-0.5">
            Aparecerán como iconos en tu perfil para que otros jugadores te encuentren
          </p>
        </div>
      </div>
    </div>
  );
}
