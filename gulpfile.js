/**
 * Include gulp plugins
 */
const gulp = require("gulp");
const argv = require("yargs").argv;
const browserSync = require("browser-sync").create();
const nunjucks = require("gulp-nunjucks");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");
const newer = require("gulp-newer");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const fonter = require("gulp-fonter");
const rimraf = require("rimraf-promise");
const concat = require("gulp-concat");

/**
 * Include projectConfig file
 */
const projectConfig = require("./projectConfig.json");

/**
 * Path settings
 */
const path = projectConfig.path;

path.watch = {};

/**
 * Vars
 */
const libFilesJs = [
  "./app/libs/jquery/dist/jquery.min.js",
  "./app/libs/OwlCarousel2-2.2.0/dist/owl.carousel.min.js",
];

const libFilesCSS = [
  "./app/libs/normalize-css/normalize.css",
  "./app/libs/OwlCarousel2-2.2.0/dist/assets/owl.carousel.min.css",
];

/**
 * JS
 * OwlCarousel - './app/libs/OwlCarousel2-2.2.0/dist/owl.carousel.min.js'
 * MaskedInput - './app/libs/maskedinput/jquery.maskedinput.min.js'
 * jQurtyUI - './app/libs/jquery-ui/jquery-ui.min.js'
 * jQurtyMobile - './app/libs/jqueryMobile/jquery.mobile.custom.min.js'
 * IntelTelInput - './app/libs/intl-tel-input-master/build/js/intlTelInput.min.js'
 * SmoothScroll - './app/libs/smooth-scroll/smooth-scroll.js'
 * Swipe - './app/libs/Swipe/jquery.touchSwipe.min.js'
 * Velocity - './app/libs/Velocity/velocity.min.js'
 */

/**
 * CSS
 * OwlCarousel - './app/libs/OwlCarousel2-2.2.0/dist/assets/owl.carousel.min.css'
 * jQurtyUI - './app/libs/jquery-ui/jquery-ui.min.css'
 * IntelTelInput - './app/libs/intl-tel-input-master/build/css/intlTelInput.css'
 */

/**
 * Html path
 */
path.src.html[0] = path.src.srcPath + path.src.html[0];
path.src.html[1] = "!" + path.src.html[0].slice(0, -6) + "_*.html";
path.src.html[2] = "!" + path.src.srcPath + "/assets";
path.src.html[3] = "!" + path.src.srcPath + "/_html";

path.dist.html = path.dist.distPath + path.dist.html;

path.watch.html = [];
path.watch.html[0] = path.src.html[0];

/**
 * Css path
 */
path.src.style[0] = path.src.srcPath + path.src.style[0];
path.src.style[1] =
  "!" + path.src.srcPath + path.src.components + "/vendor.scss";

path.dist.style = path.dist.distPath + path.dist.style;

path.watch.style = [];
path.watch.style[0] = path.src.style[0].replace(
  path.src.style[0].split("/").pop(),
  "**/*.scss"
);

/**
 * Js path
 */
path.src.script[0] = path.src.srcPath + path.src.script[0];

path.dist.script = path.dist.distPath + path.dist.script;

path.watch.script = [];
path.watch.script[0] = path.src.script[0].replace(
  path.src.script[0].split("/").pop(),
  "**/*.js"
);

/**
 * Fonts path
 */
path.src.font[0] = path.src.srcPath + path.src.font[0];
path.src.font[1] = "!" + path.src.font[0].slice(0, -6) + "src/*.*";

path.dist.font = path.dist.distPath + path.dist.font;

path.watch.font = [];
path.watch.font[0] = path.src.font[0];
path.watch.font[1] = "!" + path.src.font[0].slice(0, -6) + "src/*.*";

/**
 * Images path
 */
path.src.image[0] = path.src.srcPath + path.src.image[0];
path.dist.image = path.dist.distPath + path.dist.image;
path.watch.image = [];
path.watch.image[0] = path.src.image[0];

/**
 * Dev check
 */
const isDev = function () {
  return !argv.prod;
};

/**
 * Prod check
 */
const isProd = function () {
  return !!argv.prod;
};

