const products = [
  {
    id : 1,
    name: 'SMILE ONE COIN',
    region: 'Brazil', 
    img: '../public/img/soc.png',
    flag: '../public/img/brazil.png',
    codes: [
      {
        codePin: "30BRL",
        coin: 300,
        value: "30 BRL",
        stock: 30,
        price: 470
      },
      {
        codePin: "100BRL",
        coin: 1000,
        value: "100 BRL",
        stock: 48,
        price: 1570
      },
      {
        codePin: "500BRL",
        coin: 5000,
        value: "500 BRL",
        stock: 8,
        price: 7850
      },
      {
        codePin: "1000BRL",
        coin: 10000,
        value: "1000 BRL",
        stock: 1,
        price: 15300
      },
      {
        codePin: "5000BRL",
        coin: 50000,
        value: "5000 BRL",
        stock: 1,
        price: 78000
      }
    ]
  },
  {
    id : 2,
    name: 'SMILE ONE COIN',
    region: 'Philippines',
    img: '../public/img/soc.png',
    flag: '../public/img/philippines.jpg',
  },
  {
    id : 3,
    name: 'UNI-PIN',
    region: 'Philippines',
    img: '../public/img/uniPin.jpg',
    flag: '../public/img/philippines.jpg',
  },
  {
    id : 4,
    name: 'MOOGOLD',
    region: 'India',
    img: '../public/img/moogold.png',
    flag: '../public/img/india.png',
  }
]

export default products