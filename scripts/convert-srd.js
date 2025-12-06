const fs = require('fs');
const path = require('path');

const SRD_PATH = path.join(__dirname, '../scrap/SRD20/www.d20srd.org/srd');
const OUTPUT_BASE = path.join(__dirname, '../recursos/Textos/Nuevos');

const DIRS = {
    CLASSES: path.join(OUTPUT_BASE, 'Clases'),
    RACES: path.join(OUTPUT_BASE, 'Razas'),
    FEATS: path.join(OUTPUT_BASE, 'Dotes'),
};

// Ensure output directories exist
Object.values(DIRS).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

function cleanHtml(html) {
    let text = html;

    // Remove scripts and styles
    text = text.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
    text = text.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "");
    text = text.replace(/<noscript>([\s\S]*?)<\/noscript>/gim, "");

    // Remove comments
    text = text.replace(/<!--[\s\S]*?-->/g, "");

    // Remove DOCTYPE, html, head, body tags
    text = text.replace(/<!DOCTYPE[^>]*>/g, "");
    text = text.replace(/<\?xml[^>]*\?>/g, "");
    text = text.replace(/<html[^>]*>/gim, "");
    text = text.replace(/<\/html>/gim, "");
    text = text.replace(/<head>[\s\S]*?<\/head>/gim, "");
    text = text.replace(/<body[^>]*>/gim, "");
    text = text.replace(/<\/body>/gim, "");

    // Heuristic: Keep content starting from the first <h1> or <table>
    // This effectively removes headers, navigation, sidebars, etc. that appear before the main content.
    const firstContentIndex = text.search(/<(h1|table)/i);
    if (firstContentIndex !== -1) {
        text = text.substring(firstContentIndex);
    }

    // Remove Ads (if any remain after the cut)
    text = text.replace(/<div id='div-gpt-ad[\s\S]*?<\/div>/gim, "");

    // Remove Footer
    const footerMatch = text.match(/<div class="footer">/i);
    if (footerMatch) {
        text = text.substring(0, footerMatch.index);
    }

    return text;
}

function htmlToMarkdown(html) {
    let md = cleanHtml(html);

    // Basic tag replacements
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gim, "# $1\n\n");
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gim, "## $1\n\n");
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gim, "### $1\n\n");
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gim, "#### $1\n\n");
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gim, "##### $1\n\n");
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gim, "###### $1\n\n");

    md = md.replace(/<p[^>]*>/gim, "");
    md = md.replace(/<\/p>/gim, "\n\n");

    md = md.replace(/<br\s*\/?>/gim, "\n");
    md = md.replace(/<hr\s*\/?>/gim, "---\n\n");

    // Lists
    md = md.replace(/<ul[^>]*>/gim, "");
    md = md.replace(/<\/ul>/gim, "\n");
    md = md.replace(/<ol[^>]*>/gim, "");
    md = md.replace(/<\/ol>/gim, "\n");
    md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gim, "- $1\n");

    // Formatting
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gim, "**$1**");
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gim, "**$1**");
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gim, "*$1*");
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gim, "*$1*");
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gim, "`$1`");

    // Links
    md = md.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gim, "[$2]($1)");

    // Tables
    md = md.replace(/<caption>[\s\S]*?<\/caption>/gim, "");
    md = md.replace(/<table[^>]*>/gim, "\n\n");
    md = md.replace(/<\/table>/gim, "\n\n");
    md = md.replace(/<tr[^>]*>/gim, "");
    md = md.replace(/<\/tr>/gim, "|\n");
    md = md.replace(/<th[^>]*>([\s\S]*?)<\/th>/gim, "| **$1** ");
    md = md.replace(/<td[^>]*>([\s\S]*?)<\/td>/gim, "| $1 ");

    // Entities
    md = md.replace(/&nbsp;/g, " ");
    md = md.replace(/&amp;/g, "&");
    md = md.replace(/&lt;/g, "<");
    md = md.replace(/&gt;/g, ">");
    md = md.replace(/&quot;/g, "\"");
    md = md.replace(/&times;/g, "x");
    md = md.replace(/&frac12;/g, "1/2");

    // Cleanup multiple newlines
    md = md.replace(/\n\s*\n/g, "\n\n");

    return md.trim();
}

function processClasses() {
    const classesDir = path.join(SRD_PATH, 'classes');
    const files = fs.readdirSync(classesDir);

    files.forEach(file => {
        if (!file.endsWith('.html')) return;

        const content = fs.readFileSync(path.join(classesDir, file), 'utf-8');
        const markdown = htmlToMarkdown(content);
        const outName = file.replace('.html', '.md');
        const capitalized = outName.charAt(0).toUpperCase() + outName.slice(1);

        fs.writeFileSync(path.join(DIRS.CLASSES, capitalized), markdown);
        console.log(`Processed Class: ${capitalized}`);
    });
}

function processRaces() {
    const raceFile = path.join(SRD_PATH, 'races.html');
    const content = fs.readFileSync(raceFile, 'utf-8');

    const parts = content.split(/<h2 id="([^"]+)">/);

    for (let i = 1; i < parts.length; i += 2) {
        const id = parts[i];
        let sectionContent = parts[i + 1];

        // Remove the leftover title and closing tag
        sectionContent = sectionContent.replace(/^.*?<\/h2>/, '');

        const title = id.charAt(0).toUpperCase() + id.slice(1);
        const markdown = htmlToMarkdown(`<h2>${title}</h2>` + sectionContent);

        fs.writeFileSync(path.join(DIRS.RACES, `${title}.md`), markdown);
        console.log(`Processed Race: ${title}.md`);
    }
}

function processFeats() {
    const featsFile = path.join(SRD_PATH, 'feats.html');
    const content = fs.readFileSync(featsFile, 'utf-8');

    const parts = content.split(/<h3 id="([^"]+)">/);

    for (let i = 1; i < parts.length; i += 2) {
        const id = parts[i];
        let sectionContent = parts[i + 1];

        // Remove the leftover title and closing tag
        sectionContent = sectionContent.replace(/^.*?<\/h3>/, '');

        // Cut off at next h2 if present
        const h2Index = sectionContent.indexOf('<h2');
        if (h2Index !== -1) {
            sectionContent = sectionContent.substring(0, h2Index);
        }

        const title = id.charAt(0).toUpperCase() + id.slice(1);
        const markdown = htmlToMarkdown(`<h3>${title}</h3>` + sectionContent);

        fs.writeFileSync(path.join(DIRS.FEATS, `${title}.md`), markdown);
    }
    console.log(`Processed ${Math.floor((parts.length - 1) / 2)} Feats.`);
}

console.log("Starting conversion...");
processClasses();
processRaces();
processFeats();
console.log("Conversion complete.");
