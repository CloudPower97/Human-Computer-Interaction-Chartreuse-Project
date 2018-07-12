const folder = {
  src: "./src/",
  dist: "./dist/",
  tmp: "./tmp/"
};

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  discardComments = require("postcss-discard-comments"),
  flexBug = require("postcss-flexbugs-fixes"),
  fontMagician = require("postcss-font-magician"),
  easingGradients = require("postcss-easing-gradients"),
  cssNano = require("cssnano"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  htmlmin = require("gulp-htmlmin"),
  imagemin = require("gulp-imagemin"),
  responsive = require("gulp-responsive"),
  del = require("del"),
  changed = require("gulp-changed");

gulp
  .watch(folder.src + "scss/**/*")
  .on("all", gulp.series(compileToCSS, minifyCSS));
gulp.watch(folder.src + "**/*.html").on("all", minifyHTML);
gulp.watch(folder.src + "js/**/*").on("all", minifyJS);

gulp.task("build", gulp.series(removeDist,
  gulp.parallel(
    gulp.series(compileToCSS, minifyCSS),
    minifyJS,
    minifyHTML,
    gulp.series(compressImages, resizeImages)
  ),
  removeTmp));

gulp.task(
  "watch",
  gulp.series(removeDist,
    gulp.parallel(
      gulp.series(compileToCSS, minifyCSS),
      minifyJS,
      minifyHTML,
      gulp.series(compressImages, resizeImages)
    ),
    removeTmp,
    function() {
      browserSync.init({
        server: {
          baseDir: folder.dist
        }
      });
    }
  )
);

gulp.task("scss", compileToCSS);

gulp.task("styles", gulp.series(compileToCSS, minifyCSS));

gulp.task("clean", removeTmp);

gulp.task("optimizeImages", gulp.series(compressImages, resizeImages));

gulp.task("minifyHTML", minifyHTML);

gulp.task("scripts", minifyJS);

function removeDist() {
  return del("./dist");
}

function removeTmp() {
  return del("./tmp");
}

function minifyCSS() {
  return gulp
    .src([
      folder.src + "css/normalize.css",
      folder.tmp + "css/master.css"
    ])
    .pipe(concat("master.css"))
    .pipe(
      postcss([
        autoprefixer({ browsers: ["last 2 version"], grid: true }),
        cssNano(),
        discardComments({ removeAll: true }),
        flexBug(),
        fontMagician(),
        easingGradients()
      ])
    )
    .pipe(gulp.dest(folder.dist + "css"))
    .pipe(browserSync.reload({ stream: true }));
}

function compileToCSS() {
  return gulp
    .src(folder.src + "scss/master.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: [
"./src/scss/components/",
"./src/scss/base"
]
      })
    )
    .pipe(gulp.dest(folder.tmp + "css/"));
}

function compressImages() {
  return gulp
    .src(folder.src + "img/**/*")
    .pipe(changed(folder.tmp + "img/"))
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({
          optimizationLevel: 5
        }),
        imagemin.svgo({
          plugins: [
{ removeViewBox: true },
{ cleanupIDs: false }
]
        })
      ])
    )
    .pipe(gulp.dest(folder.tmp + "img/"));
}

function resizeImages() {
  return gulp
    .src(folder.tmp + "img/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(
      responsive({
        "certosa-*": [
          {
            width: 480,
            rename: {
              suffix: "-small",
              extname: ".jpg"
            }
          },
          {
            width: 480 * 2,
            rename: {
              suffix: "-small@2x",
              extname: ".jpg"
            }
          },
          {
            width: 512,
            rename: {
              suffix: "-large",
              extname: ".jpg"
            }
          },
          {
            width: 512 * 2,
            rename: {
              suffix: "-large@2x",
              extname: ".jpg"
            }
          },
          {
            width: 480,
            rename: {
              suffix: "-small",
              extname: ".webp"
            }
          },
          {
            width: 480 * 2,
            rename: {
              suffix: "-small@2x",
              extname: ".webp"
            }
          },
          {
            width: 512,
            rename: {
              suffix: "-large",
              extname: ".webp"
            }
          },
          {
            width: 512 * 2,
            rename: {
              suffix: "-large@2x",
              extname: ".webp"
            }
          }
        ]
      })
    )
    .pipe(gulp.dest(folder.dist + "img/"));
}

function minifyHTML() {
  return gulp
    .src(folder.src + "html/**/*")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      })
    )
    .pipe(gulp.dest(folder.dist))
    .pipe(browserSync.reload({ stream: true }));
}

function minifyJS() {
  return gulp
    .src([
      folder.src + "js/fontAwesome.js",
      folder.src + "js/sketchfabViewer.js",
      folder.src + "js/interact.js",
      folder.src + "js/main.js"
    ])
    .pipe(concat("main.js"))
    .pipe(gulp.dest(folder.tmp + "js/"))
    .pipe(uglify())
    .pipe(gulp.dest(folder.dist + "js/"))
    .pipe(browserSync.reload({ stream: true }));
}
