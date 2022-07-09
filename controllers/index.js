console.log(axios);
// import { Product } from "../models/Product.js";

window.onload = () => {
  getAllProduct();
  let a = document.querySelector("#id");
  console.log(a);
};

function getAllProduct() {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetAll",
    method: "GET",
  });

  promise.then((result) => {
    console.log(result.data);
    renderTableProduct(result.data, "tableProduct");
  });
}

function resetForm(){
  document.querySelector("#id").value = null;
  document.querySelector("#id").placeholder = document.querySelector("#id").placeholder;
  
  document.querySelector("#img").value = null;
  document.querySelector("#img").placeholder = document.querySelector("#img").placeholder;
  
  document.querySelector("#name").value = null;
  document.querySelector("#name").placeholder = document.querySelector("#name").placeholder;
  
  document.querySelector("#price").value = null;
  document.querySelector("#price").placeholder = document.querySelector("#price").placeholder;

  document.querySelector("#description").value = null;
  document.querySelector("#description").placeholder = document.querySelector("#description").placeholder;
}

//write a renderTableProduct()
function renderTableProduct(arrProduct, tableID) {
  let html = "";
  /*
  arrProduct.forEach((product, index) => {
    html += `<tr>`;
    for (let key in product) {
      html += `<td>${product[key]}</td>`;
    }
    html += `</tr>`;
  });
  */
  arrProduct.forEach((product, index) => {
    html += `<tr>
                <td>${product.id}</td>
                <td><img style="width:150px" src="${product.img}" alt=""></td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.type}</td>
                <td>
                    <btn class="btn btn-danger" onclick="deleteProduct('${product.id}')">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </btn>
                    <btn class="btn btn-primary">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </btn>
                </td>
            </tr>`;
  });
  //   console.log(html);
  document.getElementById(tableID).innerHTML = html;
}

function deleteProduct(productID) {
  let resultDel = confirm(
    "Confirm delete product "+productID +"?"
  );

  if(resultDel){
    let promise = axios({
      url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + productID,
      method: "DELETE",
    });
  
    promise.then((result) => {
      console.log("result:", result);
    });
  
    promise.catch((err) => {
      console.log("err: ", err);
    });
  
    setTimeout(() => {
      resetForm();
      getAllProduct();
      alert("Delete a product successfully");
    }, 1000);
  }
}

document.querySelector("#createProduct").onclick = () => {
  let arrInput = document.querySelectorAll(
    "#formProduct input, #formProduct select,#formProduct textarea"
  );
  let newProduct = new Product();
  // console.log(arrInput);

  arrInput.forEach((input, index) => {
    let { id, value } = input;
    newProduct[id] = value;
  });
  // console.log(newProduct);

  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: newProduct,
  });
  promise.then((result) => {
    console.log("result", result);
  });
  promise.catch((err) => {
    console.log("err", err);
  });

  setTimeout(() => {
    // resetForm();
    getAllProduct();
    alert("Create new product successfully");
  }, 1000);
};
