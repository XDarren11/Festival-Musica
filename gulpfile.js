/*function tarea( done ) {
    console.log('Primera Tarea');

    done(); //Poner esto Para que la Consola Sepa que Ya se Termino de Ejecutar la Tarea
}

exports.primerTarea = tarea;  //Para Mandar a Llamar a la Tarea */


const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//javaScrip
const terser = require('gulp-terser-js');

function css (done) {

    src('src/scss/**/*.scss').           //Identificar el archivo de sass
    pipe( sourcemaps.init() ).
    pipe( plumber()).
    pipe( sass() ).                     //Compilarlo
    pipe(postcss([autoprefixer(), cssnano()])).  //mejoras de css
    pipe( sourcemaps.write('.')).
    pipe(dest("build/css"));            //Almanecar en el disco duro

    done();
}

function versionWebp (done) {
    
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}').
    pipe( webp(opciones) ).
    pipe( dest('build/img'))
    
    done();
}

function versionAvif (done) {
    
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}').
    pipe( avif(opciones) ).
    pipe( dest('build/img'))
    
    done();
}

function Imagenes(done) {
    
    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}').
    pipe( cache( imagemin(opciones) ) ).
    pipe( dest('build/img'))
    
    done();
}

function javaScrip(done) {
    src('src/js/**/*.js').
    pipe( sourcemaps.init()).
    pipe( terser() ).
    pipe( sourcemaps.write('.')).
    pipe( dest('build/js'));

    done();
}

function dev(done) {  // Para ver los cambios ya no tengamos que ejecutar en la terminal el 'npx gulp funcion'
    
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScrip);

    done();
}

exports.css = css;
exports.js = javaScrip;
exports.Imagenes = Imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( Imagenes ,versionWebp, versionAvif , javaScrip, css, dev);
