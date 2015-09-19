/*
Leaflet.CenterCross building and linting scripts.

To use, install Node, then run the following commands in the project root:

    npm install
    npm run build
*/

var build = require('./build/build.js');

function hint(msg, paths) {
    return function () {
        console.log(msg);
        jake.exec('node node_modules/jshint/bin/jshint -c ' + paths,
                    {printStdout: true}, function () {
            console.log('\tCheck passed.\n');
            complete();
        });
    };
}

desc('Check Leaflet.CenterCross source for errors with JSHint');
task('lint', {async: true}, hint('Checking for JS errors...', 'build/hintrc.js src'));

desc('Combine and compress Leaflet.CenterCross source files');
task('build', {async: true}, function () {
    build.build(complete);
});
task('default', ['lint', 'build']);

jake.addListener('complete', function () {
    process.exit();
});
