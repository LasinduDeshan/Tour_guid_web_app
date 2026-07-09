const TRANSLATION_CACHE: Record<string, string> = {};

const LOCAL_DICTIONARY: Record<string, Record<string, string>> = {
  "Sigiriya Rock Fortress": {
    zh: "锡吉里耶狮子岩古城",
    fr: "Forteresse de Sigiriya",
    de: "Felsenfestung von Sigiriya",
    es: "Fortaleza de Sigiriya"
  },
  "Ella Mountain Retreat": {
    zh: "埃拉山地度假村",
    fr: "Refuge de montagne d'Ella",
    de: "Ella Berg-Refugium",
    es: "Refugio de montaña de Ella"
  },
  "Yala National Park": {
    zh: "雅拉国家公园",
    fr: "Parc national de Yala",
    de: "Yala-Nationalpark",
    es: "Parque Nacional de Yala"
  },
  "Mirissa Coastal Paradise": {
    zh: "美蕊沙海岸乐园",
    fr: "Paradis côtier de Mirissa",
    de: "Küstenparadies Mirissa",
    es: "Paraíso costero de Mirissa"
  },
  "Kandy Mountain City": {
    zh: "圣城康提",
    fr: "Kandy, ville de montagne",
    de: "Bergstadt Kandy",
    es: "Kandy, ciudad de montaña"
  },
  "Galle Fort UNESCO Citadel": {
    zh: "加勒古城联合国教科文组织城堡",
    fr: "Fort de Galle, citadelle de l'UNESCO",
    de: "Galle Fort UNESCO-Zitadelle",
    es: "Fuerte de Galle Ciudadela de la UNESCO"
  },
  "Nuwara Eliya (Little England)": {
    zh: "努沃勒埃利耶（小英伦）",
    fr: "Nuwara Eliya (Petite Angleterre)",
    de: "Nuwara Eliya (Klein-England)",
    es: "Nuwara Eliya (Pequeña Inglaterra)"
  },
  "Anuradhapura Sacred Capital": {
    zh: "阿努拉德普勒神圣首都",
    fr: "Capitale sacrée d'Anuradhapura",
    de: "Heilige Hauptstadt Anuradhapura",
    es: "Capital sagrada de Anuradhapura"
  },
  "Polonnaruwa Medieval Kingdom": {
    zh: "波隆纳鲁沃中古王国",
    fr: "Royaume médiéval de Polonnaruwa",
    de: "Mittelalterliches Königreich Polonnaruwa",
    es: "Reino medieval de Polonnaruwa"
  },
  "Arugam Bay Surf Haven": {
    zh: "阿鲁甘湾冲浪胜地",
    fr: "Havre de surf d'Arugam Bay",
    de: "Arugam Bay Surferparadies",
    es: "Refugio de surf de Arugam Bay"
  },
  // Regions
  "Cultural Triangle": {
    zh: "文化金三角",
    fr: "Triangle culturel",
    de: "Kulturelles Dreieck",
    es: "Triángulo cultural"
  },
  "Mountain Country": {
    zh: "高山茶区",
    fr: "Pays montagneux",
    de: "Bergland",
    es: "País montañoso"
  },
  "Dry Zone Coast": {
    zh: "干燥地带海岸",
    fr: "Côte de la zone sèche",
    de: "Trockenzonenküste",
    es: "Costa de la zona seca"
  },
  "Deep South Coast": {
    zh: "深南海岸",
    fr: "Côte de l'extrême sud",
    de: "Tiefsüdküste",
    es: "Costa del extremo sur"
  },
  "Hill Country": {
    zh: "山地茶区",
    fr: "Région montagneuse",
    de: "Hügelland",
    es: "Región de las colinas"
  },
  "Eastern Coast": {
    zh: "东海岸",
    fr: "Côte est",
    de: "Ostküste",
    es: "Costa oriental"
  },
  // Descriptions
  "A towering 200-meter volcanic plug topped by an ancient palace fortress built by King Kasyapa. Wander through manicured water gardens and climb through giant lion-paw gateways.": {
    zh: "一座高200米的火山塞，顶部是由迦叶波国王建造的古代皇宫要塞。漫步于修剪整齐的水上花园，并攀爬巨大的狮爪大门。",
    fr: "Un piton volcanique de 200 mètres surmonté d'un ancien palais-forteresse construit par le roi Kasyapa. Promenez-vous dans les jardins d'eau et grimpez à travers les portes géantes de pattes de lion.",
    de: "Ein hoch aufragender, 200 Meter hoher Vulkankegel, gekrönt von einer alten Palastfestung, die von König Kasyapa erbaut wurde. Spazieren Sie durch gepflegte Wassergärten und erklimmen Sie die riesigen Löwentor-Tore.",
    es: "Un imponente tapón volcánico de 200 metros coronado por un antiguo palacio fortaleza construido por el rey Kasyapa. Pasee por cuidados jardines de agua y suba a través de las puertas gigantes de patas de león."
  },
  "A mist-veiled sanctuary surrounded by rolling green tea hills, sweeping valleys, and majestic stone railway columns. Perfect for mountain hikers and café wanderers.": {
    zh: "一座迷雾笼罩的避风港，四周环绕着起伏的绿茶山丘、宽阔的山谷和宏伟的石质铁路拱桥。非常适合登山健行者和咖啡馆漫步者。",
    fr: "Un sanctuaire enveloppé de brume, entouré de collines de thé vert, de vallées spectaculaires et de majestueuses colonnes ferroviaires en pierre. Parfait pour les randonneurs et les amateurs de café.",
    de: "Ein nebelverhangenes Heiligtum, umgeben von sanften grünen Teehügeln, weiten Tälern und majestätischen Eisenbahnsäulen aus Stein. Perfekt für Bergwanderer und Café-Besucher.",
    es: "Un santuario cubierto de niebla rodeado de colinas de té verde, valles espectaculares y majestuosas columnas de ferrocarril de piedra. Perfecto para excursionistas de montaña y amantes del café."
  },
  "An untamed scrubland where leopards stalk, wild elephants roam, and dry tropical forests meet the ocean. Has one of the highest leopard densities in the world.": {
    zh: "一片未驯服的灌木丛林，豹子在此出没，野象自由漫步，干燥的热带森林在此与海洋相遇。拥有世界上最高的豹子密度之一。",
    fr: "Une brousse sauvage où les léopards traquent, les éléphants sauvages errent et les forêts tropicales sèches rencontrent l'océan. Possède l'une des plus fortes densités de léopards au monde.",
    de: "Ein ungezähmtes Buschland, in dem Leoparden pirschen, wilde Elefanten umherstreifen und trockene tropische Wälder auf den Ozean treffen. Hat eine der höchsten Leopardendichten der Welt.",
    es: "Un matorral indómito donde acechan los leopardos, vagan los elefantes salvajes y los bosques tropicales secos se encuentran con el océano. Tiene una de las densidades de leopardos más altas del mundo."
  },
  "Pristine golden sands, turquoise surfing bays, colonial historic towns, and majestic deep-sea blue whale migrations.": {
    zh: "清澈的黄金沙滩、松石绿的冲浪海湾、殖民地历史古镇和壮丽的深海蓝鲸大迁徙。",
    fr: "Des sables dorés immaculés, des baies de surf turquoise, des villes coloniales historiques et de majestueuses migrations de baleines bleues en haute mer.",
    de: "Unberührter goldener Sand, türkisfarbene Surfbuchten, koloniale historische Städte und majestätische Blauwalwanderungen in der Tiefsee.",
    es: "Arenas doradas prístinas, bahías de surf de color turquesa, ciudades históricas coloniales y majestuosas migraciones de ballenas azules en alta mar."
  },
  "The final royal bastion of ancient Sri Lankan kings, nestled around a beautiful lake and rich botanical forests. Home to the sacred Tooth Relic.": {
    zh: "斯里兰卡古代国王的最后一座皇家堡垒，坐落在美丽的湖泊 and 繁茂的植物森林环抱中。它是神圣佛牙寺的所在地。",
    fr: "Le dernier bastion royal des anciens rois du Sri Lanka, niché autour d'un lac magnifique et de riches forêts botaniques. Abrite la relique sacrée de la Dent.",
    de: "Die letzte königliche Bastion der alten Könige von Sri Lanka, eingebettet an einen wunderschönen See und reiche botanische Wälder. Heimat der heiligen Zahnreliquie.",
    es: "El último bastión real de los antiguos reyes de Sri Lanka, enclavado alrededor de un hermoso lago y ricos bosques botánicos. Hogar de la sagrada Reliquia del Diente."
  },
  "A 400-year-old Dutch fortress blending colonial European architecture with South Asian traditions. Walk along cobblestone pathways and ocean-facing ramparts.": {
    zh: "一座拥有400年历史的荷兰要塞，融合了欧洲殖民建筑风格与南亚传统。沿着鹅卵石小径和面朝大海的城墙漫步。",
    fr: "Une forteresse hollandaise vieille de 400 ans alliant l'architecture coloniale européenne aux traditions d'Asie du Sud. Promenez-vous le long des sentiers pavés et des remparts face à l'océan.",
    de: "Eine 400 Jahre alte niederländische Festung, die koloniale europäische Architektur mit südasiatischen Traditionen verbindet. Spazieren Sie auf Kopfsteinpflasterwegen und meeresseitigen Wällen.",
    es: "Una fortaleza holandesa de 400 años que combina la arquitectura colonial europea con las tradiciones del sur de Asia. Pasee por senderos empedrados y murallas frente al mar."
  },
  "A colonial mountain getaway known as 'Little England'. Dotted with Tudor-style bungalows, neat rose gardens, Gregory Lake, and cool mountain mist.": {
    zh: "一个被称为‘小英伦’的殖民时期山地避暑胜地。点缀着都铎风格的洋房、整洁的玫瑰园、格雷戈里湖和凉爽的山雾。",
    fr: "Une escapade de montagne coloniale connue sous le nom de 'Petite Angleterre'. Parsemée de bungalows de style Tudor, de jardins de roses soignés, du lac Gregory et de brume fraîche de montagne.",
    de: "Ein kolonialer Rückzugsort in den Bergen, bekannt als „Little England“. Gespickt mit Bungalows im Tudor-Stil, gepflegten Rosengärten, dem Gregory-See und kühlem Bergnebel.",
    es: "Una escapada colonial de montaña conocida como 'Pequeña Inglaterra'. Salpicado de bungalows de estilo Tudor, cuidados jardines de rosas, el lago Gregory y la fresca niebla de la montaña."
  },
  "The ancient first capital of Sri Lanka, showcasing colossal stupas, massive stone reservoirs, and the sacred Sri Maha Bodhi tree—the oldest recorded human-planted tree.": {
    zh: "斯里兰卡古老的第一任首都，展示了宏伟的佛塔，巨大的石质蓄水池以及神圣的圣菩提树——有记载的人类种植的最古老树木。",
    fr: "La première capitale ancienne du Sri Lanka, abritant des stupas colossaux, des réservoirs en pierre massifs et l'arbre sacré Sri Maha Bodhi — le plus vieil arbre planté par l'homme au monde.",
    de: "Die antike erste Hauptstadt Sri Lankas mit kolossalen Stupas, riesigen Steinreservoirs und dem heiligen Sri Maha Bodhi-Baum – dem ältesten aufgezeichneten von Menschen gepflanzten Baum.",
    es: "La primera capital antigua de Sri Lanka, que alberga estupas colosales, depósitos de piedra maciza y el árbol sagrado Sri Maha Bodhi, el árbol plantado por el hombre más antiguo registrado."
  },
  "The second kingdom of Sri Lanka, displaying exceptionally preserved medieval ruins, royal palace brickwork, and monumental granite Buddha statues carved into living rock.": {
    zh: "斯里兰卡的第二个王国，展示了保存极其完好的中世纪遗址、皇宫砖墙以及雕刻在岩石中的宏伟花岗岩大佛像。",
    fr: "Le deuxième royaume du Sri Lanka, présentant des ruines médiévales exceptionnellement préservées, des briques du palais royal et des statues de Bouddha monumentales sculptées dans la roche.",
    de: "Das zweite Königreich Sri Lankas mit außergewöhnlich gut erhaltenen mittelalterlichen Ruinen, königlichem Palastmauerwerk und monumentalen Granit-Buddha-Statuen, die in lebenden Fels gehauen wurden.",
    es: "El segundo reino de Sri Lanka, que muestra ruines medievales excepcionalmente conservadas, ladrillos del palacio real y estatuas monumentales de Buda talladas en roca."
  },
  "A world-renowned surf capital situated along the dry-zone eastern coast. Features epic reef point-breaks, relaxed beach bars, and wild lagoons where elephants graze.": {
    zh: "名扬世界的冲浪之都，坐落在干燥地带东海岸。拥有史诗般礁石浪点、悠闲沙滩酒吧和野象觅食的原始泻湖。",
    fr: "Une capitale du surf de renommée mondiale située le long de la côte est en zone sèche. Dispose de reef point-breaks épiques, de bars de plage décontractés et de lagunes sauvages où les éléphants paissent.",
    de: "Eine weltberühmte Surf-Hauptstadt an der Ostküste der Trockenzone. Bietet epische Point-Breaks am Riff, entspannte Strandbars und wilde Lagunen, in denen Elefanten grasen.",
    es: "Una capital del surf de renombre mundial situada a lo largo de la costa oriental de la zona seca. Cuenta con point-breaks épicos, relajados bares de playa y lagunas salvajes donde pastan los elefantes."
  }
};

