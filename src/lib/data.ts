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
    | "Private Sri Lanka Tours"
    | "Custom / Tailor-Made Trips"
    | "Day Tours & Excursions"
    | "Wildlife & Safari"
    | "Culture & Heritage"
    | "Beaches & Coastal Escapes"
    | "Hill Country & Tea"
    | "Adventure & Nature"
    | "Honeymoon & Couples";
  facilities: string[];
  roadmap: ItineraryStep[];
}

export const mockTours: Tour[] = [
  {
    id: "1",
    title: "Colombo City Highlights & Cultural Wonders",
    description: "Explore the bustling commercial capital of Sri Lanka. Visit the colonial Dutch Hospital, marvel at the sacred Gangarama Temple on Beira Lake, shop at local bazaars, and walk the iconic Galle Face Green at sunset.",
    image: "/tours/kandy.jpg",
    price: 65,
    duration: "1 Day",
    category: "Day Tours & Excursions",
    facilities: [
      "Private air-conditioned vehicle",
      "Experienced English-speaking chauffeur-guide",
      "Gangarama Temple & museum entry tickets",
      "Chilled bottled water",
      "Flexible pick-up and drop-off"
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
    title: "Mirissa & Southern Coast Beach Retreat",
    description: "Relax along the sun-drenched southern coastline. Enjoy golden beaches, coastal drives, visit the historic Galle Fort, and join a morning whale-watching boat excursion.",
    image: "/bento/mirissa-beach.png",
    price: 240,
    duration: "3 Days",
    category: "Beaches & Coastal Escapes",
    facilities: [
      "Comfortable beachfront boutique hotel stays",
      "Daily breakfast included",
      "Private AC transport with chauffeur-guide",
      "Morning whale watching boat tickets",
      "Scenic coastal transfer to Galle Fort"
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
        title: "Mirissa Morning Whale Watching",
        description: "Experience morning marine life watching and take sunset photos at Coconut Tree Hill.",
        x: 92,
        y: 390,
        lat: 6.0367,
        lng: 80.2170
      }
    ]
  },
  {
    id: "3",
    title: "Ancient Kingdoms & Cultural Triangle Explorer",
    description: "Scale the majestic Sigiriya Rock Fortress, explore the cave temples of Dambulla, wander through sacred ancient ruins in Anuradhapura, and visit the Temple of the Tooth in Kandy.",
    image: "/bento/sigiriya.png",
    price: 360,
    duration: "4 Days",
    category: "Culture & Heritage",
    facilities: [
      "Handpicked 3 to 4-star boutique hotels",
      "Daily breakfast included",
      "Sigiriya & Dambulla entry tickets included",
      "Dedicated private vehicle & local chauffeur-guide",
      "Traditional village cultural lunch"
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
        description: "Ascend the legendary Sigiriya Rock Fortress in the morning coolness.",
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
        description: "Travel to Kandy and experience the sacred Tooth Relic evening ceremony.",
        x: 145,
        y: 120,
        lat: 8.3114,
        lng: 80.4037
      }
    ]
  },
  {
    id: "4",
    title: "Kitulgala Rafting & Peak Wilderness Adventure",
    description: "An exciting outdoor expedition. Go white-water rafting on the Kelani River, hike through lush rainforests, explore rock pools, and trek scenic mountain trails.",
    image: "/bento/ella-bridge.png",
    price: 180,
    duration: "2 Days",
    category: "Adventure & Nature",
    facilities: [
      "Experienced rafting instructor & safety gear",
      "Comfortable riverside eco-lodge stay",
      "Private AC transport throughout",
      "Daily breakfast & energy refreshments",
      "Rainforest trail exploration"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Kelani River Rafting in Kitulgala",
        description: "Tackle Class II and III rapids in Kitulgala and swim in natural rock pools.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Kandy",
        title: "Peak Wilderness Nature Hike",
        description: "Hike scenic forest paths and enjoy mountain vistas before heading back.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      }
    ]
  },
  {
    id: "5",
    title: "Yala & Udawalawe Wildlife Safari Experience",
    description: "Witness Sri Lanka's wildlife in their natural habitat. Embark on private 4x4 jeep safaris to spot leopards, wild elephant herds, sloth bears, and abundant birdlife in Yala.",
    image: "/bento/leopard.png",
    price: 290,
    duration: "2 Days",
    category: "Wildlife & Safari",
    facilities: [
      "Private 4x4 safari jeep with experienced park tracker",
      "National park entrance permits included",
      "Comfortable safari lodge stay with breakfast",
      "Private AC transport from Colombo or South Coast",
      "Chilled bottled water on all drives"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Transfer to Yala & Afternoon Safari",
        description: "Drive to Yala and embark on an afternoon 4x4 game drive tracking leopards.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Yala",
        title: "Early Morning Safari & Coastal Return",
        description: "Catch early morning wildlife activity before returning along the south coast.",
        x: 215,
        y: 360,
        lat: 6.3725,
        lng: 81.5160
      }
    ]
  },
  {
    id: "6",
    title: "Ayurvedic Nature & Wellness Retreat",
    description: "Relax and rejuvenate your mind and body. Stay in a peaceful green sanctuary and experience traditional herbal steam baths, authentic oil therapies, and guided morning yoga.",
    image: "/tours/kandy.jpg",
    price: 480,
    duration: "5 Days",
    category: "Custom / Tailor-Made Trips",
    facilities: [
      "Tranquil nature resort accommodation",
      "Consultation with resident Ayurvedic practitioner",
      "Daily traditional herbal oil therapies & steam baths",
      "Morning yoga & meditation sessions",
      "Nutritious healthy breakfast included"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Arrival & Ayurvedic Wellness Consultation",
        description: "Check into your tranquil wellness retreat and meet your wellness practitioner.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Bentota",
        title: "Herbal Oil Therapy & Steam Baths",
        description: "Experience traditional herbal body massages and steam baths.",
        x: 82,
        y: 345,
        lat: 6.4200,
        lng: 79.9997
      },
      {
        day: 3,
        location: "Bentota",
        title: "Sinharaja Rainforest Walking Meditation",
        description: "A gentle guided walk through the lush green canopy of the forest reserve.",
        x: 82,
        y: 345,
        lat: 6.4200,
        lng: 79.9997
      },
      {
        day: 4,
        location: "Sinharaja",
        title: "Gentle Coastal Yoga in Galle",
        description: "Practice peaceful yoga overlooking the Indian Ocean from the ramparts.",
        x: 125,
        y: 355,
        lat: 6.3986,
        lng: 80.4619
      },
      {
        day: 5,
        location: "Galle",
        title: "Wellness Summary & Return Transfer",
        description: "Conclude your wellness retreat with lifestyle tips and private return transfer.",
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
    description: "Ride the scenic hill country train through rolling green valleys, admire the Nine Arch Bridge, hike among tea plantations, and stay in comfortable mountain hotels.",
    image: "/bento/ella-bridge.png",
    price: 260,
    duration: "3 Days",
    category: "Hill Country & Tea",
    facilities: [
      "Scenic train tickets between Kandy and Ella",
      "Charming mountain view hotel stays",
      "Guided tea estate & factory visit with tasting",
      "Private AC vehicle with experienced mountain driver",
      "Daily breakfast included"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Scenic Drive & Train to Hill Country",
        description: "Travel inland to Nuwara Eliya and enjoy cool mountain air and tea hills.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Nuwara Eliya",
        title: "Nine Arch Bridge & Little Adam's Peak",
        description: "Walk the Nine Arch Bridge, hike Little Adam's Peak, and enjoy valley views.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      },
      {
        day: 3,
        location: "Ella",
        title: "Tea Factory Tour & Waterfalls",
        description: "Tour an authentic tea factory, watch tea processing, and visit Ravana Falls.",
        x: 180,
        y: 315,
        lat: 6.8724,
        lng: 81.0476
      }
    ]
  },
  {
    id: "8",
    title: "Romantic Sri Lanka Couples Escape",
    description: "Create lasting memories on a private romantic escape. Unwind in boutique hill country hotels, enjoy a candlelit beach dinner on the southern coast, and explore at your own relaxed pace.",
    image: "/bento/mirissa-beach.png",
    price: 620,
    duration: "6 Days",
    category: "Honeymoon & Couples",
    facilities: [
      "Handpicked romantic boutique hotels & villas",
      "Daily breakfast included",
      "Special candlelit dinner by the beach",
      "Private air-conditioned sedan with chauffeur-guide",
      "Customizable daily schedule for couples"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Arrival & Kandy Lake Stroll",
        description: "Check into your boutique stay in Kandy and enjoy a lakeside stroll.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Kandy",
        title: "Tea Country High Tea & Waterfalls",
        description: "Sip Ceylon tea overlooking misty valleys in Nuwara Eliya.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      },
      {
        day: 3,
        location: "Nuwara Eliya",
        title: "Ella Valley Scenic Retreat",
        description: "Relax in your scenic mountain hotel with views over Ella Gap.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      },
      {
        day: 4,
        location: "Ella",
        title: "Yala Afternoon Safari Drive",
        description: "Enjoy a private 4x4 game drive in Yala National Park.",
        x: 180,
        y: 315,
        lat: 6.8724,
        lng: 81.0476
      },
      {
        day: 5,
        location: "Yala",
        title: "Galle Fort & Candlelit Beach Dinner",
        description: "Explore the cobblestone ramparts of Galle Fort and enjoy a beach dinner.",
        x: 215,
        y: 360,
        lat: 6.3725,
        lng: 81.5160
      },
      {
        day: 6,
        location: "Galle",
        title: "Relaxed Coastal Return",
        description: "Enjoy morning beach time before your private transfer to the airport.",
        x: 92,
        y: 390,
        lat: 6.0367,
        lng: 80.2170
      }
    ]
  },
  {
    id: "9",
    title: "Windmark Signature Discovery Island Tour",
    description: "Our comprehensive 10-day island journey. Thoughtfully paced to connect ancient cultural kingdoms, misty tea hills, thrilling wildlife safaris, and relaxing southern beaches in one seamless itinerary.",
    image: "/anthony-lim-H-qDQSXBBBc-unsplash.jpg",
    price: 890,
    duration: "10 Days",
    category: "Private Sri Lanka Tours",
    facilities: [
      "9 nights in handpicked boutique hotels & lodges",
      "Daily breakfast included throughout",
      "Private AC vehicle with dedicated chauffeur-guide",
      "All major entrance tickets (Sigiriya, Dambulla, Tooth Temple)",
      "Private 4x4 jeep safari in Minneriya or Yala"
    ],
    roadmap: [
      {
        day: 1,
        location: "Colombo",
        title: "Negombo & Coastal Welcome",
        description: "Arrive in Sri Lanka and relax at a comfortable beach hotel in Negombo.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
      },
      {
        day: 2,
        location: "Negombo",
        title: "Dambulla Cave Temple",
        description: "Journey inland and climb the stunning cave temple complex of Dambulla.",
        x: 80,
        y: 260,
        lat: 7.2089,
        lng: 79.8426
      },
      {
        day: 3,
        location: "Sigiriya",
        title: "Sigiriya Lion Rock Fortress",
        description: "Climb the ancient rock fortress and explore the water gardens below.",
        x: 165,
        y: 175,
        lat: 7.9570,
        lng: 80.7603
      },
      {
        day: 4,
        location: "Minneriya",
        title: "Minneriya Elephant Gathering Safari",
        description: "Board private safari jeeps to observe wild elephant herds in Minneriya.",
        x: 185,
        y: 150,
        lat: 8.0261,
        lng: 80.8252
      },
      {
        day: 5,
        location: "Kandy",
        title: "Royal Botanical Gardens & Tooth Temple",
        description: "Visit Peradeniya Botanical Gardens and the sacred Temple of the Tooth in Kandy.",
        x: 160,
        y: 240,
        lat: 7.2906,
        lng: 80.6337
      },
      {
        day: 6,
        location: "Nuwara Eliya",
        title: "Tea Plantations & Nuwara Eliya",
        description: "Tour tea factories and admire cascading waterfalls in the cool hill country.",
        x: 165,
        y: 290,
        lat: 6.9497,
        lng: 80.7891
      },
      {
        day: 7,
        location: "Ella",
        title: "Scenic Train Ride & Nine Arch Bridge",
        description: "Ride the iconic train to Ella and walk across the Nine Arch Bridge.",
        x: 180,
        y: 315,
        lat: 6.8724,
        lng: 81.0476
      },
      {
        day: 8,
        location: "Yala",
        title: "Yala National Park Safari",
        description: "Embark on an afternoon 4x4 safari tracking leopards and wildlife in Yala.",
        x: 215,
        y: 360,
        lat: 6.3725,
        lng: 81.5160
      },
      {
        day: 9,
        location: "Galle",
        title: "Historic Galle Fort & Mirissa Beach",
        description: "Explore the UNESCO-listed Galle Fort ramparts and relax on the beach.",
        x: 92,
        y: 390,
        lat: 6.0367,
        lng: 80.2170
      },
      {
        day: 10,
        location: "Colombo",
        title: "Colombo Highlights & Departure",
        description: "Enjoy a brief city tour of Colombo before your airport transfer.",
        x: 80,
        y: 300,
        lat: 6.9271,
        lng: 79.8612
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
    | "Private Sri Lanka Tours"
    | "Custom / Tailor-Made Trips"
    | "Day Tours & Excursions"
    | "Wildlife & Safari"
    | "Culture & Heritage"
    | "Beaches & Coastal Escapes"
    | "Hill Country & Tea"
    | "Adventure & Nature"
    | "Honeymoon & Couples";
}

export const mockDestinations: Destination[] = [
  {
    id: "d1",
    name: "Sigiriya Rock Fortress",
    region: "Cultural Triangle",
    description: "Ideal for history lovers and adventurous walkers. Climb the ancient 5th-century rock citadel at sunrise for panoramic jungle views, see ancient fresco paintings, and explore manicured royal water gardens.",
    image: "/bento/sigiriya.png",
    bestTime: "May - September (Dry) / Year-round",
    temp: "31°C",
    attractions: ["Sigiriya Lion Rock", "Mirror Wall Frescoes", "Ancient Water Gardens"],
    activities: ["Climbing the rock fortress at dawn", "Visiting Sigiriya archaeological museum", "Exploring Pidurangala viewpoint"],
    lat: 7.9570,
    lng: 80.7603,
    categoryFilter: "Culture & Heritage"
  },
  {
    id: "d2",
    name: "Ella Mountain Retreat",
    region: "Mountain Country",
    description: "Best for hikers, couples, and scenic train riders. A laid-back mountain town surrounded by cool cloud forests, tea estates, the iconic Nine Arch Bridge, and dramatic hiking trails like Little Adam's Peak.",
    image: "/bento/ella-bridge.png",
    bestTime: "January - April (Clear skies)",
    temp: "22°C",
    attractions: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls"],
    activities: ["Scenic blue train ride from Kandy", "Sunrise hike at Little Adam's Peak", "Nine Arch bridge photography"],
    lat: 6.8724,
    lng: 81.0476,
    categoryFilter: "Hill Country & Tea"
  },
  {
    id: "d3",
    name: "Yala National Park",
    region: "Dry Zone Coast",
    description: "A must-visit for wildlife photographers and safari enthusiasts. Famous for having one of the world's highest concentrations of leopards, plus wild elephants, sloth bears, crocodiles, and diverse birdlife.",
    image: "/bento/leopard.png",
    bestTime: "February - July (Peak wildlife activity)",
    temp: "29°C",
    attractions: ["Leopard safaris (Block 1)", "Sithulpawwa Ancient Temple", "Coastal dunes & lagoons"],
    activities: ["Morning and evening 4x4 jeep safaris", "Birdwatching around wetland lakes", "Stay in nearby safari lodges"],
    lat: 6.3725,
    lng: 81.5160,
    categoryFilter: "Wildlife & Safari"
  },
  {
    id: "d4",
    name: "Mirissa Coastal Paradise",
    region: "Deep South Coast",
    description: "Perfect for sun-seekers, marine enthusiasts, and relaxed beach vacations. Known for gentle golden beaches, lively evening seafood spots, morning whale-watching boat excursions, and surfing bays.",
    image: "/bento/mirissa-beach.png",
    bestTime: "December - April (Calm seas & whales)",
    temp: "28°C",
    attractions: ["Coconut Tree Hill", "Secret Beach", "Parrot Rock"],
    activities: ["Morning blue whale watching cruise", "Surfing gentle southern breaks", "Sunset photos at Coconut Tree Hill"],
    lat: 5.9482,
    lng: 80.4578,
    categoryFilter: "Beaches & Coastal Escapes"
  },
  {
    id: "d5",
    name: "Kandy Mountain City",
    region: "Hill Country",
    description: "Great for culture enthusiasts and spiritual explorers. Sri Lanka's historic hill capital nestled around a serene lake, housing the sacred Temple of the Tooth Relic and lush Royal Botanical Gardens.",
    image: "/tours/kandy.jpg",
    bestTime: "December - April",
    temp: "25°C",
    attractions: ["Temple of the Sacred Tooth Relic", "Peradeniya Royal Botanical Gardens", "Kandy Lake Promenade"],
    activities: ["Attending evening Tooth Relic ceremony", "Walking giant palm avenues at Peradeniya", "Watching traditional Kandyan cultural dances"],
    lat: 7.2906,
    lng: 80.6337,
    categoryFilter: "Culture & Heritage"
  },
  {
    id: "d6",
    name: "Galle Fort UNESCO Citadel",
    region: "Deep South Coast",
    description: "Ideal for walking tours, architecture buffs, and boutique shopping. A living 400-year-old Dutch colonial fortress on the ocean, featuring cobblestone alleys, lighthouse viewpoints, and artisan cafes.",
    image: "/bento/tomas-malik-UL23OjMTHXE-unsplash.jpg",
    bestTime: "December - April",
    temp: "28°C",
    attractions: ["Galle Lighthouse", "Dutch Reformed Church", "Flag Rock Bastion"],
    activities: ["Sunset walk along ocean ramparts", "Exploring artisan boutiques and gem shops", "Dining in restored colonial courtyards"],
    lat: 6.0267,
    lng: 80.2170,
    categoryFilter: "Beaches & Coastal Escapes"
  },
  {
    id: "d7",
    name: "Nuwara Eliya (Little England)",
    region: "Mountain Country",
    description: "Perfect for travelers seeking cool mountain weather, tea history, and colonial charm. Dotted with emerald tea estates, cascading waterfalls, British colonial bungalows, and strawberry farms.",
    image: "/anthony-lim-H-qDQSXBBBc-unsplash.jpg",
    bestTime: "January - April (Sunny & crisp)",
    temp: "16°C",
    attractions: ["Pedro Tea Estate", "Gregory Lake", "Hakgala Botanical Gardens"],
    activities: ["Authentic tea factory tour & tasting", "High tea at historic Grand Hotel", "Boating on Gregory Lake"],
    lat: 6.9497,
    lng: 80.7891,
    categoryFilter: "Hill Country & Tea"
  },
  {
    id: "d8",
    name: "Anuradhapura Sacred Capital",
    region: "Cultural Triangle",
    description: "Best for travelers interested in ancient civilizations and Buddhism. The oldest kingdom of Sri Lanka, home to colossal 2,000-year-old brick stupas, sacred bodhi trees, and expansive ancient reservoirs.",
    image: "/bento/sigiriya.png",
    bestTime: "May - September (Warm & dry)",
    temp: "31°C",
    attractions: ["Ruwanwelisaya Stupa", "Jaya Sri Maha Bodhi", "Abhayagiri Monastery Complex"],
    activities: ["Bicycle exploration of ancient ruins", "Sunset visits to sacred shrines", "Photography of ancient granite stone carvings"],
    lat: 8.3114,
    lng: 80.4037,
    categoryFilter: "Culture & Heritage"
  },
  {
    id: "d9",
    name: "Polonnaruwa Medieval Kingdom",
    region: "Cultural Triangle",
    description: "Ideal for cycling among remarkably preserved medieval ruins. Explore royal palace walls, intricate audience halls, and the world-famous Gal Vihara rock-cut Buddha statues.",
    image: "/bento/ella-bridge.png",
    bestTime: "May - September",
    temp: "30°C",
    attractions: ["Gal Vihara Rock Statues", "Royal Palace Ruins", "Sacred Quadrangle"],
    activities: ["Cycling through shaded archaeological parks", "Admiring massive rock Buddha carvings", "Birdwatching around the ancient sea of Parakrama"],
    lat: 7.9397,
    lng: 81.0012,
    categoryFilter: "Culture & Heritage"
  },
  {
    id: "d10",
    name: "Arugam Bay Surf Haven",
    region: "Eastern Coast",
    description: "Best for surfers, beach lovers, and relaxed summer holidays. A vibrant east-coast bay offering world-class right-hand point breaks, relaxed beachfront cafes, and nearby lagoon wildlife safaris.",
    image: "/bento/mirissa-beach.png",
    bestTime: "May - September (Peak surfing season)",
    temp: "32°C",
    attractions: ["Main Point Break", "Whiskey Point", "Pottuvil Lagoon"],
    activities: ["Surfing world-class point breaks", "Pottuvil lagoon safari with wild elephants", "Beachfront yoga and sunset dining"],
    lat: 6.8424,
    lng: 81.8311,
    categoryFilter: "Beaches & Coastal Escapes"
  }
];
