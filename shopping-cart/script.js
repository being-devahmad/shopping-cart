let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("Data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((val) => {
      // object destructing just to prevent writing x.name etc continously

      let { id, name, description, price, image } = val;
      //   if there is something in array write that if not then do nothing
      let search = basket.find((val) => val.id === id) || []; // just to prevent from being 0 on refresh


      return `<div id="product-id-${id}" class="item">
    <img src= ${image} width="220" alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                </div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
    </div>
    </div>`;
    })
    .join(""));
};
generateShop();



let increment = (id) => {
  // if i simply console.log(id) it was showing me whole div but i wanted only id of that item div , i made a seperate variable named selectedItem and will show selectedItem.id so that only my id should get selected coz i only want increment or decrement in that id which is actually my quantity
  // let selectedItem = id

  //first of all search in the array of basket
  let search = basket.find((val) => val.id === id);
  // if item doesnot exists then push the data in basket otherwise just increase no of items
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("Data", JSON.stringify(basket));

  // console.log(basket)
  update(id);
};

let decrement = (id) => {
  let search = basket.find((val) => val.id === id);
  if(search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  basket = basket.filter((val)=> val.item != 0 )// when any item becmomes 0 in locakstorage it will not store in localstorage so we only filter those who are not 0

  localStorage.setItem("Data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((val) => val.id === id);
  // console.log(search.item)
  document.getElementById(id).innerHTML = search.item;

  totalItemsInCartBtn();
};

let totalItemsInCartBtn = () => {
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = basket
    .map((val) => val.item)
    .reduce((x, y) => x + y, 0);
};
totalItemsInCartBtn(); //as i want this function to be run on browser refresh just to show no of items in cart