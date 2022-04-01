const firebase = require("firebase/compat/app");
// Required for side-effects
require("firebase/compat/firestore");
// import firebase from "firebase/compat/app"

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAeCMxhLz313UsAr8xFdDCLpwghE1nan4c",
  authDomain: "testregistration-cbec3.firebaseapp.com",
  projectId: "testregistration-cbec3",
  storageBucket: "testregistration-cbec3.appspot.com",
  messagingSenderId: "731109863491",
  appId: "1:731109863491:web:5fa78b0e7d5579a46124f6",
  measurementId: "G-3Y36SZEZV9"
  });
  
var db = firebase.firestore();
//Al-Shini
var productDB = [
    { id: 1,provider:'Gardens' ,name: "رز ياسمين", price: 20.00, image: "https://nabulsi.shop/wp-content/uploads/2021/02/132.png" ,quantity:0},
    { id: 2,provider:'Gardens', name: "زيت الصافي", price:11.00, image: "https://hamadamarket.ps/wp-content/uploads/2020/01/6253501882055.jpg",quantity:0 },
    { id: 3,provider:'Gardens',  name: "مخلل خيار", price: 4.00, image: "https://www.wajbati.ps/public/index.php/get_image/images/1586266161421471215862661611716856.jpg",quantity:0 },
    { id: 4,provider:'Gardens',  name: "تونة", price: 3.50, image: "https://hamadamarket.ps/wp-content/uploads/2020/01/7290015174480.jpg" ,quantity:0 },
    { id: 5,provider:'Gardens',  name: "جبنة بوك", price: 23.00, image: "https://shamshop.es/wp-content/uploads/2021/07/%D8%AC%D8%A8%D9%86%D8%A9-_%D8%A8%D9%88%D9%83_500%D8%BA.jpg",quantity:0  },
    { id: 6,provider:'Gardens',  name: "بسطرما إسلامية", price: 5.50, image: "https://care4mall.online/wp-content/uploads/2021/08/ghbnj.jpg",quantity:0  },
    { id: 7,provider:'Gardens',  name: "حليب الجنيدي", price: 11.00, image: "https://care4mall.online/wp-content/uploads/2021/02/sRJtrtL4mf8x55Xx8U4l1591097963PvJyFqDEbnCtYoJU43YW.jpg",quantity:0  },
    { id: 8,provider:'Gardens',  name: "لبن الجبريني", price:6.50, image: "https://care4mall.online/wp-content/uploads/2021/06/admin-ajax__3_-removebg-preview-5.png",quantity:0  },
    { id: 9,provider:'Gardens',  name: "سكر", price: 5.00 , image: "https://sook24.com/images/product_images/original_images/sugar01.jpg",quantity:0 },
    { id: 10,provider:'Gardens',  name: "عدس أحمر", price:5.00, image: "https://www.natureland.net/media/catalog/product/cache/2c9603feacb306d61a543be5a3c6be91/r/e/red-lentils-1_8.jpg",quantity:0  },
]


// test(){
//     firebase.firestore().collection("userList").add({
//         uid: "123",
//         id: '123',
//         displayName: "raghad",
//         email: "test@gmail.com",
//         })
//         .catch(function (error) {
//         console.error("Error adding document: ", error);
//         })
//     }


 productDB.forEach(function(obj) {
    db.collection("Gardens").add({
        id: obj.id,
        name: obj.name,
        provider:obj.provider,
        price: obj.price,
        image: obj.image,
        quantity:obj.quantity
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});