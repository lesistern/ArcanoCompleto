'use client';

import {
  Home,
  Sword,
  Shield,
  BookOpen,
  Users,
  Zap,
  Award,
  Scroll,
  Package,
  Wand2,
  Brain,
  Ghost,
  Globe,
  Settings as SettingsIcon,
  UserPlus,
  Dices,
  Swords,
  MessageSquare,
  FileEdit,
  ClipboardList,
  UserCog,
  Flag,
  Database,
  ChevronRight,
  Sparkles,
  Crown,
  Mountain,
  Flame,
  Target,
  Boxes,
  FileDown,
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';
import SidebarDivider from './SidebarDivider';

interface SidebarNavigationProps {
  user?: {
    id: string;
  };
  profile?: {
    tier_code?: string;
    role?: string;
  };
  onNavigate?: () => void;
  isCollapsed?: boolean;
}

export default function SidebarNavigation({
  user,
  profile,
  onNavigate,
  isCollapsed = false,
}: SidebarNavigationProps) {
  const isAuthenticated = !!user;
  const isAdmin =
    profile?.tier_code === 'admin' ||
    profile?.tier_code === 'mod' ||
    profile?.role === 'admin';
  const isModerator = isAdmin || profile?.tier_code === 'mod';
  const isContributor =
    isAdmin ||
    isModerator ||
    profile?.tier_code === 'contributor' ||
    profile?.tier_code === 'translator';

  return (
    <div className="space-y-6 py-2 min-w-full w-max">
      {/* COMPENDIO SRD */}
      <SidebarSection
        title="Compendio SRD"
        collapsible
        defaultOpen={true}
        icon={<BookOpen size={14} />}
        isCollapsed={isCollapsed}
      >
        <SidebarItem href="/reglas" icon={BookOpen} label="Reglas básicas" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/razas" icon={Users} label="Razas" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/clases" icon={Sword} label="Clases" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/habilidades" icon={Target} label="Habilidades (Skills)" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/dotes" icon={Award} label="Dotes (Feats)" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/objetos" icon={Package} label="Equipo" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/objetos/magicos" icon={Sparkles} label="Objetos mágicos" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/conjuros" icon={Wand2} label="Magia" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/psionica" icon={Brain} label="Psiónica" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/monstruos" icon={Ghost} label="Monstruos" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/es/planos-deidades" icon={Globe} label="Planos y Deidades" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/reglas-variantes" icon={Boxes} label="Reglas variantes" onClick={onNavigate} isCollapsed={isCollapsed} />
        <SidebarItem href="/contenido-epico" icon={Crown} label="Contenido épico" onClick={onNavigate} isCollapsed={isCollapsed} />
      </SidebarSection>

      <SidebarDivider />

      {/* HERRAMIENTAS */}
      <SidebarSection
        title="Herramientas"
        collapsible
        defaultOpen={true}
        icon={<Dices size={14} />}
        isCollapsed={isCollapsed}
      >
        {isAuthenticated ? (
          <>
            <SidebarItem href="/editor-personajes" icon={UserPlus} label="Creador de personaje" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem href="/personajes" icon={Scroll} label="Mis personajes" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem href="/pnj" icon={Users} label="PNJ / Encuentros" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem href="/dm-screen" icon={Shield} label="Pantalla del DM" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem
              href="https://drive.google.com/drive/folders/1cbatIBiCQ_StwcVGDJQHmfz42lTF2_DI?usp=sharing"
              icon={FileDown}
              label="Descargar Hojas Pj"
              onClick={onNavigate}
              isCollapsed={isCollapsed}
              target="_blank"
            />
          </>
        ) : (
          <>
            <SidebarItem href="/editor-personajes" icon={UserPlus} label="Creador de personaje" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem href="/dm-screen" icon={Shield} label="Pantalla del DM" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem
              href="https://drive.google.com/drive/folders/1cbatIBiCQ_StwcVGDJQHmfz42lTF2_DI?usp=sharing"
              icon={FileDown}
              label="Descargar Hojas Pj"
              onClick={onNavigate}
              isCollapsed={isCollapsed}
              target="_blank"
            />
          </>
        )}
      </SidebarSection>

      <SidebarDivider />

      {/* COMUNIDAD / EDICIÓN */}
      <SidebarSection
        title="Comunidad / Edición"
        collapsible
        defaultOpen={false}
        icon={<MessageSquare size={14} />}
        isCollapsed={isCollapsed}
      >
        <SidebarItem href="/foro" icon={MessageSquare} label="Foro" onClick={onNavigate} isCollapsed={isCollapsed} />
        {isAuthenticated && (
          <>
            <SidebarItem href="/foro/mis-hilos" icon={ClipboardList} label="Mis hilos" onClick={onNavigate} isCollapsed={isCollapsed} />
            <SidebarItem href="/contribuciones" icon={FileEdit} label="Traducciones / Contribuciones" onClick={onNavigate} isCollapsed={isCollapsed} />
          </>
        )}
      </SidebarSection>

      {/* Divider before role-based panels */}
      {(isContributor || isModerator || isAdmin) && <SidebarDivider />}

      {/* PANEL DE CONTRIBUIDOR / TRADUCTOR */}
      {isAuthenticated && isContributor && (
        <SidebarSection
          title="Panel de Contribuidor"
          collapsible
          defaultOpen={false}
          icon={<FileEdit size={14} />}
          isCollapsed={isCollapsed}
        >
          <SidebarItem href="/contribuidor/tareas" icon={ClipboardList} label="Tareas pendientes" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/contribuidor/revisiones" icon={FileEdit} label="Revisión de traducciones" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/contribuidor/historial" icon={Scroll} label="Historial de cambios" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
        </SidebarSection>
      )}

      {/* PANEL DE MODERACIÓN */}
      {isAuthenticated && isModerator && (
        <SidebarSection
          title="Panel de Moderación"
          collapsible
          defaultOpen={false}
          icon={<Flag size={14} />}
          isCollapsed={isCollapsed}
        >
          <SidebarItem href="/moderacion/reportes" icon={Flag} label="Reportes de usuarios" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/moderacion/foro" icon={MessageSquare} label="Hilos / comentarios marcados" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/moderacion/aprobaciones" icon={ClipboardList} label="Colas de aprobación" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
        </SidebarSection>
      )}

      {/* PANEL DE ADMINISTRACIÓN */}
      {isAuthenticated && isAdmin && (
        <SidebarSection
          title="Panel de Administración"
          collapsible
          defaultOpen={false}
          icon={<SettingsIcon size={14} />}
          isCollapsed={isCollapsed}
        >
          <SidebarItem href="/admin" icon={Home} label="Dashboard" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/admin/usuarios" icon={UserCog} label="Gestión de usuarios y roles" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/admin/importar" icon={Database} label="Importar / actualizar SRD" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
          <SidebarItem href="/admin/herramientas" icon={SettingsIcon} label="Herramientas internas" isAdmin onClick={onNavigate} isCollapsed={isCollapsed} />
        </SidebarSection>
      )}
    </div>
  );
}
