import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Expanded content based on markdown files
const expandedContent: Record<string, any> = {
    'Bárbaro': {
        motivacion_aventura: `Los bárbaros se aventuran por diversas razones poderosas. Algunos buscan probar su fuerza contra enemigos dignos y bestias peligrosas, demostrando su valía como guerreros. Otros buscan saqueo y riquezas para llevar a sus tribus, o están motivados por la venganza contra aquellos que han dañado a su gente. Muchos simplemente encuentran que la vida de aventurero es la mejor oportunidad para un bárbaro en tierras civilizadas, donde no están bien adaptados a la monotonía de tareas mundanas como la guardia.`,
        rol_party: `El rol típico del bárbaro en un grupo de aventureros es como especialista de combate en primera línea. Ningún otro personaje puede igualar su resistencia pura y capacidad de absorber daño. También puede servir como un buen explorador gracias a su velocidad, selección de habilidades y sentido de las trampas.`,
        origen_social: `Los bárbaros provienen de tierras no civilizadas o de tribus bárbaras en las afueras de la civilización. Un aventurero bárbaro puede haber sido atraído a las tierras colonizadas por la promesa de riquezas, puede haber escapado después de ser capturado en su tierra natal y vendido como esclavo "civilizado", puede haber sido reclutado como soldado, o puede haber sido expulsado de su tierra natal por invasores.`,
        enfoque_religioso: `Algunos bárbaros desconfían de las religiones establecidas y prefieren una relación intuitiva y natural con el cosmos sobre el culto formal. Otros se dedican a deidades poderosas como Kord (dios de la fuerza), Obad-Hai (dios de la naturaleza) o Erythnul (dios de la matanza). Un bárbaro es capaz de una devoción feroz a su dios, a menudo venerando espíritus animales y ancestros tribales.`,
        weapon_proficiencies: ['Simples', 'Marciales'],
        armor_proficiencies: ['Ligeras', 'Medias', 'Escudos'],
        bab_progression: 'good',
        fortitude_save: 'good',
        reflex_save: 'poor',
        will_save: 'poor'
    },
    'Bardo': {
        motivacion_aventura: `Los bardos se aventuran para recopilar historias, conocimientos y experiencias que puedan convertir en canciones y leyendas. Vagan por el mundo reuniendo conocimientos, contando historias, haciendo magia con su música y viviendo de la gratitud de su audiencia. La vida de aventurero les proporciona material infinito para sus actuaciones y les permite experimentar directamente las hazañas heroicas que luego narrarán.`,
        rol_party: `Cuando el azar o la oportunidad los arrastran a un conflicto, los bardos sirven como diplomáticos, negociadores, exploradores y espías. Su versatilidad les permite llenar múltiples roles en un grupo, desde apoyo mágico hasta combate ligero, pasando por habilidades sociales y conocimientos especializados.`,
        origen_social: `Los bardos pueden provenir de cualquier origen social, desde nobles educados hasta artistas callejeros. Lo que los une es su amor por la música, las historias y el conocimiento. Muchos han estudiado en colegios de bardos o han aprendido su arte de maestros itinerantes.`,
        enfoque_religioso: `Los bardos tienden a tener una relación ecléctica con la religión, a menudo venerando a múltiples deidades relacionadas con las artes, el conocimiento y los viajes. Algunos sirven como cronistas de templos o bardos de corte para órdenes religiosas.`,
        weapon_proficiencies: ['Simples', 'Espada larga', 'Estoque', 'Sable', 'Espada corta', 'Arco corto'],
        armor_proficiencies: ['Ligeras', 'Escudos'],
        bab_progression: 'medium',
        fortitude_save: 'poor',
        reflex_save: 'good',
        will_save: 'good'
    },
    'Clérigo': {
        motivacion_aventura: `Los clérigos se aventuran para difundir la palabra de su deidad, hacer cumplir la voluntad divina y combatir las fuerzas que se oponen a su fe. Algunos buscan reliquias sagradas, otros establecen nuevos templos en tierras salvajes, y muchos luchan contra el mal (o el bien) en nombre de su dios. La aventura es una forma de servicio divino.`,
        rol_party: `Los clérigos son versátiles combatientes y lanzadores de conjuros que pueden curar heridas, proteger aliados y destruir enemigos con magia divina. Pueden servir como sanadores primarios del grupo, combatientes de línea media con armadura pesada, o lanzadores de conjuros de apoyo dependiendo de sus dominios y enfoque.`,
        origen_social: `Los clérigos provienen de templos, órdenes religiosas y comunidades de fe. Algunos son sacerdotes ordenados de grandes catedrales, mientras que otros son misioneros itinerantes o ermitaños devotos. Su origen social varía ampliamente según su deidad y tradición religiosa.`,
        enfoque_religioso: `La deidad del clérigo influye profundamente en su alineamiento, qué magia puede realizar, sus valores y cómo otros lo ven. Los clérigos son campeones de sus dioses, armados con símbolos sagrados y armas divinas, dedicados a hacer cumplir la voluntad de su deidad en el mundo mortal.`,
        weapon_proficiencies: ['Simples'],
        armor_proficiencies: ['Ligeras', 'Medias', 'Pesadas', 'Escudos'],
        bab_progression: 'medium',
        fortitude_save: 'good',
        reflex_save: 'poor',
        will_save: 'good'
    },
    'Druida': {
        motivacion_aventura: `Los druidas se aventuran para proteger la naturaleza, obtener conocimiento sobre flora y fauna, y mantener el equilibrio natural. Algunos buscan detener amenazas contra el mundo natural como la expansión no controlada de la civilización, mientras que otros investigan fenómenos naturales extraños o buscan lugares sagrados de poder natural.`,
        rol_party: `Los druidas son lanzadores de conjuros versátiles con fuertes habilidades de supervivencia y la capacidad única de transformarse en animales. Pueden servir como sanadores, combatientes mediante forma salvaje, invocadores de aliados naturales, o lanzadores de conjuros de control del campo de batalla.`,
        origen_social: `Los druidas provienen de círculos druídicos, arboledas sagradas y comunidades que viven en armonía con la naturaleza. Algunos son guardianes de bosques antiguos, otros son nómadas que siguen las estaciones, y algunos son los últimos defensores de tierras salvajes amenazadas.`,
        enfoque_religioso: `Los druidas veneran a la naturaleza misma más que a deidades específicas, aunque algunos sirven a dioses de la naturaleza como Obad-Hai o Ehlonna. Ganan su poder no gobernando la naturaleza sino siendo uno con ella, respetando el equilibrio natural y los ciclos de vida y muerte.`,
        weapon_proficiencies: ['Garrote', 'Daga', 'Dardo', 'Lanza', 'Bastón', 'Cimitarra', 'Hoz', 'Honda', 'Lanza corta'],
        armor_proficiencies: ['Ligeras (no metálicas)', 'Medias (no metálicas)', 'Escudos (no metálicos)'],
        bab_progression: 'medium',
        fortitude_save: 'good',
        reflex_save: 'poor',
        will_save: 'good'
    },
    'Guerrero': {
        motivacion_aventura: `Los guerreros se aventuran en busca de gloria, riqueza, deber, desafío o servicio a un señor o causa. Algunos son caballeros en busca de aventuras, otros son mercenarios endurecidos, y algunos son defensores incondicionales de los necesitados. La aventura ofrece oportunidades para probar su habilidad marcial y ganar renombre.`,
        rol_party: `Los guerreros son maestros del combate, especializándose en armas y armaduras con dotes adicionales para dominar maniobras de combate específicas. Sirven como combatientes de primera línea, protectores del grupo y especialistas en daño, adaptándose a cualquier estilo de combate mediante su amplia selección de dotes.`,
        origen_social: `Los guerreros provienen de todos los estratos sociales: nobles caballeros, soldados de infantería de élite, guardias de ciudad, mercenarios, gladiadores o simples granjeros que tomaron las armas. Su entrenamiento puede venir de academias militares, maestros de armas, o simplemente de años de experiencia en combate.`,
        enfoque_religioso: `Los guerreros tienen relaciones variadas con la religión. Algunos veneran a dioses de la guerra como Heironeous o Hextor, otros a deidades de la fuerza como Kord, y algunos son pragmáticos que confían más en su acero que en oraciones. Su devoción varía desde la fe feroz hasta el escepticismo práctico.`,
        weapon_proficiencies: ['Simples', 'Marciales'],
        armor_proficiencies: ['Ligeras', 'Medias', 'Pesadas', 'Escudos', 'Escudos torre'],
        bab_progression: 'good',
        fortitude_save: 'good',
        reflex_save: 'poor',
        will_save: 'poor'
    },
    'Monje': {
        motivacion_aventura: `Los monjes se aventuran en busca de perfección personal, prueba de habilidades y trascendencia espiritual. Algunos buscan maestros legendarios o técnicas perdidas, otros prueban su disciplina contra los peligros del mundo, y muchos sirven como protectores de los inocentes, usando sus habilidades para defender a quienes no pueden defenderse.`,
        rol_party: `Los monjes son combatientes versátiles que usan energía Ki para realizar hazañas sobrenaturales. Luchan sin armas ni armadura con gran velocidad, sirviendo como combatientes móviles, exploradores rápidos y especialistas en control de enemigos mediante sus ataques aturdidores y habilidades especiales.`,
        origen_social: `Los monjes provienen de monasterios: pequeños claustros amurallados donde persiguen la perfección personal a través de la acción y la contemplación. Algunos monasterios son dirigidos por buenos maestros cuyos habitantes sirven como protectores de la gente, mientras que otros son más aislados o incluso siniestros.`,
        enfoque_religioso: `Los monjes a menudo siguen filosofías espirituales más que religiones organizadas, buscando la iluminación a través de la disciplina física y mental. Algunos veneran a deidades de la perfección o el conocimiento, pero muchos ven su entrenamiento mismo como un camino espiritual.`,
        weapon_proficiencies: ['Garrote', 'Ballesta ligera', 'Ballesta pesada', 'Daga', 'Hacha de mano', 'Jabalina', 'Kama', 'Nunchaku', 'Bastón', 'Sai', 'Shuriken', 'Siangham', 'Honda'],
        armor_proficiencies: [],
        bab_progression: 'medium',
        fortitude_save: 'good',
        reflex_save: 'good',
        will_save: 'good'
    },
    'Paladín': {
        motivacion_aventura: `Los paladines se aventuran para combatir el mal, proteger a los inocentes y defender la ley y el bien. Buscan derrotar criaturas malvadas, rescatar a los oprimidos, y servir como campeones de la justicia. La aventura es un llamado sagrado para hacer del mundo un lugar mejor a través de acciones heroicas.`,
        rol_party: `Los paladines combinan habilidades de combate con magia divina limitada y poderes especiales contra el mal. Sirven como combatientes de primera línea resistentes, sanadores secundarios mediante imposición de manos, y especialistas contra enemigos malignos con su habilidad de castigar el mal.`,
        origen_social: `Los paladines provienen de órdenes sagradas, templos dedicados al bien y la ley, o son llamados por visiones divinas. Muchos son nobles o caballeros que han jurado votos sagrados, mientras que otros son plebeyos elevados por su pureza de corazón y devoción inquebrantable.`,
        enfoque_religioso: `La compasión para perseguir el bien, la voluntad para defender la ley y el poder para derrotar al mal: estas son las tres armas del paladín. Pocos tienen la pureza y la devoción necesarias para caminar por la senda del paladín, pero esos pocos son recompensados con el poder de proteger, sanar y castigar.`,
        weapon_proficiencies: ['Simples', 'Marciales'],
        armor_proficiencies: ['Ligeras', 'Medias', 'Pesadas', 'Escudos'],
        bab_progression: 'good',
        fortitude_save: 'good',
        reflex_save: 'poor',
        will_save: 'poor'
    },
    'Explorador': {
        motivacion_aventura: `Los exploradores se aventuran para proteger las tierras salvajes, rastrear enemigos peligrosos y servir como guías en territorios inexplorados. Muchos tienen enemigos predilectos que cazan incansablemente, mientras que otros exploran por amor a la naturaleza o para proteger comunidades fronterizas de amenazas salvajes.`,
        rol_party: `Los exploradores son combatientes versátiles y rastreadores expertos que combinan habilidades marciales con magia natural limitada. Sirven como exploradores, rastreadores, arqueros especializados o combatientes con dos armas, y su conocimiento de terrenos y enemigos específicos los hace invaluables en sus dominios.`,
        origen_social: `Los exploradores provienen de comunidades fronterizas, tribus forestales o son guardabosques solitarios. Algunos son guardias de territorios salvajes, otros son cazadores profesionales, y muchos son protectores de comunidades que viven en el límite entre la civilización y lo salvaje.`,
        enfoque_religioso: `Los exploradores a menudo veneran a deidades de la naturaleza como Obad-Hai o Ehlonna, aunque su devoción tiende a ser práctica y centrada en la naturaleza. Algunos tienen una relación más espiritual con el mundo natural que religiosa, viendo su papel como guardianes del equilibrio.`,
        weapon_proficiencies: ['Simples', 'Marciales'],
        armor_proficiencies: ['Ligeras', 'Medias', 'Escudos'],
        bab_progression: 'good',
        fortitude_save: 'good',
        reflex_save: 'good',
        will_save: 'poor'
    },
    'Pícaro': {
        motivacion_aventura: `Los pícaros se aventuran en busca de riqueza, emoción, desafíos que prueben sus habilidades y oportunidades que no encontrarían en una vida ordinaria. Algunos son ladrones profesionales, otros son exploradores urbanos o espías, y muchos simplemente buscan fortuna usando sus talentos únicos.`,
        rol_party: `Los pícaros son especialistas en habilidades y combate furtivo. Sirven como exploradores, desactivadores de trampas, cerrajeros y especialistas en daño mediante ataques furtivos. Su amplia selección de habilidades los hace versátiles solucionadores de problemas fuera del combate.`,
        origen_social: `Los pícaros provienen de todos los estratos sociales, desde las calles de las ciudades hasta gremios de ladrones organizados o incluso la nobleza. Algunos son huérfanos que aprendieron a sobrevivir por astucia, otros son miembros de organizaciones criminales, y algunos son investigadores o espías legítimos.`,
        enfoque_religioso: `Los pícaros tienen relaciones variadas con la religión. Algunos veneran a deidades del engaño como Olidammara, otros a dioses de la suerte o el comercio, y muchos son pragmáticos que confían más en sus habilidades que en poderes divinos. Su fe tiende a ser personal y práctica.`,
        weapon_proficiencies: ['Simples', 'Ballesta de mano', 'Estoque', 'Sable', 'Espada corta', 'Arco corto'],
        armor_proficiencies: ['Ligeras'],
        bab_progression: 'medium',
        fortitude_save: 'poor',
        reflex_save: 'good',
        will_save: 'poor'
    },
    'Hechicero': {
        motivacion_aventura: `Los hechiceros se aventuran para descubrir el origen de sus poderes mágicos innatos, desarrollar sus habilidades y encontrar su lugar en un mundo que a menudo teme o malinterpreta su magia espontánea. Algunos buscan conocimiento sobre su linaje mágico, mientras que otros simplemente usan sus dones para ganar fortuna y fama.`,
        rol_party: `Los hechiceros son lanzadores de conjuros arcanos espontáneos que pueden lanzar sus conjuros conocidos sin preparación previa. Aunque conocen menos conjuros que los magos, pueden lanzarlos con mayor frecuencia, sirviendo como artillería mágica versátil y especialistas en conjuros específicos.`,
        origen_social: `Los hechiceros pueden provenir de cualquier origen, ya que su magia es innata más que aprendida. Algunos descubren sus poderes en la niñez, otros los manifiestan en momentos de crisis. Muchos afirman que la sangre de dragón u otras criaturas mágicas corre por sus venas.`,
        enfoque_religioso: `Los hechiceros tienen relaciones variadas con la religión. Algunos ven sus poderes como dones divinos, otros como manifestaciones naturales de fuerzas arcanas. Su magia innata a veces los pone en conflicto con tradiciones religiosas que desconfían de la magia no divina.`,
        weapon_proficiencies: ['Simples'],
        armor_proficiencies: [],
        bab_progression: 'poor',
        fortitude_save: 'poor',
        reflex_save: 'poor',
        will_save: 'good'
    },
    'Mago': {
        motivacion_aventura: `Los magos se aventuran en busca de conocimiento arcano, libros de conjuros perdidos, componentes mágicos raros y secretos antiguos. Algunos buscan poder a través del estudio, otros investigan misterios arcanos, y muchos ven la aventura como la mejor manera de probar y perfeccionar sus habilidades mágicas.`,
        rol_party: `Los magos son maestros de la magia arcana que deben preparar sus conjuros mediante estudio diario. Su amplio repertorio de conjuros preparados y su capacidad de aprender casi cualquier conjuro arcano los hace extremadamente versátiles, sirviendo como artillería mágica, controladores del campo de batalla o especialistas en utilidad.`,
        origen_social: `Los magos provienen de academias arcanas, torres de magos, o son aprendices de maestros establecidos. Algunos son nobles educados con acceso a bibliotecas extensas, otros son autodidactas que descubrieron libros de conjuros, y muchos son estudiosos dedicados que pasaron años dominando las artes arcanas.`,
        enfoque_religioso: `Los magos tienden a tener una relación intelectual con la religión, a menudo venerando a deidades del conocimiento como Boccob. Muchos ven la magia como una ciencia más que un don divino, aunque algunos reconocen el poder de las fuerzas divinas mientras prefieren el estudio arcano.`,
        weapon_proficiencies: ['Garrote', 'Daga', 'Ballesta pesada', 'Ballesta ligera', 'Bastón'],
        armor_proficiencies: [],
        bab_progression: 'poor',
        fortitude_save: 'poor',
        reflex_save: 'poor',
        will_save: 'good'
    }
};

