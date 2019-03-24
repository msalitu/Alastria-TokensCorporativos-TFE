

//Se recuperan los contratos con su dirección
var ABI = [{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_spender","type": "address"},{"name": "_value","type": "uint256"}],"name": "approve","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_cuenta","type": "address"}],"name": "getEmpleadoNombre","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_from","type": "address"},{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_cuenta","type": "address"}],"name": "getEmpresaNombre","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "listarEmpleados","outputs": [{"name": "","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_spender","type": "address"},{"name": "_addedValue","type": "uint256"}],"name": "increaseAllowance","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_cuenta","type": "address"}],"name": "getEmpleadoNumero","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "listarEmpresas","outputs": [{"name": "","type": "address[]"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_cuenta","type": "address"}],"name": "existeEmpresa","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_cuenta","type": "address"},{"name": "_nombre","type": "string"},{"name": "_numEmpleado","type": "string"}],"name": "registrarEmpleado","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_tokenOwner","type": "address"}],"name": "balanceOf","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_n","type": "uint256"}],"name": "transferirTokens","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [],"name": "acceptOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_n","type": "uint256"}],"name": "canjearTokens","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_cuenta","type": "address"}],"name": "existeEmpleado","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_spender","type": "address"},{"name": "_subtractedValue","type": "uint256"}],"name": "decreaseAllowance","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_n","type": "uint256"}],"name": "emitirTokens","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"}],"name": "emitirTokensRegistro","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "_cuenta","type": "address"},{"name": "_nombre","type": "string"},{"name": "_cif","type": "string"}],"name": "registrarEmpresa","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "newOwner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_tokenOwner","type": "address"},{"name": "_spender","type": "address"}],"name": "allowance","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_cuenta","type": "address"}],"name": "getEmpresaCIF","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": false,"name": "_cuenta","type": "address"},{"indexed": false,"name": "_nombre","type": "string"},{"indexed": false,"name": "_cif","type": "string"}],"name": "EmpresaRegistrada","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "_cuenta","type": "address"},{"indexed": false,"name": "_nombre","type": "string"},{"indexed": false,"name": "_numEmpleado","type": "string"},{"indexed": false,"name": "_empresa","type": "address"}],"name": "EmpleadoRegistrado","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "_from","type": "address"},{"indexed": false,"name": "_to","type": "address"},{"indexed": false,"name": "_n","type": "uint256"}],"name": "TokensEmitidos","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_from","type": "address"},{"indexed": true,"name": "_to","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Approval","type": "event"}];

/* Por unificar durante todo el proyecto, para pruebas se ha realizado:
accounts[0] es la cuenta administradora de la PlataformaTokens
accounts[1] es la empresa IECISA
accounts[2] es Maria Salgado, empleado 1 de IECISA
accounts[3] es Juan Perez, empleado 2 de IECISA
accounts[4] es la empresa UNIR
accounts[5] es Fidel Garcia, empleado 1 de UNIR
accounts[6] es Belen Sanchez, empleado 2 de UNIR
*/

//Se instancia el objeto web3 y se inicializa el array accounts

//En caso de ganache
/*
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var accounts = [
	web3.eth.accounts[0],
	web3.eth.accounts[1],
	web3.eth.accounts[2],
	web3.eth.accounts[3],
	web3.eth.accounts[4],
	web3.eth.accounts[5],
	web3.eth.accounts[6]
];
*/

// En caso de testnet Alastria local

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22001"));
web3.eth.defaultAccount = web3.eth.accounts[0];
web3.personal.unlockAccount(web3.eth.defaultAccount, "Passw0rd");
var accounts = web3.eth.accounts;



// En caso de Alastria
/*var web3 = new Web3(new Web3.providers.HttpProvider("http://138.4.143.82:8545"))
var accounts = [
"0x994319e1b1de09aac4aa5b225a7d5cade79d04ed",
"0x66c5a820d0e743fc7030f02aa873875c84a88f3f",
"0x34322a678b16ce26fc0e2bdde1e3c1b666a34a66",
"0xfc3b00c03b74ee1d94fa10e21aef4e6e9710e8a8",
"0xf76c62480a8a6a83451eeef40d331ed179da7f89",
"0x7b1b6d29cb425887d1bc4849d0708091bcbaf16b",
"0x12e3bb9f253bd233e03bd696b1c558a056179b87",
"0x59bedaa81edfd70b8e370a96cf29ee327e84e551",
"0x9a63729158a93f502935bc322af78e4f25a5cc02",
"0xab2c680816421e56ba3274a37c3df455fba32725"
];
var passwordAlastria = "Alumnos_2018_Q4_IKx5srvT";
web3.eth.personal.unlockAccount(accounts[0],passwordAlastria);
*/

