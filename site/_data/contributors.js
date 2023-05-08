/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-env node */
const contributors = {
  allanl: {
    // Unique per author, contribid
    name: {
      given: 'Allan',
      family: 'Livingston', // Optional
    },
    work: {
      company: 'Google', // Optional
      org: 'ChromeOS', // Optional
      title: 'Product Management Director', // Optional
    },
  },
  bgable: {
    // Unique per author, contribid
    name: {
      given: 'Ben',
      family: 'Gable', // Optional
    },
    work: {
      company: 'Google', // Optional
      title: 'Partner Developer Advocate', // Optional
    },
  },
  nataliagvak: {
    // Unique per author, contribid
    name: {
      given: 'Natalia',
      family: 'Gvak', // Optional
    },
    work: {
      company: 'Google', // Optional
      org: 'ChromeOS', // Optional
      title: 'Head of Apps Ecosystem Product Marketing', // Optional
    },
  },
  samrichard: {
    // Unique per author, contribid
    name: {
      given: 'Sam',
      family: 'Richard', // Optional
    },
    work: {
      company: 'Google', // Optional
      org: 'ChromeOS', // Optional
      title: 'Developer Advocate', // Optional
    },
  },
  ssamat: {
    // Unique per author, contribid
    name: {
      given: 'Sameer',
      family: 'Samat', // Optional
    },
    work: {
      company: 'Google', // Optional
      org: 'Platforms & Ecosystems', // Optional
      title: 'Vice President', // Optional
    },
  },
  kennethford: {
    // Unique per author, contribid
    name: {
      given: 'Kenneth',
      family: 'Ford', // Optional
    },
    work: {
      company: 'Google', // Optional
      org: 'ChromeOS', // Optional
      title: 'Developer Advocate', // Optional
    },
  },
  csells: {
    // Unique per author, contribid
    name: {
      given: 'Chris',
      family: 'Sells', // Optional
    },
    work: {
      company: 'Google', // Optional
      org: 'Flutter', // Optional
      title: 'Product Manager', // Optional
    },
  },
  ieinvaldez: {
    name: {
      given: 'Iein',
      family: 'Valdez',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Head of Developer Relations',
    },
  },
  pjmclachlan: {
    name: {
      given: 'Penny',
      family: 'McLachlan',
    },
    work: {
      company: 'Google',
      org: 'Web Platform',
      title: 'Product Manager',
    },
  },
  tbuckley: {
    name: {
      given: 'Tom',
      family: 'Buckley',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Product Manager',
    },
  },
  mmonasch: {
    name: {
      given: 'Matt',
      family: 'Monasch',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Lead Games Developer Advocate',
    },
  },
  pfuentes: {
    name: {
      given: 'Patrick',
      family: 'Fuentes',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Developer Relations Engineering Manager',
    },
  },
  fahdi: {
    name: {
      given: 'Fahd',
      family: 'Imtiaz',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Product Manager',
    },
  },
  hirono: {
    name: {
      given: 'Daichi',
      family: 'Hirono',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  ikarahan: {
    name: {
      given: 'Ibrahim',
      family: 'Karahan',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Developer Advocate',
    },
  },
  sanjn: {
    name: {
      given: 'Sanj',
      family: 'Nathwani',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Product Manager',
    },
  },
  nohe: {
    name: {
      given: 'Alexander',
      family: 'Nohe',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Developer Relations Engineer',
    },
  },
  vivekmistry: {
    name: {
      given: 'Vivek',
      family: 'Mistry',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Program Manager',
    },
  },
  joycetoh: {
    name: {
      given: 'Joyce',
      family: 'Toh',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Developer Relations Engineer',
    },
  },
  hadrosaur: {
    name: {
      given: 'Emilie',
      family: 'Roberts',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Developer Relations Engineer',
    },
  },
  bgeffon: {
    name: {
      given: 'Brian',
      family: 'Geffon',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  joelaf: {
    name: {
      given: 'Joel',
      family: 'Fernandes',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  jsbarnes: {
    name: {
      given: 'Jesse',
      family: 'Barnes',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Engineering Manager',
    },
  },
  dstockwell: {
    name: {
      given: 'Douglas',
      family: 'Stockwell',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  edwintay: {
    name: {
      given: 'Edwin',
      family: 'Tay',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  hikalium: {
    name: {
      given: 'hikalium',
      family: '',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  suleiman: {
    name: {
      given: 'Suleiman',
      family: 'Souhlal',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  sxm: {
    name: {
      given: 'Sangwhan',
      family: 'Moon',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineering Manager',
    },
  },
  kenh: {
    name: {
      given: 'Ken',
      family: 'Hoetmer',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Product Lead, Apps Platforms',
    },
  },
  davidriley: {
    name: {
      given: 'David',
      family: 'Riley',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  cpelling: {
    name: {
      given: 'Chloe',
      family: 'Pelling',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  marcheu: {
    name: {
      given: 'Stéphane',
      family: 'Marchesin',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  apronin: {
    name: {
      given: 'Andrey',
      family: 'Pronin',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  jbates: {
    name: {
      given: 'John',
      family: 'Bates',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  ryanneph: {
    name: {
      given: 'Ryan',
      family: 'Neph',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  keithshort: {
    name: {
      given: 'Keith',
      family: 'Short',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  gdomergue: {
    name: {
      given: 'Gina',
      family: 'Domergue',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  cuicuiruan: {
    name: {
      given: 'Cici',
      family: 'Ruan',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  tgorkin: {
    name: {
      given: 'Travis',
      family: 'Gorkin',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Engineering Manager',
    },
  },
  chrisdemiris: {
    name: {
      given: 'Chris',
      family: 'Demiris',
    },
    work: {
      company: 'Luma Touch LLC',
      title: 'Director of Engineering',
    },
  },
  zalcorn: {
    name: {
      given: 'Zach',
      family: 'Alcorn',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Product Manager',
    },
  },
  renatopereyra: {
    name: {
      given: 'Renato',
      family: 'Pereyra',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  jhale: {
    name: {
      given: 'Josh',
      family: 'Hale',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  dng: {
    name: {
      given: 'Daniel',
      family: 'Ng',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Software Engineer',
    },
  },
  adchristopher: {
    name: {
      given: 'Austin David',
      family: 'Christopher',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Partner Engineering',
    },
  },
  rmonet: {
    name: {
      given: 'Raluca',
      family: 'Monet',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Global Partnerships Lead',
    },
  },
  dlevy: {
    name: {
      given: 'Daniel',
      family: 'Levy',
    },
    work: {
      company: 'Google',
      org: 'Android Large Screen Gaming',
      title: 'Developer Relations Engineer',
    },
  },
  scui: {
    name: {
      given: 'Shenshen',
      family: 'Cui',
    },
    work: {
      company: 'Google',
      org: 'Google Play Games',
      title: 'Developer Relations Engineer',
    },
  },
  mwendling: {
    name: {
      given: 'Mike',
      family: 'Wendling',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Partner Engineer',
    },
  },
  jeza: {
    name: {
      given: 'Jeza',
      family: 'Mancenido',
    },
    work: {
      company: 'Google',
      org: 'ChromeOS',
      title: 'Product Manager',
    },
  },
  drobledo: {
    name: {
      given: 'Diana',
      family: 'Robledo',
    },
    work: {
      company: 'Google',
      org: 'Chrome Enterprise',
      title: 'Program Manager, Software Partnerships',
    },
  },
};

module.exports = () => contributors; // By making this a function, it'll force Eleventy to reevaluate it every time it gets recompiled
