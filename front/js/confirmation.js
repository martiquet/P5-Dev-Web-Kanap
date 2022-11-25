let orderId = document.getElementById("orderId")
function myOrder () {
const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const currentId = searchParams.get("id");
orderId.textContent = currentId
}

myOrder()