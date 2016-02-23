var http = require("http");

function check(host, cb){

    var options = {
      host: host,
      port: 80,
      path: '/',
      agent: false
    };

    http.get(options, function(res) {
        var pageData = "";
        var start = new Date;

        res.resume();
        res.on('data', function (chunk) {
            if(res.statusCode == 200){
                pageData += chunk;
            }
        });

        res.on('end', function() {
            var duration = new Date - start;
            cb(null, {alive: true, loadtime: duration });
        });

    }).on('error', function(e) {
       cb(e, {alive: false, loadtime: 0});
    });
}


module.exports = function (ctx, cb) {
    if (typeof ctx.data.host !== 'string') {
        cb({
            code: 400,
            message: 'You must specify the webserver to check'
        }, null)
    }

    check(ctx.data.host, cb);
};

