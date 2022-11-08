async function getProducts(){
    let rep = await fetch('http://localhost:3000/api/products')
    let reponse = await rep.json()
    return reponse;
}

getProducts().then(function (data) {
 console.log(data)
    for (let i=0; i<data.length; i++) {
        const product = data[i]
        const imageElement = document.createElement("img");
        imageElement.src = product.imageUrl;
        const titreElement = document.createElement("h3");
        titreElement.innerText = product.name;
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = product.description;
        const linkElement = document.createElement("a");
        linkElement.href = "./product.html?id=" + product._id;
        const articleElement = document.createElement("article");
        
        
        // console.log(product);

        

        const items = document.querySelector(".items");

        items.appendChild(linkElement);
        linkElement.appendChild(articleElement);
        articleElement.appendChild(imageElement);
        articleElement.appendChild(titreElement);
        articleElement.appendChild(descriptionElement);


}
})

// console.log(getProducts().then(function(data)))

// .then(function (response) {
// 	// The API call was successful!
// 	return response.json();
// }).then(function (data) {
// 	// This is the JSON from our response

// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });



