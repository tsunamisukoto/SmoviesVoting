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
  exec('ng serve --open --proxy-config=proxy.conf.json --ssl', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
    cb();
  });
});

gulp.task('ng-serve-prod', function (cb) {
  exec('ng serve --ssl=true --ssl-cert="/etc/letsencrypt/live/smovies.tsunamisukoto.com/fullchain.pem" --ssl-key="/etc/letsencrypt/live/smovies.tsunamisukoto.com/privkey.pem" --port=5052', (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
    cb();
  });
});

gulp.task('start', gulp.parallel('node-server-start', 'ng-serve'));
gulp.task('start-prod', gulp.parallel('node-server-start', 'ng-serve-prod'));
