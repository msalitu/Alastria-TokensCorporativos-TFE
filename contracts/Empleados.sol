pragma solidity ^0.4.25;

contract Empleados {
    
    struct Empleado {
      address cuenta;
      string nombre;
      string numEmpleado;
      address empresa; // para realizar comprobaciones de pertenencia a una empresa
      bool isValue;
    }
    

    // Para poder acceder rapidamente a la informacion de un empleado (de cualquier empresa)
    mapping(address => Empleado) empleados;
    // Cada empresa tiene una lista con las direcciones de sus empleados
    mapping(address => address[]) direccionesEmpleadosEmpresa;
    
    
    /*
    * Comprueba que el empleado actualmente este trabajando en la empresa que llama a la funcion (msg.sender)
    */
    modifier empleadoTrabajaEnEstaEmpresa (address _empleado){
        if(empleados[_empleado].empresa == msg.sender){
            _;
        }
    }
    
    
    /*
    * Comprueba que un empleado actualmente este trabajando en la misma empresa que llama a la funcion (msg.sender)
    */
    modifier esCompanero (address _to){
        if(empleados[_to].empresa == empleados[msg.sender].empresa){
            _;
        }
    }
    
    
    /*
    * Consultar la info de un empleado de la empresa
    */
    function getEmpleadoInfo(address _cuenta) public view empleadoTrabajaEnEstaEmpresa(_cuenta) 
        returns(string, string, address){
            
            return(empleados[_cuenta].nombre, empleados[_cuenta].numEmpleado, empleados[_cuenta].cuenta);
            
    }
    
    
    /*
    * Consultar la lista de empleados de la empresa que llama
    */
    function listarEmpleados() public view returns(address[]){
        return direccionesEmpleadosEmpresa[msg.sender];
    }
    
 
    /*
    * Comprobar si existe el empleado en el sistema a partir de una direccion valida
    */
    function existeEmpleado(address _cuenta) public view returns (bool){
        return (empleados[_cuenta].isValue);
    }
    
    



    
}
