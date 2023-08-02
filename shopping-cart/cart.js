let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

// retrieve data from localstorage
let basket = JSON.parse(localStorage.getItem("Data")) || [];

let totalItemsInCartBtn = () => {
  let cartAmount = document.getElementById("cartAmount");
  cartAmount.innerHTML = basket
    .map((val) => val.item)
    .reduce((x, y) => x + y, 0);
};
totalItemsInCartBtn(); //as i want this function to be run on browser refresh just to show no of items in cart

let generateCardItems = () => {
  //when localstorage has some items if will run and when not else will run
  if (basket.length != 0) {
    return (shoppingCart.innerHTML = basket
      .map((val) => {
        // console.log(val);
        let { id, item } = val;
        let search = shopItemsData.find((x) => x.id === id) || [];
        let {image ,  name , price } = search;
        return ` <div class="cart-item">
            <img width = 100 src="${image}" />
            <div class="details">
                <div class = "title-price-x">
                    <h4 class ="title-price">
                        <p>${name}</p>
                        <p class = "cart-item-price">$ ${price}</p>
                    </h4>
                    <i onclick= "removeItem(${id})" class="bi bi-x-lg deleteCross"></i>
                </div>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                <h3>$ ${item * price}</h3>
            </div>
        </div> `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="btn">Back to Home</button>
        </a>
        `;
  }
};
generateCardItems();


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
    generateCardItems();
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

    generateCardItems(); // when the items count reaches to 0 it'll automatically run the function of generateCardItems (re-rendering) as a result card will disappear
    localStorage.setItem("Data", JSON.stringify(basket));
  };

  let update = (id) => {
    let search = basket.find((val) => val.id === id);
    // console.log(search.item)
    document.getElementById(id).innerHTML = search.item;
  
    totalItemsInCartBtn();
    totalBill();
  };

  let removeItem = (id) =>{
    let selectedItem = id;
    // console.log(selectedItem) --> it will give me i'd of that card whom I'm clicking 
    basket  = basket.filter((val)=> val.id != selectedItem );
    generateCardItems();
    totalBill();
    totalItemsInCartBtn();
    localStorage.setItem("Data", JSON.stringify(basket));
  }
  

  let totalBill = () =>{
    if(basket.length != 0){
      let amount = basket.map((val)=> {
        let {id , item } = val;
        let search = shopItemsData.find((x) => x.id === id) || [];
        return item * search.price
      }).reduce((x,y)=> x+y,0); //as i want totall bill 
      //console.log(amount)
      label.innerHTML = `<h2>Total Bill : $${amount}</h2>
      <button class="btn checkout">Checkout</button>
      <button class="btn clearCart" onclick="clearCart()">Clear Cart</button>
      `
    }else{

    }
  }
  totalBill();

  // here we'll clear the cart with one click
  let clearCart = ()=>{
    basket = [];
    generateCardItems();
    totalItemsInCartBtn();
    localStorage.setItem("Data", JSON.stringify(basket));
  }