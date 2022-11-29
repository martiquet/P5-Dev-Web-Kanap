// RECUPERATION DE L'ID DU PRODUIT DANS L'URL
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const currentId = searchParams.get("id");

// RECUPERATION DES DONNEES DU PRODUIT EN FONCTION DE SON ID EN JSON
async function getProduct(Id) {
  let rep = await fetch("http://localhost:3000/api/products/" + Id);
  let reponse = await rep.json();
  return reponse;
}

// RECUPERATION DES DONNEES JSON ET AJOUT DE L'ELEMENT EN HTML
getProduct(currentId).then(function (data) {
  let product = data;
  const imageElement = document.createElement("img");
  imageElement.src = product.imageUrl;

  const items = document.querySelector(".item__img");
  items.appendChild(imageElement);

  const title = document.querySelector("#title");
  title.textContent = product.name;

  const price = document.querySelector("#price");
  price.textContent = product.price;

  const description = document.getElementById("description");
  description.textContent = product.description;

  let addColors = document.querySelector("#colors");

  // AJOUT DE CHAQUE COULEUR PRESENTE POUR UN PRODUIT DANS LES DONNEES JSON
  for (let i = 0; i < product.colors.length; i++) {
    const color = document.createElement("option");
    color.value = product.colors[i];
    color.textContent = product.colors[i];
    addColors.appendChild(color);
  }
});

let addToCart = document.querySelector("#addToCart");

addToCart.addEventListener("click", savePanier);

// CREATION OU AJOUT AU PANIER

function savePanier() {
  const color = document.getElementById("colors");
  const itemQuantity = document.getElementById("quantity");
  let colorValue = color.value;
  console.log(colorValue);
  let selectedQuantity = itemQuantity.valueAsNumber;
  let addProducts = {
    id: currentId,
    couleur: colorValue,
    nombre: selectedQuantity,
  };

  let myProducts = [];
  let savedCart = localStorage.getItem("panier");

  // SI PAS DE COULEUR OU MAUVAISE QUANTITY

  if (colorValue == "" || selectedQuantity < 1 || selectedQuantity > 100) {
    alert(
      "Veuillez choisir une couleur et une quantité comprise entre 1 et 100"
    );
  } else if (savedCart.length > 0) {
    // SI PANIER EXISTANT, RECUPERATION JSON PARSE(TABLEAU)
    let parsedCart = JSON.parse(savedCart);
    myProducts = parsedCart;
    const ifProductsExist = myProducts.find(function (product) {
      return currentId == product.id && colorValue == product.couleur;
    });

    if (ifProductsExist) {
      // SI ID ET COULEUR EXISTANTE // ATTRAPER L'OBJET EXISTANT ET RETURN
      if (ifProductsExist.nombre + selectedQuantity <= 100) {
        myProducts = myProducts.map(function (product) {
          if (currentId == product.id && colorValue == product.couleur) {
            product.nombre = product.nombre + selectedQuantity;
          }
          return product;
        });
      } else {
        // SI > 100
        alert("Votre nombre de produit doit être compris entre 1 et 100");
        return;
      }
    } else {
      // SI ID ET COULEUR NON EXISTANTE AJOUTER OBJET

      myProducts.push(addProducts);
      alert("Votre produit à bien été ajouter au panier")
    }
  } else {
    myProducts.push(addProducts);
    alert("Votre produit à bien été ajouter au panier")
  }

  window.localStorage.setItem("panier", JSON.stringify(myProducts));
  
}
