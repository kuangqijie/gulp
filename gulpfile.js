
var gulp = require('gulp');
var sass = require('gulp-sass');
//var md5 = require("gulp-md5-plus");

var rev = require('gulp-rev'); //文件hash
var revCollector = require('gulp-rev-collector'); //替换资源路径为hash值
var spritesmith = require('gulp.spritesmith'); //合并雪碧图
//var uglify = require('gulp-uglify'); //压缩
//var buffer = require('gulp-buffer');

//确保任务执行顺序（gulp任务是异步执行...）
var gulpSequence = require('gulp-sequence');

gulp.task('sass', function(){
    gulp.src('src/sass/*.scss') //入口文件
        //expanded：属性独占一行，compact：单行，compressed：压缩
        .pipe(sass({outputStyle: 'compact'})) //执行编译
        .pipe(gulp.dest('src/css/')); //输出
});

//监听sass文件改动、执行sass任务
gulp.task('sass:watch', function(){
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

//生成带hash后缀文件 !第二个参数['sass']表示依赖任务、 将在当前任务'rev'之前执行
gulp.task('rev', function(){
    gulp.src('src/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())   //生成一个json格式的静态文件资源表
        .pipe(gulp.dest('rev/css'));

    gulp.src('dist/js/main/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js/ver'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));

    gulp.src('src/images/*')
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/img'));
});

//替换页面文件资源引用路径
gulp.task('replace', function(){
    gulp.src(['rev/**/*.json','templates/**/*'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: { //替换目录
                'src/css':'dist/css',
                'dist/js/main':'dist/js/ver',
                'src/images':'dist/images'
            }
        }))
        .pipe(gulp.dest('temp/'));

    //替换样式里的图片路径
    gulp.src(['rev/**/*.json','dist/css/*.css'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist/css/'));
});

//生成雪碧图
gulp.task('sprite', function () {
    var spriteData = gulp.src('src/images/ico/*').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        cssTemplate:'cssHandlebars.txt',
        padding:10
    }));
    spriteData.img.pipe(gulp.dest('src/images'));
    spriteData.css.pipe(gulp.dest('src/sass/components'));
});

//gulp.task('prod', ['sass','rev','replace']);
//gulp.task('prod', gulpSequence('sass','rev','replace'));

