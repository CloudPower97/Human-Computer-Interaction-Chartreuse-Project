const folder = {
  src: "./src/",
  dist: "./dist/",
  tmp: "./tmp/"
};

const gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  cleanCSS = require("gulp-clean-css"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  autoprefixer = require("gulp-autoprefixer"),
  htmlmin = require("gulp-htmlmin"),
  imagemin = require("gulp-imagemin"),
  responsive = require("gulp-responsive");

gulp.task("watch", ["browserSync"], function() {
  gulp.watch(folder.src + "scss/**/*", ["styles"]);
  gulp.watch(folder.src + "js/**/*", ["scripts"]);
  gulp.watch(folder.dist + "**/*.html", ["minifyHTML"]);
  gulp.watch(folder.dist + "**/*.html", browserSync.reload);
  gulp.watch(folder.dist + "js/**/*", browserSync.reload);
});

gulp.task("browserSync", [
    "styles",
    "scripts",
    "minifyHTML"
  ], function() {
  browserSync.init({
    server: {
      baseDir: folder.dist
    }
  });
});

gulp.task("scss", function() {
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
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        grid: true
      })
    )
    .pipe(gulp.dest(folder.tmp + "css/"));
});

gulp.task("styles", ["scss"], function() {
  return gulp
    .src([
      folder.src + "css/normalize.css",
      folder.tmp + "css/master.css"
    ])
    .pipe(concat("master.css"))
    .pipe(cleanCSS({}))
    .pipe(gulp.dest(folder.dist + "css"));
});

gulp.task("compressImages", function() {
  return gulp
    .src(folder.src + "img/**/*")
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
});

gulp.task("resizeImages", function() {
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
});

gulp.task("minifyHTML", function() {
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
    .pipe(gulp.dest(folder.dist));
});

gulp.task("scripts", function() {
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
    .pipe(gulp.dest(folder.dist + "js/"));
});
