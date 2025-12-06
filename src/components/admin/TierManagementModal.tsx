'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserProfile, TIER_BADGES, ALL_TIERS } from '@/lib/data/user-management';
import { X, AlertTriangle, Shield, ShieldCheck, Users } from 'lucide-react';

interface TierManagementModalProps {
  selectedUser: UserProfile | null;
  onAddTier: (userId: string, tier: string) => void;
  onClose: () => void;
  processing: boolean;
  currentUserIsAdmin: boolean;
  getUserTiers: (user: UserProfile) => string[];
}

export function TierManagementModal({
  selectedUser,
  onAddTier,
  onClose,
  processing,
  currentUserIsAdmin,
  getUserTiers,
}: TierManagementModalProps) {
  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full bg-dungeon-800 border border-gold-500">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-gold-400 font-heading">Gestionar tiers</CardTitle>
              <p className="text-dungeon-400 text-sm mt-1">
                {selectedUser.display_name || selectedUser.email}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-dungeon-400 hover:text-dungeon-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-xs text-dungeon-400 mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-300 mb-1">Informacion importante:</p>
                <ul className="space-y-1 text-blue-200">
                  <li>• Se guardan multiples tiers en tier_codes; tier_code usa el primero.</li>
                </ul>
              </div>
            </div>
          </div>
          {ALL_TIERS.filter((tier) => {
            const userTiers = getUserTiers(selectedUser);
            return !userTiers.includes(tier.value);
          }).map((tier) => {
            const tierInfo = TIER_BADGES[tier.value as keyof typeof TIER_BADGES];
            const TierIcon = tierInfo?.icon || Users;
            return (
              <Button
                key={tier.value}
                onClick={() => {
                  onAddTier(selectedUser.id, tier.value);
                  onClose();
                }}
                disabled={processing}
                variant="secondary"
                className="w-full justify-start gap-3 p-4 h-auto"
              >
                <TierIcon className="w-5 h-5 flex-shrink-0" />
                <div className="text-left flex-1">
                  <p className="font-semibold">{tier.label}</p>
                  <p className="text-xs text-dungeon-400 font-normal">{tier.description}</p>
                </div>
                {(tier as any).protected && (
                  <span title="Tier protegido">
                    <Shield className="w-4 h-4 text-red-400" />
                  </span>
                )}
                {(tier as any).adminOnly && (
                  <span title="Solo admins pueden remover">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                  </span>
                )}
              </Button>
            );
          })}
          {ALL_TIERS.filter((tier) => {
            const userTiers = getUserTiers(selectedUser);
            return !userTiers.includes(tier.value);
          }).length === 0 && (
            <p className="text-center text-dungeon-400 py-4">
              El usuario ya tiene todos los tiers disponibles
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
