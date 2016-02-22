var tls = require('tls');

var vulnerable = false;

function check(host, cb) {
    var options = {
        host: host,
        port: 443,
        ciphers: 'EXPORT'
    };

    var client = tls.connect(options, function () {
        vulnerable = true;
        client.end();

        cb(null, { vulnerable: vulnerable });
    });

    client.on('error', function(err){
      client.end();
      cb(null, { vulnerable: vulnerable });
    });
}

module.exports = function (ctx, cb) {
    if (typeof ctx.data.host !== 'string') {
        cb({
            code: 400,
            message: 'You must specify the host to check'
        }, null)
    }

    check(ctx.data.host, cb)
};

