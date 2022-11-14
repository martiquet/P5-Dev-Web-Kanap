
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const currentId = searchParams.get("id")

async function getProduct(Id){
    let rep = await fetch('http://localhost:3000/api/products/' + Id)
    let reponse = await rep.json()
    return reponse;
}

getProduct(currentId).then(function (data) { 

    let product = data
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;

    const items = document.querySelector(".item__img");
    items.appendChild(imageElement);

    const title = document.querySelector("#title");
    title.textContent = product.name

    const price = document.querySelector("#price")
    price.textContent = product.price

    const description = document.getElementById("description")
    description.textContent = product.description

//    const color1 = document.createElement("option")
//    color1.value = product.colors[0]
let addColors = document.querySelector("#colors")

for (let i=0; i<product.colors.length; i++) {
    const color = document.createElement("option")
    color.value = product.colors[i]
    color.textContent = product.colors[i]
    addColors.appendChild(color)
    
    
}



    console.log(data)
	// This is the JSON from our response
      
})

let addToCart = document.querySelector("#addToCart")


addToCart.addEventListener("click", savePanier)


// CREATION OU AJOUTE PANIER


function savePanier() {

    const color = document.getElementById("colors")
    const itemQuantity = document.getElementById("quantity")
    let colorValue = color.value
    console.log(colorValue)
    let selectedQuantity = itemQuantity.valueAsNumber
    let addProducts = {
        id: currentId,
        couleur: colorValue,
        nombre: selectedQuantity,
}

    let myProducts = []
    let savedCart = localStorage.getItem('panier')

    // SI PAS DE COULEUR OU MAUVAISE QUANTITY

    if (colorValue == "" || selectedQuantity < 1 || selectedQuantity > 100 ) {
        alert("Veuillez choisir une couleur et une quantité comprise entre 1 et 100")

    }   else if (savedCart) { // SI PANIER EXISTANT
        let parsedCart = JSON.parse(savedCart);
        myProducts = parsedCart
        const ifProductsExist = myProducts.find(function(product) { return currentId == product.id && colorValue == product.couleur})

       // SI ID ET COULEUR EXISTANTE // ATTRAPER L'OBJET EXISTANT ET RETURN

        if (ifProductsExist) {
            
            if ((ifProductsExist.nombre + selectedQuantity) <= 100) {
                
                myProducts = myProducts.map(function(product){ 
                
                    if (currentId == product.id && colorValue == product.couleur) {
                        product.nombre = product.nombre + selectedQuantity    
                    } 
                    return product
                    
                }) 

            } else { // SI > 100 
                alert("Votre nombre de")
                return
            }

           

        } else { // SI ID ET COULEUR NON EXISTANTE AJOUTER OBJET 

            myProducts.push(addProducts)
        }

    } else {
        myProducts.push(addProducts)
    }

    console.log(localStorage)

    window.localStorage.setItem("panier", JSON.stringify(myProducts))

    console.log(localStorage)

}
