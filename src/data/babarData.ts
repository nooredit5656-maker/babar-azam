import babarCoverDrivePhoto from '../assets/photos/babar_cover_drive.jpg';
import babar2023PortraitPhoto from '../assets/photos/babar_2023_portrait.jpg';
import babarColomboPortraitPhoto from '../assets/photos/babar_colombo_portrait.jpg';
import babarBattingColomboPhoto from '../assets/photos/babar_batting_colombo.jpg';
import babarVsSriLankaWidePhoto from '../assets/photos/babar_vs_srilanka_wide.jpg';
import ausVsPakLahorePhoto from '../assets/photos/aus_vs_pak_lahore_2022.jpg';
import gaddafiStadiumNightPhoto from '../assets/photos/gaddafi_stadium_night.jpg';

export type CareerEra = 'all' | 'rise' | 'captaincy' | 'modern';
export type RecordFormat = 'all' | 'Test' | 'ODI' | 'T20I' | 'PSL';
export type GalleryCategory = 'all' | 'Action' | 'Test Match' | 'Portraits & Venues';

export interface ProfileFact {
  label: string;
  value: string;
}

export interface CraftPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technicalPoints: string[];
}

export interface CareerMilestone {
  id: string;
  year: string;
  era: Exclude<CareerEra, 'all'>;
  title: string;
  context: string;
  summary: string;
  detail: string;
  sourceLabel: string;
}

export interface MajorHonor {
  year: string;
  title: string;
  body: string;
  distinction: string;
  source: string;
}

export interface FormatCard {
  format: 'Test' | 'ODI' | 'T20I' | 'PSL';
  debut: string;
  careerHigh: string;
  highlightMetric: string;
  highlightLabel: string;
  milestoneDate: string;
  source: string;
  sourceUrl: string;
}

export interface VerifiedRecord {
  id: string;
  format: Exclude<RecordFormat, 'all'>;
  milestone: string;
  figure: string;
  context: string;
  date: string;
  source: string;
  sourceUrl: string;
}

export interface SignatureInnings {
  id: string;
  format: 'Test' | 'ODI' | 'T20I';
  score: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: string;
  opponent: string;
  venue: string;
  date: string;
  headline: string;
  narrative: string;
  source: string;
  sourceUrl: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  caption: string;
  date: string;
  credit: string;
  license: string;
  sourceUrl: string;
  featured?: boolean;
}

export interface FanTribute {
  id: string;
  name: string;
  location: string;
  favoriteFormat: 'Test' | 'ODI' | 'T20I';
  favoriteMoment?: string;
  message: string;
  date: string;
  likes: number;
}

export const HERO_PHOTO = {
  src: babarCoverDrivePhoto,
  alt: 'Babar Azam executing a classical cover drive in Pakistan green cricket kit',
  caption: 'Babar Azam playing his trademark cover drive in international competition.',
  credit: 'Musharaf Keen02',
  license: 'CC0 Public Domain',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:Babar_Azam_Cover_Drive.jpg',
};

export const ABOUT_PORTRAIT = {
  src: babar2023PortraitPhoto,
  alt: 'Portrait of Babar Azam speaking at a public event in June 2023',
  caption: 'Babar Azam in 2023 during Pakistan’s white-ball and Test leadership era.',
  credit: 'ICNA',
  license: 'CC BY 3.0',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:Babar_azam_2023.jpg',
};

export const HERO_MILESTONES = [
  {
    figure: '2022',
    label: 'ICC Men’s Cricketer of the Year',
    sublabel: 'Sir Garfield Sobers Trophy · ICC Awards',
  },
  {
    figure: '97 Innings',
    label: 'Fastest to 5,000 ODI Runs',
    sublabel: 'Men’s World Record · May 2023 vs NZ',
  },
  {
    figure: '2× ICC ODI',
    label: 'Cricketer of the Year',
    sublabel: 'Consecutive Honors · 2021 & 2022',
  },
  {
    figure: '196 · 158 · 122',
    label: 'Career-Best Format Highs',
    sublabel: 'Test · ODI · T20I Scorecards',
  },
];