async function expandClassContent() {
    console.log('Fetching classes...');
    const { data: classes, error } = await supabase.from('clases').select('*');

    if (error) {
        console.error('Error fetching classes:', error);
        return;
    }

    console.log(`Found ${classes.length} classes. Expanding content...`);

    for (const cls of classes) {
        const expanded = expandedContent[cls.nombre];
        if (!expanded) {
            console.log(`No expanded content for ${cls.nombre}, skipping...`);
            continue;
        }

        const updates: Record<string, any> = {
            motivacion_aventura: expanded.motivacion_aventura,
            rol_party: expanded.rol_party,
            origen_social: expanded.origen_social,
            enfoque_religioso: expanded.enfoque_religioso,
            weapon_proficiencies: expanded.weapon_proficiencies,
            armor_proficiencies: expanded.armor_proficiencies,
            bab_progression: expanded.bab_progression,
            fortitude_save: expanded.fortitude_save,
            reflex_save: expanded.reflex_save,
            will_save: expanded.will_save
        };

        console.log(`Updating ${cls.nombre}...`);
        console.log(`  - motivacion_aventura length: ${updates.motivacion_aventura.length}`);
        console.log(`  - weapon_proficiencies: ${JSON.stringify(updates.weapon_proficiencies)}`);

        const { error: updateError } = await supabase
            .from('clases')
            .update(updates)
            .eq('id_clase', cls.id_clase);

        if (updateError) {
            console.error(`Error updating ${cls.nombre}:`, updateError);
        } else {
            console.log(`✓ Updated ${cls.nombre}`);
        }
    }

    console.log('\nContent expansion complete!');
}

expandClassContent();
