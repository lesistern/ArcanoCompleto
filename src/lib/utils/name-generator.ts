
export const fantasyNames = {
    prefixes: [
        'Aer', 'An', 'Ar', 'Ban', 'Bar', 'Ber', 'Car', 'Cen', 'Cor', 'Dan', 'Der', 'Dra', 'El', 'Eld', 'En', 'Fa', 'Fae', 'Gal', 'Gar', 'Gor', 'Hal', 'Hor', 'Ian', 'Ild', 'Ion', 'Jen', 'Kar', 'Kas', 'Kor', 'Lan', 'Lor', 'Mal', 'Mar', 'Mor', 'Nal', 'Nar', 'Nor', 'Or', 'Pan', 'Per', 'Quen', 'Ran', 'Rel', 'Rin', 'Sar', 'Sil', 'Tan', 'Tar', 'Tor', 'Ul', 'Val', 'Var', 'Vor', 'Xan', 'Xer', 'Yen', 'Zan', 'Zer'
    ],
    suffixes: [
        'a', 'ad', 'ae', 'an', 'ar', 'as', 'at', 'bal', 'ban', 'bar', 'bor', 'cor', 'dan', 'dar', 'den', 'dor', 'dra', 'el', 'en', 'er', 'ian', 'iar', 'iel', 'in', 'ion', 'ior', 'lan', 'lar', 'len', 'lin', 'lon', 'mar', 'mer', 'mir', 'mon', 'mor', 'nal', 'nar', 'ne', 'nor', 'on', 'or', 'quen', 'ra', 'ral', 'ran', 'ren', 'ril', 'rin', 'ris', 'ros', 'sal', 'san', 'sar', 'sin', 'sor', 'tan', 'tar', 'tel', 'ten', 'th', 'thal', 'thas', 'ther', 'thi', 'tin', 'ton', 'tor', 'us', 'van', 'var', 'ven', 'vin', 'vor', 'wan', 'wen', 'win', 'yen', 'yin', 'yr', 'za', 'zara', 'zen', 'zil'
    ],
    titles: [
        'el Valiente', 'el Sabio', 'el Fuerte', 'el Rápido', 'el Oscuro', 'de los Bosques', 'Martillo de Piedra', 'Caminante', 'Luz de Luna', 'Corazón de Fuego', 'Sombra Veloz', 'el Errante', 'el Bardo', 'el Justo', 'el Cruel', 'Ojo de Halcón', 'Piel de Hierro'
    ]
};

export function generateFantasyName(): string {
    const prefix = fantasyNames.prefixes[Math.floor(Math.random() * fantasyNames.prefixes.length)];
    const suffix = fantasyNames.suffixes[Math.floor(Math.random() * fantasyNames.suffixes.length)];
    // 20% chance of having a second suffix for longer names
    const secondSuffix = Math.random() > 0.8
        ? fantasyNames.suffixes[Math.floor(Math.random() * fantasyNames.suffixes.length)]
        : '';

    return prefix + suffix + secondSuffix;
}