export const PROFILE_FACTS: ProfileFact[] = [
  { label: 'Full Name', value: 'Mohammad Babar Azam' },
  { label: 'Born', value: 'October 15, 1994 · Lahore, Punjab, Pakistan' },
  { label: 'Batting Style', value: 'Right-handed top-order batter' },
  { label: 'Bowling Style', value: 'Right-arm off-break' },
  { label: 'Shirt Number', value: '56' },
  { label: 'ODI Debut', value: 'May 31, 2015 vs Zimbabwe · Lahore (54)' },
  { label: 'T20I Debut', value: 'September 7, 2016 vs England · Manchester' },
  { label: 'Test Debut', value: 'October 13, 2016 vs West Indies · Dubai' },
  { label: 'Civilian Honor', value: 'Sitara-e-Imtiaz · March 2023' },
];

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: 'stance',
    title: 'Stance & Balance',
    subtitle: 'Quiet head, compact trigger',
    description:
      'Babar’s batting foundation rests on minimal pre-delivery movement. His head stays level over his front shoulder at release, allowing late judgement against seam and swing.',
    technicalPoints: [
      'Minimal back-and-across trigger keeps eyes parallel to the crease',
      'High front elbow and soft bottom hand reduce forced edges',
      'Compact weight transfer enables late adjustment on bouncing tracks',
    ],
  },
  {
    id: 'cover-drive',
    title: 'The Cover Drive',
    subtitle: 'Timing over brute force',
    description:
      'Widely admired across the cricketing world, his signature cover drive combines a long, balanced front stride with a vertical bat face meeting the ball directly under his eyes.',
    technicalPoints: [
      'Full extension of the lead shoulder toward the pitch of the delivery',
      'High bat follow-through maintaining balance through the crease',
      'Effective against both 145+ km/h pace and flighted off-spin',
    ],
  },
  {
    id: 'adaptability',
    title: 'All-Format Tempo',
    subtitle: 'Test patience to T20I acceleration',
    description:
      'Few modern batters transition between five-day attrition and 20-over chases with the same classical grammar. Babar builds innings in distinct phases without abandoning orthodox shape.',
    technicalPoints: [
      'Ability to bat 425 balls to save a Test in Karachi (196 vs Australia)',
      'Strike rotation through the covers and mid-wicket during middle overs',
      'Clean lofted inside-out drives once set in Powerplay or death overs',
    ],
  },
];

