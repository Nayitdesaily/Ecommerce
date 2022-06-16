"use strict"

/*Header*/
/*Menu Lateral Hamburguer*/

const hamburguer = document.getElementById("hamburguer")
const lateralBar = document.querySelector(".lateral-bar")
const cerrar = document.getElementById("cerrar")

hamburguer.addEventListener("click", () => {
    lateralBar.classList.remove("active")
})
cerrar.addEventListener("click", () => {
    lateralBar.classList.add("active")
})

/*Menu Login */
const login = document.getElementById("login");
const user = document.getElementById("user");

user.onclick = function (){
    login.classList.toggle("active-login")
}


/*Shopping Cart*/


const shopping = document.getElementById("shopping");
const cart = document.querySelector(".cart")
const closeCart = document.getElementById("close-cart");

shopping.addEventListener("click", () =>{
    cart.classList.remove("cart-active")
})
closeCart.addEventListener("click", () =>{
    cart.classList.add("cart-active")
})

/*Shop Working */
/*Remove Item From Cart */
let removeCartButton = document.getElementsByClassName("cart-remove")
console.log(removeCartButton)
for (let i=0; i<removeCartButton.length; i++){
    let button = removeCartButton[i]
    button.addEventListener("click", removeCardItem)
}

/*Quantity Changes*/
let quantityValues = document.getElementsByClassName("cart-quantity")
for (let i=0; i<quantityValues.length; i++){
    let value = quantityValues[i]
    value.addEventListener ("change", quantityChanged)
}

/*Remove Item */
function removeCardItem (event){
    let buttonClicked = event.target
    buttonClicked.parentElement.remove();
}

function quantityChanged (event){
    let input = event.target
    if( input.value == 0 || input.value == NaN){
        input.value = 1
    }
    updateTotal();
}



/*Update Total */
function updateTotal (){
    let cartContent = document.getElementsByClassName("cart-content")[0]
    let cartBoxes = cartContent.getElementsByClassName("cart-box")
    let total = 0
    for (let i=0; i<cartBoxes.length; i++){
        let cartBox = cartBoxes[i]
        let priceProduct = cartBox.getElementsByClassName("cart-price") [0];
        let price = parseFloat (priceProduct.innerText.replace("$",""));
        let quantityProduct = cartBox.getElementsByClassName("cart-quantity")[0];
        let quantity = quantityProduct.value;
        total = total + price * quantity;
    }
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}




/* Main */
const smartphone = [
    {
        marca: "Samsung",
        tipo: "Galaxy s52",
        precio: 5200,
        url: "./ASSETS/image 1.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy A512",
        precio: 5100,
        url: "./ASSETS/image 3.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy A100",
        precio: 4800,
        url: "./ASSETS/image 4.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy Lite 10",
        precio: 6000,
        url: "./ASSETS/image 15.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy A12",
        precio: 5000,
        url: "./ASSETS/image 13.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy S10",
        precio: 5600,
        url: "./ASSETS/image 17.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy L20",
        precio: 3000,
        url: "./ASSETS/image 14.jpg"
    },
    {
        marca: "Samsung",
        tipo: "Galaxy Z fold 3",
        precio: 7000,
        url: "./ASSETS/image 13.jpg"
    },
]

let contenedor = document.querySelector ("section.card-container")
let fragmentoInnerHTML = ""

smartphone.forEach ( (producto) => {
        fragmentoInnerHTML +=`
            <div class="cell-card">
                <img src="./ASSETS/heart 1.svg" alt="" class="icon-card">
                <img src="${producto.url}" alt="" class="img-card">
                <div>
                <h4>${producto.marca}</h4>
                <h3 class="title-tipo">${producto.tipo}</h3>
                </div>
                <div>
                <small>Precio</small>
                <h3 class="precio-product">${producto.precio}</h3>
                </div>
                <img src="./ASSETS/Group 56.svg" alt="" class="icon-card">
            </div>
        `
    }
)
contenedor.innerHTML = fragmentoInnerHTML


/*Add Card*/
let agregarCard = document.getElementsByClassName("icon-card")
for(let i=0; i<agregarCard.length; i++){
    let buttonAgregarCard = agregarCard[i];
    buttonAgregarCard.addEventListener("click", agregarCardClicked)

}

/*Boton Proceder al pago */
document.getElementsByClassName("btn-buy")[0].addEventListener("click", btnBuyClicked)

