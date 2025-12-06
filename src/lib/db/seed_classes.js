const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Use service role key if available for deletions/inserts to bypass RLS, 
// but here we might only have anon key. If RLS is strict, this might fail.
// However, the user is likely an admin or RLS might be open for testing.
// Let's try with what we have.

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const classes = [
    {
        name: 'Bárbaro',
        slug: 'barbaro',
        hit_die: 12,
        skill_points: 4,
        description: 'Un guerrero feroz de pasado primitivo que puede entrar en una furia de batalla.',
        bab_progression: 'Alta',
        fort_save: 'good',
        ref_save: 'poor',
        will_save: 'poor'
    },
    {
        name: 'Bardo',
        slug: 'bardo',
        hit_die: 6,
        skill_points: 6,
        description: 'Un artista cuya música contiene magia, un vagabundo, un narrador de historias y un todo terreno.',
        bab_progression: 'Media',
        fort_save: 'poor',
        ref_save: 'good',
        will_save: 'good'
    },
    {
        name: 'Clérigo',
        slug: 'clerigo',
        hit_die: 8,
        skill_points: 2,
        description: 'Un maestro de la magia divina y un guerrero capaz, alimentado por su fe.',
        bab_progression: 'Media',
        fort_save: 'good',
        ref_save: 'poor',
        will_save: 'good'
    },
    {
        name: 'Druida',
        slug: 'druida',
        hit_die: 8,
        skill_points: 4,
        description: 'Un sacerdote de la Antigua Fe, que ejerce los poderes de la naturaleza y adopta formas animales.',
        bab_progression: 'Media',
        fort_save: 'good',
        ref_save: 'poor',
        will_save: 'good'
    },
    {
        name: 'Guerrero',
        slug: 'guerrero',
        hit_die: 10,
        skill_points: 2,
        description: 'Un maestro del combate marcial, hábil con una variedad de armas y armaduras.',
        bab_progression: 'Alta',
        fort_save: 'good',
        ref_save: 'poor',
        will_save: 'poor'
    },
    {
        name: 'Monje',
        slug: 'monje',
        hit_die: 8,
        skill_points: 4,
        description: 'Un artista marcial cuyos golpes desarmados son armas letales.',
        bab_progression: 'Media',
        fort_save: 'good',
        ref_save: 'good',
        will_save: 'good'
    },
    {
        name: 'Paladín',
        slug: 'paladin',
        hit_die: 10,
        skill_points: 2,
        description: 'Un guerrero santo atado a un juramento sagrado.',
        bab_progression: 'Alta',
        fort_save: 'good',
        ref_save: 'poor',
        will_save: 'poor'
    },
    {
        name: 'Explorador',
        slug: 'explorador',
        hit_die: 8,
        skill_points: 6,
        description: 'Un guerrero que utiliza la destreza marcial y la magia de la naturaleza para combatir amenazas en los límites de la civilización.',
        bab_progression: 'Alta',
        fort_save: 'good',
        ref_save: 'good',
        will_save: 'poor'
    },
    {
        name: 'Pícaro',
        slug: 'picaro',
        hit_die: 6,
        skill_points: 8,
        description: 'Un canalla que usa el sigilo y la astucia para superar obstáculos y enemigos.',
        bab_progression: 'Media',
        fort_save: 'poor',
        ref_save: 'good',
        will_save: 'poor'
    },
    {
        name: 'Hechicero',
        slug: 'hechicero',
        hit_die: 4,
        skill_points: 2,
        description: 'Un lanzador de conjuros que recurre a una magia inherente derivada de un don o linaje.',
        bab_progression: 'Baja',
        fort_save: 'poor',
        ref_save: 'poor',
        will_save: 'good'
    },
    {
        name: 'Mago',
        slug: 'mago',
        hit_die: 4,
        skill_points: 2,
        description: 'Un usuario de magia escolástico capaz de manipular las estructuras de la realidad.',
        bab_progression: 'Baja',
        fort_save: 'poor',
        ref_save: 'poor',
        will_save: 'good'
    }
];

async function seedClasses() {
    console.log(`Starting seed of ${classes.length} classes...`);

    // Check if they exist to avoid duplicates if no unique constraint on slug? 
    // We'll use upsert.
    // Assuming 'slug' is unique or we can match by it.

    const { data, error } = await supabase
        .from('classes')
        .upsert(classes, { onConflict: 'slug' })
        .select();

    if (error) {
        console.error('Error seeding classes:', error);
    } else {
        console.log('Successfully seeded classes:', data.length);
    }
}

seedClasses();
