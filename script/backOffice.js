// key and url api e riferimento barra indirizzi

const apiKey =
 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzllNTE4N2U1YzAwMTgxNGM2MGUiLCJpYXQiOjE3MDU2NTQ3NTcsImV4cCI6MTcwNjg2NDM1N30.ygLjq2nKY7WHu3hpQBhS0-dNfu592_CsIZhakSxWyo0";

const myUrl = "https://striveschool-api.herokuapp.com/api/product/";

const addressId = new URLSearchParams(window.location.search).get("id");

// Seleziono tutto ciò che può servirmi del form

const backForm = document.getElementById("backOffice-form");
const nameInput = document.getElementById("name-input");
const descrInput = document.getElementById("descr-input");
const brandInput = document.getElementById("brand-input");
const imageInput = document.getElementById("img-input");
const priceInput = document.getElementById("price-input");
const mainButton = document.getElementsByClassName("btn-primary")[0];
const buttonsDiv = document.getElementById("buttons-div");

// modifico la pagina di conseguenza in base all id dell indirizzo

if (addressId) {
 document.querySelector("h2").innerText = "Edit product page";
 mainButton.innerText = "Apply changes";
 const deleteButton = document.createElement("button");
 deleteButton.type = "button";
 deleteButton.innerText = "Delete";
 deleteButton.id = "delete-button";
 deleteButton.classList.add("btn", "btn-primary");
 buttonsDiv.appendChild(deleteButton);
 const addProductPageButton = document.createElement("button");
 addProductPageButton.type = "button";
 addProductPageButton.innerText = "Back to Add products Page";
 addProductPageButton.classList.add("btn", "btn-primary");
 buttonsDiv.appendChild(addProductPageButton);

 // aggiunto la possibilità di cancellare il prodotto
 deleteButton.addEventListener("click", function () {
  if (addressId) {
   fetch(myUrl + addressId, {
    method: "DELETE",
    headers: {
     Authorization: apiKey,
    },
   })
    .then((response) => {
     if (response.ok) {
      alert("Product deleted");
      nameInput.value = "";
      descrInput.value = "";
      priceInput.value = "";
      imageInput.value = "";
      brandInput.value = "";
     } else {
      alert("Something went wrong");
     }
    })
    .catch((err) => {
     console.log(err);
    });
  }
 });

 addProductPageButton.addEventListener("click", function () {
  window.location.href = "./backOffice.html";
 });

 fetch(myUrl + addressId, {
  headers: {
   Authorization: apiKey,
  },
 })
  .then((response) => {
   if (response.ok) {
    return response.json();
   } else {
    throw new Error("Something went wrong on the call");
   }
  })
  .then((product) => {
   nameInput.value = product.name;
   descrInput.value = product.description;
   brandInput.value = product.brand;
   imageInput.value = product.imageUrl;
   priceInput.value = product.price;
  })
  .catch((err) => {
   console.log(err);
  });
}

// prendo riferimento al bottone creato nel nuovo form di modifica

//aggiungo possibilità modifica prodotto al bottone

mainButton.addEventListener("click", function () {});

// codice del submit del form

backForm.addEventListener("submit", function (e) {
 e.preventDefault();
 const productCard = {
  name: nameInput.value,
  description: descrInput.value,
  brand: brandInput.value,
  imageUrl: imageInput.value,
  price: priceInput.value,
 };

 let newUrl;
 let methodToUse;

 if (addressId) {
  methodToUse = "PUT";
  newUrl = myUrl + "/" + addressId;
 } else {
  methodToUse = "POST";
  newUrl = myUrl;
 }

 fetch(newUrl, {
  method: methodToUse,
  body: JSON.stringify(productCard),
  headers: {
   "Content-Type": "application/json",
   Authorization: apiKey,
  },
 })
  .then((response) => {
   if (response.ok) {
    alert(addressId ? "Product updated" : "Product added");
   } else {
    alert("Something went wrong");
   }
  })
  .catch((err) => {
   console.log(err);
  });
});