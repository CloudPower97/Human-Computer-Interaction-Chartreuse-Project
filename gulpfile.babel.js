const folder = {
  src: "./src/",
  dist: "./dist/",
  tmp: "./tmp/"
};

import { watch, series, task, parallel, src as _src, dest } from "gulp";
import sass from "gulp-sass";
const browserSync = require("browser-sync").create();
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import discardComments from "postcss-discard-comments";
import flexBug from "postcss-flexbugs-fixes";
import fontMagician from "postcss-font-magician";
import easingGradients from "postcss-easing-gradients";
import brandColors from "postcss-brand-colors";
import cssAssets from "postcss-assets";
import cssNano from "cssnano";
import concat from "gulp-concat";
import uglify from "gulp-uglify-es";
import htmlmin from "gulp-htmlmin";
import imagemin, { gifsicle, jpegtran, optipng, svgo } from "gulp-imagemin";
import responsive from "gulp-responsive";
import del from "del";
import changed from "gulp-changed";
import rev, { manifest as _manifest } from "gulp-rev";
import revDelete from "gulp-rev-delete-original";
import revRewrite from "gulp-rev-rewrite";
const critical = require("critical").stream;

watch(folder.src + "scss/**/*").on(
  "all",
  series(
    createRevisionManifest,
    rewriteWithRevisionManifest,
    compileToCSS,
    minifyCSS, 
    inlineCriticalCSS,       
    removeTmp
  )
);
watch(folder.src + "**/*.html").on("all", minifyHTML);
watch(folder.src + "js/**/*").on(
  "all",
  series(
    createRevisionManifest,
    rewriteWithRevisionManifest,
    minifyJS,    
    removeTmp
  )
);

task("critical", inlineCriticalCSS);

task(
  "build",
  series(
    removeDist,
    parallel(
      series(compressImages, resizeImages, compileToCSS, minifyCSS),
      minifyJS,
      minifyHTML
    ),
    series(createRevisionManifest, rewriteWithRevisionManifest),
    inlineCriticalCSS,    
    removeTmp
  )
);

task(
  "watch",
  series(
    removeDist,
    parallel(
      series(compressImages, resizeImages, compileToCSS, minifyCSS),
      minifyJS,
      minifyHTML
    ),
    series(createRevisionManifest, rewriteWithRevisionManifest),
    inlineCriticalCSS,    
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

task("scss", compileToCSS);

task("styles", series(compressImages, resizeImages, compileToCSS, minifyCSS));

task("clean", removeTmp);

task("optimizeImages", series(compressImages, resizeImages));

task("minifyHTML", minifyHTML);

task("scripts", minifyJS);

function removeDist() {
  return del("./dist");
}

function removeTmp() {
  return del("./tmp");
}

function minifyCSS() {
  return _src([folder.src + "css/normalize.css", folder.tmp + "css/master.css"])
    .pipe(concat("master.css"))
    .pipe(
      postcss([
        cssAssets({
          basePath: folder.dist,
          loadPaths: ["./img/"]
        }),
        autoprefixer({
          grid: true 
        }),
        discardComments({ removeAll: true }),
        flexBug(),
        fontMagician({
          foundries: ["google"],
        }),
        easingGradients(),
        brandColors(),
        cssNano()
      ])
    )
    .pipe(dest(folder.dist + "css"))
    .pipe(browserSync.reload({ stream: true }));
}

function compileToCSS() {
  return _src(folder.src + "scss/master.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ["./src/scss/components/", "./src/scss/base"]
      })
    )
    .pipe(dest(folder.tmp + "css/"));
}

function inlineCriticalCSS(){  
  return _src(folder.dist + "index.html")
        .pipe(critical({
          inline: true,
          base: folder.dist,
          minify: true,
          dimensions: [{
            width: 320,
            height: 480
          },{
            width: 1024,
            height: 768
          },{
            widht: 1280,
            height: 800
          },{
            widht: 1280,
            height: 1024
          },{
            width: 1366,
            height: 768
          },{
            width: 1920,
            height: 1080
          }],
          ignore: [
            /#font-modal(.*)/,
            /#explore(.*)/,
            /#social-modal(.*)/,
            "template",
            /.tab-container(.*)/,
            /.card(.*)/,
            /body.explore(.*)/,
            /#saved-elements(.*)/      
            ],
        }))
        .pipe(dest(folder.dist));
};

function compressImages() {
  return _src(folder.src + "img/**/*")
    .pipe(changed(folder.tmp + "img/"))
    .pipe(
      imagemin([
        gifsicle({
          interlaced: true
        }),
        jpegtran({
          progressive: true
        }),
        optipng({
          optimizationLevel: 5
        }),
        svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(dest(folder.tmp + "img/"));
}

function resizeImages() {
  return _src(folder.tmp + "img/**/*.+(png|jpg|jpeg|gif|svg)")
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
        ],
        "portrait_warning.png": [
          {
            rename: {
              extname: ".webp"
            }
          },
          {
            rename: {
              extname: ".png"
            }
          }
        ]
      })
    )
    .pipe(dest(folder.dist + "img/"));
}

function minifyHTML() {
  return _src(folder.src + "html/**/*")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
      })
    )
    .pipe(dest(folder.dist))
    .pipe(browserSync.reload({ stream: true }));
}

function minifyJS() {
  return _src([
    folder.src + "js/fontAwesome.js",
    folder.src + "js/sketchfabViewer.js",
    folder.src + "js/interact.js",
    folder.src + "js/main.js"
  ])
    .pipe(concat("main.js"))
    .pipe(dest(folder.tmp + "js/"))
    .pipe(uglify())
    .pipe(dest(folder.dist + "js/"))
    .pipe(browserSync.reload({ stream: true }));
}

function createRevisionManifest() {
  return _src(folder.dist + "/**/*.{css,js}")
    .pipe(rev())
    .pipe(revDelete())
    .pipe(dest(folder.dist))
    .pipe(_manifest())
    .pipe(dest(folder.tmp));
}

function rewriteWithRevisionManifest() {
  const manifest = _src(folder.tmp + "/rev-manifest.json");

  return _src(folder.dist + "index.html")
    .pipe(revRewrite({ manifest }))
    .pipe(dest(folder.dist));
}
