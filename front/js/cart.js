let myCart = JSON.parse(localStorage.getItem('panier'))
let allItems = document.getElementById("cart__items")


console.log(myCart)




const newItem = document.createElement("article");
newItem.setAttribute("class", "cart__item");
newItem.setAttribute("date-id", "product.id")
newItem.setAttribute("data-color", "product.couleur")
newItem.innerHTML = 
` <div class="cart__item__img">
  <img src="">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2></h2>
    <p></p>
    <p></p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div> `
// @ts-ignore
allItems.appendChild(newItem)