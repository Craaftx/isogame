// Requires
let gulp = require('gulp');

// Include plugins
let plugins = require('gulp-load-plugins')();
let cleanCSS = require('gulp-clean-css');
let extender = require('gulp-html-extend');
let inject = require('gulp-inject');
let clean = require('gulp-clean');
let gulpsync = require('gulp-sync')(gulp);

let source = './src'; // Work Folder
let prod = './dist'; // Prod Folder

// Personnal CSS and JS files to be injected
let primaryFiles = [
    prod + '/assets/js/*.js',
    prod + '/assets/css/*.css',
];

// Vendors to be injected
let vendorFiles = [
    prod + '/assets/vendor/jquery/**',
    prod + '/assets/vendor/bootstrap/**',
    prod + '/assets/vendor/fontawesome/**',
    prod + '/assets/vendor/animate/**',
    prod + '/assets/vendor/WOW/**',
    prod + '/assets/vendor/popper/**'
];

// Task "vendor" = Move Vendors to Production Folder
gulp.task('vendor', function () {
    return gulp.src(source + '/assets/vendor/**')
        .pipe(gulp.dest(prod + '/assets/vendor/'));
});

// Task "css" = LESS + Autoprefixer + Minify
gulp.task('css', function () {
    return gulp.src(source + '/assets/css/*.less')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`[${new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}] Minify -  ${details.name} : ${details.stats.originalSize} -> ${details.stats.minifiedSize} octets`);
        }))
        .pipe(gulp.dest(prod + '/assets/css/'));
});

// Task "js" = Uglify + Concat
gulp.task('js', function () {
    return gulp.src(source + '/assets/js/*.js')
        .pipe(gulp.dest(prod + '/assets/js/'));
});

// Task "inject" = Inject CSS & JS files to HTML Layout
gulp.task('inject', function () {
    var target = gulp.src(source + '/pages/layouts/layout*.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(vendorFiles.concat(primaryFiles), { read: false });
    return target.pipe(inject(sources, { removeTags: true, ignorePath: '/dist', addRootSlash: false }))
        .pipe(gulp.dest(source + '/pages'));
});

// Task "img" = Optimize images
gulp.task('img', function () {
    return gulp.src(source + '/assets/img/*.{png,jpg,jpeg,gif,svg}')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(prod + '/assets/img'));
});

// Task "html" = includes HTML
gulp.task('html', function () {
    return gulp.src(source + '/pages/*.html')
        // Generates HTML includes
        .pipe(extender({
            annotations: false,
            verbose: false
        })) // default options
        .pipe(gulp.dest(prod))
});

// Task "clean" = Clean temporary files
gulp.task('clean', function () {
    gulp.src(['src/pages/layout*.html', 'dist/layout*.html', 'src/pages/component_*.html', 'dist/component_*.html'], { read: false })
        .pipe(clean());
});

// Task "prod" = Launch all task synchronously
gulp.task('prod', gulpsync.sync([
    'vendor',
    'css', 
    'js',
    'inject',
    'img',
    'html',
    'clean'
]));

// Task "watch" = Watch modifications on HTML or LESS files
gulp.task('watch', function () {
    gulp.watch(source + '/assets/css/*.less', ['css']);
    gulp.watch(source + '/assets/js/*.js', ['js']);
    gulp.watch(source + '/pages/**', gulpsync.sync(['inject', 'html', 'clean']));
});