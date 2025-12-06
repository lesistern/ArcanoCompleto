const { extractClassLore } = require('./extract-class-lore.js');

async function testBarbarian() {
    console.log('=== Test: Extracción de Bárbaro ===\n');

    const loreData = await extractClassLore('Barbarian', 'barbaro');

    if (loreData) {
        console.log('\n=== Datos Extraídos ===');
        console.log(JSON.stringify(loreData, null, 2));
    } else {
        console.log('❌ No se pudieron extraer datos');
    }
}

testBarbarian();
