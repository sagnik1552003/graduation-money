export const COMPANIES = [
  // ── CONFIRMED HIGH ────────────────────────────────────────────────
  {
    id: 'chickfila', emoji: '🐄', name: 'Chick-fil-A', category: 'Food',
    what: 'Plush cow, hats, sweatshirts, water bottles, gift cards', value: '~$150', confidence: 'high', responseRate: 85,
    contactForm: 'https://www.chick-fil-a.com/contact-cares',
    address: 'Chick-fil-A Inc.\nAttn: Customer Service\n5200 Buffington Rd\nAtlanta, GA 30349',
  },
  {
    id: 'rarebeauty', emoji: '💄', name: 'Rare Beauty', category: 'Beauty',
    what: 'Full-size products, barrettes, headband, handwritten note', value: '~$100', confidence: 'high', responseRate: 75,
    contactForm: 'https://www.rarebeauty.com/pages/contact-us',
    address: 'Rare Beauty Brands Inc.\nAttn: Customer Relations\n10250 Constellation Blvd\nLos Angeles, CA 90067',
  },
  {
    id: 'lego', emoji: '🧱', name: 'LEGO', category: 'Lifestyle',
    what: 'Personalized certificate + mini LEGO set', value: '~$60', confidence: 'high', responseRate: 72,
    contactForm: 'https://www.lego.com/en-us/service/help/consumer_service_en-us',
    address: 'The LEGO Group\nAttn: Consumer Services\n555 Taylor Rd\nEnfield, CT 06082',
  },
  {
    id: 'crumbl', emoji: '🍪', name: 'Crumbl Cookies', category: 'Food',
    what: 'Gift card ($25–$50), stickers, pink branded packaging', value: '~$50', confidence: 'high', responseRate: 80,
    contactForm: 'https://crumblcookies.com/contact',
    address: 'Crumbl LLC\nAttn: Guest Relations\n540 S Main St\nLindon, UT 84042',
  },
  {
    id: 'trufru', emoji: '🍓', name: 'Tru Fru', category: 'Food',
    what: 'Sample box with assorted flavors, coupons, congrats letter', value: '~$30', confidence: 'high', responseRate: 68,
    contactForm: 'https://www.trufru.com/pages/contact',
    address: 'Tru Fru\nAttn: Consumer Relations\n2600 S 900 W\nSouth Salt Lake, UT 84119',
  },
  {
    id: 'raisingcanes', emoji: '🍗', name: "Raising Cane's", category: 'Food',
    what: 'Branded hats, cards, gift cards', value: '~$50', confidence: 'high', responseRate: 65,
    contactForm: 'https://www.raisingcanes.com/contact-us',
    address: "Raising Cane's USA LLC\nAttn: Marketing Department\n100 Raising Cane's Dr\nBaton Rouge, LA 70810",
  },
  {
    id: 'rei', emoji: '🏔️', name: 'REI', category: 'Outdoors',
    what: 'Outdoor gear, handwritten note', value: '~$80', confidence: 'high', responseRate: 60,
    contactForm: 'https://www.rei.com/help/contact-us.html',
    address: 'REI Co-op\nAttn: Customer Care\n6750 S 228th St\nKent, WA 98032',
  },
  {
    id: 'urbanoutfitters', emoji: '🛍️', name: 'Urban Outfitters', category: 'Lifestyle',
    what: 'Clothing, accessories, homeware, handwritten card — PR box style', value: '~$80', confidence: 'high', responseRate: 70,
    contactForm: 'https://www.urbanoutfitters.com/help/contact_us',
    address: 'Urban Outfitters Inc.\nAttn: Customer Relations\n5000 South Broad St\nPhiladelphia, PA 19112',
  },
  {
    id: 'glossier', emoji: '✨', name: 'Glossier', category: 'Beauty',
    what: 'Skincare + makeup products, branded merch', value: '~$70', confidence: 'high', responseRate: 65,
    contactForm: 'https://www.glossier.com/pages/contact-us',
    address: 'Glossier Inc.\nAttn: Community Team\n600 Broadway, 4th Floor\nNew York, NY 10012',
  },
  {
    id: 'kendrascott', emoji: '💎', name: 'Kendra Scott', category: 'Lifestyle',
    what: 'Jewelry piece, branded packaging, handwritten note', value: '~$60', confidence: 'high', responseRate: 62,
    contactForm: 'https://www.kendrascott.com/pages/contact-us',
    address: 'Kendra Scott LLC\nAttn: Customer Experience\n3800 N Lamar Blvd, Suite 200\nAustin, TX 78756',
  },
  {
    id: 'poppi', emoji: '🫧', name: 'Poppi', category: 'Food',
    what: 'Mixed flavor can pack, branded merch, stickers', value: '~$35', confidence: 'high', responseRate: 60,
    contactForm: 'https://drinkpoppi.com/pages/contact-us',
    address: 'Poppi Beverages\nAttn: Consumer Relations\n3401 Esperanza Crossing, Suite 100\nAustin, TX 78758',
  },

  // ── CONFIRMED MEDIUM ──────────────────────────────────────────────
  {
    id: 'patagonia', emoji: '🌊', name: 'Patagonia', category: 'Outdoors',
    what: 'Gear + handwritten notes', value: '~$80', confidence: 'med', responseRate: 45,
    contactForm: 'https://www.patagonia.com/customer-service-contact.html',
    address: 'Patagonia Inc.\nAttn: Customer Service\n259 W Santa Clara St\nVentura, CA 93001',
  },
  {
    id: 'sunbum', emoji: '☀️', name: 'Sun Bum', category: 'Beauty',
    what: 'Sunscreen, lip balm, swag kit', value: '~$35', confidence: 'med', responseRate: 50,
    contactForm: 'https://www.sunbum.com/pages/contact-us',
    address: 'Sun Bum LLC\nAttn: Customer Care\n1620 Grannet Ave\nEncinitas, CA 92024',
  },
  {
    id: 'bootbarn', emoji: '🤠', name: 'Boot Barn', category: 'Lifestyle',
    what: 'Branded merchandise, gift', value: '~$40', confidence: 'med', responseRate: 48,
    contactForm: 'https://www.bootbarn.com/customer-service/contact-us/',
    address: 'Boot Barn Inc.\nAttn: Customer Relations\n15345 Barranca Pkwy\nIrvine, CA 92618',
  },
  {
    id: 'takis', emoji: '🔥', name: 'Takis', category: 'Food',
    what: 'Swag + unreleased chip flavors, branded gear', value: '~$25', confidence: 'med', responseRate: 42,
    contactForm: 'https://www.takis.us/en/contact',
    address: 'Barcel USA LLC\nAttn: Consumer Relations\n8900 Freeport Pkwy, Suite 300\nIrving, TX 75063',
  },
  {
    id: 'panera', emoji: '🥖', name: 'Panera Bread', category: 'Food',
    what: 'Gift cards, kind note', value: '~$25', confidence: 'med', responseRate: 40,
    contactForm: 'https://www.panerabread.com/en-us/company/contact-us.html',
    address: 'Panera Bread\nAttn: Customer Care\n3630 S Geyer Rd, Suite 100\nSt. Louis, MO 63127',
  },
  {
    id: 'chilis', emoji: '🌶️', name: "Chili's", category: 'Food',
    what: 'Gift cards, branded merch', value: '~$30', confidence: 'med', responseRate: 38,
    contactForm: 'https://www.chilis.com/feedback',
    address: "Brinker International\nAttn: Guest Relations\n3000 Olympus Blvd\nDallas, TX 75019",
  },
  {
    id: 'aaa', emoji: '🚗', name: 'AAA', category: 'Lifestyle',
    what: 'Membership gift, branded goodies', value: '~$30', confidence: 'med', responseRate: 35,
    contactForm: 'https://www.aaa.com/stop/contactaaa',
    address: 'AAA — The Auto Club Group\nAttn: Member Relations\n1 Auto Club Dr\nDearborn, MI 48126',
  },
  {
    id: 'petermillar', emoji: '👔', name: 'Peter Millar', category: 'Lifestyle',
    what: 'Branded apparel gift', value: '~$60', confidence: 'med', responseRate: 32,
    contactForm: 'https://www.petermillar.com/pages/contact-us',
    address: 'Peter Millar LLC\nAttn: Customer Service\n4600 Park Rd, Suite 400\nCharlotte, NC 28209',
  },
  {
    id: 'owala', emoji: '💧', name: 'Owala', category: 'Lifestyle',
    what: 'FreeSip water bottle, stickers, branded swag', value: '~$45', confidence: 'med', responseRate: 50,
    contactForm: 'https://owalalife.com/pages/contact',
    address: 'Owala\nAttn: Customer Care\n2100 N Greenfield Rd, Suite 101\nMesa, AZ 85215',
  },
  {
    id: 'stanley', emoji: '🥤', name: 'Stanley', category: 'Lifestyle',
    what: 'Tumbler or mug, branded accessories', value: '~$55', confidence: 'med', responseRate: 45,
    contactForm: 'https://www.stanley1913.com/pages/contact-us',
    address: 'PMI WW (Stanley)\nAttn: Consumer Relations\n2100 First Ave S\nSeattle, WA 98134',
  },
  {
    id: 'brooksrunning', emoji: '👟', name: 'Brooks Running', category: 'Outdoors',
    what: 'Running gear, socks, branded accessories', value: '~$50', confidence: 'med', responseRate: 42,
    contactForm: 'https://www.brooksrunning.com/en_us/support/contact-us.html',
    address: 'Brooks Sports Inc.\nAttn: Consumer Relations\n3400 Stone Way N\nSeattle, WA 98103',
  },
  {
    id: 'enewton', emoji: '📿', name: 'eNewton Design', category: 'Beauty',
    what: 'Bracelet or jewelry piece, handwritten note', value: '~$40', confidence: 'med', responseRate: 48,
    contactForm: 'https://www.enewtondesign.com/pages/contact-us',
    address: 'eNewton Design\nAttn: Customer Care\n2110 W Braker Ln, Suite 100\nAustin, TX 78758',
  },
  {
    id: 'drinklmnt', emoji: '⚡', name: 'LMNT', category: 'Food',
    what: 'Full variety sampler box, electrolyte packs', value: '~$25', confidence: 'med', responseRate: 55,
    contactForm: 'https://drinklmnt.com/pages/contact',
    address: 'Elemental Labs Inc.\nAttn: Customer Experience\n1 Montgomery St, Suite 2600\nSan Francisco, CA 94104',
  },
  {
    id: 'waterboy', emoji: '💦', name: 'Waterboy', category: 'Food',
    what: 'Hydration packet variety pack + merch', value: '~$30', confidence: 'med', responseRate: 52,
    contactForm: 'https://drinkwaterboy.com/pages/contact',
    address: 'Waterboy Inc.\nAttn: Consumer Relations\n8000 Research Forest Dr, Suite 115\nThe Woodlands, TX 77382',
  },
  {
    id: 'onceuponacoconut', emoji: '🥥', name: 'Once Upon a Coconut', category: 'Food',
    what: 'Coconut water variety pack, stickers, note', value: '~$25', confidence: 'med', responseRate: 58,
    contactForm: 'https://onceuponacoconut.com/pages/contact',
    address: 'Once Upon a Coconut\nAttn: Customer Happiness\n601 Cleveland St, Suite 400\nClearwater, FL 33755',
  },
  {
    id: 'kitsch', emoji: '🎀', name: 'Kitsch', category: 'Beauty',
    what: 'Hair accessories bundle, satin items, stickers', value: '~$35', confidence: 'med', responseRate: 55,
    contactForm: 'https://mykitsch.com/pages/contact',
    address: 'Kitsch LLC\nAttn: Customer Care\n2150 NW 18th St\nMiami, FL 33142',
  },
  {
    id: 'touchland', emoji: '🤲', name: 'Touchland', category: 'Beauty',
    what: 'Hand sanitizer mist set, travel sizes', value: '~$30', confidence: 'med', responseRate: 50,
    contactForm: 'https://touchland.com/pages/contact-us',
    address: 'Touchland Inc.\nAttn: Customer Relations\n801 Brickell Key Blvd, Suite 900\nMiami, FL 33131',
  },
]

export const CATEGORIES = ['All', 'Food', 'Beauty', 'Outdoors', 'Lifestyle']