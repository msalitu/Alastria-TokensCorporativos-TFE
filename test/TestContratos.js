
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


        it("Test2: Registrar una empresa desde la cuenta administradora", async () => {
       		let plataforma = await PlataformaTokens.deployed();
      	  await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
      		let empresa = await plataforma.getEmpresaInfo.call(accounts[1]);
          // La plataforma debe haber asignado 100 GPIs a la empresa al registrarla
          let tokens = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
      		assert.equal(empresa[0], "IECISA"); // nombre
      		assert.equal(empresa[1], "CIF1");  // cif
      		assert.equal(empresa[2], accounts[1]); //cuenta
          assert.equal(tokens, 100);
        });


        it("Test3: Registrar un empleado desde una cuenta de empresa valida y consultar su info desde esa misma empresa", async () => {
       		let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
      		await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
      		let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[1]});
      		assert.equal(empleado[0], "Maria Salgado"); // nombre
      		assert.equal(empleado[1], "Empleado1_Empresa1");  // numero empleado
      		assert.equal(empleado[2], accounts[2]); //cuenta
        });

/*
        it("Test4: Se impide registrar un empleado desde una cuenta que no es de una empresa registrada en el sistema", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[1]});
          assert.isEmpty(empleado[0]);
        });
*/

        it("Test5: Se impide consultar info de un empleado desde la cuenta de una empresa a la que no pertenece", async () => {
       		let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpresa.sendTransaction(accounts[4], "UNIR", "CIF2", {from: accounts[0]});
      		await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          // UNIR intenta acceder a la info de Maria
      		let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[4]});
      		assert.isEmpty(empleado[0]);
        });


        it("Test6: Se impide consultar info de un empleado desde la cuenta de otro empleado", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[3], "Juan Perez", "Empleado2_Empresa1", {from: accounts[1]});
          // Juan intenta acceder a la info de Maria
          let empleado = await plataforma.getEmpleadoInfo.call(accounts[2], {from: accounts[3]});
          assert.isEmpty(empleado[0]);
        });

/*
        it("Test7: Se impide registrar un empleado desde la cuenta de otro empleado", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          // Maria intenta crear una cuenta para Juan
          await plataforma.registrarEmpleado.sendTransaction(accounts[3], "Juan Perez", "Empleado2_Empresa1", {from: accounts[2]});
          let empleado = await plataforma.getEmpleadoInfo.call(accounts[3], {from: accounts[1]});
          assert.isEmpty(empleado[0]);
        });
*/

        it("Test8: La cuenta administradora emite tokens para una empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          // La cuenta administradora emite 10 tokens mas a la empresa 1
          await plataforma.emitirTokensEmpresa.sendTransaction(accounts[1], 10, {from: accounts[0]});
          let tokens = await plataforma.balanceOf.call(accounts[1], {from: accounts[0]});
          assert.equal(tokens, 110);
        });

/*
        it("Test9: Una empresa emite tokens para un empleado suyo", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          let tokensEmpresa1 = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
          assert.equal(tokensEmpresa1, 100);
          // La empresa transfiere tokens a su empleado 1
          await plataforma.transfer.sendTransaction(accounts[2], 3, {from: accounts[1]});
          //await plataforma.emitirTokens.sendTransaction(accounts[2], 3, {from: accounts[1]});
          let tokens = await plataforma.balanceOf.call(accounts[2], {from: accounts[2]});
          assert.equal(tokens, 3);
          let tokensEmpresa2 = await plataforma.balanceOf.call(accounts[1], {from: accounts[1]});
          assert.equal(tokensEmpresa2, 97);
        });


        it("Test10: Se impide que una empresa emita tokens para un empleadoque no es suyo", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          await plataforma.registrarEmpresa.sendTransaction(accounts[4], "UNIR", "CIF2", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[5], "Fidel Garcia", "Empleado1_Empresa2", {from: accounts[4]});
          // La empresa 1 transfiere tokens a su empleado 1
          await plataforma.transfer.sendTransaction(accounts[2], 3, {from: accounts[1]});
          // La empresa 1 no puede transferir tokens a empleados que no son suyos
          await plataforma.transfer.sendTransaction(accounts[5], 3, {from: accounts[1]});
          let tokensEmpleado1 = await plataforma.balanceOf.call(accounts[2], {from: accounts[2]});
          let tokensEmpleado2 = await plataforma.balanceOf.call(accounts[5], {from: accounts[5]});
          assert.equal(tokensEmpleado1, 3);
          assert.equal(tokensEmpleado1, 0);
        });


        it("Test11: Un empleado transfiere tokens para un companero de su empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[3], "Juan Perez", "Empleado2_Empresa1", {from: accounts[1]});
          // La empresa transfiere tokens a los empleados
          await plataforma.transfer.sendTransaction(accounts[2], 3, {from: accounts[1]});
          // Los empleados pueden transferirse tokens entre ellos
          await plataforma.transfer.sendTransaction(accounts[3], 1, {from: accounts[2]});
          let tokensEmpleado1 = await plataforma.balanceOf.call(accounts[2], {from: accounts[2]});
          let tokensEmpleado2 = await plataforma.balanceOf.call(accounts[3], {from: accounts[3]});
          assert.equal(tokensEmpleado1, 2);
          assert.equal(tokensEmpleado1, 1);
        });


        it("Test12: Se impide que un empleado transfiere tokens para un companero que no pertenece a su empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          await plataforma.registrarEmpresa.sendTransaction(accounts[4], "UNIR", "CIF2", {from: accounts[0]});
          await plataforma.registrarEmpleado.sendTransaction(accounts[5], "Fidel Garcia", "Empleado1_Empresa2", {from: accounts[4]});
          // La empresa 1 transfiere tokens a sus empleados
          await plataforma.transfer.sendTransaction(accounts[2], 3, {from: accounts[1]});
          // Los empleados no pueden transferirse tokens a empleados de otras empresas
          await plataforma.transfer.sendTransaction(accounts[5], 1, {from: accounts[2]});
          let tokensEmpleado1 = await plataforma.balanceOf.call(accounts[2], {from: accounts[2]});
          let tokensEmpleado2 = await plataforma.balanceOf.call(accounts[5], {from: accounts[5]});
          assert.equal(tokensEmpleado1, 3);
          assert.equal(tokensEmpleado2, 0);
        });
*/
})
