'use client';

import React from 'react';
import Link from 'next/link';
import { useUnitPreference } from '@/lib/hooks/useUnitPreference';
import { convertDistancesInText } from '@/lib/utils/distance';

interface FormattedDescriptionProps {
  text: string;
  className?: string;
  /** Slug de la habilidad actual para evitar auto-referencias (links a sí misma) */
  excludeSkillSlug?: string;
  /** Si se deben convertir las distancias según preferencia del usuario (default: true) */
  convertDistances?: boolean;
}

// Mapa de habilidades: nombre → slug para crear links
const SKILL_MAP: Record<string, string> = {
  'Abrir cerraduras': 'abrir-cerraduras',
  'Acrobacias': 'acrobacias',
  'Artesanía': 'artesania',
  'Avistar': 'avistar',
  'Buscar': 'buscar',
  'Concentración': 'concentracion',
  'Conocimiento (arcano)': 'conocimiento-arcano',
  'Conocimiento (arquitectura e ingeniería)': 'conocimiento-arquitectura',
  'Conocimiento (geografía)': 'conocimiento-geografia',
  'Conocimiento (historia)': 'conocimiento-historia',
  'Conocimiento (local)': 'conocimiento-local',
  'Conocimiento (los planos)': 'conocimiento-los-planos',
  'Conocimiento (mazmorrería)': 'conocimiento-mazmorreria',
  'Conocimiento (naturaleza)': 'conocimiento-naturaleza',
  'Conocimiento (nobleza y realeza)': 'conocimiento-nobleza',
  'Conocimiento (religión)': 'conocimiento-religion',
  'Conocimiento de conjuros': 'conocimiento-conjuros',
  'Descifrar escritura': 'descifrar-escritura',
  'Diplomacia': 'diplomacia',
  'Disfrazarse': 'disfrazarse',
  'Engañar': 'enganar',
  'Equilibrio': 'equilibrio',
  'Escalar': 'escalar',
  'Escapismo': 'escapismo',
  'Esconderse': 'esconderse',
  'Escuchar': 'escuchar',
  'Falsificar': 'falsificar',
  'Hablar un idioma': 'hablar-un-idioma',
  'Hablar veraz': 'hablar-veraz',
  'Interpretación': 'interpretacion',
  'Intimidar': 'intimidar',
  'Inutilizar mecanismo': 'inutilizar-mecanismo',
  'Juego de manos': 'juego-de-manos',
  'Montar': 'montar',
  'Moverse sigilosamente': 'moverse-sigilosamente',
  'Nadar': 'nadar',
  'Profesión': 'profesion',
  'Psicocraft': 'psicocraft',
  'Recabar información': 'recabar-informacion',
  'Saber marcial': 'saber-marcial',
  'Saltar': 'saltar',
  'Sanar': 'sanar',
  'Sentir motivaciones': 'sentir-motivaciones',
  'Supervivencia': 'supervivencia',
  'Tasación': 'tasacion',
  'Trato con animales': 'trato-con-animales',
  'Usar dispositivo psiónico': 'usar-dispositivo-psionico',
  'Usar objeto mágico': 'usar-objeto-magico',
  'Uso de cuerdas': 'uso-de-cuerdas',
  // Versiones alternativas y abreviadas
  'Conocimiento': 'conocimiento-arcano', // fallback genérico
};

// Lista de nombres de habilidades ordenada por longitud (las más largas primero para evitar matches parciales)
const SKILL_NAMES = Object.keys(SKILL_MAP).sort((a, b) => b.length - a.length);

