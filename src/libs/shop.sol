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

    constructor() {
        regUser(0x2EEb8e636d2B7bF006AEf7DF63C1B388C3d0bB5E, 0);
        regUser(0x55cC20d0CdDFED1f06b669A8Ff6ebA58218bbbd7, 1);
        regUser(0xb033788a9a2A69e4d007b05Ad15893bA57f788C7, 2);
        regUser(0x692BEb097E09a1Fd74Dafa495705d9cBDCE84bf9, 2);
    }

    // Частоиспользуемые или сложные проверки

    modifier isReg(address someUser) {
        bool isRegistred = false;
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == someUser) {
                isRegistred = true;
                break;
            }
        }
        require(isRegistred, "200"); //Вы не зарегистрированы
        _;
    }

    modifier isntReg(address newUser) {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].user != newUser, "201"); //Вы уже зарегистрированы
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
                require(Users[i].nowRole == 0, "100"); // На данный момент вы не являетесь админом 
                break;
            }
        }
        _;
    }

    modifier isUser(address newUser) {
        for (uint256 i = 0; i < Users.length; i++) {
            if (Users[i].user == newUser) {
                require(Users[i].role == 2, "101"); // Вы не являетесь простым пользователем 
                break;
            }
        }
        _;
    }

    //Функции регистрации

    function regUser(address newUser, uint256 role) private isntReg(newUser) {
        require(role < 3, "102"); // такой роли не существует
        Users.push(user(newUser, role, role));
    }

    function regUser() public isntReg(msg.sender) {
        Users.push(user(msg.sender, 2, 2));
    }

    // Функционал

    //Общий функционал

    function switchToUser() public {
        for (uint256 i = 0; i < Users.length; i++) {
            require(Users[i].role != 2, "103"); //невозможно сменить роль для покупателя
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
            require(Users[i].role != 0, "104"); //невозможно создать запрос на смену роли для администратора 
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
