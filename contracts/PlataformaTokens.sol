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
        
        // se le transfieren una cantidad de tokens iniciales
        emitirTokensRegistro(_cuenta);
        
        emit EmpresaRegistrada(_cuenta, _nombre, _cif);
    }
    
    
    /*
    * Una empresa puede invocar a esta funcion para anadir un nuevo empleado
    */
    function registrarEmpleado(address _cuenta, string _nombre, string _numEmpleado) public esEmpresaValida(msg.sender){
        
        // se anade a la tabla general de empleados
        empleados[_cuenta] = Empleado(_cuenta, _nombre, _numEmpleado, msg.sender, true);
        
        // se anade a la lista de direcciones de empleados de la empresa
        direccionesEmpleadosEmpresa[msg.sender].push(_cuenta);
        
        emit EmpleadoRegistrado(_cuenta, _nombre, _numEmpleado, msg.sender);
        
    }
    
    
    /* 
    * El administrador del sistema invoca a esta funcion para asignar los tokens iniciales a una empresa
    */
    function emitirTokensRegistro(address _to) public esEmpresaValida(_to) onlyOwner {
        transfer(_to, 100);
        emit TokensEmitidos(msg.sender, _to, 100);
    }
    
    
    /* 
    * Una empresa puede invocar a esta funcion para emitir tokens a un empleado
    */
    function emitirTokens(address _to, uint256 _n) public esEmpresaValida(msg.sender) empleadoTrabajaEnEstaEmpresa(_to){
        transfer(_to, _n);
        emit TokensEmitidos(msg.sender, _to, _n);
    }
    
    
    /* 
    * Una empleado puede invocar a esta funcion para transferir tokens a un companero de la misma empresa
    */
    function transferirTokens(address _to, uint256 _n) public esCompanero(_to){
        transfer(_to, _n);
        emit TokensEmitidos(msg.sender, _to, _n);
    }
    

    
}