/**
 * Serve
 */
function browsersync() {
  browserSync.init({
    open: true,
    server: path.dist.distPath,
  });
}

/**
 * Html
 */
function njk() {
  return gulp
    .src(path.src.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html))
    .on("end", browserSync.reload);
}

exports.njk = njk;

/**
 * Style
 */
function scss() {
  return gulp
    .src(path.src.style)
    .pipe(gulpif(isDev(), sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(isProd(), autoprefixer({ grid: true })))
    .pipe(gulpif(isProd(), gcmq()))
    .pipe(gulpif(isDev(), sourcemaps.write()))
    .pipe(gulpif(isProd(), gulp.dest(path.dist.style)))
    .pipe(gulpif(isProd(), csso()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(path.dist.style))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulpif(isDev(), vendorStyles())); // Додано виклик завдання vendorStyles у режимі розробки
}

function vendorStyles() {
  return gulp
    .src(libFilesCSS)
    .pipe(concat("vendor.min.css"))
    .pipe(gulp.dest("./dist/assets/css"));
}

/**
 * Script
 */
const webpackConf = {
  mode: isDev() ? "development" : "production",
  devtool: isDev() ? "eval-source-map" : false,
  optimization: {
    minimize: false,
  },
  output: {
    filename: "custom.js",
  },
  module: {
    rules: [],
  },
};

if (isProd()) {
  webpackConf.module.rules.push({
    test: /\.(js)$/,
    exclude: /(node_modules)/,
    loader: "babel-loader",
  });
}

function script() {
  let pipeline = gulp.src(path.src.script).pipe(plumber());

  if (isProd()) {
    pipeline = pipeline
      .pipe(webpackStream(webpackConf, webpack))
      .pipe(gulp.dest(path.dist.script))
      .pipe(uglify())
      .pipe(rename({ basename: "custom", suffix: ".min" }));
  } else {
    pipeline = pipeline.pipe(rename({ basename: "custom", suffix: ".min" }));
  }

  return pipeline
    .pipe(gulp.dest(path.dist.script))
    .pipe(browserSync.reload({ stream: true }));
}

function vendorScripts() {
  return gulp
    .src(libFilesJs)
    .pipe(concat("vendor.min.js"))
    .pipe(gulp.dest("./dist/assets/js"));
}

/**
 * Image move
 */
function image() {
  return gulp
    .src(path.src.image)
    .pipe(newer(path.dist.image))
    .pipe(gulp.dest(path.dist.image));
}

/**
 * Woff2 converter
 */
function ttf2woff2Converter() {
  return gulp
    .src(path.src.font[0].slice(0, -6) + "app/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.src.font[0].slice(0, -6)));
}

/**
 * Woff converter
 */
function ttf2woffConverter() {
  return gulp
    .src(path.src.font[0].slice(0, -6) + "app/*.ttf")
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.src.font[0].slice(0, -6)));
}

/**
 * Otf to ttf converter
 */
function otf2ttf() {
  return gulp
    .src(path.src.font[0].slice(0, -6) + "app/*")
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(gulp.dest(path.src.font[0].slice(0, -6) + "app"));
}

const fontsConvert = gulp.series(
  otf2ttf,
  ttf2woff2Converter,
  ttf2woffConverter
);
exports.fontsConvert = fontsConvert;

/**
 * Fonts
 */
function font() {
  return gulp
    .src(path.src.font)
    .pipe(gulp.dest(path.dist.font))
    .on("end", browserSync.reload);
}

/**
 * Clean
 */
async function clean() {
  await rimraf(path.dist.distPath);
}

/**
 * Watch
 */
function watch() {
  gulp.watch(path.watch.html, njk);
  gulp.watch(path.watch.style, scss);
  gulp.watch(path.watch.script, script);
  gulp.watch(path.watch.image, image);
  gulp.watch(path.watch.font, font);
}

/**
 * Default task
 */
exports.default = gulp.series(
  gulp.parallel(clean),
  gulp.parallel(njk, scss, script, image, font, vendorScripts),
  gulp.parallel(browsersync, watch)
);
