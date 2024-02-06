export const LANGUAGES = [
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Spanish' },
];

export const SINGLETONS = [
  { type: 'home', title: 'Home' },
  { type: 'news', title: 'News' },
  { type: 'stories', title: 'Stories' },
  { type: 'newsletter', title: 'Newsletter' },
  { type: 'pwas', title: 'Powerful PWAs' },
  { type: 'microcopy', title: 'Microcopy' },
  { type: 'nav', title: 'Navigation' },
  { type: 'cookies', title: 'Cookie Disclaimer' },
  { type: 'app-support', title: 'App Support' },
  { type: 'guidelines', title: 'Guidelines' },
];

export const i18nSCHEMAS = [
  'post',
  'story',
  'documentation',
  'tag',
  'landing',
  ...SINGLETONS.map((s) => s.type),
];
