pragma solidity ^0.4.25;

import "./Token.sol";
import "./Empresas.sol";
import "./Empleados.sol";
import "./Owned.sol";

contract PlataformaTokens is Empresas, Empleados, Token, Owned{
    
    /*
    * Eventos 
    */
    event EmpresaRegistrada(address _cuenta, string _nombre, string _cif);
    event EmpleadoRegistrado(address _cuenta, string _nombre, string _numEmpleado, address _empresa);
    event TokensEmitidos(address _from, address _to, uint256 _n);
    
    
    /*
    * Anadir una nueva empresa en el sistema
    */
    function registrarEmpresa(address _cuenta, string _nombre, string _cif) public onlyOwner {
        
        // Se anade a la tabla general de empresas
        empresas[_cuenta] = Empresa(_cuenta, _nombre, _cif, true);
        
        // se anade a la lista de direcciones de empresas
        empresasList.push(_cuenta);
        
        // se le transfieren 100 tokens iniciales
        transfer(_cuenta, 100);
        
        emit EmpresaRegistrada(_cuenta, _nombre, _cif);
    }
    
    
    /*
    * Una empresa puede invocar a esta funcion para anadir un nuevo empleado
    */
    function registrarEmpleado(address _cuenta, string _nombre, string _numEmpleado) public esEmpresaValida(msg.sender){
        
        // se anade a la tabla general de empleados
        empleados[_cuenta] = Empleado(_cuenta, _nombre, _numEmpleado, msg.sender);
        
        // se anade a la lista de direcciones de empleados de la empresa
        direccionesEmpleadosEmpresa[msg.sender].push(_cuenta);
        
        emit EmpleadoRegistrado(_cuenta, _nombre, _numEmpleado, msg.sender);
        
    }
    
    
    /* ??????????????? HACE FALTA
    * Una empresa puede invocar a esta funcion para emitir tokens a un empleado
    */
    function emitirTokensEmpresa(address _to, uint256 _n) public onlyOwner esEmpresaValida(_to){
        transfer(_to, _n);
        emit TokensEmitidos(msg.sender, _to, _n);
    }
    

    
}
