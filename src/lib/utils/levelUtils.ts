/**
 * Calculates the experience points required to reach a specific level based on D&D 3.5 progression.
 * Formula: Level * (Level - 1) * 500
 * 
 * Level 1: 0 XP
 * Level 2: 1,000 XP
 * Level 3: 3,000 XP
 * Level 4: 6,000 XP
 * ...
 */
export function getXpForLevel(level: number): number {
    if (level <= 1) return 0;
    return level * (level - 1) * 500;
}

/**
 * Returns the base XP required for the current level.
 * @param level The current level of the user
 */
export function getCurrentLevelXp(level: number): number {
    return getXpForLevel(level);
}

/**
 * Returns the total XP required to reach the next level.
 * @param level The current level of the user
 */
export function getNextLevelXp(level: number): number {
    return getXpForLevel(level + 1);
}

/**
 * Calculates the level based on total experience points.
 * This is the inverse of getXpForLevel.
 * Solving for L in: XP = L * (L - 1) * 500
 * XP / 500 = L^2 - L
 * L^2 - L - (XP / 500) = 0
 * Quadratic formula: L = (1 + sqrt(1 - 4*1*(-XP/500))) / 2
 * L = (1 + sqrt(1 + 4 * (XP/500))) / 2
 * L = (1 + sqrt(1 + XP/125)) / 2
 */
export function getLevelFromXp(xp: number): number {
    if (xp <= 0) return 1;
    // Using the quadratic formula solution, floored to get the completed level
    const level = Math.floor((1 + Math.sqrt(1 + xp / 125)) / 2);
    return Math.max(1, level);
}
