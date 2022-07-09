console.log(axios);
import { Product } from "../models/Product.js";

window.onload = () => {
  getAllProduct();
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
                    <button class="btn btn-danger">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-primary">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>`;
  });
  //   console.log(html);
  document.getElementById(tableID).innerHTML = html;
}

document.querySelector("#createProduct").onclick = ()=>{
    let arrInput = document.querySelectorAll("#formProduct input, #formProduct select,#formProduct textarea");
    let newProduct = new Product();
    // console.log(arrInput);

    arrInput.forEach((input, index)=>{
        let {id, value} = input;
        newProduct[id] = value;
    });
    // console.log(newProduct);

    let promise = axios({
        url: "http://svcy.myclass.vn/api/Product/CreateProduct",
        method: "POST",
        data: newProduct,
    });
    promise.then((result)=>{
        console.log("result", result);
    });
    promise.catch((err)=>{
        console.log("err", err);
    });

    setTimeout(()=>{
        getAllProduct();
        alert("Create new product sucessfully");
    },1000);
};