// Global offline safeguards to prevent threadpool and DNS lookup congestion if environment is offline
let IS_TRANSLATION_OFFLINE = false;
let LAST_OFFLINE_CHECK = 0;
const OFFLINE_COOLDOWN = 120000; // 2 minutes cooldown

// List of public LibreTranslate mirrors we can cycle through in case of downtime or rate limits
const LIBRETRANSLATE_MIRRORS = [
  "https://libretranslate.com/translate",
  "https://translate.argosopentech.com/translate",
  "https://translate.terraprint.co/translate",
  "https://lt.vern.cc/translate"
];

export async function ensureOfflineStatus(): Promise<void> {
  // If already marked offline and within cooldown, keep it offline
  if (IS_TRANSLATION_OFFLINE && (Date.now() - LAST_OFFLINE_CHECK < OFFLINE_COOLDOWN)) {
    return;
  }
  
  // Otherwise, perform a quick single ping to the first mirror to verify connectivity
  try {
    const res = await fetch(LIBRETRANSLATE_MIRRORS[0], {
      method: "POST",
      body: JSON.stringify({
        q: "ping",
        source: "en",
        target: "fr",
        format: "text"
      }),
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(500) // fast 500ms ping
    });
    if (res.ok) {
      IS_TRANSLATION_OFFLINE = false;
      return;
    }
  } catch (err) {
    // If ping fails (offline, firewall, timeout, DNS error), flag as offline
    IS_TRANSLATION_OFFLINE = true;
    LAST_OFFLINE_CHECK = Date.now();
  }
}

