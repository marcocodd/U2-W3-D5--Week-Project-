// key and url fetch

const apiKey =
 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzllNTE4N2U1YzAwMTgxNGM2MGUiLCJpYXQiOjE3MDU2NTQ3NTcsImV4cCI6MTcwNjg2NDM1N30.ygLjq2nKY7WHu3hpQBhS0-dNfu592_CsIZhakSxWyo0"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzllNTE4N2U1YzAwMTgxNGM2MGUiLCJpYXQiOjE3MDU2NTQ3NTcsImV4cCI6MTcwNjg2NDM1N30.ygLjq2nKY7WHu3hpQBhS0-dNfu592_CsIZhakSxWyo0';
let myUrl = "https://striveschool-api.herokuapp.com/api/product/";

// Seleziono tutto ciò che può servirmi
const row = document.getElementById("row-cards");

// funzione per generare le card prodotto in base a quanti sono nella fetch

const productCardGenerator = function (arrayProducts) {
 arrayProducts.forEach((product) => {
  const col = document.createElement("div");
  col.classList.add("col", "col-6", "col-md-4", "col-lg-3");
  col.innerHTML = `
    <div class="card h-100">
  <img src=${product.imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
  <h4 class="card-title">${product.brand}</h4>
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text">${product.description}</p>
    <p class="card-text">€ ${product.price}</p>
    <a href="./BackOffice.html?id=${product._id}" class="btn btn-primary m-1">Modifica</a>
    <a href="./Details.html?id=${product._id}" class="btn btn-primary">Scopri di più</a>
  </div>
</div>
    `;
  row.appendChild(col);
 });
};

// fetch prodotti

const getProducts = function () {
 fetch(myUrl, {
  headers: {
   Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzllNTE4N2U1YzAwMTgxNGM2MGUiLCJpYXQiOjE3MDU2NTY0NjIsImV4cCI6MTcwNjg2NjA2Mn0.FL3d1a0LSQgBOyaHnjPn7Z54rWWBLov8QPXzzIygPOA",
  },
 })
  .then((response) => {
   if (response.ok) {
    return response.json();
   } else {
    throw new Error("Error response");
   }
  })

  .then((data) => {
   productCardGenerator(data);
  })
  .catch((err) => {
   console.log(err);
  });
};

getProducts();
