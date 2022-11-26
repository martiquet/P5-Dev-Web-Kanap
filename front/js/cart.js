const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const currentId = searchParams.get("id");
let myCart = JSON.parse(localStorage.getItem("panier"));
let allItems = document.getElementById("cart__items");
let totalQuant = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let orderBtn = document.getElementById("order");
let cartPrice = 0;
totalPrice.textContent = cartPrice;
totalQuant.textContent = 0;

const inputRegex = [
  {
    id: "firstName",
    regex: /^[A-Za-zÀ-ü-' ]+$/,
    error: "Veuillez choisir un Prénom correct",
  },
  {
    id: "lastName",
    regex: /^[A-Za-zÀ-ü-' ]+$/,
    error: "Veuillez choisir un Nom correcte",
  },
  {
    id: "address",
    regex: /^[0-9]+\s[A-Za-zÀ-ü-'\s]+/,
    error: "Veuillez choisir une Adresse correcte",
  },
  {
    id: "city",
    regex: /^[A-Za-zÀ-ü-' ]+$/,
    error: "Veuillez choisir une Ville correcte",
  },
  {
    id: "email",
    regex: /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/,
    error:
      "Veuillez choisir un email correcte, exemple : votreadresse@gmail.com",
  },
];

async function getProduct(Id) {
  let rep = await fetch("http://localhost:3000/api/products/" + Id);
  let reponse = await rep.json();
  return reponse;
}

// CREATION ELEMENT ARTICLE POUR CHAQUE PRODUIT DANS LE PANIER

if (myCart) {
  //TOTAL D'ARTICLE
  totalQuant.textContent = myCart
    .map((item) => item.nombre)
    .reduce((prev, curr) => prev + curr, 0);

  // RECUPERATION DE CHAQUE INDICE DANS MYCART

  for (let i = 0; i < myCart.length; i++) {
    myCart[i];

    // RECUPERATION DES DONNEES API EN FONCTION DE L'ID

    getProduct(myCart[i].id).then(function (data) {
      let product = data;
      let priceItem = myCart[i].nombre * product.price;
      cartPrice += priceItem;
      totalPrice.textContent = cartPrice;
      myCart[i].price = product.price;

      // CREATION DONNEES HTML

      const newItem = document.createElement("article");
      newItem.setAttribute("class", "cart__item");
      newItem.setAttribute("data-id", myCart[i].id);
      newItem.setAttribute("data-color", myCart[i].couleur);
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
</div>`;

      allItems.appendChild(newItem);

      // VARIABLE INPUT HTML SELECTEUR

      let inputQuant = document.querySelector(
        `[data-id="${myCart[i].id}"][data-color="${myCart[i].couleur}"] .itemQuantity`
      );
      let deleteItem = document.querySelector(
        `[data-id="${myCart[i].id}"][data-color="${myCart[i].couleur}"] .deleteItem`
      );
      let deleteArticle = document.querySelector(
        `[data-id="${myCart[i].id}"][data-color="${myCart[i].couleur}"]`
      );

      // SUPPRESSION D'UN ARTICLE ET MISE A JOUR TABLEAU // LOCALE STORAGE // PRIX TOTAL

      deleteItem.addEventListener("click", function () {
        let returnCart = myCart.findIndex(
          (item) => item.id == myCart[i].id && item.couleur == myCart[i].couleur
        );
        myCart.splice(returnCart, 1);
        updateMyCart();
        deleteArticle.remove();
        console.log(myCart);
        updatePriceQuant();
      });

      // ECOUTE CHANGEMENT INPUT

      inputQuant.addEventListener("input", function () {
        if (inputQuant.value < 1 || inputQuant.value > 100) {
          // SI NOUVEL INPUT N'EST PAS COMPRIS ENTRE 1 et 100
          alert("Veuillez choisir une quantité comprise entre 1 et 100");
          inputQuant.value = 1;
        } else {
          myCart[i].nombre = parseInt(inputQuant.value);
          updateMyCart();
          updatePriceQuant();

          console.log(updateTotalPrice);
        }
      });
    });
  }
}

// MISE A JOUR DU LOCAL STORAGE

function updateMyCart() {
  window.localStorage.setItem("panier", JSON.stringify(myCart));
}

// MISE A JOUR QUANTITE ET PRIX TOTAL

function updatePriceQuant() {
  totalQuant.textContent = myCart.reduce((prev, curr) => prev + curr.nombre, 0);
  totalPrice.textContent = myCart.reduce(
    (accumulator, curr) => accumulator + curr.nombre * curr.price,
    0
  );
}

function checkRegex() {
  // RECUPERATION DU TABLEAU ET TEST DES INPUTS
  for (let input of inputRegex) {
    let inputHtml = document.getElementById(input.id);
    let error = document.getElementById(input.id + "ErrorMsg");
    inputHtml.addEventListener("change", () => {
      let testInput = input.regex.test(inputHtml.value);
      if (!testInput) {
        error.textContent = input.error;
        inputHtml.value = "";
      } else {
        error.textContent = "";
      }
      console.log(input.regex.test(inputHtml.value));
    });
  }
}

checkRegex();

// FONCTION COMMANDER AU CLICK
orderBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
  };
// RECUPERATION DE CHAQUE DONNEES DANS TABLEAU REGEX 
  for (let input of inputRegex) {
    contact[input.id] = document.getElementById(input.id).value;
  }

  // RECUPERATION DE L'ID DE COMMANDE ET ENVOIE DE CONTACT + PANIER
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: contact,
      products: myCart.map((item) => item.id),
    }),
  })
    .then(function (rep) {
      return rep.json();
    })
    .then(function (data) {
      let orderId = data.orderId;
      const location = window.location.host;
      localStorage.clear();
      window.location.replace(`/front/html/confirmation.html?id=${orderId}`);
    });
});