function btnBuyClicked (event) {
    let buttonBuy = event.target
    alert("Pago realizado")
    let cartContentItems = document.getElementsByClassName("cart-content")[0]
    while (cartContentItems.hasChildNodes()){
        cartContentItems.removeChild(cartContentItems.firstChild)
    }
    updateTotal();
}





/*Add to Carts */
function agregarCardClicked (event) {
    let buttonAgregarCard = event.target
    let choosenProduct = buttonAgregarCard.parentElement
    let titleProduct = choosenProduct.getElementsByClassName("title-tipo")[0].innerText
    let priceProductUnit = choosenProduct.getElementsByClassName("precio-product")[0].innerText
    let imgProduct = choosenProduct.getElementsByClassName("img-card")[0 ].src
    addProductShop(titleProduct,priceProductUnit,imgProduct)
    updateTotal()
}    
 


function addProductShop(titleProduct,priceProductUnit,imgProduct) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItem = document.getElementsByClassName("cart-content")[0]
    let cartItemName = cartItem.getElementsByClassName("product-title")
    for(let i=0; i<cartItemName.length; i++){
        if(cartItemName[i].innerText == titleProduct ){
        alert("Ya has agregado este item al carrito");
        return;  
        }
    }
let cartBoxContent = `
                        <img src="${imgProduct}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="product-title">${titleProduct}</div>
                            <div class="cart-price">${"$" + priceProductUnit}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class='bx bxs-trash-alt cart-remove'></i>
`;
cartShopBox.innerHTML = cartBoxContent;

cartItem.append(cartShopBox);

cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCardItem)
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged)
}

/*Local Storage */

/*
let addCardBtn = document.getElementsByClassName("icon-card");
let items = [ ];
for (let i=0; i<addCardBtn.length; i++){
    addCardBtn[i].addEventListener("click", function(e){
        if(typeof(Storage) !== undefined){
            let item = {
                id: i,
                name: e.target.parentElement.children[2].children[1].textContent,
                price: e.target.parentElement.children[3].children[1].textContent,
                no: 1
                };
            if(JSON.parse(localStorage.getItem("newlist") === null)){
                items.push(item);
                localStorage.setItem("newlist", JSON.stringify(items));
                
            }else {
                let localItems = JSON.parse(localStorage.getItem("newlist"));
                localItems.map(data =>{
                    if(item.id == data.id){
                        item.no = data.no + 1
                    }else {
                        items.push(data)
                    }
                });
                items.push(item)
                localStorage.setItem("newlist", JSON.stringify(items));
                
            }
        }else{  
            alert("storage is not working")
        }
    })
}*/

/*let numberShopCart = document.getElementsByClassName("number-shopping")
let no = 0;
JSON.parse(localStorage.getItem("items")).map(data =>{
    no = no + data.no
})
numberShopCart.innerHTML = no*/




















/*function saveLocalStorage(){
    let cartContentStorage = document.querySelector(".cart-content")
    localStorage.setItem("list", JSON.stringify(cartContentStorage.outerHTML))
    
    }
    
    function loadLocalStorage(){
   console.log  (JSON.parse(localStorage.getItem("list")))
    }*/
    /*document.addEventListener("DOMContentLoaded", () =>{
        savelocalstorage()
        loadlocalstorage()
    })
      function savelocalstorage(){
        let cartContentList = document.getElementById("itemstorage");
        localStorage.setItem("list", JSON.stringify(cartContentList.outerHTML));
      }

      function loadlocalstorage(){
        console.log(JSON.parse(localStorage.getItem("list")));
      }*/
      
/*
//let likeBtn = document.querySelector("#btn-like")
//let small = document.querySelector("small")


    if( window.localStorage.getItem ( "myStorage")  ){
        contadorLike = JSON.parse( window.localStorage.getItem ( "myStorage") )
        small.textContent = `Likes ${contadorLike} `

        likeBtn.addEventListener( "click", (eventoData) =>{
            contadorLike++
            small.textContent = `Likes ${contadorLike} `
            window.localStorage.setItem( "myStorage", JSON.stringify( contadorLike ) )
        })
    }else{
        contadorLike = 0
        likeBtn.addEventListener( "click", (eventoData) =>{
        contadorLike++
        small.textContent = `Likes ${contadorLike} `
        let myStorage = "Likes"
        window.localStorage.setItem( "myStorage", JSON.stringify( contadorLike ) )
        let value = window.localStorage.getItem ( "myStorage")
        console.log ( value )
        })
}
*/