export async function translateText(text: string, targetLang: string, sourceLang = "en"): Promise<string> {
  if (!text || !targetLang || targetLang === sourceLang) return text;
  
  const target = targetLang.toLowerCase();
  
  // Validate language code
  if (!["en", "fr", "de", "es", "zh"].includes(target)) {
    return text;
  }

  // Check if we have a high-fidelity local human-curated translation first (works offline!)
  const trimmed = text.trim();
  if (LOCAL_DICTIONARY[trimmed] && LOCAL_DICTIONARY[trimmed][target]) {
    return LOCAL_DICTIONARY[trimmed][target];
  }

  // Fast fail-safe bypass if the server was detected as offline to prevent socket congestion
  if (IS_TRANSLATION_OFFLINE) {
    if (Date.now() - LAST_OFFLINE_CHECK < OFFLINE_COOLDOWN) {
      return text;
    } else {
      IS_TRANSLATION_OFFLINE = false;
    }
  }
  
  const cacheKey = `${sourceLang}-${target}-${text}`;
  if (TRANSLATION_CACHE[cacheKey]) {
    return TRANSLATION_CACHE[cacheKey];
  }

  // Try each mirror in order in case of transient errors
  for (const mirror of LIBRETRANSLATE_MIRRORS) {
    try {
      const response = await fetch(mirror, {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: target,
          format: "text"
        }),
        headers: { "Content-Type": "application/json" },
        // Use snappy timeout to prevent hanging dynamic pages (1.8 seconds)
        signal: AbortSignal.timeout(1800)
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.translatedText) {
          const result = data.translatedText;
          TRANSLATION_CACHE[cacheKey] = result;
          return result;
        }
      }
    } catch (err: any) {
      // Quietly bypass error logs if offline to keep your terminal perfectly clean and silent
      if (!IS_TRANSLATION_OFFLINE && err.code !== "ENOTFOUND" && err.code !== "EAI_AGAIN" && err.cause?.code !== "ENOTFOUND") {
        console.warn(`Translation mirror ${mirror} failed:`, err.message || err);
      }
      // Fast bypass if DNS/network is offline or timing out to prevent blocking subsequent page loads
      if (
        err.code === "ENOTFOUND" || 
        err.code === "EAI_AGAIN" || 
        err.name === "TimeoutError" ||
        err.name === "AbortError" ||
        err.cause?.code === "ENOTFOUND" || 
        err.cause?.code === "EAI_AGAIN"
      ) {
        IS_TRANSLATION_OFFLINE = true;
        LAST_OFFLINE_CHECK = Date.now();
        break;
      }
    }
  }

  // Fallback to original text if mirrors fail
  return text;
}

