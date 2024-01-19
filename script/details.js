
// prendo il riferimento dell'id del prodotto <a href="./Details.html?id=${product._id}" class="btn btn-primary">Scopri di più</a> aggiunto tramite link bottone
const row = document.getElementById('row-cards')
const addressId = new URLSearchParams(window.location.search).get('id')
console.log(addressId)
const myUrl= 'https://striveschool-api.herokuapp.com/api/product/'+addressId

const productCardGenerator = function(data){

   
       const col = document.createElement('div') 
        col.classList.add('col-6')
        col.innerHTML = `
        <div class="card ">
      <img src=${data.imageUrl}class="card-img-top img-fluid" width=300 alt="...">
      <div class="card-body">
      <h4 class="card-title">${data.brand}</h4>
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text m-0 fw-bold">Details</p>
        <p class="card-text">${data.description}</p>
        <p class="card-text">€ ${data.price}</p>
        <p class="card-text">ID: ${data._id}</p>
        
      </div>
    </div>
        `
        row.appendChild(col)
    };
    
    
     // fetch prodotti
    
    const getProducts = function() {
    
        fetch(myUrl, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzllNTE4N2U1YzAwMTgxNGM2MGUiLCJpYXQiOjE3MDU2NTY0NjIsImV4cCI6MTcwNjg2NjA2Mn0.FL3d1a0LSQgBOyaHnjPn7Z54rWWBLov8QPXzzIygPOA"
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Error response');
                }
            })
    
            .then((data) => {
                console.log('oggetto', data)
                productCardGenerator(data);
                
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    
    
    getProducts()
    