console.log("INIT ACCOUNTS\n" + accounts);

// Se instancia el objeto web3 con la direccion donde esta desplegado el contrato
var plataforma = web3.eth.contract(ABI).at("0x23ed61cfd8da3b84ff5d0d31f285b0c07051d87b");

// Se compueba que el valor es 22 y que se invoca correctamente
var test_value = plataforma.name.call({from:web3.eth.defaultAccount, gas:30000, gasPrice:0});
console.log("DEPLOYED CONTRACT? Nombre de los tokens " + test_value);


// Funciones auxiliares para web3 0.2


function leftPad (str, len, ch) {
    str = String(str);
    var i = -1;
    if (!ch && ch !== 0) {
      ch = ' ';
    }
    len = len - str.length;
    while (++i < len) {
         str = ch + str;
    }
    return str;
}


function keccak256(...args) {
    args = args.map(arg => {
      if (typeof arg === 'string') {
        if (arg.substring(0, 2) === '0x') {
          return arg.slice(2)
        } else {
          return web3.toHex(arg).slice(2)
        }
      }
      if (typeof arg === 'number') {
        return leftPad((arg).toString(16), 64, 0)
      } else {
        return ''
      }
    })

    args = args.join('')

    return web3.sha3(args, { encoding: 'hex' })
  }


  // Otras funciones auxiliares ------------------------------------------------


	// Limpia la consola que se muestra por pantalla
  function limpiar(){
    document.getElementById("result").innerHTML = "";
  }


	// Muestra mensajes por la consola que se muestra en la interfaz y por la de JS
  function imprimir(msg){
    document.getElementById("result").innerHTML = document.getElementById("result").innerHTML + "<br/>" + msg;
    console.log(msg);
  }


  // Acciones de la empresa ----------------------------------------------------

  // Simular el login de una empresa
  function loginEmpresa(){
    var address = document.getElementById("loginEmpresaT").value;
	var pss = document.getElementById("pssEmpresa").value;
	web3.personal.unlockAccount(address, pss, 0);
		
		var exist = plataforma.existeEmpresa.call(address, {from: accounts[0], gas:30000});
		if(exist.valueOf()){
		    	localStorage.setItem("accountEmpresa", address);
			localStorage.setItem("accountEmpresa", address);
			location.replace("empresa.html");
		}else{
			window.alert("No existe una empresa con esa cuenta en el sistema. Por favor, registrate");
		}
  }