export async function translateDestination(dest: any, lang: string): Promise<any> {
  if (!lang || lang === "en") return dest;
  
  try {
    const [translatedName, translatedRegion, translatedDescription, translatedBestTime] = await Promise.all([
      translateText(dest.name, lang),
      translateText(dest.region, lang),
      translateText(dest.description, lang),
      translateText(dest.bestTime, lang)
    ]);
    
    const attractions = Array.isArray(dest.attractions) 
      ? await Promise.all(dest.attractions.map((x: string) => translateText(x, lang)))
      : [];
      
    const activities = Array.isArray(dest.activities)
      ? await Promise.all(dest.activities.map((x: string) => translateText(x, lang)))
      : [];

    const features = Array.isArray(dest.features)
      ? await Promise.all(dest.features.map((x: string) => translateText(x, lang)))
      : [];

    return {
      ...dest,
      name: translatedName,
      region: translatedRegion,
      description: translatedDescription,
      bestTime: translatedBestTime,
      attractions,
      activities,
      features
    };
  } catch (err) {
    console.error("Failed to translate destination:", err);
    return dest;
  }
}

export async function translateTour(tour: any, lang: string): Promise<any> {
  if (!lang || lang === "en") return tour;
  
  try {
    const [translatedTitle, translatedDescription, translatedCategory] = await Promise.all([
      translateText(tour.title, lang),
      translateText(tour.description, lang),
      translateText(tour.category, lang)
    ]);

    const facilities = Array.isArray(tour.facilities)
      ? await Promise.all(tour.facilities.map((x: string) => translateText(x, lang)))
      : [];

    const roadmap = Array.isArray(tour.roadmap)
      ? await Promise.all(tour.roadmap.map(async (step: any) => ({
          ...step,
          location: await translateText(step.location, lang),
          title: await translateText(step.title, lang),
          description: await translateText(step.description, lang)
        })))
      : [];

    return {
      ...tour,
      title: translatedTitle,
      description: translatedDescription,
      category: translatedCategory,
      facilities,
      roadmap
    };
  } catch (err) {
    console.error("Failed to translate tour:", err);
    return tour;
  }
}

