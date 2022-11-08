
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);

let currentId = searchParams.get("id")

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
    console.log("bite")
    
}



    console.log(data)
	// This is the JSON from our response
      
})

let addPanier = document.querySelector("#addToCart")


addPanier.addEventListener("click", jsaispas)

function jsaispas() {
    window.localStorage.setItem("nom", "Les Bonnes Pièces !");
    
}








// fetch('http://localhost:3000/api/products/' + currentId).then(function (response) {
// 	// The API call was successful!
// 	return response.json();
// })





















.catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

// console.log(paramString)

// console.log(searchParams.get("id"))