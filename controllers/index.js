console.log(axios);
import { Product } from "../models/Product.js";

const defaultPlaceholder = [];
let arrInput = document.querySelectorAll(
  "#formProduct input, #formProduct select,#formProduct textarea"
);
arrInput.forEach((input, index) => {
  defaultPlaceholder.push(input.placeholder);
});

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

  promise.catch((err) => {
    console.log("err", err);
  });
}

function resetForm() {
  let arrInput = document.querySelectorAll(
    "#formProduct input, #formProduct select,#formProduct textarea"
  );
  console.log(arrInput);

  arrInput.forEach((input, index) => {
    input.value = null;
    input.placeholder = defaultPlaceholder[index];

    if (input.tagName === "SELECT") {
      input.selectedIndex = 0;
    }
  });
}

function renderForm(data) {
  let arrInput = document.querySelectorAll(
    "#formProduct input, #formProduct select,#formProduct textarea"
  );
  arrInput.forEach((input, index) => {
    input.value = data[input.id];
    if (input.id === "id") {
      input.disabled = true;
    }
  });
}

function renderTableProduct(arrProduct, tableID = "tableProduct") {
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
                    <btn class="btn btn-danger" onclick="deleteProduct('${product["id"]}')">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </btn>
                    <btn class="btn btn-primary" onclick="renderProduct('${product["id"]}')">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </btn>
                </td>
            </tr>`;
  });
  //   console.log(html);
  document.getElementById(tableID).innerHTML = html;
}

window.deleteProduct = (productID) => {
  let resultDel = confirm("Confirm delete product " + productID + "?");

  if (resultDel) {
    let promise = axios({
      url: "http://svcy.myclass.vn/api/Product/DeleteProduct/" + productID,
      method: "DELETE",
    });

    promise.then((result) => {
      console.log("result:", result);
    });

    promise.catch((err) => {
      console.log("err: ", err);
      return alert("Delete a product failed");
    });

    setTimeout(() => {
      resetForm();
      getAllProduct();
      alert("Delete a product successfully");
    }, 1000);
  }
};

window.renderProduct = (productID) => {
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + productID,
    method: "GET",
  });

  promise.then((result) => {
    console.log("result", result.data);
    renderForm(result.data);
    document.querySelector("#updateProduct").disabled = false;
  });

  promise.catch((err) => {
    console.log("err", err);
    return alert("Product is not avaiable");
  });
};

document.querySelector("#createProduct").onclick = () => {
  let arrInput = document.querySelectorAll(
    "#formProduct input, #formProduct select,#formProduct textarea"
  );
  let newProduct = new Product();

  arrInput.forEach((input, index) => {
    let { id, value } = input;
    newProduct[id] = value;
  });

  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/CreateProduct",
    method: "POST",
    data: newProduct,
  });
  promise.then((result) => {
    console.log("result", result);
    alert("Create new product successfully");
  });
  promise.catch((err) => {
    console.log("err", err);
  });

  setTimeout(() => {
    resetForm();
    getAllProduct();
  }, 1000);
};

document.querySelector("#updateProduct").disabled = true;
document.querySelector("#updateProduct").onclick = () => {
  let productUpdate = new Product();
  let arrInput = document.querySelectorAll(
    "#formProduct input, #formProduct select,#formProduct textarea"
  );
  arrInput.forEach((input, index) => {
    let { id, value } = input;
    productUpdate[id] = value;
  });

  let promise = axios({
    url:
      "http://svcy.myclass.vn/api/Product/UpdateProduct/" + productUpdate["id"],
    method: "PUT",
    data: productUpdate,
  });

  promise.then((result) => {
    console.log("result", result.data);
    document.querySelector("#id").disabled = false;
    document.querySelector("#updateProduct").disabled = true;
    setTimeout(() => {
      resetForm();
      getAllProduct();
    }, 1000);
    alert("Update product successfull");
  });

  promise.catch((err) => {
    console.log("err", err);
  });
};

document.querySelector("#searchProductByID").onclick = () => {
  searchByID();
};

window.searchByID = () => {
  let searchInput = document.querySelector("#searchInputByID").value;
  if (!searchInput) {
    return getAllProduct();
  }

  let arrProduct = [];
  let promise = axios({
    url: "http://svcy.myclass.vn/api/Product/GetById/" + searchInput,
    method: "GET",
  });

  promise.then((result) => {
    console.log("result", result);

    arrProduct.push(result.data);
    renderTableProduct(arrProduct);
  });
  promise.catch((err) => {
    console.log("err", err);
  });
};