export async function translateBentoPackage(pkg: any, lang: string): Promise<any> {
  if (!lang || lang === "en") return pkg;
  
  try {
    const [
      translatedTitle,
      translatedHighlight,
      translatedHeaderDesc,
      translatedTabName,
      
      translatedCard1Title,
      translatedCard1Desc,
      translatedCard1FooterTitle,
      translatedCard1FooterSub,
      
      translatedCard2Title,
      translatedCard2Desc,
      translatedCard2Button,
      
      translatedCard3Title,
      translatedCard3Footer,
      
      translatedCard4Title,
      translatedCard4Desc,
      translatedCard4Button
    ] = await Promise.all([
      translateText(pkg.title, lang),
      translateText(pkg.highlight, lang),
      translateText(pkg.headerDesc, lang),
      translateText(pkg.tabName, lang),
      
      translateText(pkg.card1Title, lang),
      translateText(pkg.card1Desc, lang),
      translateText(pkg.card1FooterTitle, lang),
      translateText(pkg.card1FooterSub, lang),
      
      translateText(pkg.card2Title, lang),
      translateText(pkg.card2Desc, lang),
      translateText(pkg.card2Button, lang),
      
      translateText(pkg.card3Title, lang),
      translateText(pkg.card3Footer, lang),
      
      translateText(pkg.card4Title, lang),
      translateText(pkg.card4Desc, lang),
      translateText(pkg.card4Button, lang)
    ]);

    // Translate inclusions in Card 3 if they exist
    let card3Inclusions = [];
    if (Array.isArray(pkg.card3Inclusions)) {
      card3Inclusions = await Promise.all(
        pkg.card3Inclusions.map(async (inc: any) => ({
          ...inc,
          title: await translateText(inc.title, lang),
          desc: await translateText(inc.desc, lang)
        }))
      );
    } else if (pkg.card3Inclusions && typeof pkg.card3Inclusions === "object") {
      // In case it comes back as a parsed object/array from prisma
      const incArray = Array.isArray(pkg.card3Inclusions) 
        ? pkg.card3Inclusions 
        : JSON.parse(JSON.stringify(pkg.card3Inclusions));
        
      if (Array.isArray(incArray)) {
        card3Inclusions = await Promise.all(
          incArray.map(async (inc: any) => ({
            ...inc,
            title: await translateText(inc.title, lang),
            desc: await translateText(inc.desc, lang)
          }))
        );
      }
    }

    return {
      ...pkg,
      title: translatedTitle,
      highlight: translatedHighlight,
      headerDesc: translatedHeaderDesc,
      tabName: translatedTabName,
      
      card1Title: translatedCard1Title,
      card1Desc: translatedCard1Desc,
      card1FooterTitle: translatedCard1FooterTitle,
      card1FooterSub: translatedCard1FooterSub,
      
      card2Title: translatedCard2Title,
      card2Desc: translatedCard2Desc,
      card2Button: translatedCard2Button,
      
      card3Title: translatedCard3Title,
      card3Footer: translatedCard3Footer,
      card3Inclusions,
      
      card4Title: translatedCard4Title,
      card4Desc: translatedCard4Desc,
      card4Button: translatedCard4Button
    };
  } catch (err) {
    console.error("Failed to translate bento package:", err);
    return pkg;
  }
}

export async function translateFAQ(faq: any, lang: string): Promise<any> {
  if (!lang || lang === "en") return faq;
  
  try {
    const [translatedQuestion, translatedAnswer] = await Promise.all([
      translateText(faq.question, lang),
      translateText(faq.answer, lang)
    ]);
    
    return {
      ...faq,
      question: translatedQuestion,
      answer: translatedAnswer
    };
  } catch (err) {
    console.error("Failed to translate FAQ:", err);
    return faq;
  }
}

