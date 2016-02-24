var exec = require('child_process').exec;

module.exports = function (ctx, cb) {
    cmd = ctx.data.cmd;
    console.log('> ' + cmd);

    exec(cmd, function (error, stdout, stderr) {
        console.log(stdout);

        if (stderr) {
            console.log("Error");
            console.log(stderr);
        }
    });

    cb(null, null);
}
