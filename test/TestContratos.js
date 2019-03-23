
const PlataformaTokens = artifacts.require("PlataformaTokens");

contract("TestContratos",async (accounts) => {

// Pruebas unitarias "PlataformaTokens.sol"

/* Por unificar durante todos los tests:
accounts[0] es la cuenta administradora de la PlataformaTokens
accounts[1] es la empresa IECISA
accounts[2] es Maria Salgado, empleado 1 de IECISA
accounts[3] es Juan Perez, empleado 2 de IECISA
accounts[4] es la empresa UNIR
accounts[5] es Fidel Garcia, empleado 1 de UNIR
accounts[6] es Belen Sanchez, empleado 2 de UNIR
*/

        it("Test0: La plataforma se ha desplegado correctamente y la cuenta administradora tiene el totalSupply de tokens", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.balanceOf.call(accounts[0], {from:accounts[0]});
          assert.equal(response, 100000);
        });


        it("Test1: Lista de empresas en el sistema vacia al principio", async () => {
          let plataforma = await PlataformaTokens.deployed();
      		let response = await plataforma.listarEmpresas.call();
      		assert.isEmpty(response);
        });


        it("Test2: Se impide registrar una empresa desde una cuenta no administradora", async () => {
          let plataforma = await PlataformaTokens.deployed();
          plataforma.registrarEmpresa.call(accounts[1], "BIMBO", "CIF3", {from: accounts[8]})
          .then((response)=>{
            console.log(response);
          }, (error)=>{
            assert(error.message.indexOf('revert') >= 0, "Only Owner");
          });
        });


        it("Test3: Registrar una empresa desde la cuenta administradora", async () => {
       		let plataforma = await PlataformaTokens.deployed();
      	  await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
      		let empresa = await plataforma.getEmpresaInfo.call(accounts[1]);
          // La plataforma debe haber asignado 100 GPIs a la empresa al registrarla
          let tokens = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
      		assert.equal(empresa[0], "IECISA"); // nombre
      		assert.equal(empresa[1], "CIF1");  // cif
      		assert.equal(empresa[2], accounts[1]); //cuenta
          assert.equal(tokens.valueOf(), 100); // saldo tokens
        });


        it("Test4: Se impide registrar un empleado desde una cuenta que no es de una empresa registrada en el sistema", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[4]});
          let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[4]});
          assert.isEmpty(empleado[0]);
        });


        it("Test5: Se impide registrar un empleado desde la cuenta de otro empleado", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          // Maria intenta crear una cuenta para Juan
          await plataforma.registrarEmpleado.sendTransaction(accounts[3], "Juan Perez", "Empleado2_Empresa1", {from: accounts[2]});
          let empleado = await plataforma.getEmpleadoInfo.call(accounts[3], {from: accounts[1]});
          assert.isEmpty(empleado[0]);
        });


        it("Test6: Registrar un empleado desde una cuenta de empresa valida y consultar su info desde esa misma empresa", async () => {
       		let plataforma = await PlataformaTokens.deployed();
      		await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
      		let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[1]});
      		assert.equal(empleado[0], "Maria Salgado"); // nombre
      		assert.equal(empleado[1], "Empleado1_Empresa1");  // numero empleado
      		assert.equal(empleado[2], accounts[2]); //cuenta
        });


        it("Test7: Se impide consultar info de un empleado desde la cuenta de una empresa a la que no pertenece", async () => {
       		let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[4], "UNIR", "CIF2", {from: accounts[0]});
          // UNIR intenta acceder a la info de Maria
      		let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[4]});
      		assert.isEmpty(empleado[0]);
        });


        it("Test8: Se impide consultar info de un empleado desde la cuenta de otro empleado", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpleado.sendTransaction(accounts[3], "Juan Perez", "Empleado2_Empresa1", {from: accounts[1]});
          // Juan intenta acceder a la info de Maria
          let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[3]});
          assert.isEmpty(empleado[0]);
        });


        it("Test9: Se impide que una empresa emita tokens para un empleado que no es suyo", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let tokensEmpresa = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
          assert.equal(tokensEmpresa.valueOf(), 100);
          // La otra empresa registra a un empleado
          await plataforma.registrarEmpleado.sendTransaction(accounts[5], "Fidel Garcia", "Empleado1_Empresa2", {from: accounts[4]});
          let tokensEmpleado = await plataforma.balanceOf.call(accounts[5], {from: accounts[5]});
          assert.equal(tokensEmpleado.valueOf(), 0);
          // La empresa 1 no puede transferir tokens a empleados que no son suyos
          await plataforma.emitirTokens.sendTransaction(accounts[5], 1, {from: accounts[1]});
          tokensEmpleado = await plataforma.balanceOf.call(accounts[5], {from: accounts[5]});
          tokensEmpresa = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
          assert.equal(tokensEmpleado.valueOf(), 0);
          assert.equal(tokensEmpresa.valueOf(), 100);
        });


        it("Test10: Una empresa emite tokens para un empleado suyo", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let tokensEmpresa = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
          let tokensEmpleado = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          assert.equal(tokensEmpresa.valueOf(), 100);
          assert.equal(tokensEmpleado.valueOf(), 0);
          await plataforma.emitirTokens.sendTransaction(accounts[3], 10, {from: accounts[1]});
          tokensEmpresa = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
          tokensEmpleado = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          assert.equal(tokensEmpresa.valueOf(), 90);
          assert.equal(tokensEmpleado.valueOf(), 10);
        });


        it("Test11: Se impide que un empleado transfiera tokens para otro empleado que no pertenece a su empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let tokensEmpleado1 = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          let tokensEmpleado2 = await plataforma.balanceOf.call(accounts[5], {from: accounts[5]});
          assert.equal(tokensEmpleado1.valueOf(), 10);
          assert.equal(tokensEmpleado2.valueOf(), 0);
          await plataforma.transferirTokens.sendTransaction(accounts[5], 1, {from: accounts[3]});
          tokensEmpleado1 = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          tokensEmpleado2 = await plataforma.balanceOf.call(accounts[5], {from: accounts[5]});
          assert.equal(tokensEmpleado1.valueOf(), 10);
          assert.equal(tokensEmpleado2.valueOf(), 0);
        });


        it("Test12: Un empleado transfiere tokens para un companero de su empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          // Los empleados pueden transferirse tokens entre ellos
          let tokensEmpleado1 = await plataforma.balanceOf.call(accounts[2], {from: accounts[2]});
          let tokensEmpleado2 = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          assert.equal(tokensEmpleado1.valueOf(), 0);
          assert.equal(tokensEmpleado2.valueOf(), 10);
          await plataforma.transferirTokens.sendTransaction(accounts[2], 1, {from: accounts[3]});
          tokensEmpleado1 = await plataforma.balanceOf.call(accounts[2], {from: accounts[2]});
          tokensEmpleado2 = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          assert.equal(tokensEmpleado1.valueOf(), 1);
          assert.equal(tokensEmpleado2.valueOf(), 9);
        });


        it("Test13: Comprobar que existe un empleado en el sistema (TRUE)", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.existeEmpleado.call(accounts[2], {from: accounts[1]});
          assert.equal(response, true);
        });


        it("Test14: Comprobar que no existe un empleado en el sistema (FALSE)", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.existeEmpleado.call(accounts[9], {from: accounts[1]});
          assert.equal(response, false);
        });


        it("Test15: Comprobar que existe una empresa en el sistema (TRUE)", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.existeEmpresa.call(accounts[1], {from: accounts[1]});
          assert.equal(response, true);
        });


        it("Test16: Comprobar que no existe una empresa en el sistema (FALSE)", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.existeEmpresa.call(accounts[9], {from: accounts[1]});
          assert.equal(response, false);
        });



})
