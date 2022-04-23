let projectFolder = "dist";
let sourceFolder = "src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
    },
    src: {
        html: sourceFolder + "/*.html",
        css: sourceFolder + "/scss/style.scss",
        js: sourceFolder + "/js/main.js",
        img: sourceFolder + "/img/**/*.{png,svg}",
    },
    watch: {
        html: sourceFolder + "/index.html",
        html2: sourceFolder + "/html/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/main.js",
        img: sourceFolder + "/img/",
    },
    clean: "./" + projectFolder + "/",

}

let {src, dest} = require("gulp"),
    gulp = require("gulp"),
    browsersync = require("browser-sync").create(),
    del = require("del"),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify-es').default,
    fileInclude = require("gulp-file-include");



function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/",
        },
        port: 3000,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
           scss({
               outputStyle: "expanded"
           })
        )
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.html2], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images));
let dev = gulp.parallel(build, gulp.parallel(watchFiles, browserSync));
exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.dev = dev;
exports.default = dev;
