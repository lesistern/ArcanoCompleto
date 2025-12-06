// Información detallada de las clases de D&D 3.5 en español
export interface ClassInfo {
  slug: string;
  name: string;
  hitDie: string;
  skillPoints: string;
  bab: string;
  saves: {
    fortitude: string;
    reflex: string;
    will: string;
  };
  features: {
    title: string;
    summary: string;
    fullDescription: string;
    level: number;
  }[];
}

export const classInfoData: Record<string, ClassInfo> = {
  barbaro: {
    slug: 'barbaro',
    name: 'Bárbaro',
    hitDie: 'd12',
    skillPoints: '4 + modificador de Int',
    bab: 'Bueno',
    saves: {
      fortitude: 'Buena',
      reflex: 'Mala',
      will: 'Mala'
    },
    features: [
      {
        title: 'Furia',
        summary: 'Gana +4 a Fuerza y Constitución, +2 a salvaciones de Voluntad, pero -2 a CA cuando entra en furia.',
        fullDescription: 'Un bárbaro puede entrar en furia un cierto número de veces al día. En furia, gana temporalmente un bonificador +4 a Fuerza, +4 a Constitución, y un bonificador moral +2 a las salvaciones de Voluntad, pero sufre una penalización de -2 a la Clase de Armadura. El incremento en Constitución aumenta los puntos de golpe en 2 por nivel, pero estos desaparecen al terminar la furia. Mientras está en furia, no puede usar habilidades basadas en Carisma, Destreza o Inteligencia (excepto Equilibrio, Escapismo, Intimidar y Montar), ni puede lanzar conjuros o activar objetos mágicos. La furia dura 3 + modificador de Constitución mejorado asaltos.',
        level: 1
      },
      {
        title: 'Movimiento Rápido',
        summary: 'La velocidad del bárbaro aumenta en 10 pies cuando no lleva armadura pesada.',
        fullDescription: 'La velocidad terrestre del bárbaro es 10 pies más rápida que la normal para su raza. Este beneficio solo se aplica cuando lleva armadura ligera, media o ninguna armadura y no está sobrecargado. Esta bonificación se aplica antes de modificar la velocidad por cualquier carga o armadura.',
        level: 1
      },
      {
        title: 'Esquiva Asombrosa',
        summary: 'Retiene el bonificador de Destreza a CA incluso cuando está desprevenido o es atacado por un enemigo invisible.',
        fullDescription: 'A partir del 2º nivel, el bárbaro retiene su bonificador de Destreza a la CA (si tiene alguno) incluso si está desprevenido o es atacado por un atacante invisible. Sin embargo, aún pierde su bonificador de Destreza si está inmovilizado. Si ya tiene esquiva asombrosa de otra clase, automáticamente gana esquiva asombrosa mejorada.',
        level: 2
      },
      {
        title: 'Sentido de las Trampas',
        summary: 'Gana bonificadores a las salvaciones de Reflejos y CA contra trampas.',
        fullDescription: 'A partir del 3er nivel, el bárbaro gana un bonificador +1 a las salvaciones de Reflejos para evitar trampas y un bonificador +1 de esquiva a la CA contra ataques de trampas. Estos bonificadores aumentan en +1 cada tres niveles de bárbaro después (6º, 9º, 12º, 15º y 18º nivel). Los bonificadores de sentido de las trampas obtenidos de múltiples clases se apilan.',
        level: 3
      }
    ]
  },
  bardo: {
    slug: 'bardo',
    name: 'Bardo',
    hitDie: 'd6',
    skillPoints: '6 + modificador de Int',
    bab: 'Medio',
    saves: {
      fortitude: 'Mala',
      reflex: 'Buena',
      will: 'Buena'
    },
    features: [
      {
        title: 'Música de Bardo',
        summary: 'Produce efectos mágicos con música o poesía, desde inspirar aliados hasta fascinar enemigos.',
        fullDescription: 'Un bardo con 3 o más rangos en una habilidad de Interpretar puede usar su música o poética para producir efectos mágicos. Cada día puede usar esta habilidad un número de veces igual a su nivel de bardo. La música de bardo requiere concentración, que se mantiene como acción libre, pero termina si el bardo es asesinado, paralizado, aturdido o incapacitado. El bardo puede crear los siguientes efectos: Contracanción, Fascinar, Inspirar valor (+1 moral a salvaciones y +1 a ataque y daño), Inspirar competencia (+2 a una habilidad), Sugestión (6º nivel), Inspirar grandeza (9º nivel), e Inspirar heroísmo (15º nivel).',
        level: 1
      },
      {
        title: 'Conocimiento de Bardo',
        summary: 'Puede hacer pruebas especiales de conocimiento sobre leyendas, objetos o lugares notables.',
        fullDescription: 'Un bardo puede hacer una prueba especial de conocimiento de bardo con un bonificador igual a su nivel de bardo + su modificador de Inteligencia para ver si sabe algo relevante sobre objetos legendarios locales, personas notables, o lugares notables. Esta habilidad no revela los poderes de un objeto mágico pero puede dar pistas sobre su función general. El bardo no puede tomar 10 o tomar 20 en esta prueba; este tipo de conocimiento es esencialmente aleatorio.',
        level: 1
      },
      {
        title: 'Conjuros Arcanos',
        summary: 'Lanza conjuros arcanos espontáneos de la lista de conjuros de bardo.',
        fullDescription: 'Los bardos lanzan conjuros arcanos extraídos de la lista de conjuros de bardo. Puede lanzar cualquier conjuro que conozca sin prepararlo de antemano. Cada bardo debe elegir una hora del día para recuperar sus espacios de conjuro diarios. Para aprender o lanzar un conjuro, el bardo debe tener una puntuación de Carisma igual a al menos 10 + el nivel del conjuro. La Clase de Dificultad para una salvación contra un conjuro de bardo es 10 + el nivel del conjuro + el modificador de Carisma del bardo.',
        level: 1
      },
      {
        title: 'Fascinación',
        summary: 'Su actuación puede cautivar a una o más criaturas, dejándolas fascinadas.',
        fullDescription: 'Un bardo con 3 o más rangos en Interpretar puede usar música o poética para fascinar a una o más criaturas. Por cada tres niveles después del 1º, puede fascinar una criatura adicional. Para usar fascinación, el bardo debe ser visto y oído en un radio de 90 pies. La criatura afectada debe poder ver y oír al bardo y debe prestarle atención (salvación de Voluntad niega, CD 10 + 1/2 nivel del bardo + modificador de Carisma). Una criatura fascinada sufre -4 a pruebas de habilidad hechas como reacciones. Cualquier amenaza potencial permite una nueva salvación.',
        level: 1
      }
    ]
  },
  clerigo: {
    slug: 'clerigo',
    name: 'Clérigo',
    hitDie: 'd8',
    skillPoints: '2 + modificador de Int',
    bab: 'Medio',
    saves: {
      fortitude: 'Buena',
      reflex: 'Mala',
      will: 'Buena'
    },
    features: [
      {
        title: 'Expulsar o Reprender Muertos Vivientes',
        summary: 'Canaliza energía divina para afectar a criaturas no-muertas, expulsándolas o controlándolas.',
        fullDescription: 'Un clérigo bueno (o uno neutral que venera una deidad buena) puede expulsar o destruir criaturas no-muertas. Un clérigo maligno (o uno neutral de una deidad maligna) puede reprender o comandar tales criaturas, forzándolas a cower en temor o sirviéndole. Un clérigo neutral de una deidad neutral debe elegir si expulsa o reprende al obtener esta habilidad. Un clérigo puede intentar expulsar muertos vivientes un número de veces al día igual a 3 + su modificador de Carisma. Un clérigo con 5 o más rangos en Conocimiento (religión) obtiene un bonificador +2 a las pruebas de expulsión.',
        level: 1
      },
      {
        title: 'Dominios',
        summary: 'Acceso a dos dominios que otorgan poderes y conjuros especiales según la deidad.',
        fullDescription: 'La deidad del clérigo influye su alineamiento, qué magia puede realizar, sus valores y cómo otros lo ven. Un clérigo elige dos dominios de entre aquellos pertenecientes a su deidad. Un clérigo solo puede seleccionar un dominio de alineamiento si su alineamiento coincide con ese dominio. Cada dominio otorga un poder especial y acceso a conjuros de dominio adicionales. El clérigo obtiene los poderes otorgados de ambos dominios seleccionados. Con acceso a dos listas de conjuros de dominio, un clérigo prepara un conjuro de dominio o el otro en cada ranura de conjuro de dominio para cada nivel de conjuro.',
        level: 1
      },
      {
        title: 'Lanzamiento Espontáneo de Curar/Infligir',
        summary: 'Convierte conjuros preparados en conjuros de curación o daño espontáneamente.',
        fullDescription: 'Un clérigo bueno (o neutral de una deidad buena) puede canalizar energía almacenada de conjuros en conjuros de curación que no preparó con antelación. El clérigo puede "perder" cualquier conjuro preparado que no sea de dominio para lanzar cualquier conjuro de curar del mismo nivel o menor. Un clérigo maligno (o neutral de una deidad maligna) puede convertir conjuros preparados en conjuros de infligir de la misma manera. Un clérigo neutral de una deidad neutral puede convertir conjuros a curar o infligir (elección del jugador), pero una vez hecha, esta elección no puede revertirse.',
        level: 1
      },
      {
        title: 'Conjuros Divinos',
        summary: 'Prepara y lanza conjuros divinos de la lista de conjuros de clérigo.',
        fullDescription: 'Los clérigos lanzan conjuros divinos extraídos de la lista de conjuros de clérigo. Un clérigo debe elegir y preparar sus conjuros con antelación. Para preparar o lanzar un conjuro, el clérigo debe tener una puntuación de Sabiduría igual a al menos 10 + el nivel del conjuro. La Clase de Dificultad para una salvación contra un conjuro de clérigo es 10 + el nivel del conjuro + el modificador de Sabiduría del clérigo. Los clérigos meditan o rezan por sus conjuros. Cada clérigo debe elegir una hora del día para dedicar 1 hora a la oración y meditación para recuperar sus asignaciones diarias de conjuros.',
        level: 1
      }
    ]
  },
  druida: {
    slug: 'druida',
    name: 'Druida',
    hitDie: 'd8',
    skillPoints: '4 + modificador de Int',
    bab: 'Medio',
    saves: {
      fortitude: 'Buena',
      reflex: 'Mala',
      will: 'Buena'
    },
    features: [
      {
        title: 'Compañero Animal',
        summary: 'Gana un compañero animal leal que crece en poder junto con el druida.',
        fullDescription: 'Un druida puede comenzar el juego con un compañero animal seleccionado de la lista de druida. Este animal es un compañero leal que acompaña al druida en sus aventuras. Un compañero animal de 1er nivel es completamente típico para su tipo excepto por las modificaciones indicadas. A medida que el druida avanza en niveles, las capacidades del animal mejoran según la tabla de progresión. Si un druida libera a su compañero del servicio, puede obtener uno nuevo realizando una ceremonia que requiere 24 horas ininterrumpidas de oración.',
        level: 1
      },
      {
        title: 'Empatía Salvaje',
        summary: 'Puede mejorar la actitud de un animal con una prueba de habilidad especial.',
        fullDescription: 'Un druida puede mejorar la actitud de un animal. Esta habilidad funciona como una prueba de Diplomacia hecha para mejorar la actitud de una persona. El druida tira 1d20 y añade su nivel de druida y su modificador de Carisma para determinar el resultado de la prueba de empatía salvaje. El animal doméstico típico tiene una actitud inicial de indiferente, mientras que los animales salvajes suelen ser inamistosos. Para usar empatía salvaje, el druida y el animal deben poder estudiarse mutuamente, lo que significa estar dentro de 30 pies uno del otro en condiciones normales.',
        level: 1
      },
      {
        title: 'Forma Salvaje',
        summary: 'Se transforma en animales pequeños, medianos y eventualmente grandes.',
        fullDescription: 'Al 5º nivel, el druida gana la habilidad de convertirse en cualquier animal Pequeño o Mediano y volver a su forma normal una vez al día. Esta habilidad funciona como el conjuro forma de bestia I, excepto como se indica aquí. El efecto dura 1 hora por nivel de druida, o hasta que vuelve a su forma normal. Cambiar de forma es una acción estándar y no provoca ataques de oportunidad. Al 8º nivel, puede usar forma salvaje para cambiar a un animal Grande o Diminuto. Al 11º nivel, a una bestia mágica o elemental. Al 15º nivel, puede cambiar a un elemental Enorme.',
        level: 5
      },
      {
        title: 'Sentido de la Naturaleza',
        summary: 'Gana +2 a Conocimiento (naturaleza) y Supervivencia.',
        fullDescription: 'Un druida gana un bonificador +2 a las pruebas de Conocimiento (naturaleza) y Supervivencia. Este bonificador representa la conexión profunda del druida con el mundo natural y su comprensión intuitiva de los patrones y ciclos de la naturaleza.',
        level: 1
      }
    ]
  },
  guerrero: {
    slug: 'guerrero',
    name: 'Guerrero',
    hitDie: 'd10',
    skillPoints: '2 + modificador de Int',
    bab: 'Bueno',
    saves: {
      fortitude: 'Buena',
      reflex: 'Mala',
      will: 'Mala'
    },
    features: [
      {
        title: 'Dotes Adicionales de Guerrero',
        summary: 'Recibe dotes de combate adicionales en el primer nivel y cada dos niveles.',
        fullDescription: 'Al 1er nivel, el guerrero obtiene una dote orientada al combate adicional además de la dote que cualquier personaje de 1er nivel obtiene y la dote adicional otorgada a un humano. El guerrero gana una dote adicional al 2º nivel y cada dos niveles de guerrero después (4º, 6º, 8º, 10º, 12º, 14º, 16º, 18º y 20º). Estas dotes adicionales deben seleccionarse de aquellas identificadas como dotes de guerrero. Un guerrero debe cumplir todos los prerrequisitos para una dote, incluyendo puntuación de habilidad y prerrequisitos de ataque base.',
        level: 1
      },
      {
        title: 'Competencia con Armas y Armaduras',
        summary: 'Dominio completo de todas las armas simples, marciales, armaduras y escudos.',
        fullDescription: 'Un guerrero es competente con todas las armas simples y marciales, con todos los tipos de armadura (ligera, media y pesada) y con todos los escudos (incluyendo escudos torre). Esta amplia formación permite al guerrero elegir el equipo más apropiado para cada situación de combate sin penalizaciones.',
        level: 1
      },
      {
        title: 'Entrenamiento en Armadura',
        summary: 'Reduce las penalizaciones por armadura y aumenta el bonificador de Destreza máximo.',
        fullDescription: 'A partir del 3er nivel, el guerrero aprende a ser más maniobrable mientras usa armadura. Siempre que lleva armadura, reduce la penalización de prueba de armadura en 1 (hasta un mínimo de 0) y aumenta el bonificador de Destreza máximo permitido por su armadura en 1. Cada cuatro niveles después (7º, 11º y 15º), estas bonificaciones aumentan en +1 cada una, hasta un máximo de -4 a la penalización de prueba de armadura y +4 al bonificador de Destreza máximo.',
        level: 3
      },
      {
        title: 'Especialización en Armas',
        summary: 'Se vuelve especialmente hábil con un arma específica, ganando bonificadores al daño.',
        fullDescription: 'Al 4º nivel, el guerrero puede seleccionar Especialización en Armas con un arma para la cual ya tiene Soltura con un Arma. Gana un bonificador +2 a todas las tiradas de daño con el arma seleccionada. El guerrero puede ganar esta dote múltiples veces, pero sus efectos no se apilan. Cada vez que toma la dote, se aplica a una nueva arma.',
        level: 4
      }
    ]
  },
  monje: {
    slug: 'monje',
    name: 'Monje',
    hitDie: 'd8',
    skillPoints: '4 + modificador de Int',
    bab: 'Medio',
    saves: {
      fortitude: 'Buena',
      reflex: 'Buena',
      will: 'Buena'
    },
    features: [
      {
        title: 'Ráfaga de Golpes',
        summary: 'Realiza ataques adicionales sin armas con penalización reducida.',
        fullDescription: 'Al luchar sin armas, el monje puede hacer un ataque adicional en una acción de ataque completo, pero todos sus ataques sufren una penalización de -2. Esta penalización se reduce a medida que el monje gana niveles. Al 5º nivel, la penalización desaparece. Al 11º nivel, la ráfaga de golpes otorga un ataque adicional. Un monje puede usar ráfaga de golpes con armas especiales de monje (kama, nunchaku, quarterstaff, sai, shuriken y siangham).',
        level: 1
      },
      {
        title: 'Ataque Sin Armas',
        summary: 'Los ataques sin armas del monje causan daño letal y escalan con el nivel.',
        fullDescription: 'Al 1er nivel, el monje gana Golpe Sin Armas Mejorado como dote adicional. Los ataques del monje pueden ser con puño, codo, rodilla o pie. Esto significa que el monje puede hacer ataques sin armas incluso con las manos llenas. No hay tal cosa como un ataque sin armas secundario para un monje. El daño sin armas del monje es 1d6 al 1er nivel, y aumenta a medida que gana niveles: 1d8 al 4º, 1d10 al 8º, 2d6 al 12º, 2d8 al 16º y 2d10 al 20º nivel.',
        level: 1
      },
      {
        title: 'Bonificador de CA',
        summary: 'Añade el modificador de Sabiduría a la CA cuando no lleva armadura.',
        fullDescription: 'Cuando no lleva armadura y sin cargar, el monje añade su bonificador de Sabiduría (si lo tiene) a su CA. Además, el monje gana un bonificador +1 a la CA al 5º nivel. Este bonificador aumenta en 1 por cada cinco niveles de monje después (+2 al 10º, +3 al 15º y +4 al 20º nivel). Estos bonificadores a la CA se aplican incluso contra ataques de toque o cuando el monje está desprevenido. Pierde estos bonificadores cuando está inmovilizado o indefenso, cuando lleva cualquier armadura, cuando porta un escudo o cuando lleva una carga media o pesada.',
        level: 1
      },
      {
        title: 'Evasión',
        summary: 'Evita completamente el daño de efectos de área con salvación de Reflejos exitosa.',
        fullDescription: 'Al 2º nivel o superior, el monje puede evitar incluso daño mágico e inusual con gran agilidad. Si hace una salvación de Reflejos exitosa contra un ataque que normalmente causa la mitad del daño con una salvación exitosa, en su lugar no recibe daño. La evasión solo puede usarse si el monje no lleva armadura y no está sobrecargado. Un monje indefenso no gana el beneficio de evasión.',
        level: 2
      }
    ]
  },
  paladin: {
    slug: 'paladin',
    name: 'Paladín',
    hitDie: 'd10',
    skillPoints: '2 + modificador de Int',
    bab: 'Bueno',
    saves: {
      fortitude: 'Buena',
      reflex: 'Mala',
      will: 'Mala'
    },
    features: [
      {
        title: 'Aura de Bien',
        summary: 'Irradia una poderosa aura de bien detectable por conjuros.',
        fullDescription: 'El poder del aura de bien de un paladín (ver el conjuro detectar bien) es igual a su nivel de paladín. Esta aura es una manifestación de la conexión del paladín con las fuerzas del bien y la justicia, y puede ser detectada por criaturas sensibles a alineamientos o por magia de detección.',
        level: 1
      },
      {
        title: 'Detectar el Mal',
        summary: 'Puede detectar la presencia y fuerza de auras malignas a voluntad.',
        fullDescription: 'A voluntad, el paladín puede usar detectar el mal, como el conjuro del mismo nombre. Esta habilidad requiere concentración y puede usarse para determinar la presencia de mal, el número de auras malignas y la fuerza de la aura maligna más fuerte presente. Un paladín puede, como acción de movimiento, concentrarse en un solo objeto o individuo dentro de 60 pies y determinar si es maligno, aprendiendo la fuerza de su aura.',
        level: 1
      },
      {
        title: 'Imposición de Manos',
        summary: 'Cura heridas tocando, o daña muertos vivientes, con energía positiva.',
        fullDescription: 'El paladín puede curar heridas con el toque. Cada día puede curar un total de puntos de golpe igual a su nivel de paladín × su bonificador de Carisma. Puede dividir esta curación entre múltiples receptores. Alternativamente, puede usar este poder para dañar muertos vivientes, causando el mismo daño que curaría. Usar imposición de manos es una acción estándar.',
        level: 2
      },
      {
        title: 'Castigar el Mal',
        summary: 'Canaliza poder divino para golpear a enemigos malignos con fuerza devastadora.',
        fullDescription: 'Una vez al día por nivel de paladín, puede intentar castigar el mal con un ataque normal. Añade su bonificador de Carisma (si lo tiene) a su tirada de ataque y causa 1 punto de daño adicional por nivel de paladín. Si el paladín accidentalmente castiga a una criatura que no es maligna, el castigo no tiene efecto pero el uso se desperdicia para ese día. Al 5º nivel y cada cinco niveles después, el paladín puede castigar el mal una vez adicional por día.',
        level: 1
      }
    ]
  },
  explorador: {
    slug: 'explorador',
    name: 'Explorador',
    hitDie: 'd8',
    skillPoints: '6 + modificador de Int',
    bab: 'Bueno',
    saves: {
      fortitude: 'Buena',
      reflex: 'Buena',
      will: 'Mala'
    },
    features: [
      {
        title: 'Enemigo Predilecto',
        summary: 'Gana bonificadores al combatir y rastrear tipos específicos de criaturas.',
        fullDescription: 'Al 1er nivel, el explorador selecciona un tipo de criatura como enemigo predilecto. Gana un bonificador +2 a las tiradas de Engañar, Escuchar, Avistar, Supervivencia y Saber contra criaturas de ese tipo. También gana un bonificador +2 al daño de armas contra tales criaturas. Al 5º nivel y cada 5 niveles después, puede seleccionar un enemigo predilecto adicional y los bonificadores contra enemigos anteriores aumentan en +2.',
        level: 1
      },
      {
        title: 'Rastrear',
        summary: 'Puede seguir rastros usando la habilidad de Supervivencia.',
        fullDescription: 'El explorador gana Rastrear como dote adicional al 1er nivel. Puede usar la habilidad de Supervivencia para seguir las huellas de criaturas y personajes a través de la mayoría de terrenos. La CD depende de la superficie y las condiciones, y el explorador puede moverse a la mitad de su velocidad sin penalización mientras rastrea.',
        level: 1
      },
      {
        title: 'Estilo de Combate',
        summary: 'Se especializa en combate con dos armas o con arco.',
        fullDescription: 'Al 2º nivel, el explorador debe seleccionar combate con dos armas o tiro con arco. Si elige dos armas, se trata como si tuviera la dote de Combate con Dos Armas. Si elige tiro con arco, se trata como si tuviera la dote de Disparo Rápido. Los beneficios solo aplican cuando lleva armadura ligera o ninguna.',
        level: 2
      },
      {
        title: 'Compañero Animal',
        summary: 'Gana un compañero animal leal que lo ayuda en sus aventuras.',
        fullDescription: 'Al 4º nivel, el explorador gana un compañero animal seleccionado de una lista específica. Este compañero es un aliado leal que acompaña al explorador en sus aventuras. El nivel efectivo de druida del explorador es la mitad de su nivel de explorador. El compañero animal comparte el vínculo del explorador con la naturaleza salvaje.',
        level: 4
      }
    ]
  },
  picaro: {
    slug: 'picaro',
    name: 'Pícaro',
    hitDie: 'd6',
    skillPoints: '8 + modificador de Int',
    bab: 'Medio',
    saves: {
      fortitude: 'Mala',
      reflex: 'Buena',
      will: 'Mala'
    },
    features: [
      {
        title: 'Ataque Furtivo',
        summary: 'Inflige daño adicional cuando ataca a enemigos desprevenidos o flanqueados.',
        fullDescription: 'Si el pícaro puede atrapar a un oponente cuando no puede defenderse efectivamente de su ataque, puede golpear un punto vital para daño adicional. El ataque del pícaro causa daño adicional cuando su objetivo se ve privado de su bonificador de Destreza a la CA o cuando el pícaro flanquea a su objetivo. Este daño adicional es 1d6 al 1er nivel, y aumenta en 1d6 cada dos niveles de pícaro después.',
        level: 1
      },
      {
        title: 'Encontrar Trampas',
        summary: 'Puede usar Buscar para localizar trampas con CD superior a 20.',
        fullDescription: 'Los pícaros pueden usar la habilidad de Buscar para localizar trampas cuando la CD de la tarea es superior a 20. Encontrar una trampa no mágica tiene una CD de al menos 20, o más alta si está bien oculta. Encontrar una trampa mágica tiene una CD de 25 + el nivel del conjuro usado para crearla. Solo los pícaros pueden usar Buscar para localizar trampas con CD superior a 20.',
        level: 1
      },
      {
        title: 'Evasión',
        summary: 'Evita completamente el daño de efectos de área con salvación de Reflejos exitosa.',
        fullDescription: 'Al 2º nivel y superior, el pícaro puede evitar incluso ataques mágicos y inusuales con gran agilidad. Si hace una salvación de Reflejos exitosa contra un ataque que normalmente causa la mitad del daño con salvación exitosa, en su lugar no recibe daño. La evasión solo puede usarse si el pícaro lleva armadura ligera o ninguna armadura.',
        level: 2
      },
      {
        title: 'Talentos de Pícaro',
        summary: 'Habilidades especiales únicas que mejoran las capacidades del pícaro.',
        fullDescription: 'Al alcanzar el 10º nivel, y en cada tres niveles después (13º, 16º y 19º), el pícaro gana una habilidad especial de su elección de entre las siguientes opciones: Mente Resbaladiza, Rodar Defensivo, Oportunista, Maestría en Habilidad, u otras habilidades especiales definidas por el DM.',
        level: 10
      }
    ]
  },
  hechicero: {
    slug: 'hechicero',
    name: 'Hechicero',
    hitDie: 'd4',
    skillPoints: '2 + modificador de Int',
    bab: 'Malo',
    saves: {
      fortitude: 'Mala',
      reflex: 'Mala',
      will: 'Buena'
    },
    features: [
      {
        title: 'Conjuros Espontáneos',
        summary: 'Lanza conjuros arcanos sin necesidad de prepararlos, usando poder innato.',
        fullDescription: 'Los hechiceros lanzan conjuros arcanos extraídos de la lista de conjuros de hechicero/mago. Pueden lanzar cualquier conjuro que conozcan sin prepararlo con antelación. Para aprender o lanzar un conjuro, el hechicero debe tener una puntuación de Carisma de al menos 10 + el nivel del conjuro. La CD de salvación contra los conjuros del hechicero es 10 + nivel del conjuro + modificador de Carisma del hechicero.',
        level: 1
      },
      {
        title: 'Familiar',
        summary: 'Convoca una criatura mágica que le sirve como compañero y asistente.',
        fullDescription: 'El hechicero puede obtener un familiar, una criatura mágica que mejora sus capacidades. El familiar otorga beneficios especiales a su amo, como bonificadores a habilidades o salvaciones. El vínculo entre hechicero y familiar crece con el nivel, otorgando nuevas capacidades como habla, resistencia a conjuros y la habilidad de entregar conjuros de toque.',
        level: 1
      },
      {
        title: 'Poder de la Sangre',
        summary: 'Su magia proviene de un linaje sobrenatural o exposición a fuerzas mágicas.',
        fullDescription: 'Los hechiceros crean magia de la misma manera que los poetas crean poemas, con talento innato perfeccionado por la práctica. No tienen libros, mentores o teorías, solo poder crudo que dirigen con su voluntad. Algunos hechiceros afirman que la sangre de dragón corre por sus venas, lo que puede explicar su afinidad natural con la magia.',
        level: 1
      },
      {
        title: 'Conjuros Conocidos Limitados',
        summary: 'Conoce menos conjuros que un mago, pero puede lanzarlos con mayor flexibilidad.',
        fullDescription: 'Aunque los hechiceros conocen menos conjuros que los magos, pueden lanzar sus conjuros conocidos más frecuentemente y sin preparación previa. La tabla de conjuros conocidos del hechicero muestra cuántos conjuros de cada nivel puede conocer en cada nivel de clase. Esta limitación se compensa con la capacidad de lanzar cualquier conjuro conocido en cualquier momento.',
        level: 1
      }
    ]
  },
  mago: {
    slug: 'mago',
    name: 'Mago',
    hitDie: 'd4',
    skillPoints: '2 + modificador de Int',
    bab: 'Malo',
    saves: {
      fortitude: 'Mala',
      reflex: 'Mala',
      will: 'Buena'
    },
    features: [
      {
        title: 'Libro de Conjuros',
        summary: 'Registra conjuros en un libro y debe prepararlos cada día mediante estudio.',
        fullDescription: 'Los magos deben estudiar su libro de conjuros cada día para preparar conjuros. Un mago debe elegir y preparar sus conjuros con antelación durmiendo primero y luego pasando 1 hora estudiando su libro de conjuros. Mientras estudia, el mago decide qué conjuros preparar. Los magos comienzan con un libro de conjuros que contiene todos los conjuros de nivel 0 más tres conjuros de 1er nivel de su elección.',
        level: 1
      },
      {
        title: 'Familiar',
        summary: 'Convoca una criatura mágica que mejora sus capacidades y sirve como compañero.',
        fullDescription: 'Como el hechicero, el mago puede obtener un familiar que le otorga beneficios especiales. El familiar es más que una mascota; es un compañero mágicamente vinculado que puede compartir conjuros, entregar ataques de toque y proporcionar bonificadores a habilidades o salvaciones según el tipo de familiar elegido.',
        level: 1
      },
      {
        title: 'Dote Adicional de Mago',
        summary: 'Gana dotes adicionales de metamagia, creación de objetos o Soltura con un Conjuro.',
        fullDescription: 'Al 5º nivel y cada 5 niveles después, el mago gana una dote adicional. Esta dote debe ser una dote de metamagia, una dote de creación de objetos, o Soltura con un Conjuro. El mago aún debe cumplir todos los prerrequisitos para la dote adicional, incluyendo nivel de lanzador mínimo.',
        level: 5
      },
      {
        title: 'Escribir Pergamino',
        summary: 'Puede crear pergaminos mágicos que contienen conjuros para uso posterior.',
        fullDescription: 'Al 1er nivel, el mago gana Escribir Pergamino como dote adicional. Esto le permite crear pergaminos mágicos que pueden ser usados por él mismo u otros lanzadores de conjuros. El proceso requiere materiales especiales y tiempo, pero permite al mago prepararse para situaciones futuras y compartir su magia con aliados.',
        level: 1
      }
    ]
  }
};

// Función helper para capitalizar solo la primera letra (Sentence case)
export function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Función helper para obtener información de una característica específica
export function getClassFeature(classSlug: string, featureIndex: number) {
  const classInfo = classInfoData[classSlug];
  if (!classInfo || !classInfo.features[featureIndex]) {
    return null;
  }
  return classInfo.features[featureIndex];
}