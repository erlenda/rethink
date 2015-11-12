// connect
var connection = null;
r.connect({
   host: 'localhost',
   port: 28015
 }, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

// create table
r.db('test').tableCreate('authors')
.run(connection,
function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result));
})

// create table response
r.db('test').tableCreate('authors').run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
})
