//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract Shop {
    struct user {
        address user;
        uint256 role; // 0=admin, 1=seller, 2=user
        uint256 nowRole;
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
        comment[] comments;
        string description;
    }

    struct comment {
        address sender;
        like[] likes;
        string description;
    }

    shop[] Shops;
    user[] Users;
    request[] Requests;

    constructor() {}

    // Частоиспользуемые или сложные проверки

    modifier isReg(address someUser) {
        bool isRegistred = false;
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == someUser) {
                isRegistred = true;
                break;
            }
        }
        require(!isRegistred, "U isn't registred!");
        _;
    }

    modifier isntReg(address newUser) {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].user != newUser, "U already registered!");
        }
        _;
    }

    modifier shopIsExists(address newShop) {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].user != newShop, "It isn't shop!");
        }
        for (uint256 i = 0; i < Shops.length; i++) {
            require(Shops[i].shop != newShop, "Shop exists!");
        }
        _;
    }

    modifier isAdmin(address newUser) {
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == newUser) {
                require(Users[i].nowRole == 0, "U isn't admin!");
                break;
            }
        }
        _;
    }

    modifier isUser(address newUser) {
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == newUser) {
                require(Users[i].role == 2, "U isn't admin!");
                break;
            }
        }
        _;
    }

    //Функции регистрации

    function regUser(address newUser, uint256 role) private isntReg(newUser) {
        require(role < 3, "This role isn't exists");
        Users.push(user(msg.sender, role, role));
    }

    function regUser() public isntReg(msg.sender) {
        Users.push(user(msg.sender, 2, 2));
    }

    // Функционал

    //Общий функционал

    function switchToUser() public {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].role != 2, "You don't can switch role!");
            if (Users[i].user == msg.sender) {
                if (Users[i].role == Users[i].nowRole) {
                    Users[i].nowRole = 2;
                } else {
                    Users[i].nowRole = Users[i].role;
                }
                break;
            }
        }
    }

    function globalSwitchRequest() public {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].role != 0, "You don't can switch role!");
            if (Users[i].user == msg.sender) {
                Requests.push(request(msg.sender, false));
                break;
            }
        }
    }

    function addComment(
        uint256 idShop,
        uint256 idMark,
        string memory description
    ) public {
        Shops[idShop].bookOfMarks[idMark].comments.push();
        Shops[idShop]
            .bookOfMarks[idMark]
            .comments[Shops[idShop].bookOfMarks[idMark].comments.length - 1]
            .sender = msg.sender;
        Shops[idShop]
            .bookOfMarks[idMark]
            .comments[Shops[idShop].bookOfMarks[idMark].comments.length - 1]
            .description = description;
    }

    // Функционал админа

    function upToSeller(uint256 idRequest)
        public
        isReg(msg.sender)
        isAdmin(msg.sender)
    {
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == Requests[idRequest].requester) {
                if (Users[i].role == 1) {
                    Users[i].role = 2;
                } else {
                    Users[i].role = 1;
                }
            }
        }
    }

    function addAdmin(address candidate)
        public
        isReg(msg.sender)
        isAdmin(msg.sender)
    {
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == candidate) {
                require(Users[i].role != 0, "U already admin!");
                Users[i].role = 0;
                break;
            }
        }
    }

    function addShop(address newShop, string memory city)
        public
        isReg(msg.sender)
        isAdmin(msg.sender)
        isntReg(newShop)
        shopIsExists(newShop)
    {
        shop storage localShop = Shops.push();
        localShop.shop = newShop;
        localShop.city = city;
    }

    function deleteShop(uint256 idShop) public {
        for (uint256 i = 0; i < Shops[idShop].sellers.length; i++) {
            Users[Shops[idShop].sellers[i]].role = 2;
            Users[Shops[idShop].sellers[i]].nowRole = 2;
        }
        delete Shops[idShop];
    }

    //Функционал покупателя

    function addMark(
        // TODO: отсутствие роли из этого магазина
        uint256 idShop,
        uint256 rating,
        string memory description
    ) public {
        Shops[idShop].bookOfMarks.push();
        Shops[idShop]
            .bookOfMarks[Shops[idShop].bookOfMarks.length - 1]
            .appraiser = msg.sender;
        Shops[idShop]
            .bookOfMarks[Shops[idShop].bookOfMarks.length - 1]
            .rating = rating;
        Shops[idShop]
            .bookOfMarks[Shops[idShop].bookOfMarks.length - 1]
            .description = description;
    }

    function addLike(
        uint256 idShop,
        uint256 idMark,
        bool isLiked
    ) public isUser(msg.sender) {
        Shops[idShop].bookOfMarks[idMark].likes.push(like(msg.sender, isLiked));
    }

    function addLike(
        uint256 idShop,
        uint256 idMark,
        uint256 idComment,
        bool isLiked
    ) public isUser(msg.sender) {
        Shops[idShop].bookOfMarks[idMark].comments[idComment].likes.push(
            like(msg.sender, isLiked)
        );
    }

    // Функции вывода данных

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
