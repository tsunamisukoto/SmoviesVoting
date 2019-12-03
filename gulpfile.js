var gulp = require('gulp');
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child-process-promise').exec;


gulp.task('node-server-start', function (cb) {
  var cmd = spawn('node', ['index.js'], {
    stdio: 'inherit'
  });
  cmd.on('close', function (code) {
    console.log('my-task exited with code ' + code);
    cb(code);
  });
  cb();
});

gulp.task('ng-serve', function (cb) {
  exec('ng serve', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
    cb();
  });
});

gulp.task('start', gulp.parallel('node-server-start', 'ng-serve'));
