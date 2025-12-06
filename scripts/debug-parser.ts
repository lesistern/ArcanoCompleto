
import * as fs from 'fs';
import * as path from 'path';

const BASE_PATH = 'd:\\CalabozosYDragones\\Extras\\ScrapData\\srd.dndtools.org\\srd';

function debugPsionics() {
    console.log('--- Debugging Psionics ---');
    const filePath = path.join(BASE_PATH, 'magic', 'psionics', 'powers', 'powersAllCore.html');

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    console.log('First 500 chars:', content.substring(0, 500));

    // Try to find the first h6
    const h6Regex = /<h6.*?>(.*?)<\/h6>/gs;
    const match = h6Regex.exec(content);
    if (match) {
        console.log('First h6 match:', match[0]);
        console.log('Group 1:', match[1]);
    } else {
        console.log('No h6 match found');
    }
}

function debugArmor() {
    console.log('--- Debugging Armor ---');
    const filePath = path.join(BASE_PATH, 'equipment', 'armor.html');

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    // Find the table
    const tableRegex = /<table.*?>(.*?)<\/table>/gs;
    const match = tableRegex.exec(content); // First table might be layout

    console.log('First 500 chars:', content.substring(0, 500));

    const rowRegex = /<tr[^>]*>(.*?)<\/tr>/gs;
    let rowMatch = rowRegex.exec(content);
    if (rowMatch) {
        console.log('First row match:', rowMatch[0]);
    } else {
        console.log('No row match found');
    }
}

debugPsionics();
debugArmor();
