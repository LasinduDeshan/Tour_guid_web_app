import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Clean existing database
  await prisma.booking.deleteMany();
  await prisma.roadmapStep.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.advertisement.deleteMany();
  await prisma.pageDetail.deleteMany();
  await prisma.user.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.bentoPackage.deleteMany();
  await prisma.fAQ.deleteMany();


  // 2. Create Users
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@ceyoratours.com",
      password: adminPassword,
      role: "ADMIN" as any,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "General User",
      email: "user@example.com",
      password: userPassword,
      role: "USER" as any,
    },
  });

  console.log("Users seeded successfully.");

  // 3. Create Page Details (Hero headings, Bento titles, etc.)
  const pageDetails = [
    {
      key: "home_hero_title_light",
      value: "Bespoke Premium Expeditions",
      description: "Homepage hero subtitle/light headline",
    },
    {
      key: "home_hero_title_bold",
      value: "The Wonder of Sri Lanka",
      description: "Homepage hero main bold title",
    },
    {
      key: "home_hero_description",
      value: "Embark on an extraordinary journey through the island's timeless wonders. From pristine coasts to misty highlands, our custom-tailored itineraries offer seamless private travel, elite local guides, and authentic cultural immersions designed just for you.",
      description: "Homepage hero paragraph copy",
    },
    {
      key: "tours_hero_title_light",
      value: "Bespoke Premium Expeditions",
      description: "Tours page hero subtitle/light headline",
    },
    {
      key: "tours_hero_title_bold",
      value: "The Wonder of Sri Lanka",
      description: "Tours page hero main bold title",
    },
    {
      key: "tours_hero_description",
      value: "Embark on an extraordinary journey through the island's timeless wonders. From pristine coasts to misty highlands, our custom-tailored itineraries offer seamless private travel, elite local guides, and authentic cultural immersions designed just for you.",
      description: "Tours page hero paragraph copy",
    },
    {
      key: "bento_intro_title",
      value: "Seamless Cultural Journeys Across Sri Lanka",
      description: "Bento section intro heading",
    },
    {
      key: "bento_intro_description",
      value: "Discover Sri Lanka with expertly curated journeys by Ceyora Tours. Enjoy seamless travel in private cars or group vans with multilingual guides. Immerse in culture, history, and nature as you explore iconic sites and hidden gems effortlessly.",
      description: "Bento section intro text body",
    },
  ];

  for (const detail of pageDetails) {
    await prisma.pageDetail.create({
      data: detail,
    });
  }

  console.log("Page details seeded successfully.");

  // 4. Create Advertisements
  const advertisements = [
    {
      title: "Exclusive 15% Off Hill Country Mist Rail Journeys",
      subtitle: "Book by the end of June for observation rail cabin discounts.",
      image: "/bento/ella-bridge.png",
      link: "/tours?category=Hill Country Tours",
      isActive: true,
    },
    {
      title: "Honeymoon Special: Complimentary Helicopter Tour",
      subtitle: "Book any canopy villa honeymoon retreat and get a free scenic flight.",
      image: "/bento/mirissa-beach.png",
      link: "/tours?category=Honeymoon Tours",
      isActive: true,
    },
  ];

  for (const ad of advertisements) {
    await prisma.advertisement.create({
      data: ad,
    });
  }

  console.log("Advertisements seeded successfully.");

  // 4.5 Seed Bento Packages
  const bentoPackagesData = [
    {
      title: "Signature",
      highlight: "Odyssey.",
      headerDesc: "Our flagship all-in-one handcrafted package, meticulously designed to bring you the perfect harmony of heritage, highlands, and wilderness in one luxurious journey.",
      tabName: "Grand Odyssey",
      sectionBg: "bg-[#9CBFA7]",
      
      card1Title: "The Grand Island Odyssey.",
      card1Desc: "Designed for travelers who refuse to compromise, our flagship Odyssey represents the absolute pinnacle of luxury, adventure, and deep cultural immersion. This carefully paced journey connects Sri Lanka's most iconic wonders into a singular, unforgettable narrative.",
      card1FooterTitle: "Signature Odyssey",
      card1FooterSub: "10-Day Ultra-Premium Tour",
      card1Bg: "bg-[#0E1B15]",
      card1Text: "text-white",
      
      card2Title: "Ancient Heritage.",
      card2Desc: "Scale the majestic Sigiriya Rock Fortress, wander the sacred ruins of Polonnaruwa, and step back in time.",
      card2Image: "/bento/sigiriya.png",
      card2Link: "/tours/1",
      card2Button: "Explore Heritage ↗",

      card3Bg: "bg-[#C5B4F3]",
      card3Text: "text-[#002244]",
      card3Title: "Premium Facilities",
      card3Footer: "*Customizable extensions & full board dining included",
      card3Inclusions: [
        { icon: "Hotel", title: "5-Star Luxury Stays", desc: "Boutique heritage villas & jungle eco-resorts" },
        { icon: "Car", title: "Private Chauffeur & Guide", desc: "Dedicated local storyteller & chauffeur-guide" },
        { icon: "Compass", title: "Bespoke 4x4 Wild Safaris", desc: "Private Yala National Park safari with expert naturalists" },
        { icon: "Ticket", title: "All VIP Pre-booked Passes", desc: "All-inclusive, skip-the-line monument entries" }
      ],

      card4Title: "Highland Soul.",
      card4Desc: "Ride through misty Ella highlands, rolling green tea gardens, and marvel at the iconic Nine Arch Bridge.",
      card4Image: "/bento/ella-bridge.png",
      card4Link: "/tours/2",
      card4Button: "Book Journey ↗",
      order: 0
    },
    {
      title: "Untamed",
      highlight: "Wilderness.",
      headerDesc: "A deep dive into Sri Lanka's spectacular biodiverse ecosystems. Spot leopards, giant elephant herds, and rare migratory birds with top-tier comfort.",
      tabName: "Wild Safari",
      sectionBg: "bg-[#A3937C]",

      card1Title: "Bespoke Wildlife Safari.",
      card1Desc: "Step into deep sanctuaries where nature reigns supreme. Designed for wildlife enthusiasts and adventure seekers, this journey brings you up close with elusive leopards, colossal elephant gatherings, and prime marine sanctuaries, all under expert guidance.",
      card1FooterTitle: "Wilderness Expedition",
      card1FooterSub: "7-Day Premium Safari",
      card1Bg: "bg-[#1E1915]",
      card1Text: "text-white",

      card2Title: "Leopard Kingdom.",
      card2Desc: "Track the world's highest density of leopards through the dry-zone forests of Yala National Park.",
      card2Image: "/bento/leopard.png",
      card2Link: "/tours/3",
      card2Button: "Explore Yala ↗",

      card3Bg: "bg-[#F3DEC5]",
      card3Text: "text-[#4A2E05]",
      card3Title: "Expedition Benefits",
      card3Footer: "*Custom 4x4 vehicles & local park trackers included",
      card3Inclusions: [
        { icon: "Hotel", title: "Jungle Luxury Eco-Lodges", desc: "Premium glamping & design-forward eco cabins" },
        { icon: "Compass", title: "Specialist Naturalists", desc: "Private guidance by certified local wildlife biologists" },
        { icon: "Car", title: "Unlimited Game Drives", desc: "Sunrise & sunset exclusive entry to reserve sectors" },
        { icon: "Ticket", title: "Conservation Contribution", desc: "Direct funding to local elephant & leopard research projects" }
      ],

      card4Title: "Majestic Herds.",
      card4Desc: "Witness the magnificent gathering of hundreds of Asian elephants at the scenic Minneriya tank reservoirs.",
      card4Image: "/tours/yala.jpg",
      card4Link: "/tours/3",
      card4Button: "View Safari ↗",
      order: 1
    },
    {
      title: "Oceanic",
      highlight: "Sanctuaries.",
      headerDesc: "Unwind along Sri Lanka's sun-drenched southern coastlines. Enjoy elite beach club dining, private yacht cruises, and pristine surfing reefs.",
      tabName: "Beach Escape",
      sectionBg: "bg-[#7CA3A8]",

      card1Title: "Premium Coasts & Cruises.",
      card1Desc: "Breathe in the golden horizons of Mirissa and the historical elegance of Galle Fort. Enjoy beachfront villa privacy, guided reef snorkeling, and custom yacht charters to spot blue whales, combined with private wellness retreats.",
      card1FooterTitle: "Coastal Escape",
      card1FooterSub: "8-Day Luxury Retreat",
      card1Bg: "bg-[#091C2C]",
      card1Text: "text-white",

      card2Title: "Golden Mirissa.",
      card2Desc: "Unwind on soft sandy beaches, sip local king coconut, and swim with sea turtles in crystal-clear waters.",
      card2Image: "/bento/mirissa-beach.png",
      card2Link: "/tours?category=Wellness",
      card2Button: "Explore Beaches ↗",

      card3Bg: "bg-[#C4E1F3]",
      card3Text: "text-[#002B49]",
      card3Title: "Beach Amenities",
      card3Footer: "*Private surf coaching & custom spa treatments included",
      card3Inclusions: [
        { icon: "Hotel", title: "Oceanfront Boutique Stays", desc: "Private pool villas overlooking Mirissa bay" },
        { icon: "Ticket", title: "Private Yacht Charter", desc: "Exclusive sunrise cruise for whale & dolphin watching" },
        { icon: "Compass", title: "Marine Biologist Escort", desc: "Guided ocean excursions with deep marine insights" },
        { icon: "Car", title: "Galle Fort Tour", desc: "Curated architectural walks through the UNESCO Dutch fortress" }
      ],

      card4Title: "Highland & Shore Flow.",
      card4Desc: "Traverse the scenic rails of Ella before winding down in beautiful coastal beach clubs.",
      card4Image: "/bento/ella-bridge.png",
      card4Link: "/tours?category=Wellness",
      card4Button: "View Retreat ↗",
      order: 2
    },
    {
      title: "Cultural",
      highlight: "Resplendence.",
      headerDesc: "Journey through the ancient kingdoms of the cultural triangle. Walk among sacred stupas, royal palaces, and temple ruins.",
      tabName: "Royal Heritage",
      sectionBg: "bg-[#A57C8A]",

      card1Title: "Ancient Kingdoms Tour.",
      card1Desc: "Explore the profound spiritual and historical foundations of Sri Lanka. From the last royal bastion in misty Kandy to the monumental dagobas of Anuradhapura, this tour is tailored for history enthusiasts and heritage seekers.",
      card1FooterTitle: "Royal Chronicles",
      card1FooterSub: "6-Day Cultural Tour",
      card1Bg: "bg-[#2A0B1A]",
      card1Text: "text-white",

      card2Title: "Sacred Kandy.",
      card2Desc: "Visit the revered Temple of the Tooth Relic, stroll the royal botanical gardens, and see the lake sunset.",
      card2Image: "/tours/kandy.jpg",
      card2Link: "/tours/2",
      card2Button: "Explore Kandy ↗",

      card3Bg: "bg-[#F3C5DC]",
      card3Text: "text-[#4A0025]",
      card3Title: "Heritage Services",
      card3Footer: "*All temple offerings & traditional VIP access passes included",
      card3Inclusions: [
        { icon: "Hotel", title: "Heritage Palace Stays", desc: "Converted historic bungalows & royal retreats" },
        { icon: "Compass", title: "Private Archaeologist", desc: "Detailed historical walks led by academic guides" },
        { icon: "Ticket", title: "VIP Cultural Seats", desc: "Front-row reservations for traditional Kandyan dance rituals" },
        { icon: "Car", title: "Misty Mountain Drive", desc: "Comfortable scenic drive through the tea-lined Kadugannawa pass" }
      ],

      card4Title: "Sigiriya Golden Hours.",
      card4Desc: "Witness the majestic rock fortress lit up by the warm glow of the afternoon sun.",
      card4Image: "/bento/sigiriya.png",
      card4Link: "/tours/1",
      card4Button: "View Cultural ↗",
      order: 3
    }
  ];

  for (const pkg of bentoPackagesData) {
    await prisma.bentoPackage.create({
      data: pkg as any,
    });
  }

  console.log("Bento packages seeded successfully.");


  // 5. Seed Tour Packages
  const toursData = [
    {
      title: "Chalo Colombo & Haalo Sri Lanka City Wonders",
      description: "Explore the bustling commercial capital of Sri Lanka. Visit the colonial Dutch Hospital, marvel at the sacred Gangarama Temple on Beira Lake, shop at local bazaars, and walk the iconic Galle Face Green at sunset.",
      image: "/tours/kandy.jpg",
      price: 45.0,
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
          lat: 6.9271,
          lng: 79.8612
        }
      ]
    },
    {
      title: "Mirissa Golden Coast & Beach Getaway",
      description: "Breathe in the ultimate southern coast sunshine. Stroll pristine sandy shores, learn surfing from certified instructors, and unwind in private beachfront luxury retreats with whale-watching morning charters.",
      image: "/bento/mirissa-beach.png",
      price: 95.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Bentota",
          title: "Madu River Safari & Galle Fort",
          description: "Take a scenic boat safari on Madu River, then explore the historic Galle Dutch Fort.",
          lat: 6.4200,
          lng: 79.9997
        },
        {
          day: 3,
          location: "Galle",
          title: "Mirissa Deep Sea Whale Watching",
          description: "Witness blue whales on a morning charter and take sunset photos at Coconut Tree Hill.",
          lat: 6.0367,
          lng: 80.2170
        }
      ]
    },
    {
      title: "Ancient Ruins & Sacred Cultural Triangle",
      description: "Scale the legendary Sigiriya Rock Fortress, explore the sacred ruins of Anuradhapura, wander ancient royal gardens, and see the massive historic stupas that defined the island's golden age.",
      image: "/bento/sigiriya.png",
      price: 180.0,
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
          title: "Dambulla Cave Temples",
          description: "Journey inland and climb the stunning cave temple complex of Dambulla.",
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Dambulla",
          title: "Sigiriya Lion Rock Fortress",
          description: "Ascend the legendary Sigiriya Rock Fortress at sunrise before the heat peaks.",
          lat: 7.8742,
          lng: 80.6511
        },
        {
          day: 3,
          location: "Sigiriya",
          title: "Sacred City of Anuradhapura",
          description: "Tour the colossal stupas and ancient bodhi trees in the first kingdom of Sri Lanka.",
          lat: 7.9570,
          lng: 80.7603
        },
        {
          day: 4,
          location: "Anuradhapura",
          title: "Royal Kandy & Tooth Temple",
          description: "Travel to Kandy and experience the sacred Tooth Relic evening guardian ceremony.",
          lat: 8.3114,
          lng: 80.4037
        }
      ]
    },
    {
      title: "Kitulgala White Water & Peak Wilderness Adventure",
      description: "Embark on an adrenaline-packed expedition. Go white-water rafting on Kelani River, hike through rain forests, canyon down majestic rock waterfalls, and climb Adams Peak wilderness under the starlight.",
      image: "/bento/ella-bridge.png",
      price: 110.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Kandy",
          title: "Peak Wilderness Pilgrimage Trail",
          description: "Embark on a midnight trek up Adams Peak to watch the sunrise break through clouds.",
          lat: 7.2906,
          lng: 80.6337
        }
      ]
    },
    {
      title: "Yala National Park Elite Leopard Expedition",
      description: "Witness the majestic wildlife of Sri Lanka in deep comfort. Join private 4x4 safaris with naturalists to track leopards, giant elephant herds, sloth bears, and beautiful marine wetlands in Yala.",
      image: "/bento/leopard.png",
      price: 160.0,
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
          lat: 6.3725,
          lng: 81.5160
        }
      ]
    },
    {
      title: "Traditional Hela Ayurvedic Wellness & Spa Retreat",
      description: "Restore your mind, body, and spirit. Stay in an award-winning eco-luxury wellness villa and experience custom herbal steam baths, personalized oil therapies, guided yoga, and detoxifying nutrition paths.",
      image: "/tours/kandy.jpg",
      price: 250.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Bentota",
          title: "Hela Herbal Baths & Massage",
          description: "Receive deep hot oil massages, herbal steam baths, and dynamic acupuncture.",
          lat: 6.4200,
          lng: 79.9997
        },
        {
          day: 3,
          location: "Bentota",
          title: "Sinharaja Rainforest Forest Bathing",
          description: "Trek quietly through the pristine UNESCO reserve to connect with natural energy.",
          lat: 6.4200,
          lng: 79.9997
        },
        {
          day: 4,
          location: "Sinharaja",
          title: "Rampart Yoga in Ancient Galle Fort",
          description: "Practice peaceful yoga overlooking the Indian Ocean from the Galle ramparts.",
          lat: 6.3986,
          lng: 80.4619
        },
        {
          day: 5,
          location: "Galle",
          title: "Ayurvedic Farewell Consultation",
          description: "Conclude with diet planning recommendations and enjoy a smooth transfer back.",
          lat: 6.0367,
          lng: 80.2170
        }
      ]
    },
    {
      title: "Misty Ella & Nuwara Eliya Hill Country Escape",
      description: "Ride the iconic blue train through rolling valleys, admire the stone columns of Nine Arch Bridge, hike mist-shrouded tea plantations, and stay in gorgeous mountain bungalows overlooking valleys.",
      image: "/bento/ella-bridge.png",
      price: 140.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Nuwara Eliya",
          title: "Ella Nine Arch & Mini Adams Peak",
          description: "Walk the Nine Arch Bridge, hike Little Adams Peak, and admire the sweeping views.",
          lat: 6.9497,
          lng: 80.7891
        },
        {
          day: 3,
          location: "Ella",
          title: "Kandy Tea Gardens & Waterfalls",
          description: "Tour historic tea production rooms, watch tea pluckers, and return through Kandy.",
          lat: 6.8724,
          lng: 81.0476
        }
      ]
    },
    {
      title: "Romantic Escape & Private Canopy Pool Villas",
      description: "Create unforgettable memories on your premium honeymoon. Unwind in exclusive private canopy villas in Ella, enjoy candlelit dinners on Mirissa's shore, and take private helicopter transfers across islands.",
      image: "/bento/mirissa-beach.png",
      price: 320.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Kandy",
          title: "British High Tea in Misty Hills",
          description: "Sip tea overlooking green valleys at the Grand Hotel gardens in Nuwara Eliya.",
          lat: 7.2906,
          lng: 80.6337
        },
        {
          day: 3,
          location: "Nuwara Eliya",
          title: "Ella Valley Canopy Villa Retreat",
          description: "Relax in your private pool villa hanging over the mist-clad mountain ravines.",
          lat: 6.9497,
          lng: 80.7891
        },
        {
          day: 4,
          location: "Ella",
          title: "Luxury Glamping Safari in Yala",
          description: "Stay in an ultra-luxury glamping tent and trace leopards at sunset in Yala.",
          lat: 6.8724,
          lng: 81.0476
        },
        {
          day: 5,
          location: "Yala",
          title: "Couples Massage in Ancient Galle",
          description: "Unwind with deep-tissue therapies inside a 400-year-old Dutch villa spa.",
          lat: 6.3725,
          lng: 81.5160
        },
        {
          day: 6,
          location: "Galle",
          title: "Scenic Helicopter Flyback",
          description: "Take a memorable private helicopter flight back over beaches to Colombo airport.",
          lat: 6.0367,
          lng: 80.2170
        }
      ]
    },
    {
      title: "Ultimate Family Multi-Generational Explorer",
      description: "A meticulously balanced holiday designed for families. Includes interactive cultural scavenger hunts, kid-friendly wildlife safaris, baby turtle releases on coastlines, and stays in luxury resorts with extensive amenities.",
      image: "/bento/mirissa-beach.png",
      price: 220.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Negombo",
          title: "Sigiriya Treasure Quest hike",
          description: "Participate in a fun, interactive historic treasure hunt climbing Lion Rock.",
          lat: 7.2089,
          lng: 79.8426
        },
        {
          day: 3,
          location: "Sigiriya",
          title: "Minneriya Wild Elephant Gathering",
          description: "Board custom safari jeeps to witness hundreds of elephants gather by the lake.",
          lat: 7.9570,
          lng: 80.7603
        },
        {
          day: 4,
          location: "Minneriya",
          title: "Kandy Cultural Fire Dance show",
          description: "Watch spectacular drumming, acrobatic spinning, and traditional fire-walking.",
          lat: 8.0261,
          lng: 80.8252
        },
        {
          day: 5,
          location: "Kandy",
          title: "Nuwara Eliya Tea Pluck Challenge",
          description: "Participate in a friendly tea-plucking contest with estate workers in Nuwara Eliya.",
          lat: 7.2906,
          lng: 80.6337
        },
        {
          day: 6,
          location: "Nuwara Eliya",
          title: "Kosgoda Sea Turtle Hatchery",
          description: "Adopt and release newborn baby sea turtles into the warm Indian Ocean waves.",
          lat: 6.9497,
          lng: 80.7891
        },
        {
          day: 7,
          location: "Bentota",
          title: "Sandy Beach Games & Departure",
          description: "Enjoy beach volleyball and jet-skiing before your private transfer to the airport.",
          lat: 6.4200,
          lng: 79.9997
        }
      ]
    },
    {
      title: "Signature Fairways: Victoria Golf & Country Resort",
      description: "Tee off in absolute paradise. Play on the award-winning 18-hole championship golf course nestled along the scenic Victoria reservoir and surrounded by Kandy's gorgeous tropical mountain forest.",
      image: "/bento/leopard.png",
      price: 195.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Kandy",
          title: "Championship Round & Return",
          description: "Play your second round, enjoy lakeside lunch, and head back in luxury to Colombo.",
          lat: 7.2906,
          lng: 80.6337
        }
      ]
    },
    {
      title: "Legendary Ramayana Trail Pilgrimage Tour",
      description: "Journey through sacred epic history. Visit the legendary Seetha Amman temple in Ashoka Vatika, explore Ravana caves and Ella waterfalls, and climb ancient mountain ruins mentioned in sacred texts.",
      image: "/bento/sigiriya.png",
      price: 150.0,
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
          lat: 6.9271,
          lng: 79.8612
        },
        {
          day: 2,
          location: "Sigiriya",
          title: "Ashoka Vatika & Seetha Amman temple",
          description: "Wander the legendary gardens where Princess Seetha was held captive in Nuwara Eliya.",
          lat: 7.9570,
          lng: 80.7603
        },
        {
          day: 3,
          location: "Kandy",
          title: "Ravana Ella Caves & Waterfalls",
          description: "Hike up the rock cliffs to explore the hidden cave vaults and legendary waterfall drops.",
          lat: 7.2906,
          lng: 80.6337
        },
        {
          day: 4,
          location: "Nuwara Eliya",
          title: "Sanjeevani Hills Rumassala trek",
          description: "Trek the Rumassala hill in Galle, believed to be a dropped piece of the Himalayas.",
          lat: 6.9497,
          lng: 80.7891
        }
      ]
    }
  ];

  for (const tour of toursData) {
    const { roadmap, ...tourDetails } = tour;
    const createdTour = await prisma.tour.create({
      data: {
        ...tourDetails,
        roadmap: {
          create: roadmap,
        },
      },
    });
    console.log(`Created Tour: ${createdTour.title}`);
  }

  // 6. Seed Destinations
  const destinationsData = [
    {
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

  for (const dest of destinationsData) {
    const createdDest = await prisma.destination.create({
      data: dest,
    });
    console.log(`Created Destination: ${createdDest.name}`);
  }

  // 7. Seed FAQs
  const faqsData = [
    {
      question: "Best time to visit Sri Lanka?",
      answer: "The best time to visit Sri Lanka depends on the coast you want to explore. For the south and west coasts (including Galle, Mirissa, and Colombo), the dry season runs from December to April. For the east coast and ancient cultural triangle (including Trincomalee, Pasikudah, and Sigiriya), the dry season is from May to September.",
      order: 0
    },
    {
      question: "Is it Safe to Travel to Sri Lanka?",
      answer: "Yes, Sri Lanka is generally exceptionally safe for international travelers. Sri Lankans are world-renowned for their hospitality, warmth, and friendliness. Standard travel precautions apply: secure your belongings, use certified tour operators, and respect local cultural customs, especially when visiting sacred Buddhist and Hindu temples.",
      order: 1
    },
    {
      question: "Do I need a visa to Sri Lanka?",
      answer: "Most foreign nationals require an Electronic Travel Authorization (ETA) or online tourist visa to enter Sri Lanka. You can easily apply for this online before your flight. It typically grants a 30-day stay with double-entry privileges, which can be extended at the Department of Immigration in Colombo if needed.",
      order: 2
    },
    {
      question: "What to pack when you are visiting Sri Lanka?",
      answer: "We recommend lightweight, breathable cotton or linen clothing suitable for tropical weather. Modest clothing covering shoulders and knees is mandatory for sacred temple visits. If you plan to travel to the highlands (like Nuwara Eliya or Ella), bring a light jacket or sweater as temperatures drop. Sun protection and bug spray are also essential.",
      order: 3
    },
    {
      question: "What currency is used in Sri Lanka, and are credit cards widely accepted?",
      answer: "The official currency is the Sri Lankan Rupee (LKR). Major credit and debit cards (Visa/Mastercard) are widely accepted in high-end hotels, boutiques, and restaurants in urban areas. However, carrying cash is highly recommended for small markets, local street food vendors, transport, and tipping.",
      order: 4
    },
    {
      question: "Why should I use a travel agency to plan my trip to Sri Lanka?",
      answer: "Using a dedicated, licensed agency ensures a completely seamless, premium experience. We manage private, highly comfortable air-conditioned transport, handpicked 5-star or boutique hotel bookings, pre-purchased skip-the-line monument entries, and private expert naturalists, saving you extensive planning time.",
      order: 5
    }
  ];

  for (const faq of faqsData) {
    await prisma.fAQ.create({
      data: faq,
    });
  }
  console.log("FAQs seeded successfully.");

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
