var productNameInput = document.getElementById('productNameInput');
var productPriceInput = document.getElementById('productPriceInput');
var productCategoryInput = document.getElementById('productCategoryInput');
var productDescInput = document.getElementById('productDescInput');
var productSearchInput = document.getElementById('productSearchInput');
var tableBody = document.getElementById('tableBody');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var updateIndex = 0;

var productContainer;

if (localStorage.getItem('my Product') != null) {
  productContainer = JSON.parse(localStorage.getItem('my Product'));
  displayProduct(productContainer);
}
else{
  productContainer = []
}

function addProduct () {
  var product = {
    productName : productNameInput.value,
    productPrice : productPriceInput.value,
    productCategory : productCategoryInput.value,
    productDesc : productDescInput.value
  }
  
  productContainer.push(product);

  localStorage.setItem('my Product' , JSON.stringify(productContainer))

  clearForm()
  displayProduct(productContainer)
}

function clearForm () {
  productNameInput.value = ''
  productPriceInput.value = ''
  productCategoryInput.value = ''
  productDescInput.value = ''
}

function displayProduct (arr) {
  
  var cartoona = ``;
  for ( var i =0 ; i < arr.length ; i++) {
    cartoona += `
    <tr>
      <td>${i+1}</td>
      <td>${arr[i].productName}</td>
      <td>${arr[i].productPrice}</td>
      <td>${arr[i].productCategory}</td>
      <td>${arr[i].productDesc}</td>
      <td><button onclick='setFormToUpdate(${i})' class="btn btn-sm btn-warning">Update</button></td>
      <td><button onclick='deleteProduct(${i})' class="btn btn-sm btn-danger">Delete</button></td>
    </tr>`
  }
  tableBody.innerHTML = cartoona;
}

function searchProduct (searchTerm) {

  var searchResult = [];

  for ( var i = 0 ; i < productContainer.length ; i++) {

    if ( productContainer[i].productName.toLowerCase().includes(searchTerm.toLowerCase())) {
      searchResult.push(productContainer[i])
    }
  }

  displayProduct(searchResult)
}

function deleteProduct (deleteIndex) {
  productContainer.splice(deleteIndex , 1);
  localStorage.setItem('my Product' , JSON.stringify(productContainer))
  displayProduct(productContainer)
}

function setFormToUpdate (index) {

  updateIndex = index;
  
  productNameInput.value = productContainer[index].productName;
  productPriceInput.value = productContainer[index].productPrice;
  productCategoryInput.value = productContainer[index].productCategory;
  productDescInput.value = productContainer[index].productDesc;

  addBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');
}

function updateProduct () {
  
  var product = {
    productName : productNameInput.value,
    productPrice : productPriceInput.value,
    productCategory : productCategoryInput.value,
    productDesc : productDescInput.value
  }
  productContainer.splice(updateIndex , 1 , product);
  
  localStorage.setItem('my Product' , JSON.stringify(productContainer));

  clearForm();
  displayProduct(productContainer);
  
  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');
}
