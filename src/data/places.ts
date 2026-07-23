/**
 * The curated atlas. Every place here earned its spot.
 *
 * Coordinates are [longitude, latitude] (GeoJSON order).
 * Distances and populations are honest approximations (≈) — the kind you'd
 * pencil onto a chart — and the dossier pulls live Wikipedia text for the
 * authoritative version.
 */

export type Category = 'outpost' | 'station' | 'uninhabited' | 'ghost' | 'apart' | 'pole'

export interface Nearest {
  name: string
  km: number
  coords: [number, number]
  /** Label override, e.g. "Nearest land" for Point Nemo. */
  label?: string
}

export interface LonesomePlace {
  id: string
  name: string
  tagline: string
  category: Category
  territory: string
  coords: [number, number]
  /** Where to render the marker if the true coords fall off the map's tile range (poles). */
  displayCoords?: [number, number]
  population: string
  nearest: Nearest
  gettingThere: string
  wikipedia: string
  blurb: string
  note?: string
  /** Camera zoom when flying here; default 5.2. Lower for places whose context IS the emptiness. */
  flyZoom?: number
}

export const CATEGORIES: Record<Category, { label: string; color: string }> = {
  outpost: { label: 'Inhabited outposts', color: '#FFB454' },
  station: { label: 'Stations & bases', color: '#63C7B8' },
  uninhabited: { label: 'Uninhabited', color: '#9FB8D0' },
  ghost: { label: 'Abandoned', color: '#C97B5A' },
  apart: { label: 'Set apart', color: '#B39DDB' },
  pole: { label: 'Poles of inaccessibility', color: '#F2EFE4' },
}

