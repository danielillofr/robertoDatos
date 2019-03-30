const sql = require('mssql');

    let config = {
        server: 'DESKTOP-72IHSCR', 
		user: 'roberto',
		password: 'roberto2',
        database: 'EMP16',
		port: 51256		 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err){
			console.log(err);
			return;
		}else{
		console.log('Bien');
		}
		let request = new sql.Request();
		request.query('select ARTCOD,ARTNOM from ARTICULO where ARTCOD=\'0\'', function (err, recordset) {
            
            if (err){
				console.log(err)
				return;
			}
			//console.log(recordset.recordset);
			
			recordset.recordset.forEach(element => {
				console.log(`Articulo:${element.ARTCOD} - ${element.ARTNOM}`);
			});
		
            // send records as a response
            
            
        });		

		
    });