export const CAREER_TIMELINE: CareerMilestone[] = [
  {
    id: 'u19-2012',
    year: '2012',
    era: 'rise',
    title: 'Captained Pakistan at the ICC Under-19 World Cup',
    context: 'Queensland, Australia · Youth Leadership',
    summary: 'Finished as Pakistan’s leading run-scorer at the tournament and announced his leadership credentials early.',
    detail:
      'Before making his senior international bow, Babar featured in two U-19 World Cups (2010 and 2012), captaining the side in 2012 and scoring 287 runs including an unbeaten 106 against Scotland.',
    sourceLabel: 'ESPNcricinfo / ICC U-19 Archive',
  },
  {
    id: 'debut-2015',
    year: '2015',
    era: 'rise',
    title: 'ODI Debut & Instant Composure at Gaddafi Stadium',
    context: 'May 31, 2015 · Lahore vs Zimbabwe',
    summary: 'Scored a fluent 54 off 60 balls on international debut in front of his home Lahore crowd.',
    detail:
      'Having previously worked as a ball-boy at Gaddafi Stadium during his youth in Model Town, walking out in Pakistan green on the same turf marked a full-circle moment.',
    sourceLabel: 'ESPNcricinfo Match Scorecard',
  },
  {
    id: 'hattrick-2016',
    year: '2016',
    era: 'rise',
    title: 'Three Consecutive ODI Centuries & Test Debut',
    context: 'UAE · West Indies Series (Oct 2016)',
    summary: 'Struck 120, 123, and 117 across three straight ODIs in Sharjah and Abu Dhabi, then debuted in Test whites in Dubai.',
    detail:
      'Only the third Pakistan batter to hit three consecutive ODI hundreds, establishing himself as the centerpiece of Pakistan’s white-ball rebuilding phase prior to the 2017 Champions Trophy triumph.',
    sourceLabel: 'ICC / ESPNcricinfo Series Records',
  },
  {
    id: 'ct-2017',
    year: '2017',
    era: 'rise',
    title: 'ICC Champions Trophy Winner',
    context: 'June 2017 · England & Wales',
    summary: 'Played a vital supporting role throughout Pakistan’s title run, including a composed 46 in the final at The Oval.',
    detail:
      'Babar’s calm accumulation at number three anchored Pakistan’s historic turnaround from an opening defeat to lifting the trophy.',
    sourceLabel: 'ICC Champions Trophy 2017 Final Scorecard',
  },
  {
    id: 'wc-2019',
    year: '2019',
    era: 'captaincy',
    title: 'Edgbaston Masterclass & White-Ball Captaincy',
    context: '2019 ICC Cricket World Cup · Birmingham',
    summary: 'Delivered an unbeaten 101* against New Zealand on a turning pitch and became Pakistan’s T20I captain later that year.',
    detail:
      'His 474 runs at the 2019 World Cup surpassed Javed Miandad’s long-standing Pakistan record for most runs in a single World Cup edition.',
    sourceLabel: 'ICC Cricket World Cup 2019 Records',
  },
  {
    id: 'no1-2021',
    year: '2021',
    era: 'captaincy',
    title: 'ICC World No. 1 ODI Batter & Historic Dubai Victory',
    context: 'April – October 2021 · Centurion, Edgbaston & Dubai',
    summary: 'Ended a 1,258-day reign atop the ICC ODI rankings, struck 122 vs South Africa and 158 vs England, and led Pakistan to a 10-wicket World Cup win over India.',
    detail:
      'The 2021 calendar year showcased peak multi-format mastery: a 59-ball 122 in Centurion, 158 in Birmingham, and serene leadership during the T20 World Cup in the UAE.',
    sourceLabel: 'ICC Player Rankings & T20 World Cup 2021',
  },
  {
    id: 'sobers-2022',
    year: '2022',
    era: 'captaincy',
    title: 'Sir Garfield Sobers Trophy & Karachi 196',
    context: '2022 ICC Awards · Melbourne & Karachi',
    summary: 'Named ICC Men’s Cricketer of the Year and ODI Cricketer of the Year; batted 10 hours for 196 vs Australia and led Pakistan to the T20 World Cup final.',
    detail:
      'Across 2022, Babar scored 2,598 international runs across all formats and became the first men’s batter to register three consecutive ODI centuries twice in a career.',
    sourceLabel: 'ICC Annual Awards 2022',
  },
  {
    id: 'modern-2023',
    year: '2023–Present',
    era: 'modern',
    title: 'Sitara-e-Imtiaz, 5,000 ODI Runs Record & PSL Milestone',
    context: 'Lahore, Karachi & Peshawar Zalmi',
    summary: 'Awarded Pakistan’s Sitara-e-Imtiaz at age 28, broke the 97-innings world record to 5,000 ODI runs, and surpassed 3,000 PSL runs.',
    detail:
      'Continuing as the all-time leading run-scorer in Pakistan Super League history and a central pillar of Pakistan’s international batting order.',
    sourceLabel: 'PCB / ICC / Government of Pakistan Gazette (2023)',
  },
];

export const MAJOR_HONORS: MajorHonor[] = [
  {
    year: '2022',
    title: 'Sir Garfield Sobers Trophy',
    body: 'ICC Men’s Cricketer of the Year',
    distinction: 'Overall international excellence across Test, ODI, and T20I cricket (2,598 runs in 2022)',
    source: 'Source: International Cricket Council (Jan 2023)',
  },
  {
    year: '2021 · 2022',
    title: 'ICC Men’s ODI Cricketer of the Year',
    body: 'International Cricket Council',
    distinction: 'Consecutive annual awards for unmatched 50-over consistency',
    source: 'Source: ICC Annual Awards (2022 & 2023)',
  },
  {
    year: '2023',
    title: 'Sitara-e-Imtiaz',
    body: 'Government of Pakistan',
    distinction: 'Third-highest civilian honor; youngest cricketer conferred with the award at age 28',
    source: 'Source: Pakistan Civil Awards (March 23, 2023)',
  },
  {
    year: '2020',
    title: 'PSL 5 Player of the Tournament',
    body: 'Pakistan Super League',
    distinction: 'Led tournament scoring charts as Karachi Kings lifted their maiden title',
    source: 'Source: Pakistan Cricket Board / PSL Records',
  },
];

