// RECUPERATION DES PRODUITS SUR L'API, RETOUR REPONSE JSON
async function getProducts() {
  let rep = await fetch("http://localhost:3000/api/products");
  let reponse = await rep.json();
  return reponse;
}

// RECUPERATION DE CHAQUE PRODUIT JSON, CREATION HTML POUR CHAQUE PRODUIT DU TABLEAU
getProducts().then(function (data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    const imageElement = document.createElement("img");
    imageElement.src = product.imageUrl;
    const titreElement = document.createElement("h3");
    titreElement.innerText = product.name;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = product.description;
    const linkElement = document.createElement("a");
    linkElement.href = "./product.html?id=" + product._id;
    const articleElement = document.createElement("article");

    const items = document.querySelector(".items");

    items.appendChild(linkElement);
    linkElement.appendChild(articleElement);
    articleElement.appendChild(imageElement);
    articleElement.appendChild(titreElement);
    articleElement.appendChild(descriptionElement);
  }
});
