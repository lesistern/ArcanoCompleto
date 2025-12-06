// src/lib/data/profile-avatars.ts
// Sistema de avatares de perfil predefinidos basados en clases D&D 3.5

export interface ProfileAvatarOption {
  id: string;
  name: string;
  path: string;
  classSlug: string;
}

/**
 * 11 avatares de perfil basados en las clases de D&D 3.5
 */
export const PROFILE_AVATARS: ProfileAvatarOption[] = [
  {
    id: 'barbaro',
    name: 'Bárbaro',
    path: '/avatars/barbaropfp.webp',
    classSlug: 'barbaro'
  },
  {
    id: 'bardo',
    name: 'Bardo',
    path: '/avatars/bardopfp.webp',
    classSlug: 'bardo'
  },
  {
    id: 'clerigo',
    name: 'Clérigo',
    path: '/avatars/clerigopfp.webp',
    classSlug: 'clerigo'
  },
  {
    id: 'druida',
    name: 'Druida',
    path: '/avatars/druidapfp.webp',
    classSlug: 'druida'
  },
  {
    id: 'explorador',
    name: 'Explorador',
    path: '/avatars/exploradorpfp.webp',
    classSlug: 'explorador'
  },
  {
    id: 'guerrero',
    name: 'Guerrero',
    path: '/avatars/guerreropfp.webp',
    classSlug: 'guerrero'
  },
  {
    id: 'hechicero',
    name: 'Hechicero',
    path: '/avatars/hechiceropfp.webp',
    classSlug: 'hechicero'
  },
  {
    id: 'mago',
    name: 'Mago',
    path: '/avatars/magopfp.webp',
    classSlug: 'mago'
  },
  {
    id: 'monje',
    name: 'Monje',
    path: '/avatars/monjepfp.webp',
    classSlug: 'monje'
  },
  {
    id: 'paladin',
    name: 'Paladín',
    path: '/avatars/paladinpfp.webp',
    classSlug: 'paladin'
  },
  {
    id: 'picaro',
    name: 'Pícaro',
    path: '/avatars/picaropfp.webp',
    classSlug: 'picaro'
  }
];

/**
 * Obtiene un avatar aleatorio de la lista
 */
export function getRandomAvatar(): ProfileAvatarOption {
  const randomIndex = Math.floor(Math.random() * PROFILE_AVATARS.length);
  return PROFILE_AVATARS[randomIndex];
}

/**
 * Obtiene la URL de un avatar aleatorio
 */
export function getRandomAvatarPath(): string {
  return getRandomAvatar().path;
}

/**
 * Busca un avatar por su ID
 */
export function getAvatarById(id: string): ProfileAvatarOption | undefined {
  return PROFILE_AVATARS.find(avatar => avatar.id === id);
}

/**
 * Busca un avatar por el slug de la clase
 */
export function getAvatarByClassSlug(classSlug: string): ProfileAvatarOption | undefined {
  return PROFILE_AVATARS.find(avatar => avatar.classSlug === classSlug);
}

/**
 * Verifica si una URL es un avatar predefinido
 */
export function isDefaultAvatar(url: string | null | undefined): boolean {
  if (!url) return false;
  return PROFILE_AVATARS.some(avatar => url.includes(avatar.path));
}

/**
 * Extrae el ID del avatar de una URL predefinida
 */
export function getAvatarIdFromPath(path: string | null | undefined): string | null {
  if (!path) return null;
  const avatar = PROFILE_AVATARS.find(a => path.includes(a.path));
  return avatar?.id || null;
}