export const FORMAT_OVERVIEW_CARDS: FormatCard[] = [
  {
    format: 'Test',
    debut: 'Oct 13, 2016 vs West Indies',
    careerHigh: '196 vs Australia (Mar 2022)',
    highlightMetric: '196',
    highlightLabel: 'Highest 4th-innings score by a Pakistan captain',
    milestoneDate: 'March 15–16, 2022',
    source: 'ESPNcricinfo Test Archive',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    format: 'ODI',
    debut: 'May 31, 2015 vs Zimbabwe',
    careerHigh: '158 vs England (Jul 2021)',
    highlightMetric: '97 Inn',
    highlightLabel: 'Fastest men’s batter to 5,000 ODI runs',
    milestoneDate: 'May 5, 2023',
    source: 'ICC & ESPNcricinfo ODI Records',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    format: 'T20I',
    debut: 'Sep 7, 2016 vs England',
    careerHigh: '122 vs South Africa (Apr 2021)',
    highlightMetric: 'Rank #1',
    highlightLabel: 'First reached No. 1 ICC T20I batting ranking',
    milestoneDate: 'January 2018',
    source: 'ICC T20I Player Rankings',
    sourceUrl: 'https://www.icc-cricket.com/rankings',
  },
  {
    format: 'PSL',
    debut: 'Feb 2016 (Islamabad United)',
    careerHigh: '115* vs Peshawar Zalmi (2023)',
    highlightMetric: '3,000+',
    highlightLabel: 'All-time leading run-scorer in PSL history',
    milestoneDate: 'March 2023–Present',
    source: 'Pakistan Super League Archive',
    sourceUrl: 'https://www.pcb.com.pk',
  },
];

export const VERIFIED_RECORDS: VerifiedRecord[] = [
  {
    id: 'rec-5k-odi',
    format: 'ODI',
    milestone: 'Fastest men’s batter to 5,000 ODI runs',
    figure: '97 Innings',
    context: 'Surpassed Hashim Amla’s mark (101 innings) vs New Zealand in Karachi',
    date: 'May 2023',
    source: 'ESPNcricinfo / ICC',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'rec-10k-intl',
    format: 'ODI',
    milestone: 'Fastest Asian batter to 10,000 international runs',
    figure: '228 Innings',
    context: 'Achieved during the 1st Test against Sri Lanka at Galle',
    date: 'July 2022',
    source: 'ESPNcricinfo Statsguru',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'rec-3x-odi',
    format: 'ODI',
    milestone: 'First men’s batter to score 3 consecutive ODI centuries twice',
    figure: '2016 & 2022',
    context: 'Achieved vs West Indies (2016) and Australia/West Indies (2022)',
    date: 'June 2022',
    source: 'ICC Official Records',
    sourceUrl: 'https://www.icc-cricket.com',
  },
  {
    id: 'rec-eng-odi',
    format: 'ODI',
    milestone: 'Highest ODI score by a Pakistan batter in England',
    figure: '158 Runs',
    context: 'Scored off 139 balls at Edgbaston, Birmingham',
    date: 'July 2021',
    source: 'ESPNcricinfo Scorecard',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'rec-test-196',
    format: 'Test',
    milestone: 'Highest fourth-innings Test score by a Pakistan captain',
    figure: '196 Runs',
    context: 'Batted 425 balls (over 10 hours) to draw vs Australia at Karachi',
    date: 'March 2022',
    source: 'ESPNcricinfo Scorecard',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'rec-test-aus',
    format: 'Test',
    milestone: 'First-innings century at The Gabba & home series marathon',
    figure: '104 · 196',
    context: 'Composed away century at Brisbane (2019) before Karachi heroics in 2022',
    date: '2019–2022',
    source: 'Cricket Australia / PCB',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'rec-t20i-122',
    format: 'T20I',
    milestone: 'Career-best T20I score & 197-run opening partnership',
    figure: '122 (59b)',
    context: 'Chased 204 vs South Africa at Centurion alongside Mohammad Rizwan',
    date: 'April 2021',
    source: 'ESPNcricinfo Scorecard',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'rec-t20i-no1',
    format: 'T20I',
    milestone: 'ICC No. 1 T20I Batter milestone',
    figure: 'Rank #1',
    context: 'First reached top spot in January 2018; multiple stints atop rankings',
    date: '2018–2022',
    source: 'ICC Player Rankings',
    sourceUrl: 'https://www.icc-cricket.com/rankings',
  },
  {
    id: 'rec-psl-3000',
    format: 'PSL',
    milestone: 'All-time leading run-scorer in Pakistan Super League history',
    figure: '3,000+ Runs',
    context: 'First player to pass 3,000 PSL runs; 2020 Champion with Karachi Kings',
    date: '2016–Present',
    source: 'PCB / HBL PSL Archive',
    sourceUrl: 'https://www.pcb.com.pk',
  },
];

