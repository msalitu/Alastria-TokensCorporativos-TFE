
// Pruebas unitarias "PlataformaTokens.sol"

const PlataformaTokens = artifacts.require("PlataformaTokens");
const truffleAssert = require("truffle-assertions");
const assert = require("chai").assert;

contract("TestEventos",async (accounts) => {

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
          let response = await plataforma.registrarEmpresa.sendTransaction(accounts[1], "IECISA", "CIF1", {from: accounts[0]});
          truffleAssert.eventEmitted(response, "EmpresaRegistrada", (ev) =>{
            return
          })
        });
})
