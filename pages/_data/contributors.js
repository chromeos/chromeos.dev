/**
 * Copyright 2019 Google LLC
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
      org: 'Chrome OS', // Optional
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
      org: 'Chrome OS', // Optional
      title: 'Head of Chrome OS Apps Ecosystem Product Marketing', // Optional
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
      org: 'Chrome OS', // Optional
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
      org: 'Chrome OS', // Optional
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
      org: 'Chrome OS',
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
      org: 'Chrome OS',
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
      org: 'Chrome OS',
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
      org: 'Chrome OS',
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
      org: 'Chrome OS',
      title: 'Product Manager',
    },
  },
  ikarahan: {
    name: {
      given: 'Ibrahim',
      family: 'Karahan',
    },
    work: {
      company: 'Google',
      org: 'Chrome OS',
      title: 'Developer Advocate',
    },
  },
};

module.exports = () => contributors; // By making this a function, it'll force Eleventy to reevaluate it every time it gets recompiled
