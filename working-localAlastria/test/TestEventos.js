
// Pruebas unitarias "PlataformaTokens.sol"

const PlataformaTokens = artifacts.require("PlataformaTokens");
const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");

contract("TestEventos", async (accounts) => {

/* Por dotar de mayor comprension durante todos los tests:
accounts[0] es la cuenta administradora de la PlataformaTokens
accounts[1] es la empresa IECISA
accounts[2] es Maria Salgado, empleado 1 de IECISA
accounts[3] es Juan Perez, empleado 2 de IECISA
accounts[4] es la empresa UNIR
accounts[5] es Fidel Garcia, empleado 1 de UNIR
accounts[6] es Belen Sanchez, empleado 2 de UNIR
*/

        it("Test0: Emite evento cuando se registra una empresa en el sistema", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.registrarEmpresa(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          truffleAssert.eventEmitted(response, "EmpresaRegistrada", (evento) =>{
            return evento._cuenta == accounts[1];
          })
        });


        it("Test1: Emite evento cuando se registra un empleado en el sistema", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.registrarEmpleado(accounts[2], "Maria Salgado", "Empleado1_Empresa1", {from: accounts[1]});
          truffleAssert.eventEmitted(response, "EmpleadoRegistrado", (evento) =>{
            return evento._cuenta == accounts[2];
          })
        });


        it("Test2: Emite evento cuando se transfieren tokens al registrar una empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.registrarEmpresa(accounts[4], "UNIR", "CIF2", {from: accounts[0]});
          truffleAssert.eventEmitted(response, "TokensEmitidos", (evento) =>{
            return evento._to == accounts[4];
          })
        });


        it("Test3: Emite evento cuando se emiten tokens para un empleado desde una empresa", async () => {
          let plataforma = await PlataformaTokens.deployed();
          let response = await plataforma.emitirTokens(accounts[2], 10, {from: accounts[1]});
          truffleAssert.eventEmitted(response, "TokensEmitidos", (evento) =>{
            return evento._to == accounts[2];
          })
        });

/*
        it("Test4: Emite evento cuando se tranfieren tokens entre empleados", async () => {
          let plataforma = await PlataformaTokens.deployed();
          await plataforma.registrarEmpleado(accounts[3], "Juan Perez", "Empleado2_Empresa1", {from: accounts[2]});
          let response = await plataforma.transferirTokens(accounts[3], 10, {from: accounts[2]});
          truffleAssert.eventEmitted(response, "TokensEmitidos", (evento) =>{
            return evento._to == accounts[3];
          })
        });
        */
})
