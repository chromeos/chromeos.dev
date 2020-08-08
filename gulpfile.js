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
const gulp = require('gulp');
const sync = require('browser-sync');
const cache = require('gulp-cached');
const gulpif = require('gulp-if');
const { assets, sass: sassConfig, folders, serviceWorker, optimize } = require('config');
const lunr = require('./lib/gulp/lunr.js');
const ISO6391 = require('iso-639-1');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sassLint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');
const through = require('through2');
const { spawn } = require('npm-run');
const tap = require('gulp-tap');
const fs = require('fs');
const multiDest = require('gulp-multi-dest');
const htmlmin = require('gulp-htmlmin');
const critical = require('critical').stream;

const production = process.env.NODE_ENV === 'production';

const paths = {
  sass: {
    src: path.join(folders.source, sassConfig.src),
    dest: path.join(folders.output, sassConfig.dest),
  },
  js: [path.join(folders.output, '**/*.js'), `!${path.join(folders.output, serviceWorker.dest)}`],
  sw: serviceWorker.precache.map(i => path.join(folders.output, i)),
};

const watchTasks = [];
const buildTasks = [];

// Server setup
let server = {
  stream: () => through.obj((file, enc, cb) => cb()),
};

gulp.task('server', () => {
  server = sync.get('server');
  server.init({
    server: folders.output,
  });
});
watchTasks.push('server');

// JavaScript task
gulp.task('js:watch', () =>
  gulp.watch(paths.js, () =>
    gulp
      .src(paths.js)
      .pipe(cache('js'))
      .pipe(server.stream()),
  ),
);
watchTasks.push('js:watch');

// Asset Tasks
for (const [asset, values] of Object.entries(assets)) {
  const src = path.join(folders.source, values.src);
  const dest = path.join(folders.output, values.dest);
  gulp.task(asset, () =>
    gulp
      .src(src)
      .pipe(cache(asset))
      .pipe(gulp.dest(dest))
      .pipe(server.stream()),
  );

  gulp.task(`${asset}:watch`, () => gulp.watch(src, gulp.series(asset)));
  buildTasks.push(asset);
  watchTasks.push(`${asset}:watch`);
}

// Sass Tasks
gulp.task('sass', () =>
  gulp
    .src(paths.sass.src)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(gulpif(production, sassLint.failOnError()))
    .pipe(sourcemaps.init())
    .pipe(gulpif(production, sass(sassConfig.config), sass(sassConfig.config).on('error', sass.logError)))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(server.stream()),
);

gulp.task('sass:watch', () => gulp.watch(paths.sass.src, gulp.series('sass')));
buildTasks.push('sass');
watchTasks.push(`sass:watch`);

// Service Worker Precache
gulp.task('sw', () =>
  gulp
    .src(paths.sw, {
      allowEmpty: true,
    })
    .pipe(cache('sw'))
    .on('end', () => {
      return new Promise((res, rej) => {
        if (production) return res('Skipping');

        const child = spawn('npm', ['run', 'js:sw'], { stdio: 'inherit' });

        child.on('close', code => {
          return res(code);
        });
      });
    }),
);

gulp.task('sw:watch', () =>
  gulp.watch(
    paths.sw,
    {
      allowEmpty: true,
    },
    gulp.series('sw'),
  ),
);
watchTasks.push('sw:watch');

// Index Tasks
/**
 *
 * @param {string} directory - The path to be checked.
 * @return {boolean} - Whether directory is a valid locale code name.
 */
function isLocaleDir(directory) {
  return fs.statSync(directory.path).isDirectory() && ISO6391.validate(directory.basename);
}

/**
 * Creates the lunr indexes in different locales.
 *
 * @return {object} Gulp object
 */

gulp.task('indexes', () =>
  gulp.src(path.join(folders.pages, '*')).pipe(
    tap(function(file) {
      if (isLocaleDir(file)) {
        return gulp
          .src(path.join(file.path, '**/**/*.md'))
          .pipe(lunr({ locale: file.basename }))
          .pipe(multiDest(['./functions/indexes', path.join(folders.output, 'js/indexes')]));
      }
    }),
  ),
);
buildTasks.push('indexes');

// HTML Optimization task
gulp.task('html:optimize', () => {
  const src = path.join(folders.output, '**/*.html');
  const dest = folders.output;
  optimize.critical.base = dest;
  return gulp
    .src(src)
    .pipe(gulpif(production, critical(optimize.critical)))
    .pipe(gulpif(production, htmlmin(optimize.htmlmin)))
    .pipe(gulp.dest(dest));
});

// Group Tasks
gulp.task('build', gulp.series(gulp.parallel(...buildTasks), 'sw'));
gulp.task('watch', gulp.parallel(...watchTasks));
gulp.task('dev', gulp.series('build', 'watch'));