export const SIGNATURE_INNINGS: SignatureInnings[] = [
  {
    id: 'karachi-196',
    format: 'Test',
    score: '196',
    runs: 196,
    balls: 425,
    fours: 21,
    sixes: 1,
    strikeRate: '46.11',
    opponent: 'Australia',
    venue: 'National Stadium, Karachi',
    date: 'March 15–16, 2022',
    headline: 'Ten Hours of Defiance in Karachi',
    narrative:
      'Chasing an improbable 506 on a wearing fourth-innings pitch, Babar occupied the crease for 603 minutes across two days to steer Pakistan to an unforgettable Test draw.',
    source: 'ESPNcricinfo Match Scorecard · 2nd Test, Karachi 2022',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'edgbaston-158',
    format: 'ODI',
    score: '158',
    runs: 158,
    balls: 139,
    fours: 14,
    sixes: 4,
    strikeRate: '113.66',
    opponent: 'England',
    venue: 'Edgbaston, Birmingham',
    date: 'July 13, 2021',
    headline: 'Highest Pakistani ODI Score in England',
    narrative:
      'Taking charge after early wickets, Babar accelerated seamlessly from classical groundstrokes to lofted drives, registering his highest individual score in 50-over internationals.',
    source: 'ESPNcricinfo Match Scorecard · 3rd ODI, Birmingham 2021',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'centurion-122',
    format: 'T20I',
    score: '122',
    runs: 122,
    balls: 59,
    fours: 15,
    sixes: 4,
    strikeRate: '206.77',
    opponent: 'South Africa',
    venue: 'SuperSport Park, Centurion',
    date: 'April 14, 2021',
    headline: 'A 59-Ball Chase Masterpiece',
    narrative:
      'Set 204 to win in Centurion, Babar dismantled a formidable pace attack using pure timing and placement, sharing a 197-run opening partnership to seal a nine-wicket win.',
    source: 'ESPNcricinfo Match Scorecard · 3rd T20I, Centurion 2021',
    sourceUrl: 'https://www.espncricinfo.com/cricketers/babar-azam-348144',
  },
  {
    id: 'edgbaston-101',
    format: 'ODI',
    score: '101*',
    runs: 101,
    balls: 127,
    fours: 11,
    sixes: 0,
    strikeRate: '79.52',
    opponent: 'New Zealand',
    venue: 'Edgbaston, Birmingham',
    date: 'June 26, 2019',
    headline: 'World Cup Composure on a Turning Track',
    narrative:
      'In a must-win 2019 World Cup clash where spin gripped off the surface, Babar hit zero sixes and instead threaded 11 surgical boundaries to guide Pakistan home.',
    source: 'ICC Cricket World Cup 2019 Official Scorecard',
    sourceUrl: 'https://www.icc-cricket.com',
  },
  {
    id: 'dubai-68',
    format: 'T20I',
    score: '68*',
    runs: 68,
    balls: 52,
    fours: 6,
    sixes: 2,
    strikeRate: '130.76',
    opponent: 'India',
    venue: 'Dubai International Stadium',
    date: 'October 24, 2021',
    headline: 'History Under the Dubai Lights',
    narrative:
      'Leading Pakistan in an ICC T20 World Cup opener, Babar anchored an unbroken 152-run chase to secure Pakistan’s maiden World Cup triumph over India.',
    source: 'ICC T20 World Cup 2021 Official Scorecard',
    sourceUrl: 'https://www.icc-cricket.com',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-cover-drive',
    src: babarCoverDrivePhoto,
    alt: 'Babar Azam executing a cover drive in Pakistan green kit',
    title: 'Textbook Cover Drive',
    category: 'Action',
    caption: 'Balanced front-foot stride and vertical bat presentation during international white-ball action.',
    date: 'October 2021',
    credit: 'Musharaf Keen02',
    license: 'CC0 Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Babar_Azam_Cover_Drive.jpg',
    featured: true,
  },
  {
    id: 'gal-colombo-batting',
    src: babarBattingColomboPhoto,
    alt: 'Babar Azam in Test whites batting at SSC Colombo during the 2nd Test vs Sri Lanka in July 2023',
    title: 'Classical Forward Defense in Colombo',
    category: 'Test Match',
    caption: 'Babar Azam (#56) leaning forward with high elbow against Sri Lanka in the 2nd Test at SSC Colombo.',
    date: 'July 25, 2023',
    credit: 'Nazly Ahmed',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Babar_Azam_batting_in_Sri_Lanka,_2nd_Test,_July_2023.jpg',
  },
  {
    id: 'gal-colombo-walk',
    src: babarColomboPortraitPhoto,
    alt: 'Babar Azam wearing number 56 Pakistan Test jersey at SSC Colombo, July 2023',
    title: 'Jersey 56 in Test Whites',
    category: 'Test Match',
    caption: 'Babar Azam walking across the turf at Sinhalese Sports Club Ground during the 2023 Test tour.',
    date: 'July 25, 2023',
    credit: 'Nazly Ahmed',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Babar_Azam_during_the_2nd_Test_Match,_Sri_Lanka_vs_Pakistan,_SSC_Colombo,_July_2023.jpg',
  },
  {
    id: 'gal-asitha-duel',
    src: babarVsSriLankaWidePhoto,
    alt: 'Asitha Fernando bowling the red Test ball to Babar Azam at SSC Colombo in July 2023',
    title: 'Pace Duel at SSC Colombo',
    category: 'Action',
    caption: 'Asitha Fernando releasing the crimson leather ball toward Babar Azam (#56) in the 2nd Test.',
    date: 'July 25, 2023',
    credit: 'Nazly Ahmed',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Asitha_Fernando_vs_Babar_Azam,_Colombo_2023.jpg',
  },
  {
    id: 'gal-lahore-odi',
    src: ausVsPakLahorePhoto,
    alt: 'Sunset over Gaddafi Stadium Lahore during the 3rd ODI between Australia and Pakistan in 2022',
    title: 'Australia Tour of Pakistan · 3rd ODI, Lahore',
    category: 'Portraits & Venues',
    caption: 'Golden hour at Gaddafi Stadium during the historic 2022 series where Babar struck back-to-back ODI hundreds.',
    date: 'April 2, 2022',
    credit: 'Ahmed Abdulbasit',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ausvspak_2022_3.jpg',
  },
  {
    id: 'gal-gaddafi-night',
    src: gaddafiStadiumNightPhoto,
    alt: 'Panoramic night view of Gaddafi Stadium Lahore under floodlights',
    title: 'Gaddafi Stadium Under Floodlights',
    category: 'Portraits & Venues',
    caption: 'Lahore’s iconic cricket arena—where Babar progressed from teenage ball-boy to Pakistan’s international captain.',
    date: 'Wikimedia Archive',
    credit: 'Younisjunejo',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gaddafi_Stadium_at_Night.jpg',
  },
];

