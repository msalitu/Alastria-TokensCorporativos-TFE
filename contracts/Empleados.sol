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
    * Comprueba que el empleado es quien quiere acceder a su propia informacion
    */
    modifier soyYo (address _cuenta){
        if(_cuenta == msg.sender){
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
    * Consultar el nombre de un empleado de la propia empresa
    */
    function getEmpleadoNombre(address _cuenta) public view empleadoTrabajaEnEstaEmpresa(_cuenta) soyYo(_cuenta) returns(string){
            return(empleados[_cuenta].nombre);
    }
    
    
    /*
    * Consultar el numero de empleado de un empleado de la propia empresa
    */
    function getEmpleadoNumero(address _cuenta) public view empleadoTrabajaEnEstaEmpresa(_cuenta) soyYo(_cuenta) returns(string){
            return(empleados[_cuenta].numEmpleado);
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
