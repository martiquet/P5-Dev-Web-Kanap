
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const currentId = searchParams.get("id");
let myCart = JSON.parse(localStorage.getItem('panier'))
let allItems = document.getElementById("cart__items")
let totalQuant=document.getElementById("totalQuantity")
let totalPrice=document.getElementById("totalPrice")



async function getProduct(Id){
    let rep = await fetch('http://localhost:3000/api/products/' + Id)
    let reponse = await rep.json()
    return reponse;
}

// SI PAS DE PANIER 

if (!myCart) {
    totalQuant.textContent = "0"
    totalPrice.textContent = "0"
} 

// CREATION ELEMENT ARTICLE POUR CHAQUE PRODUIT DANS LE PANIER

for (let i=0; i<myCart.length; i++) {
    myCart[i]
    
    // if (myCart[i].id === && myCart[i].couleur ===)
    getProduct(myCart[i].id).then (function (data){
        let product = data

const newItem = document.createElement("article");
newItem.setAttribute("class", "cart__item");
newItem.setAttribute("date-id", "product.id");
newItem.setAttribute("data-color", "product.couleur");
newItem.innerHTML = `
<div class="cart__item__img">
  <img src="${product.imageUrl}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${myCart[i].couleur}</p>
    <p>${product.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté :  </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${myCart[i].nombre}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>`


  allItems.appendChild(newItem)

  totalQuant.textContent = myCart.map(item => item.nombre).reduce((prev, curr)=> prev + curr, 0);


  // let quantItem = myCart[i].nombre
  // let sumPrice = product.price
  // totalPrice.textContent = quantItem * sumPrice
  // console.log(quantItem)
  
})



}


