const fs = require('fs');
const path = require('path');

const featsPath = path.join(__dirname, '../src/lib/data/3.5/feats.json');
const feats = JSON.parse(fs.readFileSync(featsPath, 'utf-8'));

// Mapeo de dotes que pueden ser obtenidas como bonus feats por clases específicas
const bonusFeatMapping = {
  // Dotes de Guerrero - todas las dotes de combate
  'power-attack': [
    { className: 'Guerrero' }
  ],
  'cleave': [
    { className: 'Guerrero' }
  ],
  'great-cleave': [
    { className: 'Guerrero' }
  ],
  'improved-initiative': [
    { className: 'Guerrero' }
  ],
  'combat-reflexes': [
    { className: 'Guerrero' }
  ],
  'dodge': [
    { className: 'Guerrero' }
  ],
  'mobility': [
    { className: 'Guerrero' }
  ],
  'spring-attack': [
    { className: 'Guerrero' }
  ],
  'weapon-focus': [
    { className: 'Guerrero' }
  ],
  'weapon-specialization': [
    { className: 'Guerrero', level: 4 }
  ],
  'weapon-finesse': [
    { className: 'Guerrero' }
  ],
  'two-weapon-fighting': [
    { className: 'Guerrero' },
    { className: 'Explorador', level: 2, condition: 'estilo de combate con dos armas' }
  ],
  'improved-two-weapon-fighting': [
    { className: 'Guerrero' },
    { className: 'Explorador', level: 6, condition: 'estilo de combate con dos armas' }
  ],
  'point-blank-shot': [
    { className: 'Guerrero' }
  ],
  'precise-shot': [
    { className: 'Guerrero' }
  ],
  'rapid-shot': [
    { className: 'Guerrero' },
    { className: 'Explorador', level: 2, condition: 'estilo de combate con arco' }
  ],
  'improved-critical': [
    { className: 'Guerrero' }
  ],
  'deflect-arrows': [
    { className: 'Guerrero' },
    { className: 'Monje', level: 2 }
  ],
  'soltura-con-un-arma': [
    { className: 'Guerrero' }
  ],

  // Dotes de Explorador - estilo de combate con arco
  // Ya incluidas arriba: rapid-shot

  // Dotes de Monje
  // Ya incluida arriba: deflect-arrows

  // Dotes de Mago/Hechicero
  'scribe-scroll': [
    { className: 'Mago', level: 1 },
    { className: 'Hechicero', level: 1 }
  ]
};

// Actualizar feats con la información de bonusFeatClasses
feats.forEach(feat => {
  if (bonusFeatMapping[feat.id]) {
    feat.bonusFeatClasses = bonusFeatMapping[feat.id];
  }
});

// Guardar el archivo actualizado
fs.writeFileSync(featsPath, JSON.stringify(feats, null, 2), 'utf-8');

console.log('✅ Archivo feats.json actualizado con bonusFeatClasses');
console.log(`   Dotes actualizadas: ${Object.keys(bonusFeatMapping).length}`);
