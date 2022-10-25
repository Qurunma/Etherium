export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "candidate",
        type: "address",
      },
    ],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idShop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "idMark",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "addComment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idShop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "idMark",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLiked",
        type: "bool",
      },
    ],
    name: "addLike",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idShop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "idMark",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "idComment",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isLiked",
        type: "bool",
      },
    ],
    name: "addLike",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idShop",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rating",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "addMark",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newShop",
        type: "address",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
    ],
    name: "addShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idShop",
        type: "uint256",
      },
    ],
    name: "deleteShop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idRequest",
        type: "uint256",
      },
    ],
    name: "downToUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idShop",
        type: "uint256",
      },
    ],
    name: "globalSwitchRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "globalSwitchRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "regUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "switchToUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idRequest",
        type: "uint256",
      },
    ],
    name: "upToSeller",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "view_Requests_Sellers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "idRequester",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct Shop.requestForSeller[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "view_Requests_Users",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "idRequester",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "idShop",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "status",
            type: "bool",
          },
        ],
        internalType: "struct Shop.requestForUser[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "view_Shops",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "shop",
            type: "address",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            components: [
              {
                internalType: "address",
                name: "appraiser",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "rating",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "appraiser",
                    type: "address",
                  },
                  {
                    internalType: "bool",
                    name: "isLiked",
                    type: "bool",
                  },
                ],
                internalType: "struct Shop.like[]",
                name: "likes",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "sender",
                    type: "address",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "appraiser",
                        type: "address",
                      },
                      {
                        internalType: "bool",
                        name: "isLiked",
                        type: "bool",
                      },
                    ],
                    internalType: "struct Shop.like[]",
                    name: "likes",
                    type: "tuple[]",
                  },
                  {
                    internalType: "string",
                    name: "description",
                    type: "string",
                  },
                ],
                internalType: "struct Shop.comment[]",
                name: "comments",
                type: "tuple[]",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
            ],
            internalType: "struct Shop.mark[]",
            name: "bookOfMarks",
            type: "tuple[]",
          },
          {
            internalType: "uint256[]",
            name: "sellers",
            type: "uint256[]",
          },
        ],
        internalType: "struct Shop.shop[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "view_Users",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "role",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nowRole",
            type: "uint256",
          },
        ],
        internalType: "struct Shop.user[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
