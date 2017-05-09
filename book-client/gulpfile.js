const gulp = require("gulp")
gulp.task("build",function(){
    gulp.src("./build/**/*").pipe(gulp.dest("../public"))
})