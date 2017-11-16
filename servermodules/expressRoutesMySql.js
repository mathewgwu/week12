var mysql      = require('mysql');
var fs = require('fs');
module.exports = function(app) {

  //Read mysql connection values from a JSON file.
  var config = fs.readFileSync('./servermodules/mysql.json', 'utf8');
  config = JSON.parse(config);

app.get('/api/columnchart', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
  connection.connect();
   var numofcolleges = req.query.numofcolleges;
   console.log('number of colleges : ', numofcolleges);

   if(numofcolleges == 'all') {
     connection.query('SELECT * from collegesbystate',
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }else {
       connection.query('SELECT * from collegesbystate where numcolleges > ?',numofcolleges,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }

  connection.end();

 });

//Line Chart Call
 app.get('/api/linechart', function(req,res) {
   var connection = mysql.createConnection({
      host     : config.host,
      user     : config.user,
      password : config.password,
      database : config.database
    });
			 connection.connect();
       var stockSymbol = req.query.stockSymbol;
       if(stockSymbol == 'all' || stockSymbol == ''){
         connection.query('SELECT * from multilinechart',
             function(err, rows, fields) {
               if (!err)
                 console.log('The line charts is: ', rows);
               else
                 console.log('Error while performing Query.', err);
               res.send(rows);
         });
       }else {
         connection.query('SELECT * from multilinechart where symbol = ?',stockSymbol,
  		 				function(err, rows, fields) {
  		 					if (!err)
  		 						console.log('The line charts is: ', rows);
  		 				  else
  		 						console.log('Error while performing Query.', err);
  		 				  res.send(rows);
  				});
       }

		   connection.end();
	});
//Area chart Call
app.get('/api/areachart', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var year = req.query.year;
    console.log('value of startDate ', startDate);
    console.log('value of endDate ', endDate);
    console.log('value of year ', year);
     connection.connect();
     if(year == 'all' || year == ''){
       connection.query('SELECT * from areachartstockprice',

       function(err, rows, fields) {
              if (!err)
              console.log('The area charts is: ');
              else
                console.log('Error while performing Query.', err);
              res.send(rows);

        });
     }else {
       connection.query('SELECT * from areachartstockprice where years >= ?',year,

      function(err, rows, fields) {
             if (!err)
             console.log('The area charts is: ');
             else
               console.log('Error while performing Query.', err);
             res.send(rows);

       });
     }

      connection.end();
});
//Scatter plot charts
app.get('/api/scatterplot', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
     connection.connect();
     connection.query('SELECT * from scatterplot',
          function(err, rows, fields) {
            if (!err)
              console.log('The scatter plot charts is: ', rows);
            else
              console.log('Error while performing Query.', err);
            res.send(rows);
      });
     connection.end();
});

//HighCharts api calls to database
app.get('/api/highchartarea', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
connection.connect();
console.log('coming here to get high chart area');
connection.query('SELECT * from areachartstockprice',
     function(err, rows, fields) {
       if (!err)
         console.log('The solution is: ', rows);
      else
         console.log('Error while performing Query.', err);
      res.send(rows);

});
connection.end();

});

app.get('/api/highchartline', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
connection.connect();
console.log('coming here to get high chart line');
connection.query('SELECT * from linechartsingle',
     function(err, rows, fields) {
       if (!err)
         console.log('The solution is: ', rows);
      else
         console.log('Error while performing Query.', err);
      res.send(rows);

});
connection.end();

});

app.get('/api/highchartcolumn', function(req,res) {
  var connection = mysql.createConnection({
     host     : config.host,
     user     : config.user,
     password : config.password,
     database : config.database
   });
connection.connect();
console.log('coming here to get high chart column');
connection.query('SELECT * from collegesbystate',
     function(err, rows, fields) {
       if (!err)
         console.log('The solution is: ', rows);
      else
         console.log('Error while performing Query.', err);
      res.send(rows);

});
connection.end();

});

 // application -------------------------------------------------------------
 app.get('*', function(req, res) {
   res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 });

 }