// Cerrar sesion en una empresa
function logoutEmpresa(){
    	var address = localStorage.getItem("accountEmpresa");
	var pss = localStorage.getItem("pssEmpresa");
	web3.personal.lockAccount(address, pss);
	location.replace("index.html");	
  }


  // Cargar datos de la empresa en pantalla
  function getInfoEmpresa(){
		var address = localStorage.getItem("accountEmpresa");
		document.getElementById("addressEmpresa").innerHTML = address;
		var nombre = plataforma.getEmpresaNombre.call(address, {from: address, gas:30000});
		document.getElementById("nombreEmpresa").innerHTML = nombre;
		var cif = plataforma.getEmpresaCIF.call(address, {from: address, gas:30000});
		document.getElementById("cifEmpresa").innerHTML = cif;

		var msg = "Ha iniciado sesion la empresa " + nombre;
		imprimir(msg);
	}


  // Emitir token para un empleado
  function emitirTokens(){
    var cantidad = document.getElementById("cantidadTokens").value;
    var address_to = document.getElementById("empleadoReceptor").value;
    var address_from = localStorage.getItem("accountEmpresa");
		plataforma.emitirTokens.sendTransaction(address_to, cantidad, {from: address_from, gas:200000},
			function (error,result){
				if (!error){
					var event = plataforma.TokensEmitidos({},{fromBlock:'latest', toBlock:'latest'},
						function(error, result){
							if (!error){
								var msg = "OK! La empresa " + result.args._from + " ha emitido " + result.args._n + " tokens al empleado " + result.args._to;
						    imprimir(msg);
							}else{
								console.log("Error" + error);
							}
						});
				} else {
					console.error("Error" + error);
				}
			}
		);
  }


  // Registrar un nuevo empleado
  function registrarEmpleado(){
    var nombre = document.getElementById("nombreEmpleado").value;
    var pss = document.getElementById("pssEmpleado").value;
    var nEmpleado = document.getElementById("numEmpleado").value;
    var cuentaEmpresa = localStorage.getItem("accountEmpresa");
    var address = web3.personal.newAccount(pss);
    web3.personal.unlockAccount(address, pss, 0);

		console.log("Cuenta empresa " + cuentaEmpresa);
		plataforma.registrarEmpleado.sendTransaction(address, nombre, nEmpleado, {from: cuentaEmpresa, gas:200000},
			function (error,result){
				if (!error){
					var event = plataforma.EmpleadoRegistrado({},{fromBlock:'latest', toBlock:'latest'},
						function(error, result){
							if (!error){
								var msg = "OK! Se ha creado correctamente la cuenta " + result.args._cuenta + " para " +
									result.args._nombre + " con numero de empleado " + result.args._numEmpleado + " con contraseña " + pss;
						    imprimir(msg);
							}else{
								console.log("Error" + error);
							}
						});
	 			} else {
					console.error("Error" + error);
				}
			});
	web3.personal.lockAccount(address, pss);
  }


	// Registrar una nueva empresa
  function registrarEmpresa(){
    var nombre = document.getElementById("nEmpresaR").value;
    var cif = document.getElementById("cEmpresaR").value;
    var pss = document.getElementById("pEmpresaR").value;
    var address = web3.personal.newAccount(pss);
    web3.personal.unlockAccount(address, pss, 0);

    plataforma.registrarEmpresa.sendTransaction(address, nombre, cif, {from: accounts[0], gas:200000},
			function (error,result){
				if (!error){
					var event = plataforma.EmpresaRegistrada({},{fromBlock:'latest', toBlock:'latest'},
						function(error, result){
							if (!error){
								var msg = "OK! Se ha creado correctamente la cuenta " + address + " para " + result.args._nombre + " con contraseña " + pss
								 + "\n\n¡Apunta bien tu direccion para poder hacer login!";
								console.log(msg);
								var ask = window.confirm(msg);
		 				    if (ask) {
		 				        window.location.href = "index.html";
		 				    }
							}else{
								console.log("Error" + error);
							}
						});
	 			} else {
					console.error("Error" + error);
				}
			});
	web3.personal.lockAccount(address, pss);
  }


  // Consultar todos los empleados de una Empresa
  function consultarEmpleados(){
		var cuentaEmpresa = localStorage.getItem("accountEmpresa");
    var lista = plataforma.listarEmpleados.call({from: cuentaEmpresa, gas:30000});
    var msg = "Ok! Se ha procesado tu consulta. Tus empleados son: ";
    lista.forEach( function(valor, indice, array){
      var i = indice + 1;
			var nombre = plataforma.getEmpleadoNombre.call(valor, {from:cuentaEmpresa, gas:30000});
      msg = msg + "<br/>" + i + ". " + nombre + " => " + valor;
    });
    imprimir(msg);
  }

// Dado un empleado, obener su saldo en tokens
	function consultarSaldoEmpleado(){
		var cuentaEmpresa = localStorage.getItem("accountEmpresa");
		var cuentaEmpleado = document.getElementById("saldoEmpleado").value;
		var saldo = plataforma.balanceOf.call(cuentaEmpleado, {from: cuentaEmpresa, gas:30000});
		var nombreEmpleado = plataforma.getEmpleadoNombre.call(cuentaEmpleado, {from:cuentaEmpresa, gas:30000});
		var msg = "Ok! Se ha procesado tu consulta. El saldo de " + nombreEmpleado + " en tokens (GPI) es " + saldo;
		imprimir(msg);
	}


