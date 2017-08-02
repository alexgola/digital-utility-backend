require("babel-polyfill");
const babel = require('gulp-babel');
const gulp = require('gulp');
const run = require('run-sequence');
const watch = require('gulp-watch');
const clean = require('gulp-clean');
const spawn = require('child_process').spawn; 
const minify = require('gulp-minify');
let node; 

//Have to convert this statement to ES6
var exec = require('child_process').exec;

var reset = function () {
  return process.stdout.write('\033c');
}
reset();

const paths = {
    js: ['src/**/*.js'],
    buildCode: ['build/**/*.js'],
    devBuildCode: ['dev-build/**/*.js'],
};

gulp.task('clean-build-scripts', function () {
  return gulp.src(paths.buildCode, {read: false})
    .pipe(clean());
});

gulp.task('clean-dev-build-scripts', function () {
  return gulp.src(paths.devBuildCode, {read: false})
    .pipe(clean());
});

gulp.task('typecheck', function() {
  exec('flow', function (err, stdout, stderr) {
    if(!err) {
      run('dev-build-post-flow', 'server');
    }

    if(stdout){
      console.log(stdout);
    }
    if(stdout){
      console.log(stderr);
    }
  });
});

gulp.task('build-post-flow', ['clean-build-scripts'], () => {
    return gulp.src(paths.js)
        .pipe(babel({
            plugins: ['transform-flow-strip-types']
        }))
        .pipe(gulp.dest('build'))

                /*.pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))*/
});

gulp.task('dev-build-post-flow', ['clean-dev-build-scripts'], () => {
    return gulp.src(paths.js)
        .pipe(babel({
            plugins: ['transform-flow-strip-types']
        }))
        .pipe(gulp.dest('dev-build'))
});

gulp.task('build-run', () => {
    if (node) {
      node.kill();
    }

    exec('node build/index.js', (err, stdout, stderr) => {
        let stdnout = `Standard Out: ${stdout}`;
        let stdnerr = `Errors: ${stderr}`;
        console.log(stdnout);
        console.log(stdnerr);
    });
});
gulp.task('server', function() {
  if (node) {
    node.kill();
  }
  
  node = spawn('node', ['dev-build/index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})


gulp.task('clear-console', function() {
  exec('clear', function (err, stdout, stderr) { });
})

gulp.task('watch', () => {
  return watch(paths.js, () => {
    gulp.start('default');
  });
});
//, 'build-post-flow', 'run'
gulp.task('default', () => {
  run('typecheck', 'watch');
});

gulp.task('build', () => {
  run('typecheck', 'build-post-flow', 'build-run');
});