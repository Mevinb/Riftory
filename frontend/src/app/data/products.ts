/**
 * Mock MongoDB-style data objects
 * Images are Cloudinary-style URLs (mocked with Unsplash)
 */

// Location interface for normal marketplace items
export interface ProductLocation {
  id: string;
  name: string;           // "Old Dock Market" or "Moonlight Bazaar"
  city: string;           // "Prague" or "New Luma"
  country: string;        // "Czech Republic" or "Arcadia"
  lat: number;
  lng: number;
  type: 'origin' | 'stock' | 'event';  // Where made, where sold, special events
  flavorText?: string;    // "Hidden behind a red door"
}

// Riddle interface for black market items
export interface BlackMarketRiddle {
  riddle: string;         // Main cryptic clue
  hint?: string;          // Optional unlock after interaction
  regionHint: string;     // Vague area description
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
  intermediary?: string;  // Rumored contact info
  loreUnlock?: string;    // Secret revealed after solving
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  seller: {
    name: string;
    type: 'artisan' | 'alchemist' | 'blacksmith' | 'collector' | 'unknown';
  };
  tags: string[];
  isUpsideDown?: boolean; // Marks if this is a black market item
  rarity?: 'common' | 'uncommon' | 'rare' | 'forbidden';
  warning?: string; // For dangerous items
  // Location data for normal items
  locations?: ProductLocation[];
  // Riddle data for black market items
  riddle?: BlackMarketRiddle;
}