// Términos de juego que se destacan
const GAME_TERMS = [
  'asalto completo', 'acción de asalto completo', 'acción estándar', 'acción de movimiento',
  'acción gratuita', 'acción completa', 'oportunidad', 'ataque de oportunidad',
  'bonificador de sinergia', 'sinergia', 'penalizador', 'bonificador',
  'tirada de salvación', 'salvación de Fortaleza', 'salvación de Reflejos', 'salvación de Voluntad',
  'Fortaleza', 'Reflejos', 'Voluntad',
  'clase de armadura', 'CA', 'DG', 'nivel de lanzador',
  'rango', 'rangos', 'entrenado', 'sin entrenamiento',
  'éxito', 'fracaso', 'fallo', '1 natural', '20 natural',
  'crítico', 'golpe crítico', 'ataque cuerpo a cuerpo', 'ataque a distancia',
  'turno', 'ronda', 'minuto', 'hora', 'día',
  'pie', 'pies', 'metro', 'metros', 'casilla', 'casillas',
];

/**
 * Componente que formatea texto plano en una presentación visual mejorada.
 * Detecta párrafos, listas, encabezados de sección, términos destacados y crea links a habilidades.
 * También convierte distancias según la preferencia del usuario (Imperial/Métrico).
 */
export function FormattedDescription({ text, className = '', excludeSkillSlug, convertDistances = true }: FormattedDescriptionProps) {
  const { unitSystem, isLoaded } = useUnitPreference();

  if (!text) return null;

  // Convertir distancias según preferencia del usuario
  const processedText = convertDistances && isLoaded
    ? convertDistancesInText(text, unitSystem)
    : text;

  // Dividir por párrafos (doble salto de línea o líneas vacías)
  const paragraphs = processedText.split(/\n\s*\n/).filter(p => p.trim());

  const renderParagraph = (paragraph: string, index: number) => {
    const lines = paragraph.split('\n').map(l => l.trim()).filter(Boolean);

    // Detectar si es una lista (todas las líneas empiezan con viñeta o número)
    const isBulletList = lines.every(line =>
      /^[-•*]\s/.test(line) || /^[▸▶►◆○●]\s/.test(line)
    );

    const isNumberedList = lines.every(line =>
      /^\d+[.)]\s/.test(line)
    );

    // Detectar si es un encabezado de sección (línea corta terminada en :)
    const isSectionHeader = lines.length === 1 &&
      lines[0].length < 60 &&
      (lines[0].endsWith(':') || /^\*\*[^*]+:\*\*$/.test(lines[0]));

    // Detectar líneas que parecen sub-encabezados
    const hasSubHeaders = lines.some(line =>
      (line.endsWith(':') && line.length < 80 && !line.includes('.')) ||
      /^\*\*[^*]+:\*\*/.test(line)
    );

    if (isSectionHeader) {
      const headerText = lines[0]
        .replace(/:$/, '')
        .replace(/^\*\*/, '')
        .replace(/\*\*$/, '')
        .replace(/:\*\*$/, '');
      return (
        <h4
          key={index}
          className="text-lg font-heading font-semibold text-gold-500 mt-6 mb-3 first:mt-0"
        >
          {headerText}
        </h4>
      );
    }

    if (isBulletList) {
      return (
        <ul key={index} className="space-y-2 my-4 ml-1">
          {lines.map((line, i) => (
            <li
              key={i}
              className="flex gap-3 text-dungeon-200 leading-relaxed"
            >
              <span className="text-gold-500 mt-1.5 flex-shrink-0">•</span>
              <span>{formatInlineText(line.replace(/^[-•*▸▶►◆○●]\s*/, ''), excludeSkillSlug)}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (isNumberedList) {
      return (
        <ol key={index} className="space-y-2 my-4 ml-1 list-decimal list-inside">
          {lines.map((line, i) => (
            <li
              key={i}
              className="text-dungeon-200 leading-relaxed marker:text-gold-500 marker:font-bold"
            >
              {formatInlineText(line.replace(/^\d+[.)]\s*/, ''), excludeSkillSlug)}
            </li>
          ))}
        </ol>
      );
    }

    // Párrafo con posibles sub-encabezados internos
    if (hasSubHeaders && lines.length > 1) {
      return (
        <div key={index} className="my-4 space-y-3">
          {lines.map((line, i) => {
            // Detectar headers en formato **Header:**
            const boldHeaderMatch = line.match(/^\*\*([^*]+):\*\*\s*(.*)/);
            if (boldHeaderMatch) {
              const [, header, rest] = boldHeaderMatch;
              return (
                <div key={i} className="mt-3 first:mt-0">
                  <span className="font-bold text-gold-400">{header}:</span>
                  {rest && <span className="text-dungeon-200 ml-2">{formatInlineText(rest, excludeSkillSlug)}</span>}
                </div>
              );
            }

            const isSubHeader = line.endsWith(':') && line.length < 80 && !line.includes('.');
            if (isSubHeader) {
              return (
                <h5
                  key={i}
                  className="text-base font-semibold text-gold-400 mt-4 first:mt-0"
                >
                  {line}
                </h5>
              );
            }

            return (
              <p key={i} className="text-dungeon-200 leading-relaxed">
                {formatInlineText(line, excludeSkillSlug)}
              </p>
            );
          })}
        </div>
      );
    }

    // Párrafo normal - detectar headers inline como **Chequeo:**
    const processedText = lines.join(' ');

    // Si el párrafo contiene headers en negrita inline, procesarlos
    if (/\*\*[^*]+:\*\*/.test(processedText)) {
      return (
        <div key={index} className="text-dungeon-200 leading-relaxed my-4 first:mt-0 last:mb-0">
          {formatTextWithBoldHeaders(processedText, excludeSkillSlug)}
        </div>
      );
    }

    return (
      <p key={index} className="text-dungeon-200 leading-relaxed my-4 first:mt-0 last:mb-0">
        {formatInlineText(processedText, excludeSkillSlug)}
      </p>
    );
  };

  return (
    <div className={`prose-skill ${className}`}>
      {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
    </div>
  );
}

/**
 * Procesa texto que contiene headers en negrita como **Chequeo:** texto
 * @param excludeSkillSlug - Slug de habilidad a excluir de links
 */
function formatTextWithBoldHeaders(text: string, excludeSkillSlug?: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;

  // Regex para encontrar **Header:** seguido de texto
  const headerRegex = /\*\*([^*]+):\*\*/g;
  let match;

  while ((match = headerRegex.exec(text)) !== null) {
    // Añadir texto antes del match
    if (match.index > lastIndex) {
      const beforeText = text.slice(lastIndex, match.index);
      parts.push(
        <React.Fragment key={`text-${keyCounter++}`}>
          {formatInlineText(beforeText, excludeSkillSlug)}
        </React.Fragment>
      );
    }

    // Añadir el header formateado
    parts.push(
      <React.Fragment key={`header-${keyCounter++}`}>
        <span className="font-bold text-gold-400">{match[1]}:</span>
      </React.Fragment>
    );

    lastIndex = match.index + match[0].length;
  }

  // Añadir el texto restante
  if (lastIndex < text.length) {
    parts.push(
      <React.Fragment key={`end-${keyCounter++}`}>
        {formatInlineText(text.slice(lastIndex), excludeSkillSlug)}
      </React.Fragment>
    );
  }

  return parts.length > 0 ? parts : formatInlineText(text, excludeSkillSlug);
}

interface TextMatch {
  index: number;
  length: number;
  text: string;
  type: 'cd' | 'modifier' | 'dice' | 'quote' | 'skill' | 'bold' | 'game_term';
  slug?: string;
}

/**
 * Formatea texto inline detectando términos especiales como CDs, modificadores,
 * habilidades (con links), etc.
 * @param text - Texto a formatear
 * @param excludeSkillSlug - Slug de habilidad a excluir de links (evita auto-referencias)
 */
function formatInlineText(text: string, excludeSkillSlug?: string): React.ReactNode {
  const matches: TextMatch[] = [];

  // 1. Detectar CDs (CD X, CD 15, etc.)
  const cdRegex = /\bCD\s*\d+/gi;
  let match;
  while ((match = cdRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      text: match[0],
      type: 'cd'
    });
  }

  // 2. Detectar modificadores (+X, -X)
  const modRegex = /\b[+-]\d+\b/g;
  while ((match = modRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      text: match[0],
      type: 'modifier'
    });
  }

  // 3. Detectar tiradas de dados (XdY, XdY+Z)
  const diceRegex = /\b\d+d\d+(?:[+-]\d+)?\b/gi;
  while ((match = diceRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      text: match[0],
      type: 'dice'
    });
  }

  // 4. Detectar texto entre comillas
  const quoteRegex = /"[^"]+"/g;
  while ((match = quoteRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      text: match[0],
      type: 'quote'
    });
  }

  // 5. Detectar negrita markdown **texto**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  while ((match = boldRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      text: match[1], // Solo el contenido sin los asteriscos
      type: 'bold'
    });
  }

  // 6. Detectar nombres de habilidades (para crear links)
  for (const skillName of SKILL_NAMES) {
    const skillSlug = SKILL_MAP[skillName];

    // Si este slug es el que debemos excluir (auto-referencia), saltarlo
    if (excludeSkillSlug && skillSlug === excludeSkillSlug) {
      continue;
    }

    const skillRegex = new RegExp(`\\b${escapeRegex(skillName)}\\b`, 'gi');
    while ((match = skillRegex.exec(text)) !== null) {
      // Verificar que no está ya cubierto por otro match
      const isOverlapping = matches.some(m =>
        (match!.index >= m.index && match!.index < m.index + m.length) ||
        (m.index >= match!.index && m.index < match!.index + match![0].length)
      );
      if (!isOverlapping) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
          type: 'skill',
          slug: skillSlug
        });
      }
    }
  }

  // 7. Detectar términos de juego
  for (const term of GAME_TERMS) {
    const termRegex = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi');
    while ((match = termRegex.exec(text)) !== null) {
      const isOverlapping = matches.some(m =>
        (match!.index >= m.index && match!.index < m.index + m.length) ||
        (m.index >= match!.index && m.index < match!.index + match![0].length)
      );
      if (!isOverlapping) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
          type: 'game_term'
        });
      }
    }
  }

  // Ordenar por posición
  matches.sort((a, b) => a.index - b.index);

  // Eliminar solapamientos (mantener el primero)
  const filteredMatches = matches.filter((match, i) => {
    if (i === 0) return true;
    for (let j = 0; j < i; j++) {
      const prev = matches[j];
      if (match.index < prev.index + prev.length) {
        return false;
      }
    }
    return true;
  });

  // Si no hay matches, devolver el texto sin procesar
  if (filteredMatches.length === 0) {
    return text;
  }

  // Construir los fragmentos
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  filteredMatches.forEach((m, i) => {
    // Añadir texto antes del match
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index));
    }

    // Añadir el match formateado según su tipo
    const key = `match-${i}`;
    switch (m.type) {
      case 'cd':
        parts.push(
          <span key={key} className="font-mono font-bold text-gold-500">
            {m.text}
          </span>
        );
        break;
      case 'modifier':
        parts.push(
          <span key={key} className="font-mono font-semibold text-emerald-400">
            {m.text}
          </span>
        );
        break;
      case 'dice':
        parts.push(
          <span key={key} className="font-mono font-semibold text-sky-400">
            {m.text}
          </span>
        );
        break;
      case 'quote':
        parts.push(
          <span key={key} className="italic text-amber-300/90">
            {m.text}
          </span>
        );
        break;
      case 'bold':
        parts.push(
          <span key={key} className="font-semibold text-dungeon-100">
            {m.text}
          </span>
        );
        break;
      case 'skill':
        parts.push(
          <Link
            key={key}
            href={`/habilidades/${m.slug}`}
            className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300 transition-colors"
          >
            {m.text}
          </Link>
        );
        break;
      case 'game_term':
        parts.push(
          <span key={key} className="text-cyan-400/90 font-medium">
            {m.text}
          </span>
        );
        break;
      default:
        parts.push(m.text);
    }

    lastIndex = m.index + m.length;
  });

  // Añadir el texto restante
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Escapa caracteres especiales de regex
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default FormattedDescription;