export const PLACES: LonesomePlace[] = [
  // ————————————————————————————————— INHABITED OUTPOSTS
  {
    id: 'edinburgh-of-the-seven-seas',
    name: 'Edinburgh of the Seven Seas',
    tagline: 'The most remote permanently inhabited settlement on Earth',
    category: 'outpost',
    territory: 'Tristan da Cunha · British Overseas Territory',
    coords: [-12.311, -37.067],
    population: '≈240',
    nearest: { name: 'Jamestown, Saint Helena', km: 2430, coords: [-5.718, -15.924] },
    gettingThere:
      'There is no airstrip and never has been. Six to ten days at sea from Cape Town aboard a fishing vessel or the polar supply ship, with a berth booked months ahead.',
    wikipedia: 'Edinburgh of the Seven Seas',
    blurb:
      'Some 240 islanders share seven surnames, one road, one pub, and a volcano. When it erupted in 1961 the entire population was evacuated to England — and nearly all of them sailed home the moment it was safe. Locals just call it “the Settlement”; there is nothing else to confuse it with.',
  },
  {
    id: 'jamestown-saint-helena',
    name: 'Jamestown, Saint Helena',
    tagline: 'Napoleon’s open-air prison, wedged in a volcanic ravine',
    category: 'outpost',
    territory: 'Saint Helena · British Overseas Territory',
    coords: [-5.718, -15.924],
    population: '≈600 (island ≈4,400)',
    nearest: { name: 'Georgetown, Ascension Island', km: 1300, coords: [-14.412, -7.929] },
    gettingThere:
      'A weekly flight from Johannesburg lands at an airport long nicknamed “the world’s most useless” for its wind shear. Before 2017, the only way in was five days aboard the RMS St Helena.',
    wikipedia: 'Jamestown, Saint Helena',
    blurb:
      'The British chose this island to hold Napoleon precisely because there was nowhere to escape to. Climb Jacob’s Ladder — 699 steps up the ravine wall — and you can see most of the capital at once. Jonathan the tortoise, resident since 1882 and thought to be around 190 years old, has outlived every jailer.',
  },
  {
    id: 'georgetown-ascension',
    name: 'Georgetown, Ascension Island',
    tagline: 'An island where no one is allowed to be from',
    category: 'outpost',
    territory: 'Ascension · British Overseas Territory',
    coords: [-14.412, -7.929],
    population: '≈800, all on contract',
    nearest: { name: 'Jamestown, Saint Helena', km: 1300, coords: [-5.718, -15.924] },
    gettingThere:
      'Military flights from RAF Brize Norton refuel here en route to the Falklands; civilians need permission to board and a job to stay.',
    wikipedia: 'Ascension Island',
    blurb:
      'Nobody holds right of abode on Ascension — every resident is a temporary worker at the airfield, the BBC relay, or the tracking stations that talked to the Apollo missions. Its summit cloud forest is artificial: Darwin and Hooker had ships deliver trees to a bare volcano, one of history’s first terraforming experiments.',
  },
  {
    id: 'adamstown-pitcairn',
    name: 'Adamstown, Pitcairn',
    tagline: 'Where the Bounty mutineers went to disappear',
    category: 'outpost',
    territory: 'Pitcairn Islands · British Overseas Territory',
    coords: [-130.1, -25.066],
    population: '≈35',
    nearest: { name: 'Rikitea, Mangareva', km: 540, coords: [-134.969, -23.12] },
    gettingThere:
      'Fly to Tahiti, then Mangareva, then 32 hours aboard the quarterly supply ship — finishing with a longboat ride through the surf into Bounty Bay.',
    wikipedia: 'Adamstown, Pitcairn Islands',
    blurb:
      'In 1790, nine Bounty mutineers and their Tahitian companions burned their ship in the bay below and vanished from the world for 18 years. Their descendants are still here — the smallest national jurisdiction on Earth, governed by a mayor and reachable four times a year.',
  },
  {
    id: 'palmerston-island',
    name: 'Palmerston Island',
    tagline: 'One atoll, one family, three branches, since 1863',
    category: 'outpost',
    territory: 'Cook Islands',
    coords: [-163.17, -18.07],
    population: '≈35',
    nearest: { name: 'Aitutaki, Cook Islands', km: 370, coords: [-159.79, -18.87] },
    gettingThere:
      'A supply ship calls a handful of times a year; otherwise it is a two-day yacht passage from Rarotonga, anchoring outside the reef and waiting to be fetched.',
    wikipedia: 'Palmerston Island',
    blurb:
      'William Marsters, a Lancashire ship’s carpenter, settled this atoll in 1863 with his three Polynesian wives and divided it among the three family lines — divisions still honored today. Almost everyone on the island is a Marsters, and they speak a nineteenth-century English found nowhere else.',
  },
  {
    id: 'ittoqqortoormiit',
    name: 'Ittoqqortoormiit',
    tagline: 'A scatter of painted houses at the mouth of the world’s largest fjord',
    category: 'outpost',
    territory: 'Greenland · Kingdom of Denmark',
    coords: [-21.966, 70.485],
    population: '≈345',
    nearest: { name: 'Tasiilaq, Greenland', km: 800, coords: [-37.637, 65.614] },
    gettingThere:
      'Helicopter from a gravel airstrip served twice weekly from Iceland; a supply ship gets through twice a year, when the sea ice allows.',
    wikipedia: 'Ittoqqortoormiit',
    blurb:
      'The sea here is frozen for some nine months of the year, and the nearest Greenlandic town is 800 km down the coast. Hunters still work the ice edge of Scoresby Sund, the largest fjord system on Earth, sharing it with polar bears, muskoxen, and almost no one.',
  },
  {
    id: 'qaanaaq',
    name: 'Qaanaaq',
    tagline: 'A town moved at gunpoint to the top of the world',
    category: 'outpost',
    territory: 'Greenland · Kingdom of Denmark',
    coords: [-69.23, 77.47],
    population: '≈600',
    nearest: { name: 'Upernavik, Greenland', km: 700, coords: [-56.15, 72.79] },
    gettingThere:
      'Air Greenland props via Upernavik or Thule, weather permitting — and at 77° North, the weather does not often permit.',
    wikipedia: 'Qaanaaq',
    blurb:
      'In 1953 the Inughuit of Thule were given days to leave their ancestral village so an American air base could expand; Qaanaaq is where they rebuilt, 100 km further north. It remains one of the northernmost towns on Earth, where hunters still travel by dog sledge under four months of polar night.',
  },
  {
    id: 'grise-fiord',
    name: 'Grise Fiord',
    tagline: 'Aujuittuq — “the place that never thaws”',
    category: 'outpost',
    territory: 'Nunavut, Canada',
    coords: [-82.9, 76.42],
    population: '≈130',
    nearest: { name: 'Resolute, Nunavut', km: 400, coords: [-94.83, 74.7] },
    gettingThere: 'A Twin Otter from Resolute, when the fog lifts. It often doesn’t.',
    wikipedia: 'Grise Fiord',
    blurb:
      'Canada’s northernmost civilian community exists because the government relocated Inuit families here in 1953 to assert Arctic sovereignty, promising they could return home. They couldn’t — and Canada formally apologized only in 2010. The community that endured is now the proud, improbable capital of the High Arctic.',
  },
  {
    id: 'oymyakon',
    name: 'Oymyakon',
    tagline: 'The coldest permanently inhabited place on Earth',
    category: 'outpost',
    territory: 'Sakha Republic, Russia',
    coords: [142.77, 63.46],
    population: '≈460',
    nearest: { name: 'Yakutsk (nearest city)', km: 930, coords: [129.73, 62.03] },
    gettingThere:
      'Two days’ drive from Yakutsk along the Kolyma Highway — the “Road of Bones” — in a vehicle that must never be switched off.',
    wikipedia: 'Oymyakon',
    blurb:
      'In 1933 the thermometer here read −67.7 °C, the coldest ever recorded in a permanently inhabited place. School is cancelled only below −52 °C; the ground is permanently frozen, so the dead are buried with bonfires that thaw the earth one metre at a time.',
  },
  {
    id: 'villa-las-estrellas',
    name: 'Villa Las Estrellas',
    tagline: 'A village in Antarctica where residents surrender their appendix',
    category: 'outpost',
    territory: 'King George Island · Chilean base',
    coords: [-58.966, -62.201],
    population: '≈80–120',
    nearest: { name: 'Puerto Williams, Chile', km: 950, coords: [-67.62, -54.93] },
    gettingThere:
      'A military flight from Punta Arenas to the gravel strip at Frei Base, or two days crossing the Drake Passage — the roughest sea passage on Earth.',
    wikipedia: 'Villa Las Estrellas',
    blurb:
      'One of only two civilian settlements on the entire continent: a school, a post office, a gym, and a famous rule of thumb — long-term residents are asked to have their appendix removed first, because the nearest full hospital is across the Drake Passage.',
  },
  {
    id: 'puerto-eden',
    name: 'Puerto Edén',
    tagline: 'A village of boardwalks in the rainiest corner of Patagonia',
    category: 'outpost',
    territory: 'Chilean Patagonia',
    coords: [-74.41, -49.125],
    population: '≈180',
    nearest: { name: 'Puerto Natales, Chile', km: 320, coords: [-72.51, -51.73] },
    gettingThere:
      'No road reaches it and none ever has. A ferry threading the fjords calls weekly, weather permitting — and this is a place where it rains most days of the year.',
    wikipedia: 'Puerto Edén',
    blurb:
      'There are no streets, only wooden walkways over the bog. This is the home of the last few speakers of Kawésqar, the language of the canoe people who navigated these channels for millennia. The rest of the world is a long boat ride away in any direction.',
  },
  {
    id: 'hanga-roa',
    name: 'Hanga Roa, Rapa Nui',
    tagline: 'The town at the navel of the world',
    category: 'outpost',
    territory: 'Easter Island · Chile',
    coords: [-109.436, -27.153],
    population: '≈7,700',
    nearest: { name: 'Adamstown, Pitcairn', km: 2075, coords: [-130.1, -25.066] },
    gettingThere:
      'A five-hour flight from Santiago across 3,500 km of open Pacific — one of the most isolated commercial routes in the world.',
    wikipedia: 'Hanga Roa',
    blurb:
      'The Rapa Nui called their island Te Pito o Te Henua — sometimes translated “the navel of the world” — and the name is honest: the nearest inhabited neighbour is Pitcairn, 2,000 km away, population 35. Nearly a thousand moai still stand watch over all that distance.',
  },
  {
    id: 'waitangi-chatham',
    name: 'Waitangi, Chatham Islands',
    tagline: 'First inhabited place on Earth to see the new day',
    category: 'outpost',
    territory: 'New Zealand',
    coords: [-176.559, -43.954],
    population: '≈730 (islands)',
    nearest: { name: 'Christchurch, New Zealand', km: 800, coords: [172.64, -43.53] },
    gettingThere:
      'Small planes from Christchurch, Wellington, or Auckland. The islands keep their own time zone, 45 minutes ahead of the mainland.',
    wikipedia: 'Chatham Islands',
    blurb:
      'Home of the Moriori, whose ancestor Nunuku forbade warfare five centuries ago — a covenant of peace they kept even through invasion. East of the dateline’s bend, these islands greet each calendar day before almost anywhere else with a permanent population.',
  },
  {
    id: 'alofi-niue',
    name: 'Alofi, Niue',
    tagline: 'The capital of a nation of 1,600 people',
    category: 'outpost',
    territory: 'Niue · free association with New Zealand',
    coords: [-169.918, -19.055],
    population: '≈600 (nation ≈1,600)',
    nearest: { name: 'Neiafu, Vavaʻu, Tonga', km: 430, coords: [-173.983, -18.65] },
    gettingThere:
      'One or two flights a week from Auckland. Between planes, the airport is simply a quiet field near the sea.',
    wikipedia: 'Alofi',
    blurb:
      'Niue — “the Rock” — is one of the world’s largest raised coral atolls and one of its smallest self-governing nations. More than ninety percent of Niueans live overseas; those who remain made their island the world’s first whole-country Dark Sky Nation. The night sky here is officially protected.',
  },
  {
    id: 'fakaofo-tokelau',
    name: 'Fakaofo, Tokelau',
    tagline: 'A nation with no airport, anywhere',
    category: 'outpost',
    territory: 'Tokelau · New Zealand territory',
    coords: [-171.24, -9.38],
    population: '≈500 (territory ≈1,500)',
    nearest: { name: 'Apia, Samoa', km: 500, coords: [-171.76, -13.83] },
    gettingThere:
      'Tokelau is perhaps the last territory on Earth reachable only by sea: a chartered ship from Apia takes about 26 hours, then a barge ride over the reef.',
    wikipedia: 'Fakaofo',
    blurb:
      'Three atolls, none more than five metres above the sea, connected to the world by a single ship. Tokelau was among the first places on Earth to run almost entirely on solar power — a nation of coral, coconuts, and sunlight.',
  },
  {
    id: 'little-diomede',
    name: 'Diomede, Alaska',
    tagline: 'From the school windows you can see Russia — and tomorrow',
    category: 'outpost',
    territory: 'Little Diomede Island, United States',
    coords: [-168.921, 65.753],
    population: '≈80',
    nearest: {
      name: 'Big Diomede, Russia',
      km: 4,
      coords: [-169.06, 65.77],
      label: 'Nearest land (21 hours ahead)',
    },
    gettingThere:
      'Helicopter from Nome, weather allowing; in some winters a runway is carved into the frozen strait itself.',
    wikipedia: 'Diomede, Alaska',
    blurb:
      'The village clings to the west face of Little Diomede, staring across four kilometres of water at Big Diomede — which is in Russia, and, thanks to the date line between them, almost a full day in the future. The islands are nicknamed Yesterday and Tomorrow.',
  },
  {
    id: 'adak',
    name: 'Adak, Alaska',
    tagline: 'The westernmost town in America, built for 6,000, home to 170',
    category: 'outpost',
    territory: 'Aleutian Islands, United States',
    coords: [-176.634, 51.88],
    population: '≈170',
    nearest: { name: 'Atka, Alaska', km: 170, coords: [-174.2, 52.2] },
    gettingThere:
      'A scheduled jet lands twice a week — 2,000 km from Anchorage, far past the end of the road system, in the “birthplace of the winds.”',
    wikipedia: 'Adak, Alaska',
    blurb:
      'A Cold War naval station once housed six thousand people here; when it closed, fewer than two hundred stayed. They inherited a full-sized town — swimming pool, bowling alley, McDonald’s — most of it standing empty in the fog of the Aleutians.',
  },
  {
    id: 'foula',
    name: 'Foula',
    tagline: 'Britain’s loneliest island still keeps the old calendar',
    category: 'outpost',
    territory: 'Shetland, Scotland',
    coords: [-2.073, 60.133],
    population: '≈35',
    nearest: { name: 'Walls, Shetland', km: 30, coords: [-1.56, 60.23] },
    gettingThere:
      'An eight-seat islander plane or a small ferry from Shetland, both hostage to the weather for days at a time.',
    wikipedia: 'Foula',
    blurb:
      'Foula never adopted the calendar reform of 1752: Christmas is celebrated on 6 January, Newerday a week later. Its cliffs are among the highest in Britain, its ponies and sheep outnumber its people comfortably, and its name likely gave Shakespeare’s “ultima Thule” its Shetland echo.',
  },
  {
    id: 'rapa-iti',
    name: 'Rapa Iti',
    tagline: 'The far southern edge of Polynesia, ringed by hill forts',
    category: 'outpost',
    territory: 'Austral Islands, French Polynesia',
    coords: [-144.33, -27.617],
    population: '≈500',
    nearest: { name: 'Raivavae', km: 530, coords: [-147.66, -23.87] },
    gettingThere:
      'There is no airstrip. The freighter Tuhaa Pae calls from Tahiti roughly once a month — a 1,200 km voyage to the edge of the tropics.',
    wikipedia: 'Rapa Iti',
    blurb:
      'The southernmost inhabited island of French Polynesia, too cool for coconut palms, its ridgeline crowned with ancient fortified villages. Five hundred people, a drowned volcanic caldera for a harbour, and a boat that comes when it comes.',
  },

  // ————————————————————————————————— STATIONS & BASES
  {
    id: 'port-aux-francais',
    name: 'Port-aux-Français, Kerguelen',
    tagline: 'France’s loneliest post office, on the Desolation Islands',
    category: 'station',
    territory: 'French Southern and Antarctic Lands',
    coords: [70.219, -49.352],
    population: '≈45 winter · ≈100 summer',
    nearest: { name: 'Martin-de-Viviès, Île Amsterdam', km: 1420, coords: [77.554, -37.797] },
    gettingThere:
      'Four or five rotations a year of the research ship Marion Dufresne from Réunion — ten days’ sail. No archipelago this size anywhere on Earth is farther from an airstrip.',
    wikipedia: 'Port-aux-Français',
    blurb:
      'Captain Cook named these the Desolation Islands, and the French kept the sentiment. Scientists and soldiers rotate through to study seals, satellites, and the upper atmosphere; the base post office cheerfully franks mail from one of the emptiest places in any ocean.',
  },
  {
    id: 'ny-alesund',
    name: 'Ny-Ålesund',
    tagline: 'The world’s northernmost town is radio-silent by law',
    category: 'station',
    territory: 'Svalbard, Norway',
    coords: [11.922, 78.925],
    population: '≈35 winter · ≈120 summer',
    nearest: { name: 'Longyearbyen, Svalbard', km: 110, coords: [15.63, 78.22] },
    gettingThere:
      'A small prop plane from Longyearbyen twice a week. Visitors must switch off Wi-Fi and Bluetooth — the settlement is a radio-quiet zone for its instruments.',
    wikipedia: 'Ny-Ålesund',
    blurb:
      'A former mining camp reborn as the world’s northernmost year-round research community, shared by a dozen nations. The mast Roald Amundsen used to launch the airship Norge over the North Pole in 1926 still stands at the edge of town.',
  },
  {
    id: 'gough-island',
    name: 'Gough Island',
    tagline: 'Six people, several million seabirds',
    category: 'station',
    territory: 'Tristan da Cunha · British Overseas Territory',
    coords: [-9.934, -40.318],
    population: '6–8 (weather team)',
    nearest: { name: 'Edinburgh of the Seven Seas', km: 400, coords: [-12.311, -37.067] },
    gettingThere:
      'The annual relief voyage of the S.A. Agulhas II from Cape Town swaps out the South African weather team once a year. Between ships: no way in, no way out.',
    wikipedia: 'Gough Island',
    blurb:
      'A World Heritage seabird city in the Roaring Forties, staffed by a rotating team of six meteorologists. Its strangest story is the house mice that arrived with sealers and evolved into predators of albatross chicks — and the audacious campaign to give the island back to the birds.',
  },
  {
    id: 'wake-island',
    name: 'Wake Island',
    tagline: 'Where America’s date begins',
    category: 'station',
    territory: 'US Minor Outlying Islands',
    coords: [166.636, 19.282],
    population: '≈100 (military & contractors)',
    nearest: { name: 'Utirik Atoll, Marshall Islands', km: 950, coords: [169.84, 11.24] },
    gettingThere:
      'Military flights only; the atoll is a US Air Force installation and civilian access requires clearance few ever get.',
    wikipedia: 'Wake Island',
    blurb:
      'Pan Am’s flying boats once refuelled here at a little hotel in the middle of nowhere; then came one of the Pacific war’s most stubborn sieges. On the far side of the date line, Wake lives a day ahead of the country that administers it.',
  },
  {
    id: 'trindade',
    name: 'Trindade Island',
    tagline: 'Volcanic spires, sea turtles, and rocks made of plastic',
    category: 'station',
    territory: 'Espírito Santo, Brazil',
    coords: [-29.331, -20.513],
    population: '≈8 (Brazilian Navy)',
    nearest: { name: 'Vitória, Brazil', km: 1140, coords: [-40.29, -20.32] },
    gettingThere:
      'Brazilian Navy ships rotate the small garrison from Vitória; visiting scientists hitch rides when there is a bunk to spare.',
    wikipedia: 'Trindade and Martim Vaz',
    blurb:
      'A jagged volcanic outpost 1,100 km off Brazil, guarded by a handful of sailors and thousands of nesting green turtles. In 2023, researchers here described “plastiglomerates” — rocks fused with melted plastic — geology quietly recording our era on one of the loneliest beaches in the Atlantic.',
  },
  {
    id: 'st-peter-st-paul',
    name: 'St Peter and St Paul Archipelago',
    tagline: 'Bare rocks on the mid-Atlantic seam, four researchers at a time',
    category: 'station',
    territory: 'Brazil',
    coords: [-29.346, 0.917],
    population: '4 (rotating researchers)',
    nearest: { name: 'Fernando de Noronha', km: 630, coords: [-32.41, -3.85] },
    gettingThere:
      'Brazilian research vessels rotate four scientists at a time onto rocks barely above the swell; the station is mounted on shock absorbers because the sea never stops hitting.',
    wikipedia: 'Saint Peter and Saint Paul Archipelago',
    blurb:
      'One of the very few places where the Mid-Atlantic Ridge breaks the surface — mantle rock, almost on the equator, with no soil to speak of. Darwin landed from the Beagle in 1832 and noted the boobies and crabs; they are still essentially the only residents.',
  },
  {
    id: 'macquarie-island',
    name: 'Macquarie Island',
    tagline: 'The only place the Earth’s mantle stands above the sea',
    category: 'station',
    territory: 'Tasmania, Australia',
    coords: [158.939, -54.62],
    population: '≈20–40 (research station)',
    nearest: { name: 'Invercargill, New Zealand', km: 1100, coords: [168.35, -46.41] },
    gettingThere:
      'Resupply voyages from Hobart, three or four days across the Furious Fifties — some of the roughest water on the planet.',
    wikipedia: 'Macquarie Island',
    blurb:
      'A sliver of oceanic crust squeezed up between two plates — the only spot on Earth where mantle rock is actively exposed above sea level. Royal penguins breed here and nowhere else, in colonies that carpet entire beaches around the huddled station.',
  },
  {
    id: 'ile-amsterdam',
    name: 'Martin-de-Viviès, Île Amsterdam',
    tagline: 'Thirty people and the world’s rarest albatross',
    category: 'station',
    territory: 'French Southern and Antarctic Lands',
    coords: [77.554, -37.797],
    population: '≈25–30',
    nearest: { name: 'Port-aux-Français, Kerguelen', km: 1420, coords: [70.219, -49.352] },
    gettingThere:
      'The Marion Dufresne calls a few times a year on its circuit from Réunion. There is no other way.',
    wikipedia: 'Île Amsterdam',
    blurb:
      'A lone volcano in the vast blank between Africa and Australia. The Amsterdam albatross — one of the rarest birds alive, a few dozen pairs — breeds on its plateau and nowhere else on Earth. The base’s little bar is, plausibly, the most isolated in any ocean.',
  },
  {
    id: 'alfred-faure-crozet',
    name: 'Alfred Faure, Crozet Islands',
    tagline: 'King penguins by the hundred thousand, people by the dozen',
    category: 'station',
    territory: 'French Southern and Antarctic Lands',
    coords: [51.858, -46.432],
    population: '≈20',
    nearest: { name: 'Port-aux-Français, Kerguelen', km: 1400, coords: [70.219, -49.352] },
    gettingThere: 'The Marion Dufresne from Réunion, several days’ sail, a few times a year.',
    wikipedia: 'Alfred Faure',
    blurb:
      'The Crozets host some of the largest king penguin colonies ever recorded — at their peak, one island held around half a million pairs. Offshore, orcas here invented a technique of surfing the shorebreak to snatch seal pups: behaviour documented almost nowhere else.',
  },
  {
    id: 'jan-mayen',
    name: 'Olonkinbyen, Jan Mayen',
    tagline: 'Eighteen people beneath the northernmost volcano above the sea',
    category: 'station',
    territory: 'Norway',
    coords: [-8.293, 70.982],
    population: '≈18',
    nearest: { name: 'Northeast Iceland', km: 570, coords: [-15.95, 66.45] },
    gettingThere:
      'Norwegian military Hercules flights a few times a year, landing on a gravel strip squeezed between lava fields and the sea.',
    wikipedia: 'Jan Mayen',
    blurb:
      'Beerenberg, a 2,277-metre glacier-draped cone, is the world’s northernmost active volcano above sea level; it last erupted in 1985 with the station in residence. The eighteen inhabitants run the weather and radio installations, and by tradition swim in the Arctic on Midsummer.',
  },
  {
    id: 'amundsen-scott',
    name: 'Amundsen–Scott South Pole Station',
    tagline: 'The bottom of the world, staffed year-round',
    category: 'station',
    territory: 'Antarctica · United States program',
    coords: [0, -90],
    displayCoords: [0, -85.02],
    flyZoom: 3,
    population: '≈150 summer · ≈45 winter',
    nearest: { name: 'Vostok Station', km: 1300, coords: [106.837, -78.464] },
    gettingThere:
      'Ski-equipped LC-130s from McMurdo in summer. In winter — eight months of it — essentially nothing comes in or out; the crew watches the aurora and waits for the sun.',
    wikipedia: 'Amundsen–Scott South Pole Station',
    note: 'The map’s tiles end at 85° South, so this marker sits at the edge of the drawable world. The station itself is 550 km further — at the exact bottom of the planet, where every direction is north.',
    blurb:
      'Built where Amundsen and Scott raced in 1911–12, the station drifts with the ice sheet about ten metres a year, so the ceremonial pole is repositioned every New Year’s Day. Winter-overs watch the only sunset of their year in March, and the next sunrise in September.',
  },
  {
    id: 'vostok-station',
    name: 'Vostok Station',
    tagline: 'The coldest place ever measured on Earth',
    category: 'station',
    territory: 'Antarctica · Russian program',
    coords: [106.837, -78.464],
    population: '≈25 summer · ≈13 winter',
    nearest: { name: 'Concordia Station', km: 560, coords: [123.35, -75.1] },
    gettingThere:
      'Tractor convoys haul fuel some 1,400 km from the coast; ski-planes land in the brief summer window when it is merely fifty below.',
    wikipedia: 'Vostok Station',
    blurb:
      'On 21 July 1983 the thermometer here read −89.2 °C — the coldest natural temperature ever recorded at the surface of the Earth. Four kilometres beneath the station lies Lake Vostok, a body of fresh water sealed under the ice for millions of years.',
  },
  {
    id: 'concordia-station',
    name: 'Concordia Station',
    tagline: '“White Mars” — where Europe rehearses deep space',
    category: 'station',
    territory: 'Antarctica · French–Italian program',
    coords: [123.35, -75.1],
    population: '≈13 winter · ≈60 summer',
    nearest: { name: 'Vostok Station', km: 560, coords: [106.837, -78.464] },
    gettingThere:
      'Traverse convoys crawl ten days inland from the coast; the winter crew is then alone for nine months, beyond any possibility of rescue.',
    wikipedia: 'Concordia Station',
    blurb:
      'Three months of total darkness, air with a third less oxygen, and a crew of about thirteen: the European Space Agency embeds doctors here because it is the closest thing on Earth to a voyage to Mars. They call it White Mars without irony.',
  },
  {
    id: 'eureka',
    name: 'Eureka, Nunavut',
    tagline: '“The Garden Spot of the Arctic,” population eight',
    category: 'station',
    territory: 'Ellesmere Island, Canada',
    coords: [-85.94, 79.989],
    population: '8 (weather station staff)',
    nearest: { name: 'Grise Fiord, Nunavut', km: 400, coords: [-82.9, 76.42] },
    gettingThere: 'Charter flights from Resolute. The station has been staffed without a break since 1947.',
    wikipedia: 'Eureka, Nunavut',
    blurb:
      'A weather station on a fjord at 80° North, ironically nicknamed for its comparative lushness — muskoxen and Arctic hares graze what passes for a meadow here. Winters run to −55 °C under months of darkness, monitored by a staff you can count on two hands.',
  },
  {
    id: 'alert',
    name: 'Alert, Nunavut',
    tagline: 'The northernmost continuously inhabited place on Earth',
    category: 'station',
    territory: 'Ellesmere Island, Canada',
    coords: [-62.338, 82.501],
    population: '≈60 (military & meteorologists)',
    nearest: { name: 'Eureka, Nunavut', km: 490, coords: [-85.94, 79.989] },
    gettingThere:
      'Royal Canadian Air Force flights only. Alert is 817 km from the North Pole — and closer to Moscow than to Ottawa.',
    wikipedia: 'Alert, Nunavut',
    blurb:
      'A signals-intelligence and weather outpost named for HMS Alert, which wintered off this shore in 1875. No one is “from” Alert; everyone is posted here, rotating through the sunless winter at the very top of the mapped world.',
  },

  // ————————————————————————————————— UNINHABITED
  {
    id: 'bouvet-island',
    name: 'Bouvet Island',
    tagline: 'The most remote island on Earth',
    category: 'uninhabited',
    territory: 'Norwegian dependency',
    coords: [3.359, -54.421],
    population: '0',
    nearest: {
      name: 'Edinburgh of the Seven Seas, Tristan da Cunha',
      km: 2260,
      coords: [-12.311, -37.067],
      label: 'Nearest inhabited place',
    },
    gettingThere:
      'There is no harbour and no safe landing; the rare expeditions arrive by helicopter from ships, a few times a decade. An automated weather station is the only tenant.',
    wikipedia: 'Bouvet Island',
    blurb:
      'Ninety-three percent glacier, ringed by cliffs, sitting alone in the South Atlantic further from anywhere than any other island on Earth. In 1964 an expedition found an abandoned lifeboat in a lagoon here — no ship, no crew, no distress record; the mystery was never fully laid to rest.',
  },
  {
    id: 'clipperton-island',
    name: 'Clipperton Island',
    tagline: 'A ring of coral with one of history’s darkest castaway stories',
    category: 'uninhabited',
    territory: 'France (administered from 10,000 km away)',
    coords: [-109.216, 10.303],
    population: '0',
    nearest: { name: 'Socorro Island, Mexico', km: 960, coords: [-110.98, 18.78] },
    gettingThere:
      'Occasional French naval patrols, research cruises, and ham-radio expeditions — a ten-day round trip by boat out of Mexico.',
    wikipedia: 'Clipperton Island',
    blurb:
      'When supply ships stopped coming to the guano settlement here in 1914, the marooned colony starved down to a tyrannical lighthouse keeper and a handful of women and children; the survivors were rescued in 1917 only after the women killed him. Today the atoll belongs to millions of bright orange land crabs.',
  },
  {
    id: 'henderson-island',
    name: 'Henderson Island',
    tagline: 'Pristine and polluted at once',
    category: 'uninhabited',
    territory: 'Pitcairn Islands · British Overseas Territory',
    coords: [-128.324, -24.343],
    population: '0',
    nearest: { name: 'Adamstown, Pitcairn', km: 190, coords: [-130.1, -25.066] },
    gettingThere:
      'Pitcairners come by longboat every year or two to gather miro wood for their carvings. There is no anchorage and no fresh water.',
    wikipedia: 'Henderson Island (Pitcairn Islands)',
    blurb:
      'A raised coral island so untouched it is a UNESCO World Heritage site — four of its birds exist nowhere else. Yet a 2015 survey estimated its beaches held some 38 million pieces of plastic, then the densest debris ever recorded: the loneliest shore on Earth, and the tide still finds it.',
  },
  {
    id: 'ducie',
    name: 'Ducie Atoll',
    tagline: 'The nearest land to Point Nemo',
    category: 'uninhabited',
    territory: 'Pitcairn Islands · British Overseas Territory',
    coords: [-124.783, -24.683],
    population: '0',
    nearest: { name: 'Adamstown, Pitcairn', km: 540, coords: [-130.1, -25.066] },
    gettingThere: 'Chartered expeditions from Mangareva, or a passing yacht. A handful of people a year, at most.',
    wikipedia: 'Ducie Island',
    blurb:
      'A mile-wide ring of coral rubble and a lagoon, thick with nesting Murphy’s petrels. Its chief distinction is a negative one: sail from here toward the centre of the South Pacific and you will pass the most remote point in any ocean before you see land again.',
  },
  {
    id: 'rockall',
    name: 'Rockall',
    tagline: 'The last rock of a drowned volcano, and of an empire',
    category: 'uninhabited',
    territory: 'United Kingdom (disputed waters)',
    coords: [-13.687, 57.596],
    population: '0',
    nearest: { name: 'North Uist, Outer Hebrides', km: 370, coords: [-7.34, 57.6] },
    gettingThere:
      'A 400 km boat ride into the open North Atlantic, then a leap from a moving deck onto bare, wave-washed granite. It is said more people have walked on the Moon than have slept on Rockall.',
    wikipedia: 'Rockall',
    blurb:
      'A 25-metre granite stump — all that remains above water of an ancient volcano. The UK annexed it by royal proclamation in 1955, the final territorial expansion of the British Empire: a soldier was hoisted up to cement in a plaque and raise a flag over the seabirds.',
  },
  {
    id: 'tromelin',
    name: 'Tromelin Island',
    tagline: 'Where sixty people were abandoned for fifteen years',
    category: 'uninhabited',
    territory: 'French Southern and Antarctic Lands',
    coords: [54.525, -15.892],
    population: '0 (visiting missions)',
    nearest: { name: 'Northeast Madagascar', km: 460, coords: [50.28, -14.9] },
    gettingThere:
      'French meteorological missions land on a short airstrip on a sand island barely a metre above the swell.',
    wikipedia: 'Tromelin Island',
    blurb:
      'In 1761 the slave ship Utile wrecked here; the French crew built a raft, sailed away, and left sixty enslaved Malagasy people behind with a promise to return. A ship finally came back fifteen years later and found seven women and an eight-month-old child alive. Their story is told plainly here because it should be told.',
  },
  {
    id: 'heard-island',
    name: 'Heard Island',
    tagline: 'Australia’s highest mountain is an erupting volcano no one watches',
    category: 'uninhabited',
    territory: 'Australian external territory',
    coords: [73.504, -53.106],
    population: '0',
    nearest: { name: 'Port-aux-Français, Kerguelen', km: 450, coords: [70.219, -49.352] },
    gettingThere:
      'Roughly two weeks’ sail from Fremantle through the Furious Fifties; a few scientific expeditions per decade attempt a landing.',
    wikipedia: 'Heard Island and McDonald Islands',
    blurb:
      'Big Ben rises 2,745 metres straight out of the Southern Ocean — taller than anything on the Australian mainland — glaciated to the waterline and intermittently erupting with, usually, not a single human witness. Satellites notice before anyone else does.',
  },
  {
    id: 'inaccessible-island',
    name: 'Inaccessible Island',
    tagline: 'The name is a fair warning',
    category: 'uninhabited',
    territory: 'Tristan da Cunha · British Overseas Territory',
    coords: [-12.676, -37.303],
    population: '0',
    nearest: { name: 'Edinburgh of the Seven Seas', km: 45, coords: [-12.311, -37.067] },
    gettingThere:
      'A small-boat trip from Tristan when the swell allows, which is not often; the cliffs then still have to let you ashore.',
    wikipedia: 'Inaccessible Island',
    blurb:
      'Home of the Inaccessible Island rail — the smallest flightless bird on Earth, living out its whole existence on fourteen square kilometres it can never leave. In the 1870s two German brothers tried to settle here to trade with passing ships; the ships did not pass, and they were rescued half-starved two years later.',
  },
  {
    id: 'peter-i-island',
    name: 'Peter I Island',
    tagline: 'Fewer visitors than the summit of Everest sees in a season',
    category: 'uninhabited',
    territory: 'Norwegian claim, Antarctic waters',
    coords: [-90.577, -68.853],
    population: '0',
    nearest: { name: 'Rothera Station, Antarctica', km: 900, coords: [-68.13, -67.57] },
    gettingThere:
      'Locked in pack ice most of the year; the handful of successful landings have mostly required helicopters. Radio amateurs rank it among the rarest places on Earth to transmit from.',
    wikipedia: 'Peter I Island',
    blurb:
      'An ice-armoured volcano in the Bellingshausen Sea, sighted in 1821 and not set foot upon for another 108 years. The number of people who have ever stood on it is plausibly smaller than a single day’s crowd on Everest.',
  },
  {
    id: 'palmyra',
    name: 'Palmyra Atoll',
    tagline: 'A rainforest atoll owned, in effect, by its seabirds',
    category: 'uninhabited',
    territory: 'US Minor Outlying Islands · nature reserve',
    coords: [-162.078, 5.883],
    population: '0 permanent · 4–25 staff',
    nearest: { name: 'Teraina, Kiribati', km: 230, coords: [-160.38, 4.68] },
    gettingThere: 'Charter flights land on a WWII airstrip a few times a year, carrying researchers and supplies.',
    wikipedia: 'Palmyra Atoll',
    blurb:
      'Five thousand servicemen were stationed on this atoll in the 1940s; the jungle has been quietly taking the runways back ever since. Now a whole-atoll science reserve — rats eradicated, native trees returning, a million seabirds wheeling over the wrecks.',
  },
  {
    id: 'zavodovski',
    name: 'Zavodovski Island',
    tagline: 'A million penguins on an erupting volcano',
    category: 'uninhabited',
    territory: 'South Sandwich Islands · British Overseas Territory',
    coords: [-27.575, -56.3],
    population: '0',
    nearest: { name: 'Grytviken, South Georgia', km: 600, coords: [-36.509, -54.281] },
    gettingThere:
      'Anchor off an active volcano in the Southern Ocean, then land through surf onto bare lava. Almost nobody does.',
    wikipedia: 'Zavodovski Island',
    blurb:
      'Roughly a million chinstrap penguins — among the largest penguin colonies on Earth — nest on the flanks of a volcano that steams and occasionally erupts beneath them. The sealers who found it named its summit Mount Asphyxia, for the smell. The penguins are unbothered.',
  },
  {
    id: 'campbell-island',
    name: 'Campbell Island',
    tagline: 'Home of the loneliest tree on Earth',
    category: 'uninhabited',
    territory: 'New Zealand subantarctic',
    coords: [169.14, -52.54],
    population: '0 (station closed 1995)',
    nearest: { name: 'Bluff, New Zealand', km: 660, coords: [168.35, -46.6] },
    gettingThere:
      'Expedition ships and research charters from Bluff, across the Roaring Forties; the old meteorological station stands empty.',
    wikipedia: 'Campbell Island, New Zealand',
    blurb:
      'A single Sitka spruce, planted here around 1901, grows more than 200 km from the nearest other tree — scientists have used its rings, spiked with 1960s bomb-test carbon, as a candidate marker for the start of the Anthropocene. Around it: megaherbs, southern royal albatrosses, and wind.',
  },
  {
    id: 'wrangel-island',
    name: 'Wrangel Island',
    tagline: 'Where the last mammoths outlived the pyramids',
    category: 'uninhabited',
    territory: 'Chukotka, Russia · nature reserve',
    coords: [-179.3, 71.23],
    population: '0 permanent (rangers rotate)',
    nearest: { name: 'Chukotka coast, Russia', km: 260, coords: [-179.44, 68.9] },
    gettingThere:
      'Icebreaker cruises in August, helicopters from Chukotka otherwise; a few rangers overwinter with the polar bears.',
    wikipedia: 'Wrangel Island',
    blurb:
      'Dwarf woolly mammoths survived on this island until roughly 4,000 years ago — the Great Pyramid was already standing while they grazed here. Today it hosts the world’s highest density of polar bear dens, patrolled by a handful of humans at most.',
  },
  {
    id: 'kaffeklubben',
    name: 'Kaffeklubben Island',
    tagline: 'The northernmost solid ground on Earth, named for a coffee club',
    category: 'uninhabited',
    territory: 'Peary Land · Greenland',
    coords: [-29.83, 83.666],
    population: '0',
    nearest: { name: 'Station Nord, Greenland', km: 300, coords: [-16.65, 81.6], label: 'Nearest occupied post' },
    gettingThere:
      'A chartered ski-plane from Station Nord when weather, ice, and money align; only a handful of expeditions have ever stood on it.',
    wikipedia: 'Kaffeklubben Island',
    blurb:
      'Danish geologist Lauge Koch named this gravel sliver in 1921 after the coffee club of Copenhagen’s Mineralogical Museum. It holds the modest, magnificent title of northernmost undisputed land on Earth — gravel banks occasionally surface in the ice beyond, but they shift and vanish, and Kaffeklubben’s Arctic poppies do not. Beyond it there is only frozen ocean, and then the Pole, 700 kilometres on.',
  },
  {
    id: 'devon-island',
    name: 'Devon Island',
    tagline: 'The largest uninhabited island on Earth, where NASA rehearses Mars',
    category: 'uninhabited',
    territory: 'Nunavut · Canada',
    coords: [-87.0, 75.1],
    population: '0 (a Mars-analog crew in high summer)',
    nearest: { name: 'Resolute, Cornwallis Island', km: 230, coords: [-94.83, 74.697] },
    gettingThere:
      'Charter flights from Resolute serve the summer research camp at Haughton crater; the rest of the year the island belongs to the muskoxen.',
    wikipedia: 'Devon Island',
    blurb:
      'A polar desert the size of a small country with a permanent population of zero: the Haughton impact crater is so cold, dry, and rocky that NASA and the Mars Society have spent decades testing rovers, suits, and crews there. At Dundas Harbour, two Mounted Police graves from the 1920s mark one of the loneliest postings in Canadian history — this island defeated even its police station.',
  },
  {
    id: 'st-matthew-island',
    name: 'St. Matthew Island',
    tagline: 'Alaska’s farthest island, where 6,000 reindeer became 42',
    category: 'uninhabited',
    territory: 'Bering Sea · Alaska, United States',
    coords: [-172.72, 60.4],
    population: '0',
    nearest: { name: 'Mekoryuk, Nunivak Island', km: 360, coords: [-166.19, 60.39] },
    gettingThere:
      'No flights, no harbor, no schedule — a day and more by research vessel from the Bering Sea coast, managed a few times a decade.',
    wikipedia: 'St. Matthew Island',
    blurb:
      'In 1944 the Coast Guard released 29 reindeer here as an emergency larder, then closed its station and sailed away. With no predators the herd hit 6,000 by 1963; after one brutal winter, 42 remained — a collapse ecology students have been assigned ever since. The island keeps its own company now: McKay’s bunting breeds here and almost nowhere else on Earth.',
  },

  // ————————————————————————————————— ABANDONED
  {
    id: 'hirta-st-kilda',
    name: 'Hirta, St Kilda',
    tagline: 'The islands at the edge of the world, empty since 1930',
    category: 'ghost',
    territory: 'Outer Hebrides, Scotland',
    coords: [-8.572, 57.812],
    population: '0 (evacuated 1930)',
    nearest: { name: 'North Uist, Outer Hebrides', km: 65, coords: [-7.34, 57.6] },
    gettingThere:
      'Day boats from Harris in the summer swells; seasonal conservation staff are the only overnight residents now.',
    wikipedia: 'St Kilda, Scotland',
    blurb:
      'For perhaps two thousand years the St Kildans lived on seabirds, climbing 400-metre cliffs barefoot to harvest gannets and fulmars. In 1930 the last 36 islanders asked to be evacuated, leaving an open Bible in each house and a street of cottages that still stands, roofless, facing the bay.',
  },
  {
    id: 'grytviken',
    name: 'Grytviken',
    tagline: 'A rusting whaling station where Shackleton rests',
    category: 'ghost',
    territory: 'South Georgia · British Overseas Territory',
    coords: [-36.509, -54.281],
    population: '0 permanent (museum & science staff nearby)',
    nearest: { name: 'Stanley, Falkland Islands', km: 1390, coords: [-57.85, -51.69] },
    gettingThere:
      'Cruise ships and research vessels from the Falklands, several days’ sail; visitors traditionally toast “the Boss” with whisky at Shackleton’s graveside.',
    wikipedia: 'Grytviken',
    blurb:
      'Between 1904 and 1965 this station processed tens of thousands of whales; the flensing plan, the try-pots, and the beached catcher boats are all still there, rusting at their moorings. Ernest Shackleton died in the bay in 1922 and was buried here at his wife’s request — facing south, toward the ice.',
  },
  {
    id: 'deception-island',
    name: 'Deception Island',
    tagline: 'A harbour inside a live volcano',
    category: 'ghost',
    territory: 'South Shetland Islands, Antarctica',
    coords: [-60.626, -62.947],
    population: '0 (summer scientists only)',
    nearest: { name: 'Villa Las Estrellas', km: 120, coords: [-58.966, -62.201] },
    gettingThere:
      'Ships sail through Neptune’s Bellows — a 230-metre gap in the crater wall — and anchor inside the flooded caldera itself.',
    wikipedia: 'Deception Island',
    blurb:
      'Whalers, then scientists, built here on the black sand of an active volcano’s drowned crater; eruptions in the late 1960s buried the whaling station and wrecked two research bases, and the ruins remain half-swallowed by ash. In places, the beach still steams.',
  },
  {
    id: 'pyramiden',
    name: 'Pyramiden',
    tagline: 'A Soviet town preserved by the cold, waiting for no one',
    category: 'ghost',
    territory: 'Svalbard, Norway (Russian company town)',
    coords: [16.325, 78.656],
    population: '0 (a few caretakers)',
    nearest: { name: 'Longyearbyen, Svalbard', km: 50, coords: [15.63, 78.22] },
    gettingThere: 'Boat or snowmobile from Longyearbyen. The hotel has reopened; the town has not.',
    wikipedia: 'Pyramiden',
    blurb:
      'A model Soviet mining settlement — swimming pool, grand piano, heroic mosaics — abandoned almost overnight in 1998. The Arctic climate is preserving it on a timescale of centuries, under the gaze of the world’s northernmost Lenin.',
  },
  {
    id: 'fordlandia',
    name: 'Fordlândia',
    tagline: 'Henry Ford’s Michigan-in-the-Amazon, reclaimed by the jungle',
    category: 'ghost',
    territory: 'Pará · Brazil',
    coords: [-55.494, -3.826],
    population: '≈2,000 among the ruins',
    nearest: { name: 'Aveiro, Pará', km: 30, coords: [-55.317, -3.606] },
    gettingThere:
      'A slow boat up the Tapajós from Santarém — the better part of a day on the river. There is no road worth the name.',
    wikipedia: 'Fordlândia',
    blurb:
      'In 1928 Henry Ford built a Midwestern town in the Amazon — clapboard houses, fire hydrants, a water tower, mandatory square dancing — to grow rubber for his tires. The trees died of leaf blight, the workers rioted over cafeteria rules, and Ford sold it all back to Brazil in 1945 without ever once visiting. The water tower still stands over the town Detroit forgot, and a few thousand Brazilians live quietly in its bones.',
    flyZoom: 8.5,
  },
  {
    id: 'kolmanskop',
    name: 'Kolmanskop',
    tagline: 'Diamond mansions filling with the Namib, one room at a time',
    category: 'ghost',
    territory: 'ǁKaras Region · Namibia',
    coords: [15.231, -26.704],
    population: '0 — guides commute from Lüderitz',
    nearest: { name: 'Lüderitz, Namibia', km: 10, coords: [15.159, -26.648] },
    gettingThere:
      'Ten minutes off the B4 from Lüderitz, with a permit for the diamond exclusion zone the town still technically sits inside.',
    wikipedia: 'Kolmanskop',
    blurb:
      'When diamonds could be plucked from this sand by moonlight, Kolmanskop had a ballroom, a casino, an ice factory, and an X-ray machine bought to look through miners rather than patients. The diamonds moved south and the people followed in the 1950s; the desert moved in behind them. Today the doors stand open to dunes that rise knee-deep in the parlors.',
    flyZoom: 10,
  },
  {
    id: 'humberstone',
    name: 'Humberstone',
    tagline: 'A nitrate empire undone by a chemistry breakthrough an ocean away',
    category: 'ghost',
    territory: 'Tarapacá · Chile',
    coords: [-69.794, -20.206],
    population: '0',
    nearest: { name: 'Pozo Almonte, Chile', km: 6, coords: [-69.786, -20.26] },
    gettingThere:
      'An easy detour off the Pan-American Highway, forty-five minutes inland from Iquique — the rare ghost town with a bus stop.',
    wikipedia: 'Humberstone and Santa Laura Saltpeter Works',
    blurb:
      'Chilean saltpeter fed the world’s fields and filled its munitions until German chemists learned to pull nitrogen from the air itself, and towns like this one stopped making sense. The pampinos left a theater with its seats still facing the stage and a swimming pool made from a ship’s iron hull. UNESCO now guards what the Atacama’s dryness had already preserved.',
    flyZoom: 10,
  },

  // ————————————————————————————————— SET APART — isolated by something other than distance
  {
    id: 'la-rinconada',
    name: 'La Rinconada',
    tagline: 'The highest human settlement on Earth, built on gold and ice',
    category: 'apart',
    territory: 'Puno, Peru',
    coords: [-69.446, -14.631],
    population: '≈30,000–50,000',
    nearest: { name: 'Juliaca, Peru', km: 120, coords: [-70.135, -15.5] },
    gettingThere:
      'A climbing dirt road from Juliaca that ends at 5,100 metres, where the glacier begins. There is no running water and no sewer. There is gold.',
    wikipedia: 'La Rinconada, Peru',
    blurb:
      'Lonely not by distance but by altitude: no permanent settlement on Earth sits higher. Tens of thousands live beside a shrinking glacier, many mining under the cachorreo system — thirty days unpaid, then one day to keep whatever ore they can carry.',
  },
  {
    id: 'supai',
    name: 'Supai, Arizona',
    tagline: 'The last town in America where the mail comes by mule',
    category: 'apart',
    territory: 'Havasupai Reservation, United States',
    coords: [-112.696, 36.238],
    population: '≈200',
    nearest: { name: 'Peach Springs, Arizona', km: 100, coords: [-113.425, 35.529] },
    gettingThere:
      'An hour down a dead-end road, then thirteen kilometres on foot, by mule, or by helicopter into a side gorge of the Grand Canyon.',
    wikipedia: 'Supai, Arizona',
    blurb:
      'The Havasupai — “people of the blue-green water” — have lived beside these travertine waterfalls for centuries, at the bottom of a canyon no road has ever reached. It is routinely called the most remote community in the contiguous United States, and its mule-train mail route is the last one left.',
  },
  {
    id: 'north-sentinel',
    name: 'North Sentinel Island',
    tagline: 'The most isolated society on Earth — by their own choice',
    category: 'apart',
    territory: 'Andaman Islands · India (autonomous in practice)',
    coords: [92.235, 11.557],
    population: 'Unknown · est. 50–200',
    nearest: { name: 'Port Blair, Andaman Islands', km: 50, coords: [92.75, 11.62] },
    gettingThere:
      'You don’t. The Sentinelese have refused contact for centuries, and Indian law enforces an exclusion zone around the island — a boundary that exists to protect them.',
    wikipedia: 'North Sentinel Island',
    blurb:
      'Perhaps the only place in this atlas that is lonely only from the outside: the Sentinelese have made it emphatically clear, for as long as anyone has records, that they want no visitors. By every account they are not castaways but a community — one that has chosen, consistently, to be left alone. This atlas marks them from a respectful distance.',
  },
  {
    id: 'monowi',
    name: 'Monowi, Nebraska',
    tagline: 'Population: one — and she is the mayor',
    category: 'apart',
    territory: 'Nebraska · United States',
    coords: [-98.33, 42.829],
    population: '1',
    nearest: { name: 'Lynch, Nebraska', km: 11, coords: [-98.464, 42.831] },
    gettingThere:
      'Nebraska Highway 12 runs right past, and the tavern keeps regular hours six days a week. Getting here is easy; staying is what nobody else chose.',
    wikipedia: 'Monowi, Nebraska',
    blurb:
      'Elsie Eiler is Monowi’s mayor, clerk, treasurer, tavern keeper, and entire electorate: each year she re-elects herself, renews her own liquor license, and collects taxes from herself. The village peaked near 150 in the 1930s before the Plains emptied out. Next to the bar stands the library her late husband Rudy left behind — five thousand books — where the loneliness of the Great Plains has a card catalog.',
    flyZoom: 9,
  },
  {
    id: 'whittier',
    name: 'Whittier, Alaska',
    tagline: 'A town that lives in one building, behind a tunnel that closes at night',
    category: 'apart',
    territory: 'Alaska · United States',
    coords: [-148.684, 60.773],
    population: '≈270, nearly all under one roof',
    nearest: { name: 'Girdwood, Alaska', km: 30, coords: [-149.166, 60.943] },
    gettingThere:
      'The only road in shares a single one-lane tunnel with a freight railroad — traffic alternates by timetable, and the tunnel shuts for the night around half past ten. Miss it, and Whittier keeps you.',
    wikipedia: 'Whittier, Alaska',
    blurb:
      'The Army built Whittier as a secret Cold War port, behind weather so reliably terrible it doubled as camouflage. Nearly everyone now lives in Begich Towers, a fourteen-story barracks turned vertical village — city hall, clinic, church, and grocery under one roof, with a tunnel to the school so the children never face the wind. Anchorage is an hour away; it rarely feels like it.',
    flyZoom: 9,
  },
  {
    id: 'point-roberts',
    name: 'Point Roberts, Washington',
    tagline: 'An American town you can only drive to through Canada',
    category: 'apart',
    territory: 'Washington · United States',
    coords: [-123.06, 48.985],
    population: '≈1,200',
    nearest: { name: 'Tsawwassen, British Columbia', km: 4, coords: [-123.087, 49.015], label: 'Across the line' },
    gettingThere:
      'From the rest of America: forty minutes and two international border crossings. The alternative is a boat across Boundary Bay.',
    wikipedia: 'Point Roberts, Washington',
    blurb:
      'In 1846 diplomats drew the 49th parallel across a map of the Pacific Northwest and sliced off the tip of a Canadian peninsula, stranding five square miles of the United States below the line. Schoolchildren past the third grade cross two borders each way to class; when the border closed in 2020, the town nearly emptied. Its isolation is entirely man-made — exactly one ruler-stroke thick.',
    flyZoom: 9.5,
  },
  {
    id: 'niihau',
    name: 'Niʻihau',
    tagline: 'The Forbidden Isle, closed to outsiders since 1915',
    category: 'apart',
    territory: 'Hawaii · United States',
    coords: [-160.156, 21.895],
    population: '≈80',
    nearest: { name: 'Kekaha, Kauaʻi', km: 45, coords: [-159.717, 21.971] },
    gettingThere:
      'Unless invited by a resident or the Robinson family, you don’t — save for brief, chaperoned helicopter tours that keep well clear of the village.',
    wikipedia: 'Niihau',
    blurb:
      'Elizabeth Sinclair bought Niʻihau from Kamehameha V in 1864 for ten thousand dollars, and her descendants have kept it closed to the world since 1915 — no hotels, no paved roads, no grid. The result confounds every expectation of what isolation costs: this is the last place on Earth where Hawaiian remains the language of everyday life. Distance was never the point; Kauaʻi glitters across the channel every night.',
    flyZoom: 8,
  },
  {
    id: 'surtsey',
    name: 'Surtsey',
    tagline: 'Born in 1963, sealed off ever since — pristine by decree',
    category: 'apart',
    territory: 'Vestmannaeyjar · Iceland',
    coords: [-20.605, 63.303],
    population: '0 — visiting scientists only',
    nearest: { name: 'Heimaey, Vestmannaeyjar', km: 20, coords: [-20.273, 63.442] },
    gettingThere:
      'Only research teams may land, a few days each summer; everyone else circles by boat or flies over.',
    wikipedia: 'Surtsey',
    blurb:
      'In November 1963 the sea south of Iceland began to boil, and when the eruption ended there was a new island, named for Surtr, the fire giant of Norse myth. Iceland declared it off-limits from birth so that science could watch life colonize bare rock in real time — every seed, gull, and seal logged since. When a tomato plant sprouted from an improperly buried human contribution, it was solemnly uprooted. This quarantine protects the island from us.',
    flyZoom: 8.5,
  },
  {
    id: 'north-brother-island',
    name: 'North Brother Island',
    tagline: 'Typhoid Mary’s quarantine island, in sight of the Manhattan skyline',
    category: 'apart',
    territory: 'East River · New York City, United States',
    coords: [-73.899, 40.801],
    population: '0 — herons and ruins',
    nearest: { name: 'Port Morris, the Bronx', km: 1, coords: [-73.906, 40.797] },
    gettingThere:
      'You can see it from the Bronx waterfront and from every LaGuardia takeoff, but landing requires a rarely granted city permit — the island is a protected bird sanctuary.',
    wikipedia: 'North and South Brother Islands (New York City)',
    blurb:
      'New York quarantined its contagious at Riverside Hospital here — most famously Mary Mallon, Typhoid Mary, who spent more than two decades confined to the island and died on it in 1938. In 1904 the burning steamship General Slocum ran aground on its shore with the loss of over a thousand lives. Abandoned since 1963, it molders eight hundred metres from a city of eight million.',
    flyZoom: 11,
  },
  {
    id: 'poveglia',
    name: 'Poveglia',
    tagline: 'Venice’s plague island, still holding its quarantine',
    category: 'apart',
    territory: 'Venetian Lagoon · Italy',
    coords: [12.331, 45.381],
    population: '0',
    nearest: { name: 'Malamocco, Lido di Venezia', km: 2, coords: [12.348, 45.365] },
    gettingThere:
      'No vaporetto stops here, and entry is barred without a permit few receive; the bell tower is best admired from a hired boat idling offshore.',
    wikipedia: 'Poveglia',
    blurb:
      'For centuries Venice sent its plague dead and dying across the water to Poveglia’s lazaretto — by some estimates tens of thousands lie in its soil. A mental asylum used the same buildings until 1968, and then the island simply closed. The octagonal fort still guards a channel whose only traffic now is herons, and the campanile rises out of the ivy like the mast of something sunk.',
    flyZoom: 11,
  },
  {
    id: 'plymouth-montserrat',
    name: 'Plymouth, Montserrat',
    tagline: 'The only capital city on Earth with a population of zero',
    category: 'apart',
    territory: 'Montserrat · British Overseas Territory',
    coords: [-62.217, 16.706],
    population: '0 — capital de jure',
    nearest: { name: 'Brades, Montserrat', km: 9, coords: [-62.211, 16.79] },
    gettingThere:
      'The southern two-thirds of Montserrat is an exclusion zone; licensed guides lead visitors to overlooks where the ash-filled streets are readable below.',
    wikipedia: 'Plymouth, Montserrat',
    blurb:
      'When the Soufrière Hills volcano woke in 1995 after centuries of silence, Plymouth was evacuated, then buried — pyroclastic flows filled its streets to the rooflines, and nineteen people who stayed to farm were killed. No act of government ever moved the capital, so a smothered city remains Montserrat’s seat in law. Two-thirds of the islanders left for good; the rest live in sight of the mountain that took the town.',
    flyZoom: 10,
  },
  {
    id: 'villa-epecuen',
    name: 'Villa Epecuén',
    tagline: 'The resort town that drowned in salt water and rose again',
    category: 'apart',
    territory: 'Buenos Aires Province · Argentina',
    coords: [-62.808, -37.134],
    population: '0 — for years, exactly one',
    nearest: { name: 'Carhué, Buenos Aires Province', km: 6, coords: [-62.766, -37.178] },
    gettingThere:
      'An easy drive from Carhué, whose own lakeside promenade looks across the water at the ruins. The dead trees mark the old shoreline.',
    wikipedia: 'Villa Epecuén',
    blurb:
      'Epecuén’s hypersaline lake — saltier, the brochures said, than the Dead Sea — drew tens of thousands of bathers a season until November 1985, when a levee failed after years of rain and the lake calmly took the town, ten metres deep. A quarter-century later the water withdrew and handed back a salt-bleached Pompeii. For years its only resident was Pablo Novak, who moved back alone into the ruins, and preferred it.',
    flyZoom: 10,
  },

  // ————————————————————————————————— POLES OF INACCESSIBILITY
  {
    id: 'point-nemo',
    name: 'Point Nemo',
    tagline: 'The point in the ocean furthest from any land',
    category: 'pole',
    territory: 'South Pacific · international waters',
    coords: [-123.393, -48.876],
    flyZoom: 3,
    population: '0 — the nearest humans are usually astronauts',
    nearest: { name: 'Ducie Atoll', km: 2688, coords: [-124.783, -24.683], label: 'Nearest land' },
    gettingThere:
      'A well-found yacht and about three weeks, or an ocean rowing record attempt. The International Space Station regularly passes closer than any inhabited land — about 420 km overhead.',
    wikipedia: 'Point Nemo',
    blurb:
      'The oceanic pole of inaccessibility: 2,688 km from land in three directions — Ducie, Motu Nui, and Maher Island, all uninhabited. Space agencies deorbit dying spacecraft into the empty water around it, a region known as the spacecraft cemetery. It is named for Verne’s Captain Nemo, who wanted exactly this much distance from mankind.',
  },
  {
    id: 'eurasian-pole',
    name: 'Eurasian Pole of Inaccessibility',
    tagline: 'The spot on Earth furthest from any ocean',
    category: 'pole',
    territory: 'Dzungaria, Xinjiang, China',
    coords: [86.671, 46.283],
    flyZoom: 4,
    population: '0 — steppe and herding country',
    nearest: { name: 'Ürümqi, China', km: 300, coords: [87.62, 43.83], label: 'Nearest city' },
    gettingThere:
      'A drive into the Dzungarian steppe northwest of Ürümqi — by far the easiest pole of inaccessibility to stand on, and still about as far from the sea as it is possible to be.',
    wikipedia: 'Pole of inaccessibility',
    blurb:
      'Stand here and every coastline on Earth is roughly 2,500 km away. Geographers still argue over the exact point — the answer shifts with how you count the tides — but all the candidates sit in this same deep-continental blank at the heart of Asia, about as landlocked as land gets.',
  },
  {
    id: 'southern-pole-of-inaccessibility',
    name: 'Southern Pole of Inaccessibility',
    tagline: 'A buried Soviet hut, a bust of Lenin above the snow',
    category: 'pole',
    territory: 'Antarctic plateau',
    coords: [54.967, -82.1],
    flyZoom: 3.6,
    population: '0',
    nearest: {
      name: 'Amundsen–Scott South Pole Station',
      km: 880,
      coords: [0, -90],
      label: 'Nearest staffed station',
    },
    gettingThere:
      'Ski expeditions and chartered Twin Otters, via the South Pole. The point furthest from every Antarctic coastline is harder to reach than the Pole itself.',
    wikipedia: 'Pole of Inaccessibility (Antarctic research station)',
    blurb:
      'In 1958 a Soviet tractor train reached the point of Antarctica furthest from any sea, built a hut, and mounted a bust of Lenin on its chimney. The building has since vanished beneath decades of snow — but the bust still stands above the drifts, facing Moscow: the loneliest statue on Earth.',
  },
]

export const PLACE_INDEX: Map<string, LonesomePlace> = new Map(PLACES.map((p) => [p.id, p]))