// NORMAL MARKETPLACE PRODUCTS - Spooky artisan items
export const normalMarketplaceProducts: Product[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Handcrafted Skull Candle',
    price: 34.99,
    description: 'A hauntingly beautiful candle carved from aged wax. Burns with an amber glow.',
    imageUrl: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=800&h=800&fit=crop',
    category: 'Candles',
    seller: { name: 'Eleanor Graves', type: 'artisan' },
    tags: ['handmade', 'vintage', 'occult'],
    rarity: 'common',
    locations: [
      { id: 'loc1', name: 'Moonlight Bazaar', city: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378, type: 'stock', flavorText: 'Stall 13, near the old clock tower' },
      { id: 'loc2', name: 'Graves Workshop', city: 'Edinburgh', country: 'Scotland', lat: 55.9533, lng: -3.1883, type: 'origin', flavorText: 'Where the candles are born from darkness' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Rusted Iron Pendant',
    price: 42.50,
    description: 'Oxidized iron shaped into mysterious symbols. Each piece tells a forgotten story.',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=800&fit=crop',
    category: 'Jewelry',
    seller: { name: 'Marcus Iron', type: 'blacksmith' },
    tags: ['metal', 'rustic', 'ancient'],
    rarity: 'uncommon',
    locations: [
      { id: 'loc3', name: 'The Anvil District', city: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, type: 'origin', flavorText: 'Forged beneath the Chain Bridge' },
      { id: 'loc4', name: 'Nightshade Market', city: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738, type: 'stock', flavorText: 'Hidden behind a red door on Spittelberg' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439013',
    name: 'Antique Pocket Watch',
    price: 127.00,
    description: 'Time moves differently when you hold this. The gears whisper secrets.',
    imageUrl: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=800&fit=crop',
    category: 'Timepieces',
    seller: { name: 'Horace Tick', type: 'collector' },
    tags: ['vintage', 'brass', 'mysterious'],
    rarity: 'rare',
    locations: [
      { id: 'loc5', name: 'Tick\'s Curiosities', city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, type: 'stock', flavorText: 'Third floor, ask for the special collection' },
      { id: 'loc6', name: 'Autumn Antiques Fair', city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, type: 'event', flavorText: 'Only during the October moon' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439014',
    name: 'Weathered Leather Journal',
    price: 56.00,
    description: 'Pages yellowed with age. Some entries are not in any known language.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=800&fit=crop',
    category: 'Books',
    seller: { name: 'Lillian Page', type: 'collector' },
    tags: ['leather', 'writing', 'vintage'],
    rarity: 'uncommon',
    locations: [
      { id: 'loc7', name: 'The Dusty Tome', city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, type: 'stock', flavorText: 'Down the alley past Temple Bar' },
      { id: 'loc8', name: 'Page\'s Private Collection', city: 'Oxford', country: 'United Kingdom', lat: 51.7520, lng: -1.2577, type: 'origin', flavorText: 'By appointment only' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439015',
    name: 'Ancient Clay Vessel',
    price: 89.99,
    description: 'Recovered from an unmarked site. The clay feels warm to the touch.',
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop',
    category: 'Pottery',
    seller: { name: 'Ezra Clay', type: 'artisan' },
    tags: ['ceramic', 'ancient', 'handmade'],
    rarity: 'rare',
    locations: [
      { id: 'loc9', name: 'Mediterranean Treasures', city: 'Athens', country: 'Greece', lat: 37.9838, lng: 23.7275, type: 'stock', flavorText: 'Near the Plaka, follow the incense' },
      { id: 'loc10', name: 'Clay\'s Kiln', city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, type: 'origin', flavorText: 'Where East meets West in fire' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439016',
    name: 'Tarnished Silver Mirror',
    price: 73.50,
    description: 'Reflections appear slightly delayed. Handle with care.',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop',
    category: 'Mirrors',
    seller: { name: 'Victoria Glass', type: 'artisan' },
    tags: ['silver', 'antique', 'supernatural'],
    rarity: 'uncommon',
    locations: [
      { id: 'loc11', name: 'Glass & Reflection', city: 'Venice', country: 'Italy', lat: 45.4408, lng: 12.3155, type: 'origin', flavorText: 'Island of Murano, unmarked workshop' },
      { id: 'loc12', name: 'The Silver Cabinet', city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041, type: 'stock', flavorText: 'Canal house with the crooked door' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439017',
    name: 'Bone Dice Set',
    price: 28.00,
    description: 'Seven-sided dice carved from unknown bone. Outcomes feel predetermined.',
    imageUrl: 'https://images.unsplash.com/photo-1522069213448-443a614da9b6?w=800&h=800&fit=crop',
    category: 'Games',
    seller: { name: 'Silas Chance', type: 'collector' },
    tags: ['bone', 'gaming', 'occult'],
    rarity: 'common',
    locations: [
      { id: 'loc13', name: 'The Gambler\'s Den', city: 'Monte Carlo', country: 'Monaco', lat: 43.7384, lng: 7.4246, type: 'stock', flavorText: 'Ask the bartender for "the bones"' },
      { id: 'loc14', name: 'Midnight Games Festival', city: 'Las Vegas', country: 'USA', lat: 36.1699, lng: -115.1398, type: 'event', flavorText: 'Halloween weekend only' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439018',
    name: 'Preserved Moth Display',
    price: 45.00,
    description: 'Specimen from the deep woods. Wings shimmer in moonlight.',
    imageUrl: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=800&fit=crop',
    category: 'Specimens',
    seller: { name: 'Dr. Helena Wing', type: 'collector' },
    tags: ['taxidermy', 'nature', 'oddities'],
    rarity: 'uncommon',
    locations: [
      { id: 'loc15', name: 'Natural Curiosities Museum', city: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, type: 'stock', flavorText: 'Basement collection, require special pass' },
      { id: 'loc16', name: 'Dr. Wing\'s Laboratory', city: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686, type: 'origin', flavorText: 'Where science meets the supernatural' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439019',
    name: 'Gothic Chandelier Fragment',
    price: 156.00,
    description: 'A single arm from a cathedral chandelier. Crystals chime in silence.',
    imageUrl: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=800&h=800&fit=crop',
    category: 'Lighting',
    seller: { name: 'Father Dominic', type: 'collector' },
    tags: ['crystal', 'religious', 'gothic'],
    rarity: 'rare',
    locations: [
      { id: 'loc17', name: 'Cathedral Artifacts', city: 'Cologne', country: 'Germany', lat: 50.9375, lng: 6.9603, type: 'origin', flavorText: 'Salvaged from the renovation of 1842' },
      { id: 'loc18', name: 'Sacred Relics Market', city: 'Krakow', country: 'Poland', lat: 50.0647, lng: 19.9450, type: 'stock', flavorText: 'Old Town square, Sunday mornings only' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439020',
    name: 'Victorian Death Mask',
    price: 198.00,
    description: 'Plaster cast of a forgotten face. Expression changes when not observed.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    category: 'Sculptures',
    seller: { name: 'Mortimer Vale', type: 'collector' },
    tags: ['victorian', 'death', 'memorial'],
    rarity: 'rare',
    locations: [
      { id: 'loc19', name: 'Vale\'s Curiosities', city: 'Manchester', country: 'United Kingdom', lat: 53.4808, lng: -2.2426, type: 'stock', flavorText: 'Beneath the Northern Quarter' },
      { id: 'loc20', name: 'Victorian Memorial Society', city: 'Bath', country: 'United Kingdom', lat: 51.3811, lng: -2.3590, type: 'event', flavorText: 'Annual remembrance gathering' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439021',
    name: 'Alchemist\'s Measuring Cup',
    price: 67.50,
    description: 'Etched with unknown measurements. Liquid inside never quite settles.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=800&fit=crop',
    category: 'Alchemy',
    seller: { name: 'Dr. Paracelsus', type: 'alchemist' },
    tags: ['alchemy', 'science', 'antique'],
    rarity: 'uncommon',
    locations: [
      { id: 'loc21', name: 'The Old Apothecary', city: 'Basel', country: 'Switzerland', lat: 47.5596, lng: 7.5886, type: 'origin', flavorText: 'Where Paracelsus once studied' },
      { id: 'loc22', name: 'Medieval Medicine Fair', city: 'Bruges', country: 'Belgium', lat: 51.2093, lng: 3.2247, type: 'event', flavorText: 'Spring equinox celebration' }
    ]
  },
  {
    _id: '507f1f77bcf86cd799439022',
    name: 'Blackwood Wand',
    price: 84.00,
    description: 'Carved from a tree struck by lightning. Warm even in winter.',
    imageUrl: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b5a4?w=800&h=800&fit=crop',
    category: 'Artifacts',
    seller: { name: 'Elder Willow', type: 'artisan' },
    tags: ['wood', 'magical', 'nature'],
    rarity: 'uncommon',
    locations: [
      { id: 'loc23', name: 'The Enchanted Grove', city: 'Galway', country: 'Ireland', lat: 53.2707, lng: -9.0568, type: 'origin', flavorText: 'Deep in Connemara forests' },
      { id: 'loc24', name: 'Druid\'s Market', city: 'Stonehenge', country: 'United Kingdom', lat: 51.1789, lng: -1.8262, type: 'event', flavorText: 'Summer solstice only' }
    ]
  },
];

// UPSIDE DOWN MARKETPLACE PRODUCTS - Black market items
export const upsideDownMarketplaceProducts: Product[] = [
  {
    _id: '607f1f77bcf86cd799439031',
    name: 'Unfinished Cursed Blade',
    price: 450.00,
    description: 'Enchantment failed mid-cast. Whispers in the dark. Not meant for daylight.',
    imageUrl: 'https://images.unsplash.com/photo-1590080875852-ba44f5c6c2b9?w=800&h=800&fit=crop',
    category: 'Weapons',
    seller: { name: 'Unknown Forgemaster', type: 'unknown' },
    tags: ['cursed', 'experimental', 'dangerous'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'No refunds. No questions.',
    riddle: {
      riddle: 'Where iron sleeps beneath the bridge of chains, and the river splits the old from new.',
      hint: 'The city was once two, now bound as one.',
      regionHint: 'Somewhere in Central Europe, where empires once collided...',
      riskLevel: 'extreme',
      intermediary: 'A courier with iron gloves waits at the thermal baths after midnight.',
      loreUnlock: 'The blade was meant for a king who never took his throne.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439032',
    name: 'Unstable Alchemy Vial',
    price: 320.00,
    description: 'Contents shift between solid and liquid. Color changes without reason.',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=800&fit=crop',
    category: 'Alchemy',
    seller: { name: 'The Apothecary', type: 'alchemist' },
    tags: ['potion', 'experimental', 'volatile'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Some things should stay unfinished.',
    riddle: {
      riddle: 'In the city of a hundred spires, where astronomers once read the stars for kings.',
      hint: 'The old town square holds a clock that performs.',
      regionHint: 'A capital city where alchemy was once a royal pursuit...',
      riskLevel: 'high',
      intermediary: 'Leave a blue flower at the astronomical clock at the third hour.',
      loreUnlock: 'The formula was abandoned when the alchemist vanished into light.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439033',
    name: 'Forbidden Grimoire Fragment',
    price: 890.00,
    description: 'Pages torn from a banned text. Reading aloud is not recommended.',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop',
    category: 'Books',
    seller: { name: 'Shadowed Collector', type: 'unknown' },
    tags: ['grimoire', 'forbidden', 'dark magic'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Knowledge has consequences.',
    riddle: {
      riddle: 'Where scholars walked before the tower fell, and knowledge burned but whispers remained.',
      hint: 'The library was once the greatest, before Alexandria.',
      regionHint: 'Along ancient Mediterranean shores...',
      riskLevel: 'extreme',
      intermediary: 'The bookseller with no name, found only when the moon is dark.',
      loreUnlock: 'These pages contain the last words of a forgotten order.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439034',
    name: 'Cracked Obsidian Amulet',
    price: 275.00,
    description: 'Protection spell fractured during binding. Protective... sometimes.',
    imageUrl: 'https://images.unsplash.com/photo-1551122102-63c4ce7cef56?w=800&h=800&fit=crop',
    category: 'Jewelry',
    seller: { name: 'Echo', type: 'unknown' },
    tags: ['amulet', 'broken', 'unstable'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Wear at your own risk.',
    riddle: {
      riddle: 'Where pyramids of glass pierce the sky, and the dead rest in cities beneath cities.',
      hint: 'The city of light holds darkness below.',
      regionHint: 'A famous capital, known for romance and revolution...',
      riskLevel: 'medium',
      intermediary: 'Find the woman in black at the catacombs entrance after hours.',
      loreUnlock: 'The amulet cracked the moment its creator died.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439035',
    name: 'Failed Armor Prototype',
    price: 670.00,
    description: 'Experimental plating. Sometimes repels damage. Sometimes attracts it.',
    imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?w=800&h=800&fit=crop',
    category: 'Armor',
    seller: { name: 'Ironbound', type: 'blacksmith' },
    tags: ['armor', 'prototype', 'unreliable'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Not tested. Never will be.',
    riddle: {
      riddle: 'In the city built on water, where masks hide faces and bridges connect dreams.',
      hint: 'Carnival season reveals what is usually hidden.',
      regionHint: 'An Italian city that slowly sinks...',
      riskLevel: 'high',
      intermediary: 'The masked gondolier at the Bridge of Sighs knows the way.',
      loreUnlock: 'The armor was commissioned by a doge who feared assassination.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439036',
    name: 'Void Crystal Shard',
    price: 1200.00,
    description: 'Extracted from a place that shouldn\'t exist. Light bends around it.',
    imageUrl: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?w=800&h=800&fit=crop',
    category: 'Artifacts',
    seller: { name: 'The Harvester', type: 'unknown' },
    tags: ['crystal', 'void', 'reality-bending'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Do not stare directly.',
    riddle: {
      riddle: 'Where northern lights dance over ice, and the sun forgets to set in summer.',
      hint: 'Land of fire and ice, where continents drift apart.',
      regionHint: 'An island nation at the edge of the Arctic Circle...',
      riskLevel: 'extreme',
      intermediary: 'A fisherman with white eyes waits at the black sand beach.',
      loreUnlock: 'The crystal was pulled from a rift that opened during an eruption.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439037',
    name: 'Whispering Dagger',
    price: 510.00,
    description: 'Hears thoughts. Shares them with others nearby. Cannot be silenced.',
    imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=800&h=800&fit=crop',
    category: 'Weapons',
    seller: { name: 'Silent Hand', type: 'unknown' },
    tags: ['dagger', 'cursed', 'telepathic'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Your secrets are not safe.',
    riddle: {
      riddle: 'Where the Bosphorus divides two worlds, and minarets rise like whispered prayers.',
      hint: 'The city has been capital to three empires.',
      regionHint: 'A city that straddles continents...',
      riskLevel: 'high',
      intermediary: 'The tea seller at the Grand Bazaar who never speaks.',
      loreUnlock: 'The dagger was forged in secret by the Sultan\'s own assassin.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439038',
    name: 'Blood Moon Lantern',
    price: 425.00,
    description: 'Only lights during the crimson hour. Reveals things better left unseen.',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=800&fit=crop',
    category: 'Lighting',
    seller: { name: 'Night Warden', type: 'unknown' },
    tags: ['lantern', 'cursed', 'revealing'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Some doors should remain closed.',
    riddle: {
      riddle: 'In the city of eternal fog, where Jack once walked and ravens guard the crown.',
      hint: 'The great fire could not destroy its secrets.',
      regionHint: 'A foggy capital on a winding river...',
      riskLevel: 'extreme',
      intermediary: 'Follow the raven from the Tower at the blood hour.',
      loreUnlock: 'The lantern was used to hunt something that still roams the alleys.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439039',
    name: 'Shadow Tome',
    price: 780.00,
    description: 'A book that writes itself at night. The ink is never quite dry.',
    imageUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&h=800&fit=crop',
    category: 'Books',
    seller: { name: 'The Scribe', type: 'unknown' },
    tags: ['grimoire', 'self-writing', 'mysterious'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Do not read the last page.',
    riddle: {
      riddle: 'Where Gothic spires touch the Rhine, and a great cathedral took centuries to complete.',
      hint: 'The city is famous for its water and its perfume.',
      regionHint: 'A German city along the mighty river...',
      riskLevel: 'high',
      intermediary: 'The librarian who tends the forbidden section knows the password.',
      loreUnlock: 'The tome belonged to a monk who transcribed nightmares.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439040',
    name: 'Hex Ring',
    price: 395.00,
    description: 'Curses the wearer and all who touch them. Impossible to remove willingly.',
    imageUrl: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&h=800&fit=crop',
    category: 'Jewelry',
    seller: { name: 'Grim Jeweler', type: 'unknown' },
    tags: ['ring', 'curse', 'binding'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'The price is more than coin.',
    riddle: {
      riddle: 'Where canals wind like veins and bicycles outnumber souls, in the city of painted light.',
      hint: 'Van Gogh and Rembrandt both called it home.',
      regionHint: 'A Dutch city built on water and windmills...',
      riskLevel: 'medium',
      intermediary: 'The antique dealer on the floating market knows the truth.',
      loreUnlock: 'The ring was crafted from a noose used in a witch trial.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439041',
    name: 'Plague Doctor\'s Mask',
    price: 620.00,
    description: 'Still smells of herbs and death. Visions come unbidden when worn.',
    imageUrl: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&h=800&fit=crop',
    category: 'Artifacts',
    seller: { name: 'Dr. Corvus', type: 'unknown' },
    tags: ['mask', 'cursed', 'medical'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'See what should not be seen.',
    riddle: {
      riddle: 'Where Mozart was born and salt made fortunes, beneath alpine peaks and baroque dreams.',
      hint: 'The fortress overlooks a city of music.',
      regionHint: 'An Austrian city near the German border...',
      riskLevel: 'high',
      intermediary: 'The organ player at the cathedral knows when the veil is thin.',
      loreUnlock: 'The mask was worn during the last plague outbreak, and it remembers.'
    }
  },
  {
    _id: '607f1f77bcf86cd799439042',
    name: 'Soul Mirror',
    price: 1450.00,
    description: 'Shows your true reflection. Most can only look once.',
    imageUrl: 'https://images.unsplash.com/photo-1528802984412-fb841f66df0b?w=800&h=800&fit=crop',
    category: 'Mirrors',
    seller: { name: 'The Reflector', type: 'unknown' },
    tags: ['mirror', 'soul', 'truth'],
    isUpsideDown: true,
    rarity: 'forbidden',
    warning: 'Truth is rarely kind.',
    riddle: {
      riddle: 'Where the Danube splits into three and thermal waters heal the weary, in the heart of an empire.',
      hint: 'The city is actually three cities joined as one.',
      regionHint: 'A Hungarian capital with ancient baths...',
      riskLevel: 'extreme',
      intermediary: 'The bathhouse attendant with silver eyes can guide you.',
      loreUnlock: 'The mirror was created by alchemists seeking to weigh souls.'
    }
  },
];

// Combined reels feed - will filter based on current mode
export const getAllReelsProducts = (): Product[] => {
  return [...normalMarketplaceProducts, ...upsideDownMarketplaceProducts];
};

export const getReelsForMode = (isUpsideDown: boolean): Product[] => {
  return isUpsideDown ? upsideDownMarketplaceProducts : normalMarketplaceProducts;
};
