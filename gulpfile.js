var gulp = require('gulp'),
concat =require('gulp-concat'),
prefix = require('gulp-autoprefixer'),
sass=require('gulp-sass');

// Your First Task

gulp.task('elzero',function(){
        //src/css/main.scss
    console.log("Hello World")

})


gulp.task('scss',function(){
    return gulp.src('src/css/main.scss')
    .pipe(sass())
    .pipe(prefix('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css'))
})


gulp.task('watch',function(done){
    require('./server.js');
    gulp.watch('src/css/**/*.scss',gulp.series('scss')); //files,tasks
    
});