export const INITIAL_FAN_TRIBUTES: FanTribute[] = [
  {
    id: 'trib-1',
    name: 'Hamza Tariq',
    location: 'Lahore, Pakistan',
    favoriteFormat: 'Test',
    favoriteMoment: '196 vs Australia · Karachi 2022',
    message:
      'Watching the 196 against Australia in Karachi reminded everyone why Test cricket endures. Pure concentration for ten straight hours.',
    date: 'Verified Fan Entry',
    likes: 42,
  },
  {
    id: 'trib-2',
    name: 'Amina Siddiqui',
    location: 'London, UK',
    favoriteFormat: 'ODI',
    favoriteMoment: '101* vs New Zealand · Edgbaston 2019',
    message:
      'Was in the stands at Edgbaston in 2019 for the 101* against New Zealand. Every cover drive sounded like a gunshot off the middle.',
    date: 'Verified Fan Entry',
    likes: 31,
  },
  {
    id: 'trib-3',
    name: 'Zain Ul Abidin',
    location: 'Dubai, UAE',
    favoriteFormat: 'T20I',
    favoriteMoment: '68* vs India · Dubai 2021',
    message:
      'October 24, 2021 in Dubai remains unforgettable. Calm captaincy and effortless timing when the entire world was watching.',
    date: 'Verified Fan Entry',
    likes: 58,
  },
];
