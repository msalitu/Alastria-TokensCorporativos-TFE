

//Se instancia el objeto web3
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

// Los empleados son cuentas

//Se recuperan los contratos con su dirección
var ABI_Empresa = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_cuenta",
				"type": "address"
			},
			{
				"name": "_nombre",
				"type": "string"
			},
			{
				"name": "_cif",
				"type": "string"
			}
		],
		"name": "registrarEmpresa",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_version",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "version",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
var plataforma = web3.eth.contract(ABI_Empresa).at("0x28dd827458722bdf05a053eb8fcf4f1a112f132f");

/* Por unificar durante todos los tests:
accounts[0] es la cuenta administradora de la PlataformaTokens
accounts[1] es la empresa IECISA
accounts[2] es Maria Salgado, empleado 1 de IECISA
accounts[3] es Juan Perez, empleado 2 de IECISA
accounts[4] es la empresa UNIR
accounts[5] es Fidel Garcia, empleado 1 de UNIR
accounts[6] es Belen Sanchez, empleado 2 de UNIR
*/

// Si ganache web3.eth.accounts y ya estan desbloqueadas
var accounts = [
	web3.eth.accounts[0],
	web3.eth.accounts[1],
	web3.eth.accounts[2],
	web3.eth.accounts[3],
	web3.eth.accounts[4],
	web3.eth.accounts[5],
	web3.eth.accounts[6]
];

// Si testnet en local web3.personal.newAccount(pss); y desbloquear con web3.personal.unlockAccount(address, pss, 0);
/*
var cuentaAdmin = web3.personal.newAccount("test");
web3.personal.unlockAccount(account, "test", 0);
var accounts = [
	cuentaAdmin
];
*/

console.log(accounts);

// Funciones auxiliares para web3 0.2 ------------------------------------------
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

  function limpiar(){
    document.getElementById("result").innerHTML = "";
  }

  function imprimir(msg){
    document.getElementById("result").innerHTML = document.getElementById("result").innerHTML + "<br/>" + msg;
    console.log(msg);
  }


  // Acciones de la empresa ----------------------------------------------------

  // Simular el login de una empresa
  function loginEmpresa(){
    location.replace("empresa.html");
    var address = document.getElementById("logEmpresa").value;
    localStorage.setItem("accountEmpresa", address);
  }

  // Cargar datos de la empresa en pantalla
  function getInfoEmpresa(){
    var empresa = {
      'nombre': 'IECISA',
      'cif': 123456,
      'address': ''
    };
    empresa.address = localStorage.getItem("accountEmpresa");
    document.getElementById("nombreEmpresa").innerHTML = empresa.nombre;
    document.getElementById("cifEmpresa").innerHTML = empresa.cif;
    document.getElementById("addressEmpresa").innerHTML = empresa.address;
    var msg = "Ha iniciado sesion la empresa " + empresa.address;
    imprimir(msg);
  }

  // Emitir token para un empleado
  function emitirTokens(){
    var cantidad = document.getElementById("cantidadTokens").value;
    var address_to = document.getElementById("empleadoReceptor").value;
    var address_from = document.getElementById("addressEmpresa").innerHTML;
    var msg = "OK! La empresa " + address_from + " ha emitido " + cantidad + " tokens al empleado " + address_to;
    imprimir(msg);
  }

  // Registrar un nuevo empleado
  function registrarEmpleado(){
    var nombre = document.getElementById("nombreEmpleado").value;
    var pss = document.getElementById("pssEmpleado").value;
		var nEmpleado = document.getElementById("numEmpleado").value;
    var address = accounts[2];
		var cuentaEmpresa = document.getElementById("addressEmpresa").value;
		plataforma.registrarEmpleado.sendTransaction(address, nombre, nEmpleado, {from: cuentaEmpresa});
    var msg = "OK! Se ha creado correctamente la cuenta " + address + " para " + nombre + " con contraseña " + pss;
    imprimir(msg);
  }


	// Registrar una nueva empresa
  function registrarEmpresa(){
		// campo cuenta por si ya tiene alastria account
    var nombre = document.getElementById("nEmpresa").value;
    var cif = document.getElementById("cEmpresa").value;
    var pss = document.getElementById("pEmpresa").value
    var address = accounts[1];
    plataforma.registrarEmpresa.sendTransaction(address, nombre, cif, {from: account[0]});
    var msg = "OK! Se ha creado correctamente la cuenta " + address + " para " + nombre + " con contraseña " + pss;
    console.log(msg);
    var ask = window.confirm(msg);
    if (ask) {
        window.location.href = "index.html";
    }
  }

  // Consultar todos los empleados de una Empresa
  function consultarEmpleados(){
    var empleado1 = {
      'nombre': 'Maria',
      'num': 123456,
      'address': '0x456',
      'tokens' : 10
    };
    var empleado2 = {
      'nombre': 'Belen',
      'num': 123456,
      'address': '0x456',
      'tokens' : 5
    };
    var empleado3 = {
      'nombre': 'Juan',
      'num': 123456,
      'address': '0x456',
      'tokens' : 2
    };
    var lista = [empleado1, empleado2, empleado3];
    var msg = "Ok! Se ha procesado tu consulta. Tus empleados con sus tokens son: ";
    lista.forEach( function(valor, indice, array){
      var i = indice + 1;
      msg = msg + "</br>" + i + ". " + valor.nombre + " -> " + valor.tokens;
    });
    imprimir(msg);
  }


	function consultarSaldo(){
		var msg = "Ok! Se ha procesado tu consulta. Tu saldo en tokens (GPI): " + 1;
		imprimir(msg);
	}

  // Acciones del empleado -----------------------------------------------------
  function loginEmpleado(){
    location.replace("empleado.html");
    var address = document.getElementById("logEmpleado").value;
		var exist = plataforma.existeEmpleado.call(address);
		if (exist){
    	localStorage.setItem("accountEmpleado", address);
		}else{
			alert("Esa cuenta de empleado no existe en el sistema");
		}
  }

  // Cargar datos del empleado en pantalla
  function getInfoEmpleado(){
    var empleado = {
      'nombre': 'Maria',
      'num': 123456,
      'address': '',
      'tokens' : 10
    };
    empleado.address = localStorage.getItem("accountEmpleado");
    document.getElementById("nombreEmpleado").innerHTML = empleado.nombre;
    document.getElementById("cifEmpleado").innerHTML = empleado.num;
    document.getElementById("addressEmpleado").innerHTML = empleado.address;
    document.getElementById("tokensEmpleado").innerHTML = empleado.tokens;
    document.getElementById("welcome").innerHTML = "¡Hola " + empleado.nombre + "!"
    var msg = "Ha iniciado sesion el empleado " + empleado.address;
    imprimir(msg);
  }


  // Transferir un token a un companero
  function transferirToken(){
    var cantidad = document.getElementById("cantidadTokensEmpleado").value;
    var address_to = document.getElementById("empleadoSelect").value;
    var address_from = document.getElementById("addressEmpleado").innerHTML;
    var msg = "OK! El empleado " + address_from + " ha emitido " + cantidad + " tokens al empleado " + address_to;
    imprimir(msg);
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
    var msg = "OK! El empleado " + address_from + " ha canjeado " + cantidad + " tokens a cambio de " + premio;
    imprimir(msg);
  }
