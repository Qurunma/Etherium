//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Shop {
    struct user {
        address user;
        uint256 role;
    }

    struct shop {
        address shop;
        string city;
        mark[] bookOfMarks;
        uint256[] sellers;
    }

    struct request {
        address requester;
        bool status;
    }

    struct like {
        address appraiser;
        bool isLiked;
    }

    struct mark {
        address appraiser;
        uint256 rating;
        like[] likes;
        string description;
    }

    struct comments {
        address sender;
        like[] likes;
        string description;
    }

    shop[] Shops;
    user[] Users;
    request[] Requests;

    constructor() {}

    modifier isReg(address newUser) {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].user != newUser, "U already registered!");
        }
        _;
    }
    modifier shopIsExists(address newShop) {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].user != newShop, "Shop exists!");
        }
        _;
    }

    function regUser(address newUser, uint256 role) public isReg(newUser) {
        require(role < 3, "This role isn't exists");
        Users.push(user(msg.sender, role));
    }

    function regUser(uint256 role) public isReg(msg.sender) {
        require(role < 3, "This role isn't exists");
        Users.push(user(msg.sender, role));
    }

    function addShop(address newShop, string memory city)
        public
        shopIsExists(newShop)
    {
        shop storage localShop = Shops.push();
        localShop.shop = newShop;
        localShop.city = city;
    }

    function addAdmin() public {}

    function view_Shops() public view returns (shop[] memory) {
        return (Shops);
    }

    function view_Users() public view returns (user[] memory) {
        return (Users);
    }

    function view_Requests() public view returns (request[] memory) {
        return (Requests);
    }
}
