import polaroid1 from '../assets/images/polaroid_1_home_1792504468991.jpg';
import polaroid2 from '../assets/images/polaroid_2_warmth_1792504485239.jpg';
import polaroid3 from '../assets/images/polaroid_3_quiet_1792504500492.jpg';
import polaroid4 from '../assets/images/polaroid_4_promise_1792504514809.jpg';
import lilyBackdrop from '../assets/images/lily_backdrop_1792504529508.jpg';
import crumpledPaperBg from '../assets/images/crumpled_paper_bg_1792509926130.jpg';
import paperLilyBloomPng from '../assets/images/diy_paper_lily_bloom.png';
import paperLilyStemPng from '../assets/images/diy_paper_lily_stem.png';

export const USER_LILY_IMG = '/assets/aistudio/image_8617e027.png';
export const CRUMPLED_PAPER_BG = crumpledPaperBg;
export const PAPER_LILY_BLOOM_PNG = paperLilyBloomPng;
export const PAPER_LILY_STEM_PNG = paperLilyStemPng;

export interface MemorySlide {
  id: string;
  indexFormatted: string;
  stepNumber: number;
  chapterTitle: string;
  quote: string;
  details: string;
  image: string;
  altText: string;
  polaroidCaption: string;
  dateTag: string;
  rotationDegree: number;
}

export const MEMORY_SLIDES: MemorySlide[] = [
  {
    id: 'slide-1',
    indexFormatted: '01 / 04',
    stepNumber: 1,
    chapterTitle: 'Better Than Any View',
    quote: 'You are better than any view in the whole world.',
    details: 'Even beneath the most breathtaking pink sunset sky, my eyes will always find their way back to you.',
    image: '/assets/aistudio/IMG_3541_e61d39c0.jpg',
    altText: 'Veronica looking at the soft pink evening sunset in the park',
    polaroidCaption: 'You are better than any view in the world',
    dateTag: 'Month 1 • The Beginning',
    rotationDegree: -2.5,
  },
  {
    id: 'slide-2',
    indexFormatted: '02 / 04',
    stepNumber: 2,
    chapterTitle: 'My Gorgeous Girl',
    quote: 'My pretty and gorgeous girl who effortlessly steals my heart every single day.',
    details: 'Just one look at you reminds me of how lucky I am. You make my entire world softer and brighter.',
    image: '/assets/aistudio/C714E4EE-2D06-4BEA-B37E-31C8F619FB04_5921b76e.jpg',
    altText: 'Veronica pretty mirror selfie with long dark hair',
    polaroidCaption: 'My Pretty and gorgeous girl',
    dateTag: 'Month 2 • Laughter & Bloom',
    rotationDegree: 2.8,
  },
  {
    id: 'slide-3',
    indexFormatted: '03 / 04',
    stepNumber: 3,
    chapterTitle: 'Pure Beauty & Peace',
    quote: 'The most gorgeous and adorable girl, always taking my breath away.',
    details: 'Your sweet expressions, your gentle wink, and the unspoken calm of having you right beside my heart.',
    image: '/assets/aistudio/IMG_3198_054e6c27.png',
    altText: 'Veronica cute adorable winking selfie resting her cheek on her hand',
    polaroidCaption: 'The most adorable & gorgeous smile',
    dateTag: 'Month 3 • Our Quiet Sanctuary',
    rotationDegree: -1.8,
  },
  {
    id: 'slide-4',
    indexFormatted: '04 / 04',
    stepNumber: 4,
    chapterTitle: 'Our Silly Calls',
    quote: 'Our silly moments on call, laughing together until hours slip by like seconds.',
    details: 'Cute matching filters, silly finger-hearts, endless laughs, and falling asleep on late-night calls. Four months in and I would choose you every time.',
    image: '/assets/aistudio/IMG_4021_cb9e4886.png',
    altText: 'Veronica and Mohamed on video call sharing cute finger hearts and sparkle filters',
    polaroidCaption: 'Our silly moments on call',
    dateTag: 'Month 4 • Today & Always',
    rotationDegree: 1.5,
  },
];

export const ANNIVERSARY_LETTER = {
  recipient: 'My Dearest Veronica,',
  p1: 'I am writing this because sometimes words catch in my throat when I look at you, overwhelmed by how much you mean to me. Please keep this little page as a token of my heart, a reminder of a love that belongs entirely to you.',
  p2: 'Over these past four months, you’ve become my peace, my laughter, and the brightest part of my day. No matter how heavy the world gets, hearing your voice and making you smile makes everything make sense again.',
  p3: 'Thank you for four months of incredible memories, late night talks, and unconditional love. Please never forget how deeply and truly you are cared for. You have my whole heart today and for all the months to come. I will always stay by your side my Veronica.',
  signOff: 'Happy 4 Months. ❤️',
  date: 'Four Months of Veronica & Mohamed',
  monogram: 'V & M',
};

export const LILY_BACKDROP_IMAGE = lilyBackdrop;

export const MILESTONES = [
  { label: 'Days of Devotion', value: '120+', note: 'And counting each one' },
  { label: 'Hours of Laughter', value: '2,880', note: 'Every single minute cherished' },
  { label: 'Late-Night Talks', value: 'Countless', note: 'Under the starlight' },
  { label: 'Times I Choose You', value: 'Every Time', note: 'Today, tomorrow & always' },
];
