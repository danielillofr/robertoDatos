const sql = require('mssql');
const mongoose = require('mongoose');
const Articulo = require('./modelo');

obtenerPrecio = (codigo) => {
	return new Promise((resolve, reject) => {
		sql.connect(config, function (err) {	
			let request = new sql.Request();
			request.query(`select PREIMP from PRECIO where PREARTCOD='${codigo}'`, function (err, recordset) {
				sql.close();
				if (err) {
					
					//resolve('0');
					reject(err);
				}else{
					try{
						precio = recordset.recordset[0].PREIMP; 
					}catch(err){
						console.log('Precio no localizado');
						precio = '-';
					}
					resolve(precio);
				}
			});
		});
	});

}

obtenerStock = (codigo) => {
	return new Promise((resolve, reject) => {
		sql.connect(config, function (err) {	
			let request = new sql.Request();
			request.query(`select STOUM1ENT from STOCK where STOARTCOD='${codigo}'`, function (err, recordset) {
				sql.close();
				if (err) {
					console.log('oooStock');
					//resolve('0');
					reject(err);
				}else{
					try{
						stock = recordset.recordset[0].STOUM1ENT; 
					}catch(err){
						stock = '-';
						console.log('Stock no localizado');
					}
					resolve(stock);
				}
			});
		});
	});

}


guardarArticulo = (articulo,precio, stock, x,y) => {
	let grab = new Articulo({
		nombre: articulo.ARTNOM,
		codigo: articulo.ARTCOD,
		precio,
		stock
	});
	return new Promise((resolve,reject) => {
		
		grab.save((err, articuloDb)=>{
			if (err)
			{
				reject(err);
			}else{
				console.log(`Articulo guardado (${x}/${y}`);
				resolve(articuloDb);
			}
		});
		
	});
}

guardarArticulos = async(articulos) => {
	for (x=0; x < articulos.length; x++){
/*		obtenerPrecio(articulos[x].ARTCOD)
			.then(precio => {
				console.log(precio);
			})
			.catch(err => {
				console.log('Errroorrrrr');
				
			});*/
		try {
		precio = await obtenerPrecio(articulos[x].ARTCOD);
		}catch(err){
				precio = '0';
				console.log(`Precio del articulo ${x} no localizado`);
		};
		try{
		stock = await obtenerStock(articulos[x].ARTCOD);
		}catch(err){
				stock = '0';
				console.log(`Stock del articulo ${x} no localizado`);
		};
		try{
			await guardarArticulo(articulos[x], precio, stock,x, articulos.length)
		}catch(err){
				console.log(`Articulo ${x} no guardado`);
		};
	}
}

mongoose.connect('mongodb://localhost:27017/tienda', (err) => {
    if (err) throw err;
})


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
		request.query('select ARTCOD,ARTNOM from ARTICULO', function (err, recordset) {
            
            if (err){
				console.log(err)
				return;
			}
			//console.log(recordset.recordset);
			sql.close();
			guardarArticulos(recordset.recordset)
				.catch(err=>{console.log('aaaa');})
		
            // send records as a response
            
            
        });		

		
    });