// Obtener el saldo de la propia empresa en tokens
	function consultarSaldo(){
		var cuentaEmpresa = localStorage.getItem("accountEmpresa");
		var saldo = plataforma.balanceOf.call(cuentaEmpresa, {from: cuentaEmpresa, gas:30000});
		var msg = "Ok! Se ha procesado tu consulta. Tu saldo en tokens (GPI): " + saldo;
		imprimir(msg);
	}

  // Acciones del empleado -----------------------------------------------------
  function loginEmpleado(){
    var address = document.getElementById("logEmpleado").value;
	var pss = document.getElementById("pssEmpleado").value;
	var ok = web3.personal.unlockAccount(address, pss, 0);
	if(ok){
		var exist = plataforma.existeEmpleado.call(address, {from: accounts[0], gas:30000});
		if (exist){
    			localStorage.setItem("accountEmpleado", address);
			localStorage.setItem("pssEmpleado", pss);
			location.replace("empleado.html");
		}else{
			alert("Esa cuenta de empleado no existe en el sistema");
		}
	}else{
		alert("¡Contraseña incorrecta!");
	}
  }


function logoutEmpleado(){
    	var address = localStorage.getItem("accountEmpleado");
	var pss = localStorage.getItem("pssEmpleado");
	web3.personal.lockAccount(address, pss);
	location.replace("index.html");	
  }

  // Cargar datos del empleado en pantalla
  function getInfoEmpleado(){
		var cuentaEmpleado = localStorage.getItem("accountEmpleado");
		document.getElementById("addressEmpleado").innerHTML = cuentaEmpleado;
		var nombre = plataforma.getEmpleadoNombre.call(cuentaEmpleado, {from: cuentaEmpleado, gas:30000});
		document.getElementById("nombreEmpleado").innerHTML = nombre;
		document.getElementById("welcome").innerHTML = "¡Hola " + nombre + "!";
		var numEmpleado = plataforma.getEmpleadoNumero.call(cuentaEmpleado, {from: cuentaEmpleado, gas:30000});
		document.getElementById("cifEmpleado").innerHTML = numEmpleado;
		var saldo = plataforma.balanceOf.call(cuentaEmpleado, {from: cuentaEmpleado, gas:30000});
    document.getElementById("tokensEmpleado").innerHTML = saldo;

    var msg = "Ha iniciado sesion el empleado " + nombre;
    imprimir(msg);
  }


  // Transferir tokens a un companero
  function transferirToken(){
    var cantidad = document.getElementById("cantidadTokensEmpleado").value;
    var address_to = document.getElementById("empleadoSelect").value;
    var address_from = localStorage.getItem("accountEmpleado");;

		plataforma.transferirTokens.sendTransaction(address_to, cantidad, {from: address_from, gas:200000},
			function (error,result){
				if (!error){
					var event = plataforma.TokensEmitidos({},{fromBlock:'latest', toBlock:'latest'},
						function(error, result){
							if (!error){
								var msg = "OK! El empleado " + result.args._from + " ha emitido " + result.args._n + " tokens al empleado " + result.args._to;
						    imprimir(msg);
							}else{
								console.log("Error" + error);
							}
						});
				} else {
					console.error("Error" + error);
				}
			}
		);

		var nuevoSaldo = plataforma.balanceOf.call(address_from, {from: address_from, gas:30000});
		document.getElementById("tokensEmpleado").innerHTML = nuevoSaldo;

  }

  // Canjear token para un empleado
  function canjearToken(){
    var address_from = document.getElementById("addressEmpleado").innerHTML;
    var x = document.getElementById("premioSelect");
    var premio = x.options[x.selectedIndex].text;
    var cantidad;
    if(premio == "Casquitos inalambricos (1 token)"){ cantidad = 1; premio = "Casquitos inalambricos";}
    if(premio == "Entrada a evento (3 tokens)"){ cantidad = 3; premio = "Entrada a evento";}
    if(premio == "Un dia de vacaciones (10 tokens)"){ cantidad = 10; premio = "Un dia de vacaciones";}
		plataforma.canjearTokens.sendTransaction(cantidad, {from: address_from, gas:200000});
		var nuevoSaldo = plataforma.balanceOf.call(address_from, {from: address_from, gas:30000});
		document.getElementById("tokensEmpleado").innerHTML = nuevoSaldo;
    var msg = "OK! El empleado " + address_from + " ha canjeado " + cantidad + " tokens a cambio de " + premio;
    imprimir(msg);
  }
