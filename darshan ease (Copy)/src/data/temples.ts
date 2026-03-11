export interface HistorySection {
  title: string;
  paragraphs: string[];
  images: string[];
}

export interface Temple {
  id: string;
  name: string;
  deity: string;
  location: string;
  city: string;
  state: string;
  image: string;
  description: string;
  highlight: string;
  established: string;
  architecture: string;
  timings: string;
  entryFee: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  phone: string;
  email: string;
  history?: HistorySection;
  legend?: {
    title: string;
    story: string;
  };
  architecturalHighlights?: string[];
  religiousSignificance?: string[];
}

export const temples: Temple[] = [
  {
    id: "tirupati",
    name: "Sri Venkateswara Temple",
    deity: "Lord Venkateswara (Vishnu)",
    location: "Tirumala, Tirupati",
    city: "Tirupati",
    state: "Andhra Pradesh",
    image: "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJ1cGF0aSUyMHRlbXBsZXxlbnwxfHx8fDE3NTk3NDQyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "One of the richest and most visited religious sites in the world. The temple is dedicated to Lord Venkateswara and is located on the seven hills of Tirumala.",
    highlight: "World's richest temple with over 50,000 daily visitors",
    established: "9th Century CE",
    architecture: "Dravidian Style",
    timings: "2:30 AM - 1:00 AM (Next day)",
    entryFee: "Free (Special Darshan tickets available)",
    coordinates: { lat: 13.6833, lng: 79.3472 },
    address: "Tirumala, Tirupati, Andhra Pradesh - 517504",
    phone: "+91 877 2277777",
    email: "info@tirumala.org",
    history: {
      title: "A Sacred Journey Through Time",
      paragraphs: [
        "The Sri Venkateswara Temple, perched atop the Tirumala Hills, has been a beacon of faith for over a millennium. Historical evidence suggests that the temple's origins date back to the 9th century CE, though local traditions claim its sanctity extends to the Dvapara Yuga mentioned in ancient texts.",
        "The temple underwent massive renovations and expansions during the reign of the Vijayanagara Empire (14th-16th centuries), when it received generous patronage from emperors like Krishnadevaraya. The Vijayanagara rulers adorned the temple with golden ornaments and established several rituals that continue to this day.",
        "During the medieval period, various dynasties including the Pallavas, Cholas, and Pandyas contributed to the temple's development. The gopuram was gilded with gold during the reign of the Raya dynasty, giving it the magnificent appearance that draws millions of devotees annually."
      ],
      images: [
        "https://images.unsplash.com/photo-1681054559674-7e80aad3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaW5kaWFuJTIwdGVtcGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MDI4OTY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1759851343085-2c52e1d4118d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBnb3B1cmFtJTIwdG93ZXJ8ZW58MXx8fHwxNzYwMjg5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    legend: {
      title: "The Divine Manifestation of Lord Venkateswara",
      story: "According to sacred texts, Lord Vishnu appeared on earth as Venkateswara to save humanity from the trials of Kali Yuga. The legend narrates that Goddess Lakshmi left Vaikuntha following a disagreement and came to earth as Padmavati. Lord Vishnu, in his search for her, took the form of Srinivasa and settled on the Venkata Hill. Saint Ananthaalwar is said to have discovered the deity and established worship. The divine marriage of Lord Venkateswara and Padmavati at Tirumala is celebrated with great devotion, and it is believed that the Lord borrowed money from Kubera for this wedding, which devotees pay back through their offerings even today."
    },
    architecturalHighlights: [
      "The main temple complex features intricate Dravidian architecture with towering gopurams",
      "The Vimana above the sanctum sanctorum is covered in gold, known as 'Ananda Nilayam'",
      "The temple houses exquisite sculptures and carvings depicting various episodes from Hindu mythology",
      "The famous 'Bangaru Vakili' (golden door) leading to the sanctum is a marvel of craftsmanship",
      "The temple complex includes several mandapams with ornate pillars featuring detailed stone work"
    ],
    religiousSignificance: [
      "Considered one of the most sacred Vishnu temples and a major pilgrimage destination",
      "Believed to be the earthly abode of Lord Vishnu in Kali Yuga",
      "The deity is self-manifested (Swayambhu) and holds immense spiritual power",
      "Pilgrims believe that a single visit to Tirupati cleanses them of sins and brings salvation",
      "The temple is famous for the tradition of tonsuring hair as an offering to the deity"
    ]
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    deity: "Goddess Meenakshi (Parvati)",
    location: "Madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1692173248120-59547c3d4653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWVuYWtzaGklMjB0ZW1wbGUlMjBtYWR1cmFpfGVufDF8fHx8MTc1OTY1NjE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Historic Hindu temple dedicated to Goddess Meenakshi and her consort Sundareshwar (Shiva). Known for its stunning architecture with 14 gopurams.",
    highlight: "Famous for 14 magnificent gopurams with intricate sculptures",
    established: "6th Century CE (rebuilt in 17th century)",
    architecture: "Dravidian Style",
    timings: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
    entryFee: "Free",
    coordinates: { lat: 9.9195, lng: 78.1193 },
    address: "Madurai Main, Madurai, Tamil Nadu - 625001",
    phone: "+91 452 2345777",
    email: "meenakshi@temple.org",
    history: {
      title: "The Eternal City's Crown Jewel",
      paragraphs: [
        "The Meenakshi Amman Temple stands as a testament to the grandeur of Tamil architecture and culture. While the original temple dates back to the 6th century CE, the current structure was rebuilt by Nayak ruler Vishwanatha Nayak in the 17th century after the original was destroyed by Muslim invaders.",
        "The temple is the heart and soul of Madurai, a city that has been continuously inhabited for over 2,500 years. Ancient Tamil literature, including the Sangam texts, makes references to this sacred shrine. The temple was a center of learning and trade during the Pandya dynasty, attracting scholars and merchants from across the world.",
        "The architectural magnificence we see today is primarily the work of Tirumalai Nayak (1623-1659), who undertook massive renovations. The 14 gopurams, adorned with thousands of colorful stucco figures of gods, goddesses, demons, and heroes, were systematically constructed during this period, making the temple one of the finest examples of Dravidian architecture."
      ],
      images: [
        "https://images.unsplash.com/photo-1759990251993-3e350f67cd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBzY3VscHR1cmVzJTIwY2FydmluZ3N8ZW58MXx8fHwxNzYwMjg5Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1758632190169-f91f3f980e63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBwaWxsYXJzJTIwY29ycmlkb3J8ZW58MXx8fHwxNzYwMjg5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    legend: {
      title: "The Fish-Eyed Goddess and Her Divine Union",
      story: "According to legend, Princess Meenakshi was born to King Malayadwaja Pandya and Queen Kanchanamala as a result of their Putrakameshti Yagna (fire sacrifice for progeny). Born with three breasts, the divine child was prophesied that her extra breast would disappear when she met her future husband. Growing into a brave warrior queen, Meenakshi conquered all the kingdoms and even challenged the gods. When she confronted Lord Shiva at Mount Kailash, her third breast vanished, and she recognized her soulmate. Lord Shiva descended to Madurai as Sundareshwarar (the beautiful god) to marry her. Their celestial wedding, celebrated as the 'Thirukalyanam' festival, is reenacted annually with great splendor, symbolizing the divine union of Shakti and Shiva."
    },
    architecturalHighlights: [
      "14 magnificent gopurams (temple towers) with the tallest reaching 170 feet",
      "The Hall of Thousand Pillars (Ayiram Kaal Mandapam) features 985 intricately carved pillars",
      "Over 33,000 sculptures adorning the temple complex, depicting gods, goddesses, animals, and mythical creatures",
      "The Golden Lotus Tank (Porthamarai Kulam) where the deity is believed to have appeared",
      "Musical pillars in Nayaka Mandapam that produce different musical notes when struck",
      "Vibrant gopurams painted in brilliant colors that are repainted every 12 years"
    ],
    religiousSignificance: [
      "One of the most important Shakti Peethas where the goddess is worshipped as the supreme deity",
      "Unique temple where the goddess takes precedence over the male deity (Shiva)",
      "Center of Tamil culture and Shaivite philosophy for centuries",
      "The temple follows ancient Agama texts for daily rituals and festivals",
      "Considered the cultural and spiritual heart of Tamil Nadu"
    ]
  },
  {
    id: "rameshwaram",
    name: "Ramanathaswamy Temple",
    deity: "Lord Shiva",
    location: "Rameswaram",
    city: "Rameswaram",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1632962237468-0705d7e7b534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGdvcHVyYW18ZW58MXx8fHwxNzU5NzQ0MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "One of the twelve Jyotirlinga temples. Famous for its magnificent corridors and 22 theerthams (holy water bodies).",
    highlight: "Features world's longest temple corridor at 1220 meters",
    established: "12th Century CE",
    architecture: "Dravidian Style",
    timings: "5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 9.2876, lng: 79.3129 },
    address: "Rameswaram, Tamil Nadu - 623526",
    phone: "+91 4567 221223",
    email: "rameshwaram@temple.org"
  },
  {
    id: "guruvayur",
    name: "Guruvayur Temple",
    deity: "Lord Krishna",
    location: "Guruvayur",
    city: "Guruvayur",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1685677260082-dbec4b1303ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5NzQ0MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "One of the most important Krishna temples in South India. Known as 'Bhuloka Vaikunta' (The Holy Abode of Vishnu on Earth).",
    highlight: "Called 'Bhuloka Vaikunta' - Heaven on Earth",
    established: "16th Century CE",
    architecture: "Kerala Style",
    timings: "3:00 AM - 1:00 PM, 4:30 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 10.5936, lng: 76.0386 },
    address: "Guruvayur, Thrissur, Kerala - 680101",
    phone: "+91 487 2556301",
    email: "guruvayur@devaswom.org",
    history: {
      title: "The Sacred Abode of Guruvayurappan",
      paragraphs: [
        "Guruvayur Temple, revered as 'Bhuloka Vaikunta' (Heaven on Earth), is one of the most sacred Krishna temples in India. While the temple's documented history begins in the 16th century, legends place its origins in the ancient past, with references found in Tamil literature dating back 2000 years.",
        "The temple was renovated and given its present form by the Zamorin of Calicut in the late medieval period. The temple gained significant prominence during the Bhakti movement, with many saint-poets like Narayana Bhattathiri composing devotional hymns in praise of Guruvayurappan. Bhattathiri's 'Narayaneeyam', composed in 1586, remains one of the most revered texts in Vaishnavite tradition.",
        "Throughout history, the temple has been patronized by various rulers including the Zamorins of Calicut and the rulers of Cochin. The temple has survived several invasions and natural calamities, including the devastating fire of 1970 that destroyed parts of the temple, after which it was meticulously restored to its former glory."
      ],
      images: [
        "https://images.unsplash.com/photo-1681054559674-7e80aad3d2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaW5kaWFuJTIwdGVtcGxlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MDI4OTY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1758632190169-f91f3f980e63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBwaWxsYXJzJTIwY29ycmlkb3J8ZW58MXx8fHwxNzYwMjg5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    legend: {
      title: "The Installation by Guru and Vayu",
      story: "According to legend, Lord Krishna's idol at Guruvayur is the same one worshipped by Lord Brahma at the beginning of creation. When the great deluge was about to submerge Dwarka at the end of Dwapara Yuga, Lord Krishna instructed his devotee Uddhava to give the deity to Brihaspati (Guru, the preceptor of gods) and Vayu (the wind god). These two celestial beings carried the idol and searched for an appropriate place to install it. They found the perfect location near a lake with lotuses, where Lord Shiva was already present with his consort Parvati. With Shiva's permission, Guru and Vayu (thus 'Guru-Vayu-pura') installed the deity. The idol depicts Krishna in his four-armed Vishnu form, standing with the conch, discus, mace, and lotus."
    },
    architecturalHighlights: [
      "Traditional Kerala-style architecture with a copper-plated two-tier roof",
      "The sanctum houses a four-armed standing Krishna idol made of a rare stone called 'Patala Anjana'",
      "The idol stands 4 feet tall and is adorned with a special tulasi garland",
      "Features a massive golden flagstaff (Dwajasthambham) standing 70 feet tall",
      "The temple has a sacred pond called Rudra Theertham",
      "The Nalambalam (four structures around the sanctum) follows traditional Kerala temple architecture",
      "Two elephants are always present in the temple, a unique Kerala tradition"
    ],
    religiousSignificance: [
      "Considered one of the 108 Divya Desams sacred to Vaishnavites",
      "Only Hindus are permitted entry, following strict ancient traditions",
      "The temple is famous for conducting over 15,000 weddings annually",
      "Offers several unique sevas including the famous 'Udayasthamana Pooja' lasting 3.5 hours",
      "The temple elephant, traditionally named 'Guruvayur Kesavan,' holds special reverence",
      "Believed that prayers at Guruvayur can cure ailments and fulfill wishes"
    ]
  },
  {
    id: "sabarimala",
    name: "Sabarimala Temple",
    deity: "Lord Ayyappa",
    location: "Sabarimala",
    city: "Pathanamthitta",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1665003757407-db665cffa69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTk3NDQyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Famous pilgrimage center dedicated to Lord Ayyappa. Located in the Western Ghat mountain ranges, it's one of the largest annual pilgrimages in the world.",
    highlight: "One of the world's largest annual pilgrimages with 40+ million visitors",
    established: "12th Century CE",
    architecture: "Kerala Style",
    timings: "Seasonal (Nov-Jan: 24 hours, Other months: Limited)",
    entryFee: "Free (Virtual Queue Booking Required)",
    coordinates: { lat: 9.4345, lng: 77.0847 },
    address: "Sabarimala, Pathanamthitta, Kerala - 689711",
    phone: "+91 468 2202162",
    email: "sabarimala@devaswom.org",
    history: {
      title: "The Sacred Pilgrimage of Penance and Unity",
      paragraphs: [
        "Sabarimala Temple, nestled in the Periyar Tiger Reserve in the Western Ghats, represents one of the world's most remarkable annual pilgrimages. The temple's history traces back to the 12th century when it was renovated by King Rajasekhara, though legends place its origins much earlier in the Treta Yuga.",
        "The temple gained prominence during the medieval period when the Pandalam royal family became closely associated with the deity. According to tradition, Lord Ayyappa was a prince of Pandalam who chose to become a yogi and established himself at Sabarimala. The pilgrimage tradition was systematized in its current form in the 19th and 20th centuries.",
        "The pilgrimage to Sabarimala is unique for its intense austerity and the unity it promotes. Pilgrims, called 'Ayyappans,' observe a strict 41-day vratham (penance) before undertaking the journey. Regardless of caste, creed, or economic status, all pilgrims are equal, addressing each other as 'Swami' (lord), embodying the temple's philosophy of universal brotherhood."
      ],
      images: [
        "https://images.unsplash.com/photo-1759990251993-3e350f67cd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBzY3VscHR1cmVzJTIwY2FydmluZ3N8ZW58MXx8fHwxNzYwMjg5Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1759547020765-6287c81724d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjByaXR1YWwlMjB3b3JzaGlwfGVufDF8fHx8MTc2MDI4OTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    legend: {
      title: "The Celibate Warrior God",
      story: "Lord Ayyappa, believed to be the son of Shiva and Mohini (Vishnu's female form), was found as an infant by King Rajasekhara of Pandalam. Raised as the prince, Ayyappa performed many heroic deeds, including defeating the demoness Mahishi. After fulfilling his earthly mission, he revealed his divine nature and established himself at Sabarimala as an eternal yogi in deep meditation. Before departing, he blessed his devotees, saying he would accept offerings from those who observe strict celibacy and penance. The famous 'Pathinettam Padi' (18 sacred steps) leading to the sanctum represent the 18 hills surrounding Sabarimala and symbolize the barriers of worldly attachments that devotees must overcome. Only those who observe the vratham and carry the sacred irumudi (two-compartment offering bag) are permitted to climb these steps."
    },
    architecturalHighlights: [
      "The 18 sacred steps (Pathinettam Padi) can only be climbed by those observing vratham",
      "The main shrine houses Lord Ayyappa in a yogic posture wearing a bell around his neck",
      "The temple is surrounded by dense forests in the Western Ghats at an altitude of 914 meters",
      "The Malikappuram shrine dedicated to Goddess Durga stands nearby",
      "Simple Kerala-style architecture reflecting the austere nature of the deity",
      "The path to the temple includes the sacred Pamba River where pilgrims take ritual baths"
    ],
    religiousSignificance: [
      "Hosts one of the world's largest annual pilgrimages with over 40 million devotees",
      "Represents Hindu philosophy of equality and universal brotherhood",
      "The 41-day vratham includes strict vegetarianism, celibacy, and spiritual discipline",
      "Pilgrims must be barefoot and can only wear black or blue clothes",
      "The Makara Jyothi (divine light) appearing on Makar Sankranti is considered highly auspicious",
      "Unique tradition where all pilgrims are equal regardless of social status"
    ]
  },
  {
    id: "padmanabhaswamy",
    name: "Padmanabhaswamy Temple",
    deity: "Lord Vishnu",
    location: "Thiruvananthapuram",
    city: "Thiruvananthapuram",
    state: "Kerala",
    image: "https://images.unsplash.com/photo-1685677260082-dbec4b1303ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5NzQ0MjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "One of the 108 Divya Desams and the richest temple in the world. Features a unique reclining posture of Lord Vishnu.",
    highlight: "Contains treasure vaults worth over $20 billion",
    established: "8th Century CE",
    architecture: "Kerala and Dravidian fusion",
    timings: "3:30 AM - 12:00 PM, 5:00 PM - 8:15 PM",
    entryFee: "Free (Dress code strictly enforced)",
    coordinates: { lat: 8.4829, lng: 76.9497 },
    address: "East Fort, Thiruvananthapuram, Kerala - 695023",
    phone: "+91 471 2450233",
    email: "padmanabha@temple.org",
    history: {
      title: "The Treasure Temple of Travancore",
      paragraphs: [
        "The Sree Padmanabhaswamy Temple has been the spiritual heart of Thiruvananthapuram for over a millennium. The temple's history is deeply intertwined with the royal family of Travancore, who have been the traditional custodians and devotees of Lord Padmanabha. The current structure dates back to the 18th century, rebuilt by King Marthanda Varma in 1733.",
        "King Marthanda Varma, considered the founder of modern Travancore, dedicated his entire kingdom to Lord Padmanabhaswamy and declared himself as the 'Padmanabha Dasa' (servant of Lord Padmanabha). This unique tradition continues to this day, with the royal family maintaining their role as trustees of the temple. The king's dedication transformed both the kingdom and the temple into models of devotion and prosperity.",
        "In 2011, the temple gained international attention when its underground vaults were opened, revealing treasures worth billions of dollars - gold ornaments, precious stones, and artifacts accumulated over centuries of royal offerings. This made it potentially the richest temple in the world. However, one vault, Vault B, remains sealed as per traditional beliefs and legends."
      ],
      images: [
        "https://images.unsplash.com/photo-1759851343085-2c52e1d4118d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBnb3B1cmFtJTIwdG93ZXJ8ZW58MXx8fHwxNzYwMjg5Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1616308913689-cb92c5bea67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBkZWl0eSUyMHNocmluZXxlbnwxfHx8fDE3NjAyODk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    legend: {
      title: "The Eternal Recline of Anantha Shayana",
      story: "The temple's origin is shrouded in divine mystery. Legend has it that the deity was originally worshipped at Ananthapura Lake Temple by a Brahmin sage. When the deity disappeared from there, it manifested at Thiruvananthapuram. The idol depicts Lord Vishnu in the 'Anantha Shayana' posture - reclining on the serpent Anantha (Adi Sesha) - a unique 18-foot long representation visible through three doors. According to another legend, only those who chant the sacred 'Padmanabha Mantra' with complete devotion can view the complete form of the deity. The temple is said to be guarded by divine serpents, and Vault B is believed to be protected by mystical forces. Opening it without proper Vedic rituals is considered inauspicious and potentially catastrophic."
    },
    architecturalHighlights: [
      "Unique blend of Kerala and Tamil architectural styles with a distinctive gopuram",
      "The 18-foot long deity in Anantha Shayana posture made of 12,000 Saligrama stones",
      "The deity can only be viewed through three doors simultaneously",
      "Features intricate mural paintings and stone carvings depicting Puranic stories",
      "The temple has six vaults labeled A to F, containing centuries of treasures",
      "The 100-foot tall seven-tier gopuram built in Pandyan style",
      "Strict dress code requires men to wear dhoti and women to wear saree or skirt-blouse"
    ],
    religiousSignificance: [
      "One of the 108 Divya Desams (holy abodes of Vishnu)",
      "The presiding deity of Travancore royal family since 18th century",
      "Follows extremely strict traditional customs and dress codes",
      "Only Hindus are permitted entry into the temple",
      "Represents the perfect integration of temple, royalty, and state",
      "Believed to be one of the seven Mukti Sthalas (places of salvation)"
    ]
  },
  {
    id: "brihadeshwara",
    name: "Brihadeshwara Temple",
    deity: "Lord Shiva",
    location: "Thanjavur",
    city: "Thanjavur",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1665003757407-db665cffa69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTk3NDQyNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "UNESCO World Heritage Site and a masterpiece of Chola architecture. The temple tower is 216 feet high and is crowned by a single granite block weighing 80 tons.",
    highlight: "UNESCO World Heritage Site with 1000-year shadowless tower",
    established: "1010 CE",
    architecture: "Dravidian (Chola)",
    timings: "6:00 AM - 12:30 PM, 4:00 PM - 8:30 PM",
    entryFee: "Free",
    coordinates: { lat: 10.7825, lng: 79.1313 },
    address: "Thanjavur, Tamil Nadu - 613007",
    phone: "+91 4362 272424",
    email: "brihadeshwara@hrce.tn.gov.in",
    history: {
      title: "The Crown Jewel of Chola Dynasty",
      paragraphs: [
        "The Brihadeshwara Temple, also known as Peruvudaiyar Kovil, stands as the pinnacle of Chola architectural achievement. Completed in 1010 CE by the great emperor Raja Raja Chola I, this magnificent structure was built to celebrate his military victories and showcase the grandeur of the Chola Empire at its zenith.",
        "Raja Raja Chola I commissioned this temple after his successful military campaigns that extended Chola influence across South India and beyond. The construction took approximately seven years and involved thousands of artisans, sculptors, and laborers. The temple was designed to be not just a place of worship but a statement of Chola power and cultural sophistication.",
        "The temple has survived for over a millennium, witnessing the rise and fall of numerous dynasties. Despite invasions and natural calamities, the structure has remained largely intact, a testament to the engineering brilliance of Chola architects. In 1987, UNESCO recognized it as a World Heritage Site, acknowledging its outstanding universal value to human civilization."
      ],
      images: [
        "https://images.unsplash.com/photo-1616308913689-cb92c5bea67e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBkZWl0eSUyMHNocmluZXxlbnwxfHx8fDE3NjAyODk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1759547020765-6287c81724d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjByaXR1YWwlMjB3b3JzaGlwfGVufDF8fHx8MTc2MDI4OTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ]
    },
    legend: {
      title: "The Emperor's Divine Vision",
      story: "Legend has it that Raja Raja Chola I received divine inspiration in his dreams to build this magnificent temple. Lord Shiva appeared to him and commanded him to construct a temple that would stand as an eternal monument to faith and devotion. The emperor dedicated the temple to Lord Shiva as 'Rajarajeswaram' (the Lord of Raja Raja). The construction involved moving massive granite blocks from quarries over 50 kilometers away, and it is said that elephants and ingenious engineering techniques were used to place the 80-ton capstone atop the 216-foot vimana. The temple's shadow is designed never to fall on the ground at noon, a marvel that still amazes visitors today."
    },
    architecturalHighlights: [
      "The vimana (temple tower) rises to 216 feet, making it one of the tallest of its kind in the world",
      "The single block capstone weighing 80 tons was hoisted to the top using a 6-kilometer ramp",
      "The temple's shadow never falls on the ground at noon, an engineering marvel",
      "Features a massive Nandi statue carved from a single rock, measuring 16 feet long and 13 feet high",
      "The walls are adorned with 108 dance poses (karanas) from the Natya Shastra",
      "Inscriptions in Tamil cover the temple walls, providing invaluable historical information",
      "The entire temple is built with granite, brought from distant quarries"
    ],
    religiousSignificance: [
      "One of the 'Great Living Chola Temples' recognized by UNESCO",
      "Houses one of the largest lingams in India, standing 8.7 meters high",
      "The temple is dedicated to Lord Shiva as 'Brihadeshwara' (Great Lord)",
      "An important center for Shaivite worship and Tamil culture",
      "Features elaborate daily rituals following ancient Agama traditions",
      "Considered a perfect example of the integration of architecture, sculpture, painting, and other art forms"
    ]
  },
  {
    id: "srirangam",
    name: "Sri Ranganathaswamy Temple",
    deity: "Lord Ranganatha (Vishnu)",
    location: "Srirangam",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1632962237468-0705d7e7b534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGdvcHVyYW18ZW58MXx8fHwxNzU5NzQ0MjYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The largest functioning Hindu temple in the world, covering an area of 156 acres. One of the 108 Divya Desams dedicated to Lord Vishnu.",
    highlight: "World's largest functioning temple complex covering 156 acres",
    established: "10th Century CE",
    architecture: "Dravidian Style",
    timings: "6:00 AM - 1:00 PM, 3:30 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 10.8665, lng: 78.6915 },
    address: "Srirangam, Tiruchirappalli, Tamil Nadu - 620006",
    phone: "+91 431 2435253",
    email: "srirangam@temple.org"
  },
  {
    id: "chamundeshwari",
    name: "Chamundeshwari Temple",
    deity: "Goddess Chamundeshwari",
    location: "Chamundi Hills, Mysore",
    city: "Mysore",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1733805569204-41768c7d8c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJ1cGF0aSUyMHRlbXBsZXxlbnwxfHx8fDE3NTk3NDQyNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Located atop Chamundi Hills, this temple is dedicated to Goddess Chamundeshwari, the tutelary deity of the Mysore Royal family.",
    highlight: "Perched atop 1000 steps on Chamundi Hills",
    established: "12th Century CE",
    architecture: "Dravidian Style",
    timings: "7:30 AM - 2:00 PM, 3:30 PM - 6:00 PM, 7:30 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 12.2747, lng: 76.6727 },
    address: "Chamundi Hills, Mysore, Karnataka - 570010",
    phone: "+91 821 2512685",
    email: "chamundeshwari@temple.org"
  },
  {
    id: "udupi-krishna",
    name: "Udupi Sri Krishna Temple",
    deity: "Lord Krishna",
    location: "Udupi",
    city: "Udupi",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1692173248120-59547c3d4653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWVuYWtzaGklMjB0ZW1wbGUlMjBtYWR1cmFpfGVufDF8fHx8MTc1OTY1NjE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Famous Krishna temple established by Saint Madhvacharya. Known for its unique tradition of worshipping Krishna through a silver-plated window with nine holes (Navagraha Kindi).",
    highlight: "Krishna worshipped through a unique nine-holed silver window",
    established: "13th Century CE",
    architecture: "Traditional Karnataka Style",
    timings: "5:30 AM - 1:00 PM, 3:00 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 13.3409, lng: 74.7421 },
    address: "Car Street, Udupi, Karnataka - 576101",
    phone: "+91 820 2520151",
    email: "udupi@temple.org"
  },
  {
    id: "yadadri",
    name: "Yadadri Lakshmi Narasimha Temple",
    deity: "Lord Narasimha (Vishnu)",
    location: "Yadadri Bhuvanagiri",
    city: "Yadadri Bhuvanagiri",
    state: "Telangana",
    image: "https://images.unsplash.com/photo-1672215041347-c76cd1b652fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWRhZHJpJTIwdGVtcGxlJTIwdGVsYW5nYW5hfGVufDF8fHx8MTc1OTc0NDg4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Ancient temple recently renovated into a grand complex. One of the Nava Narasimha Kshetras, it's considered the Telangana equivalent of Tirupati.",
    highlight: "Recently renovated into a magnificent temple complex",
    established: "5th Century CE (renovated 2022)",
    architecture: "Modern Dravidian Style",
    timings: "4:00 AM - 8:30 PM",
    entryFee: "Free",
    coordinates: { lat: 17.5833, lng: 78.9167 },
    address: "Yadadri Bhuvanagiri, Telangana - 508116",
    phone: "+91 8683 222333",
    email: "yadadri@temple.org"
  },
  {
    id: "simhachalam",
    name: "Simhachalam Temple",
    deity: "Lord Varaha Narasimha",
    location: "Simhachalam, Visakhapatnam",
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    image: "https://images.unsplash.com/photo-1710863805685-73058473ce7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1oYWNoYWxhbSUyMHRlbXBsZSUyMGFuZGhyYXxlbnwxfHx8fDE3NTk3NDQ4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Ancient temple dedicated to a unique form of Vishnu combining Varaha and Narasimha avatars. Features stunning Kalinga architecture.",
    highlight: "Unique deity combining Varaha and Narasimha avatars",
    established: "11th Century CE",
    architecture: "Kalinga Style",
    timings: "4:00 AM - 9:30 PM",
    entryFee: "Free",
    coordinates: { lat: 17.7652, lng: 83.2474 },
    address: "Simhachalam, Visakhapatnam, Andhra Pradesh - 530028",
    phone: "+91 891 2782180",
    email: "simhachalam@temple.org"
  },
  {
    id: "kapaleeshwarar",
    name: "Kapaleeshwarar Temple",
    deity: "Lord Shiva",
    location: "Mylapore, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1715363956669-1bc653483e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXBhbGVlc2h3YXJhciUyMHRlbXBsZSUyMGNoZW5uYWl8ZW58MXx8fHwxNzU5NzQ0ODkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Ancient Shiva temple in Mylapore, one of Chennai's oldest residential areas. Known for its magnificent 40-meter tall gopuram.",
    highlight: "Features a stunning 40-meter rainbow-colored gopuram",
    established: "7th Century CE",
    architecture: "Dravidian Style",
    timings: "5:30 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 13.0339, lng: 80.2691 },
    address: "Mylapore, Chennai, Tamil Nadu - 600004",
    phone: "+91 44 24641670",
    email: "kapaleeshwarar@temple.org"
  },
  {
    id: "golden-temple-vellore",
    name: "Sripuram Golden Temple",
    deity: "Goddess Lakshmi",
    location: "Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    image: "https://images.unsplash.com/photo-1669565967991-cfaf09a19829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjB0ZW1wbGUlMjB2ZWxsb3JlJTIwdGFtaWwlMjBuYWR1fGVufDF8fHx8MTc1OTc0NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Modern temple covered in gold foil, creating a stunning visual spectacle. Set in a beautiful 100-acre spiritual park.",
    highlight: "Entire temple covered in gold leaf, visible from miles away",
    established: "2007 CE",
    architecture: "Modern Dravidian",
    timings: "4:00 AM - 8:00 PM",
    entryFee: "Free",
    coordinates: { lat: 12.9186, lng: 79.1325 },
    address: "Thirumalaikodi, Vellore, Tamil Nadu - 632055",
    phone: "+91 416 2235666",
    email: "sripuram@temple.org"
  },
  {
    id: "chennakesava-belur",
    name: "Chennakesava Temple",
    deity: "Lord Vishnu",
    location: "Belur",
    city: "Belur",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1702970091346-8e4e72427691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVubmFrZXNhdmElMjB0ZW1wbGUlMjBrYXJuYXRha2ElMjBiZWx1cnxlbnwxfHx8fDE3NTk3NDQ4OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Masterpiece of Hoysala architecture with intricate carvings. Took 103 years to complete and features stunning sculptural work.",
    highlight: "Marvel of Hoysala architecture with exquisite stone carvings",
    established: "1117 CE",
    architecture: "Hoysala Style",
    timings: "7:30 AM - 7:30 PM",
    entryFee: "₹25 for Indians, ₹300 for foreigners",
    coordinates: { lat: 13.1656, lng: 75.8656 },
    address: "Belur, Hassan District, Karnataka - 573115",
    phone: "+91 8177 222142",
    email: "belur@asi.org"
  },
  {
    id: "thousand-pillar",
    name: "Thousand Pillar Temple",
    deity: "Lord Shiva, Vishnu, Surya",
    location: "Warangal",
    city: "Warangal",
    state: "Telangana",
    image: "https://images.unsplash.com/photo-1619239632374-9e6651c2b7bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMHRlbXBsZSUyMGdvcHVyYW0lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5NzQ0ODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Historic Kakatiya dynasty temple with intricate rock-cut architecture. Features a monolithic Nandi carved from black basalt.",
    highlight: "Features 1000 intricately carved pillars from Kakatiya era",
    established: "1163 CE",
    architecture: "Kakatiya Style",
    timings: "6:00 AM - 12:30 PM, 3:00 PM - 8:30 PM",
    entryFee: "Free",
    coordinates: { lat: 17.9784, lng: 79.5941 },
    address: "Hanamkonda, Warangal, Telangana - 506001",
    phone: "+91 870 2576666",
    email: "warangal@temple.org"
  },
  {
    id: "dharmasthala",
    name: "Manjunatha Temple",
    deity: "Lord Manjunatha (Shiva)",
    location: "Dharmasthala",
    city: "Dharmasthala",
    state: "Karnataka",
    image: "https://images.unsplash.com/photo-1609151745346-c624e507baa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaGFybWFzdGhhbGElMjB0ZW1wbGUlMjBtYW5qdW5hdGhhJTIwa2FybmF0YWthfGVufDF8fHx8MTc1OTc0NDg5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Unique temple where Shiva is worshipped in the Shaivite tradition but managed by Jain administrators. Known for free meals to all visitors.",
    highlight: "Unique harmony: Jain trustees managing a Shaivite temple",
    established: "800 CE",
    architecture: "Traditional Karnataka",
    timings: "6:00 AM - 2:00 PM, 5:30 PM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 12.9493, lng: 75.3824 },
    address: "Dharmasthala, Dakshina Kannada, Karnataka - 574216",
    phone: "+91 8256 277212",
    email: "dharmasthala@temple.org"
  },
  {
    id: "gnana-saraswati",
    name: "Gnana Saraswati Temple",
    deity: "Goddess Saraswati",
    location: "Basar",
    city: "Basar",
    state: "Telangana",
    image: "https://images.unsplash.com/photo-1723233106209-bbce19d67824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGluZGlhbiUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZSUyMHN0b25lJTIwY2FydmluZ3xlbnwxfHx8fDE3NTk3NDQ4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "One of only two temples in India dedicated to Goddess Saraswati. Popular for Akshara Abhyasam ceremony for children.",
    highlight: "One of India's rare temples dedicated to Goddess Saraswati",
    established: "Ancient (exact date unknown)",
    architecture: "South Indian Style",
    timings: "4:00 AM - 9:00 PM",
    entryFee: "Free",
    coordinates: { lat: 18.8833, lng: 77.1 },
    address: "Basar, Nirmal District, Telangana - 504101",
    phone: "+91 8734 252277",
    email: "basar@temple.org"
  }
];
