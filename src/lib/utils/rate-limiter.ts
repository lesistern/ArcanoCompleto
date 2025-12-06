/**
 * Rate Limiter con ventana deslizante para proteger APIs
 * Almacena en memoria (suficiente para una sola instancia de servidor)
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Store en memoria para rate limiting (por IP)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpiar entradas expiradas cada minuto
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60_000);

interface RateLimitConfig {
  maxRequests: number;      // Número máximo de requests
  windowMs: number;         // Ventana de tiempo en milisegundos
  identifier?: string;      // Identificador opcional adicional (ej: userId)
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Verifica si una request está dentro del límite
 * @param ip - Dirección IP del cliente
 * @param config - Configuración del rate limit
 * @returns Objeto con resultado del rate limit
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs, identifier } = config;
  const key = identifier ? `${ip}:${identifier}` : ip;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    // Primera request o ventana expirada
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  if (entry.count >= maxRequests) {
    // Límite excedido
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  // Incrementar contador
  entry.count++;
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Obtiene la IP del cliente desde los headers de Next.js
 */
export function getClientIP(request: Request): string {
  // Vercel / Cloudflare / proxies
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Cloudflare específico
  const cfConnecting = request.headers.get('cf-connecting-ip');
  if (cfConnecting) {
    return cfConnecting;
  }

  // Header estándar
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback
  return 'unknown';
}

// Configuraciones predefinidas para diferentes endpoints
export const RATE_LIMITS = {
  // Búsqueda: 30 requests por minuto
  search: {
    maxRequests: 30,
    windowMs: 60_000, // 1 minuto
  },
  // APIs públicas: 100 requests por minuto
  public: {
    maxRequests: 100,
    windowMs: 60_000,
  },
  // APIs de autenticación: 5 requests por minuto
  auth: {
    maxRequests: 5,
    windowMs: 60_000,
  },
  // Webhooks: 10 requests por minuto
  webhook: {
    maxRequests: 10,
    windowMs: 60_000,
  },
} as const;
