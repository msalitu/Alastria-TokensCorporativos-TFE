
pragma solidity ^0.4.25;
import "./OpenZeppelin/IERC20.sol";
import "./OpenZeppelin/SafeMath.sol";

contract Token is IERC20 {
using SafeMath for uint256;
      
      /* --- Atributos del TOKEN --- */
      address public owner;                     // token owner
      string public name;                       // token name
      string public symbol;                     // token symbol
      uint256 public decimals;                  // token digit
      uint256 private _totalSupply;             // token total supply
      mapping (address => uint256) private balances;    // TOKEN BALANCES
      mapping (address => mapping (address => uint256)) private allowed;
      
      /* ---  Metodo Constructor ---  */ 
      constructor() public{
		  owner = msg.sender;
		  name = "GLUPI";
		  symbol = "GPI";
		  decimals = 16;
		  _totalSupply = 100000;
		  balances[owner] = 100000;
		  emit Transfer(address(0), owner, _totalSupply);
      }
      
      
      /**
      * @dev Gets the total supply.
      * @return An uint256 representing the amount total supply.
      */
      function totalSupply() public view returns (uint256) {
		return _totalSupply;
      }
      
	  
	  /**
      * @dev Gets the balance of the specified address.
      * @param _tokenOwner The address to query the the balance of.
      * @return An uint256 representing the amount owned by the passed address.
      */
	  function balanceOf(address _tokenOwner) public view returns (uint256) {
		return balances[_tokenOwner];
      }
      
	  
	  /**
      * @dev Transfer token for a specified address
      * @param _to The address to transfer to.
      * @param _value The amount to be transferred.
      */
	  function transfer(address _to, uint256 _value) public returns (bool) {
		  require(_value <= balances[msg.sender]);
		  require(_to != address(0));
		  balances[msg.sender] = balances[msg.sender].sub(_value);
		  balances[_to] = balances[_to].add(_value);
		  emit Transfer(msg.sender, _to, _value);
		  return true;
      }
      
	  
	  /**
      * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
      * Beware that changing an allowance with this method brings the risk that someone may use both the old
      * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
      * race condition is to first reduce the spender&#39;s allowance to 0 and set the desired value afterwards:
      * @param _spender The address which will spend the funds.
      * @param _value The amount of tokens to be spent.
      */
      function approve(address _spender, uint256 _value) public returns (bool) {
		    allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
      }
      
	  
	  /**
      * @dev Function to check the amount of tokens that an owner allowed to a spender.
      * @param _tokenOwner address The address which owns the funds.
      * @param _spender address The address which will spend the funds.
      * @return A uint256 specifying the amount of tokens still available for the spender.
      */
	  function allowance(address _tokenOwner, address _spender) public view returns (uint256){
		  return allowed[_tokenOwner][_spender];
      }
      
	  
	  /**
      * @dev Transfer tokens from one address to another
      * @param _from address The address which you want to send tokens from
      * @param _to address The address which you want to transfer to
      * @param _value uint256 the amount of tokens to be transferred
      */
	  function transferFrom(address _from,address _to,uint256 _value) public returns (bool){
		require(_value <= balances[_from]);
		require(_value <= allowed[_from][msg.sender]);
        require(_to != address(0));
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
      }
      
      /**
      * @dev Increase the amount of tokens that an owner allowed to a spender.
      * approve should be called when allowed[_spender] == 0. To increment
      * allowed value is better to use this function to avoid 2 calls (and wait until
      * the first transaction is mined)
      * @param _spender The address which will spend the funds.
      * @param _addedValue The amount of tokens to increase the allowance by.
      */
	  function increaseAllowance(address _spender,uint256 _addedValue) public returns (bool){
          allowed[msg.sender][_spender] = (
          allowed[msg.sender][_spender].add(_addedValue));
          emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
          return true;
      }
      
	  /**
      * @dev Decrease the amount of tokens that an owner allowed to a spender.
      * approve should be called when allowed[_spender] == 0. To decrement
      * allowed value is better to use this function to avoid 2 calls (and wait until
      * the first transaction is mined)
      * @param _spender The address which will spend the funds.
      * @param _subtractedValue The amount of tokens to decrease the allowance by.
      */
	  function decreaseAllowance(address _spender, uint256 _subtractedValue) public returns (bool){
          uint256 oldValue = allowed[msg.sender][_spender];
          if (_subtractedValue >= oldValue) {
            allowed[msg.sender][_spender] = 0;
          } else {
            allowed[msg.sender][_spender] = oldValue.sub(_subtractedValue);
          }
          emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
          return true;
      }
}

  
  

