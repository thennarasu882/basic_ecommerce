var details = $("#details");
var one_prod = $("#one_product");
var more_prod = $("#more_product");
one_prod.click(function () {
  add_html_one("https://fakestoreapi.com/products/1");
});
more_prod.click(function () {
  add_html_more("https://fakestoreapi.com/products");
});

//for displaying one product
function add_html_one(url) {
  var product_request = new XMLHttpRequest();
  product_request.open("get", url, true);
  product_request.onload = function () {
    if (this.status == "200") {
      try {
        var product_data = JSON.parse(this.responseText);
        var txt = ``;
        txt += `
        <div class='col-md-3' id='1' onclick='new_page(this.id)'>
        <div class='card p-3 mx-2 my-4 '>
        <img src="${product_data.image}" class="card-img p-3" alt="product images" width="100px"height="150px">
        <div class='card-body'>
        <b class='card-title'>$${product_data.price}</b>
        <p class='card-text'>${product_data.title}</p>
        </div>
        </div>
        </div>
        `;
        details[0].innerHTML = txt;
      } catch (e) {
        console.warn("something went wrong");
      }
    } else {
      details[0].innerHTML = "Some error occured";
    }
  };
  product_request.send();
}

//for displaying more product

function add_html_more(url) {
  var product_request = new XMLHttpRequest();
  product_request.open("get", url, true);
  product_request.onload = function () {
    if (this.status == "200") {
      try {
        var product_data = JSON.parse(this.responseText);
        var txt = ``;
        for (var i = 0; i < product_data.length; i++) {
          txt += `
      
        <div class='col-md-3' id='${product_data[i].id}' onclick='new_page(this.id)'>
        <div class='card p-3 mx-2 my-4 '>
        <img src="${product_data[i].image}" class="card-img p-3" alt="product images" width="100px"height="150px">
        <div class='card-body'>
        <b class='card-title'>$${product_data[i].price} </b>
        <p class='card-text'>${product_data[i].title}</p>
        </div>
        </div>
        </div>
        `;
        }
        details[0].innerHTML = txt;
      } catch (e) {
        console.warn("something went wrong");
      }
    }
  };
  product_request.send();
}

//function to display details of the particular product when clicked.
function new_page(id) {
  var product_request = new XMLHttpRequest();
  product_request.open("get", "https://fakestoreapi.com/products", true);
  product_request.onload = function () {
    var product_data = JSON.parse(this.responseText);
    for (var item in product_data) {
      if (product_data[item].id == id) {
        var myWindow = window.open("product_details.html", "_blank"); //new tab for displaying details of the product
        myWindow.document.write(`
          <div class="container m-3 p-3">
            <div class="row">
              <div class="col-md-3">
                <img src="${product_data[item].image}" alt="" id="img" width="200px" height="200px" />
              </div>
              <div class="col-md-3">
                <h1 id="price">$ ${product_data[item].price}</h1>
                <b id="title"> Title : ${product_data[item].title}</b>
                <h3 id="category">Category : ${product_data[item].category}</h3>
                <p id="description">${product_data[item].description}</p>
              </div>
            </div>
          </div>`);
      }
    }
  };
  product_request.send();
}
