export interface ItineraryStep {
  day: number;
  location: string;
  title: string;
  description: string;
  x: number; // Map SVG X-coordinate (0-320 viewBox)
  y: number; // Map SVG Y-coordinate (0-440 viewBox)
  lat: number; // Real GPS latitude
  lng: number; // Real GPS longitude
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  category: 
    | "Colombo Tours"
    | "Beach Tours"
    | "Cultural Tours"
    | "Adventure Tours"
    | "Wildlife Tours"
    | "Ayurvedic Tours"
    | "Hill Country Tours"
    | "Honeymoon Tours"
    | "Family Tours"
    | "Golf Tours"
    | "Ramayana Tours";
  facilities: string[];
  roadmap: ItineraryStep[];
}

export const mockTours: Tour[] = [
  {
    id: "1",
    title: "Chalo Colombo & Haalo Sri Lanka City Wonders",
    description: "Explore the bustling commercial capital of Sri Lanka. Visit the colonial Dutch Hospital, marvel at the sacred Gangarama Temple on Beira Lake, shop at local bazaars, and walk the iconic Galle Face Green at sunset.",
    image: "/tours/kandy.jpg",
    price: 45,
    duration: "1 Day",
    category: "Colombo Tours",
    facilities: [
      "Luxury air-conditioned sedan",
      "Professional English guide",
      "All landmark entry tickets",
      "Chilled bottled water",
      "Complimentary high-speed Wi-Fi"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Gangarama Temple & Galle Face Green",
        description: "Explore Gangarama temple, wander Pettah bazaar, and catch the sunset over the Indian Ocean at Galle Face Green.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      }
    ]
  },
  {
    id: "2",
    title: "Mirissa Golden Coast & Beach Getaway",
    description: "Breathe in the ultimate southern coast sunshine. Stroll pristine sandy shores, learn surfing from certified instructors, and unwind in private beachfront luxury retreats with whale-watching morning charters.",
    image: "/bento/mirissa-beach.png",
    price: 95,
    duration: "3 Days",
    category: "Beach Tours",
    facilities: [
      "4-star beachfront luxury hotel",
      "Daily surf equipment hire",
      "Private A/C van with driver",
      "Whale watching morning charter",
      "Daily gourmet breakfasts"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Coastal drive to Bentota",
        description: "Transfer from Colombo to Bentota and relax on the wide golden sandy beaches.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Bentota",
        title: "Madu River Safari & Galle Fort",
        description: "Take a scenic boat safari on Madu River, then explore the historic Galle Dutch Fort.",
        x: 82,
        y: 345,
        lat: 6.4200,
        lng: 79.9997
      },
      {
        day: 3,
        location: "Galle",
        title: "Mirissa Deep Sea Whale Watching",
        description: "Witness blue whales on a morning charter and take sunset photos at Coconut Tree Hill.",
        x: 92,
        y: 390,
        lat: 6.0367,
        lng: 80.2170
      }
    ]
  },
  {
    id: "3",
    title: "Ancient Ruins & Sacred Cultural Triangle",
    description: "Scale the legendary Sigiriya Rock Fortress, explore the sacred ruins of Anuradhapura, wander ancient royal gardens, and see the massive historic stupas that defined the island's golden age.",
    image: "/bento/sigiriya.png",
    price: 180,
    duration: "4 Days",
    category: "Cultural Tours",
    facilities: [
      "Bespoke 4-star heritage hotels",
      "Sigiriya rock explorer passes",
      "Private sedan with dedicated driver",
      "Certified archaeological guide",
      "Traditional Sri Lankan village lunch"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Dambulla Golden Cave Temple",
        description: "Journey inland and climb the stunning cave temple complex of Dambulla.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Dambulla",
        title: "Sigiriya Lion Rock Fortress",
        description: "Ascend the legendary Sigiriya Rock Fortress at sunrise before the heat peaks.",
        x: 160,
        y: 195,
        lat: 7.8742,
        lng: 80.6511
      },
      {
        day: 3,
        location: "Sigiriya",
        title: "Sacred City of Anuradhapura",
        description: "Tour the colossal stupas and ancient bodhi trees in the first kingdom of Sri Lanka.",
        x: 165,
        y: 175,
        lat: 7.9570,
        lng: 80.7603
      },
      {
        day: 4,
        location: "Anuradhapura",
        title: "Royal Kandy & Tooth Temple",
        description: "Travel to Kandy and experience the sacred Tooth Relic evening guardian ceremony.",
        x: 145,
        y: 120,
        lat: 8.3114,
        lng: 80.4037
      }
    ]
  },
  {
    id: "4",
    title: "Kitulgala White Water & Peak Wilderness Adventure",
    description: "Embark on an adrenaline-packed expedition. Go white-water rafting on Kelani River, hike through rain forests, canyon down majestic rock waterfalls, and climb Adams Peak wilderness under the starlight.",
    image: "/bento/ella-bridge.png",
    price: 110,
    duration: "2 Days",
    category: "Adventure Tours",
    facilities: [
      "Certified adventure instructor",
      "Premium safety & rafting gear",
      "Adams Peak night hiking permits",
      "Eco-lodge forest accommodations",
      "All canyoning and zipline passes"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Kelani River Rapid Rafting",
        description: "Tackle Class II and III rapids in Kitulgala and canyon down rock waterfalls.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Kandy",
        title: "Peak Wilderness Pilgrimage Trail",
        description: "Embark on a midnight trek up Adams Peak to watch the sunrise break through clouds.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      }
    ]
  },
  {
    id: "5",
    title: "Yala National Park Elite Leopard Expedition",
    description: "Witness the majestic wildlife of Sri Lanka in deep comfort. Join private 4x4 safaris with naturalists to track leopards, giant elephant herds, sloth bears, and beautiful marine wetlands in Yala.",
    image: "/bento/leopard.png",
    price: 160,
    duration: "1 Day",
    category: "Wildlife Tours",
    facilities: [
      "Private customized 4x4 safari jeep",
      "Dedicated expert park naturalist",
      "Yala National Park entry permits",
      "Luxury A/C round-trip transport",
      "Gourmet picnic lunch in the park"
    ],
    roadmap: [
      {
        day: 1,
        location: "Yala",
        title: "Udawalawe & Yala Deep Safari",
        description: "Depart early for a multi-hour leopard tracking and wild elephant safari inside Yala.",
        x: 215,
        y: 360,
        lat: 6.3725,
        lng: 81.5160
      }
    ]
  },
  {
    id: "6",
    title: "Traditional Hela Ayurvedic Wellness & Spa Retreat",
    description: "Restore your mind, body, and spirit. Stay in an award-winning eco-luxury wellness villa and experience custom herbal steam baths, personalized oil therapies, guided yoga, and detoxifying nutrition paths.",
    image: "/tours/kandy.jpg",
    price: 250,
    duration: "5 Days",
    category: "Ayurvedic Tours",
    facilities: [
      "Eco-luxury private pool villa",
      "Personal Ayurvedic doctor consult",
      "Daily specialized herbal therapies",
      "Guided yoga & sunrise meditation",
      "Full board organic detox meals"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Bespoke Wellness Sanctuary",
        description: "Check into your tranquil eco-villa and enjoy a personal medical wellness consultation.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Bentota",
        title: "Hela Herbal Baths & Massage",
        description: "Receive deep hot oil massages, herbal steam baths, and dynamic acupuncture.",
        x: 82,
        y: 345,
        lat: 6.4200,
        lng: 79.9997
      },
      {
        day: 3,
        location: "Bentota",
        title: "Sinharaja Rainforest Forest Bathing",
        description: "Trek quietly through the pristine UNESCO reserve to connect with natural energy.",
        x: 82,
        y: 345,
        lat: 6.4200,
        lng: 79.9997
      },
      {
        day: 4,
        location: "Sinharaja",
        title: "Rampart Yoga in Ancient Galle Fort",
        description: "Practice peaceful yoga overlooking the Indian Ocean from the Galle ramparts.",
        x: 125,
        y: 355,
        lat: 6.3986,
        lng: 80.4619
      },
      {
        day: 5,
        location: "Galle",
        title: "Ayurvedic Farewell Consultation",
        description: "Conclude with diet planning recommendations and enjoy a smooth transfer back.",
        x: 92,
        y: 390,
        lat: 6.0367,
        lng: 80.2170
      }
    ]
  },
  {
    id: "7",
    title: "Misty Ella & Nuwara Eliya Hill Country Escape",
    description: "Ride the iconic blue train through rolling valleys, admire the stone columns of Nine Arch Bridge, hike mist-shrouded tea plantations, and stay in gorgeous mountain bungalows overlooking valleys.",
    image: "/bento/ella-bridge.png",
    price: 140,
    duration: "3 Days",
    category: "Hill Country Tours",
    facilities: [
      "First-class observation rail tickets",
      "Historic colonial tea bungalow stay",
      "Private tea factory estate tour",
      "Dedicated mountain driver guide",
      "All viewpoint entry permits"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Observation Deck Blue Train",
        description: "Board the legendary blue train through misty pine forests and tea hills to Nuwara Eliya.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Nuwara Eliya",
        title: "Ella Nine Arch & Mini Adams Peak",
        description: "Walk the Nine Arch Bridge, hike Little Adams Peak, and admire the sweeping views.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      },
      {
        day: 3,
        location: "Ella",
        title: "Kandy Tea Gardens & Waterfalls",
        description: "Tour historic tea production rooms, watch tea pluckers, and return through Kandy.",
        x: 180,
        y: 315,
        lat: 6.8724,
        lng: 81.0476
      }
    ]
  },
  {
    id: "8",
    title: "Romantic Escape & Private Canopy Pool Villas",
    description: "Create unforgettable memories on your premium honeymoon. Unwind in exclusive private canopy villas in Ella, enjoy candlelit dinners on Mirissa's shore, and take private helicopter transfers across islands.",
    image: "/bento/mirissa-beach.png",
    price: 320,
    duration: "6 Days",
    category: "Honeymoon Tours",
    facilities: [
      "Private canopy plunge pool villa",
      "VIP scenic helicopter island transfer",
      "Private beach candlelit dinners",
      "Luxury SUV with private chauffeur",
      "VIP airport arrivals lounge access"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Candlelit Kandy Lake Dinner",
        description: "Check into a luxury estate in Kandy and enjoy private lakeside fine dining.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Kandy",
        title: "British High Tea in Misty Hills",
        description: "Sip tea overlooking green valleys at the Grand Hotel gardens in Nuwara Eliya.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      },
      {
        day: 3,
        location: "Nuwara Eliya",
        title: "Ella Valley Canopy Villa Retreat",
        description: "Relax in your private pool villa hanging over the mist-clad mountain ravines.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      },
      {
        day: 4,
        location: "Ella",
        title: "Luxury Glamping Safari in Yala",
        description: "Stay in an ultra-luxury glamping tent and trace leopards at sunset in Yala.",
        x: 180,
        y: 315,
        lat: 6.8724,
        lng: 81.0476
      },
      {
        day: 5,
        location: "Yala",
        title: "Couples Massage in Ancient Galle",
        description: "Unwind with deep-tissue therapies inside a 400-year-old Dutch villa spa.",
        x: 215,
        y: 360,
        lat: 6.3725,
        lng: 81.5160
      },
      {
        day: 6,
        location: "Galle",
        title: "Scenic Helicopter Flyback",
        description: "Take a memorable private helicopter flight back over beaches to Colombo airport.",
        x: 92,
        y: 390,
        lat: 6.0367,
        lng: 80.2170
      }
    ]
  },
  {
    id: "9",
    title: "Ultimate Family Multi-Generational Explorer",
    description: "A meticulously balanced holiday designed for families. Includes interactive cultural scavenger hunts, kid-friendly wildlife safaris, baby turtle releases on coastlines, and stays in luxury resorts with extensive amenities.",
    image: "/bento/mirissa-beach.png",
    price: 220,
    duration: "7 Days",
    category: "Family Tours",
    facilities: [
      "Spacious luxury family touring van",
      "Interactive kids scavenger hunt book",
      "Private family wildlife safaris",
      "Beachfront child-friendly resorts",
      "Dedicated 24/7 family guide support"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Negombo Sunset Lagoon Ride",
        description: "Check into a beach hotel and sail Negombo lagoon to see local fishermen.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Negombo",
        title: "Sigiriya Treasure Quest hike",
        description: "Participate in a fun, interactive historic treasure hunt climbing Lion Rock.",
        x: 80,
        y: 260,
        lat: 7.2089,
        lng: 79.8426
      },
      {
        day: 3,
        location: "Sigiriya",
        title: "Minneriya Wild Elephant Gathering",
        description: "Board custom safari jeeps to witness hundreds of elephants gather by the lake.",
        x: 165,
        y: 175,
        lat: 7.9570,
        lng: 80.7603
      },
      {
        day: 4,
        location: "Minneriya",
        title: "Kandy Cultural Fire Dance show",
        description: "Watch spectacular drumming, acrobatic spinning, and traditional fire-walking.",
        x: 185,
        y: 150,
        lat: 8.0261,
        lng: 80.8252
      },
      {
        day: 5,
        location: "Kandy",
        title: "Nuwara Eliya Tea Pluck Challenge",
        description: "Participate in a friendly tea-plucking contest with estate workers in Nuwara Eliya.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      },
      {
        day: 6,
        location: "Nuwara Eliya",
        title: "Kosgoda Sea Turtle Hatchery",
        description: "Adopt and release newborn baby sea turtles into the warm Indian Ocean waves.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      },
      {
        day: 7,
        location: "Bentota",
        title: "Sandy Beach Games & Departure",
        description: "Enjoy beach volleyball and jet-skiing before your private transfer to the airport.",
        x: 82,
        y: 345,
        lat: 6.4200,
        lng: 79.9997
      }
    ]
  },
  {
    id: "10",
    title: "Signature Fairways: Victoria Golf & Country Resort",
    description: "Tee off in absolute paradise. Play on the award-winning 18-hole championship golf course nestled along the scenic Victoria reservoir and surrounded by Kandy's gorgeous tropical mountain forest.",
    image: "/bento/leopard.png",
    price: 195,
    duration: "2 Days",
    category: "Golf Tours",
    facilities: [
      "18-hole championship green fees",
      "Private golf cart & dedicated caddy",
      "Victoria Golf luxury bungalow stay",
      "Executive sedan with private chauffeur",
      "Welcome dinner at the Lakeview Club"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Scenic drive to Victoria Golf Club",
        description: "Tee off on a world-class course nestled alongside the majestic Knuckles mountain range.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Kandy",
        title: "Championship Round & Return",
        description: "Play your second round, enjoy lakeside lunch, and head back in luxury to Colombo.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      }
    ]
  },
  {
    id: "11",
    title: "Legendary Ramayana Trail Pilgrimage Tour",
    description: "Journey through sacred epic history. Visit the legendary Seetha Amman temple in Ashoka Vatika, explore Ravana caves and Ella waterfalls, and climb ancient mountain ruins mentioned in sacred texts.",
    image: "/bento/sigiriya.png",
    price: 150,
    duration: "4 Days",
    category: "Ramayana Tours",
    facilities: [
      "Private A/C sedan with driver",
      "Certified Ramayana history guide",
      "Excellent 4-star vegetarian hotel stays",
      "Puja offering arrangements at shrines",
      "All sacred site entry permits"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Munneswaram & Manavari Kovils",
        description: "Visit ancient shrines dedicated to Lord Rama and perform traditional puja rituals.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Sigiriya",
        title: "Ashoka Vatika & Seetha Amman temple",
        description: "Wander the legendary gardens where Princess Seetha was held captive in Nuwara Eliya.",
        x: 165,
        y: 175,
        lat: 7.9570,
        lng: 80.7603
      },
      {
        day: 3,
        location: "Kandy",
        title: "Ravana Ella Caves & Waterfalls",
        description: "Hike up the rock cliffs to explore the hidden cave vaults and legendary waterfall drops.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      },
      {
        day: 4,
        location: "Nuwara Eliya",
        title: "Sanjeevani Hills Rumassala trek",
        description: "Trek the Rumassala hill in Galle, believed to be a dropped piece of the Himalayas.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      }
    ]
  }
];

export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  bestTime: string;
  temp: string;
  attractions: string[];
  activities: string[];
  features?: string[];
  gallery?: string[];
  lat: number;
  lng: number;
  categoryFilter: 
    | "Colombo Tours"
    | "Beach Tours"
    | "Cultural Tours"
    | "Adventure Tours"
    | "Wildlife Tours"
    | "Ayurvedic Tours"
    | "Hill Country Tours"
    | "Honeymoon Tours"
    | "Family Tours"
    | "Golf Tours"
    | "Ramayana Tours";
}

export const mockDestinations: Destination[] = [
  {
    id: "d1",
    name: "Sigiriya Rock Fortress",
    region: "Cultural Triangle",
    description: "A towering 200-meter volcanic plug topped by an ancient palace fortress built by King Kasyapa. Wander through manicured water gardens and climb through giant lion-paw gateways.",
    image: "/bento/sigiriya.png",
    bestTime: "May - September",
    temp: "31°C",
    attractions: ["Sigiriya Lion Rock", "Mirror Wall", "Water Gardens"],
    activities: ["Climbing the fortress", "Sigiriya museum walkthrough", "Wandering royal gardens"],
    lat: 7.9570,
    lng: 80.7603,
    categoryFilter: "Cultural Tours"
  },
  {
    id: "d2",
    name: "Ella Mountain Retreat",
    region: "Mountain Country",
    description: "A mist-veiled sanctuary surrounded by rolling green tea hills, sweeping valleys, and majestic stone railway columns. Perfect for mountain hikers and café wanderers.",
    image: "/bento/ella-bridge.png",
    bestTime: "January - April",
    temp: "22°C",
    attractions: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls"],
    activities: ["Hiking Little Adam's Peak", "Nine Arch bridge photography", "Exploring Ella Rock"],
    lat: 6.8724,
    lng: 81.0476,
    categoryFilter: "Hill Country Tours"
  },
  {
    id: "d3",
    name: "Yala National Park",
    region: "Dry Zone Coast",
    description: "An untamed scrubland where leopards stalk, wild elephants roam, and dry tropical forests meet the ocean. Has one of the highest leopard densities in the world.",
    image: "/bento/leopard.png",
    bestTime: "February - June",
    temp: "29°C",
    attractions: ["Leopard safaris", "Sithulpawwa Rock Temple", "Beach dunes"],
    activities: ["Leopard tracking 4x4 safari", "Wetland birdwatching", "Jungle campfire dining"],
    lat: 6.3725,
    lng: 81.5160,
    categoryFilter: "Wildlife Tours"
  },
  {
    id: "d4",
    name: "Mirissa Coastal Paradise",
    region: "Deep South Coast",
    description: "Pristine golden sands, turquoise surfing bays, colonial historic towns, and majestic deep-sea blue whale migrations.",
    image: "/bento/mirissa-beach.png",
    bestTime: "December - April",
    temp: "28°C",
    attractions: ["Coconut Tree Hill", "Secret Beach", "Parrot Rock"],
    activities: ["Deep-sea whale watching", "Surfing pristine bays", "Sunset walks on Coconut Hill"],
    lat: 5.9482,
    lng: 80.4578,
    categoryFilter: "Beach Tours"
  },
  {
    id: "d5",
    name: "Kandy Mountain City",
    region: "Hill Country",
    description: "The final royal bastion of ancient Sri Lankan kings, nestled around a beautiful lake and rich botanical forests. Home to the sacred Tooth Relic.",
    image: "/tours/kandy.jpg",
    bestTime: "December - April",
    temp: "25°C",
    attractions: ["Temple of the Tooth Relic", "Peradeniya Gardens", "Kandy Lake sunset"],
    activities: ["Attending Tooth guardian puja", "Walking botanical canopies", "Traditional Kandyan fire dances"],
    lat: 7.2906,
    lng: 80.6337,
    categoryFilter: "Colombo Tours"
  },
  {
    id: "d6",
    name: "Galle Fort UNESCO Citadel",
    region: "Deep South Coast",
    description: "A 400-year-old Dutch fortress blending colonial European architecture with South Asian traditions. Walk along cobblestone pathways and ocean-facing ramparts.",
    image: "/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg",
    bestTime: "December - April",
    temp: "28°C",
    attractions: ["Galle Lighthouse", "Dutch Reform Church", "Flag Rock Bastion"],
    activities: ["Walking the colonial ramparts", "Boutique shopping & fine dining", "Watching cliff divers at Flag Rock"],
    lat: 6.0267,
    lng: 80.2170,
    categoryFilter: "Beach Tours"
  },
  {
    id: "d7",
    name: "Nuwara Eliya (Little England)",
    region: "Mountain Country",
    description: "A colonial mountain getaway known as 'Little England'. Dotted with Tudor-style bungalows, neat rose gardens, Gregory Lake, and cool mountain mist.",
    image: "/anthony-lim-H-qDQSXBBBc-unsplash.jpg",
    bestTime: "January - April",
    temp: "18°C",
    attractions: ["Gregory Lake", "Pedro Tea Estate", "Hakgala Gardens"],
    activities: ["British high tea at Grand Hotel", "Boating on Gregory Lake", "Ceylon tea factory tour & tasting"],
    lat: 6.9497,
    lng: 80.7891,
    categoryFilter: "Hill Country Tours"
  },
  {
    id: "d8",
    name: "Anuradhapura Sacred Capital",
    region: "Cultural Triangle",
    description: "The ancient first capital of Sri Lanka, showcasing colossal stupas, massive stone reservoirs, and the sacred Sri Maha Bodhi tree—the oldest recorded human-planted tree.",
    image: "/bento/sigiriya.png",
    bestTime: "May - September",
    temp: "31°C",
    attractions: ["Ruwanwelisaya Stupa", "Jaya Sri Maha Bodhi", "Abhayagiri Monastery"],
    activities: ["Bicycle tours of ruins", "Paying respects at ancient shrines", "Sunset photography over reservoirs"],
    lat: 8.3114,
    lng: 80.4037,
    categoryFilter: "Cultural Tours"
  },
  {
    id: "d9",
    name: "Polonnaruwa Medieval Kingdom",
    region: "Cultural Triangle",
    description: "The second kingdom of Sri Lanka, displaying exceptionally preserved medieval ruins, royal palace brickwork, and monumental granite Buddha statues carved into living rock.",
    image: "/bento/ella-bridge.png",
    bestTime: "May - September",
    temp: "30°C",
    attractions: ["Gal Vihara Stupas", "Royal Palace Ruins", "Quadrangle Shrines"],
    activities: ["Exploring stone ruins by bicycle", "Wandering Gal Vihara Buddha shrines", "Bird watching in historical reserves"],
    lat: 7.9397,
    lng: 81.0012,
    categoryFilter: "Cultural Tours"
  },
  {
    id: "d10",
    name: "Arugam Bay Surf Haven",
    region: "Eastern Coast",
    description: "A world-renowned surf capital situated along the dry-zone eastern coast. Features epic reef point-breaks, relaxed beach bars, and wild lagoons where elephants graze.",
    image: "/bento/mirissa-beach.png",
    bestTime: "June - September",
    temp: "32°C",
    attractions: ["Main Point Break", "Whiskey Point", "Pottuvil Lagoon"],
    activities: ["Surfing championship breaks", "Pottuvil lagoon elephant safaris", "Yoga & beachfront sunset drinks"],
    lat: 6.8424,
    lng: 81.8311,
    categoryFilter: "Beach Tours"
  }
];
