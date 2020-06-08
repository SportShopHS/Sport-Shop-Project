var items = [];
var total = 0;
var seenItems = [];
var popupCounter = 0;
var mouseX = 0;
var mouseY = 0;

function addToCart(item, price, source) {
    var result = items.find( ({ itemName }) => itemName === item );
    if(result === undefined){
        items.push({itemName: item,itemCount: 1, price: price, source: source});
        total+= price;
    }
    else{
        let count = items.find( ({ itemName }) => itemName === item );
        count.itemCount++;
        count.price+= price;
        total+= price;
        console.log("count of " + count.itemName + " is " + count.itemCount);
    }
}

function startCart() {
    var knownItems = [];
    var newElements = [];

    if(items.length === 0){
        document.getElementById("total").innerText = "Total Price "+ total + "$";
        document.getElementById("placeOrder").disabled = true;
        return;
    }

    if(seenItems.length === 0){
        items.forEach(i => createElementInCart(i));
        document.getElementById("total").innerText = "Total Price "+ total + "$";
        document.getElementById("placeOrder").disabled = false;
        return;
    }
    document.getElementById("placeOrder").disabled = false;
    knownItems = items.filter(function (e) {
        return seenItems.some(y=> y.itemName === e.itemName);
    });

    knownItems.forEach(k=> {
        document.getElementById("count" + k.itemName).innerText = k.itemCount;
        document.getElementById("price" + k.itemName).innerText = k.price + "$";
    });

    newElements = items.filter(function (x) {
        return seenItems.every(e => e.itemName !== x.itemName);
    });

    newElements.forEach(n => createElementInCart(n));
    document.getElementById("total").innerText = "Total Price "+ total + "$";
}

function createElementInCart(itemToAdd) {
    seenItems.push({itemName: itemToAdd.itemName,itemCount: itemToAdd.itemCount, price: itemToAdd.price, source: itemToAdd.source});
    let img = document.createElement("IMG");
    img.setAttribute("src", itemToAdd.source);
    img.setAttribute("width", "45");
    img.setAttribute("height", "45");
    let row = document.createElement("div");
    row.id = itemToAdd.itemName;
    row.className = "col-md-12 ml-auto item-cart";
    let innerRow1 = document.createElement("div");
    let innerRow2 = document.createElement("div");
    innerRow1.className = "col-md-9 ml-auto";
    innerRow2.className = "col-md-3 ml-auto picture";
    let itemP = document.createElement("div");
    itemP.className = "description";
    let itemImg = document.createElement("p");
    let remove = document.createElement("button");
    remove.className = "removeButton";
    remove.addEventListener('click', function f() {
        removeItem(itemToAdd);
    });
    let deleteIcon = document.createElement("img");
    deleteIcon.src = "bin.svg";
    remove.appendChild(deleteIcon);
    let name = document.createElement("p");
    let count = document.createElement("p");
    count.id = "count" + itemToAdd.itemName;
    let price = document.createElement("p");
    price.id = "price" + itemToAdd.itemName;
    name.innerText = itemToAdd.itemName;
    count.innerText = itemToAdd.itemCount;
    price.innerText = itemToAdd.price + "$";
    itemP.appendChild(name);
    itemP.appendChild(count);
    itemP.appendChild(price);
    itemImg.appendChild(img);
    innerRow1.appendChild(itemP);
    innerRow2.appendChild(remove);
    innerRow2.appendChild(itemImg);
    row.appendChild(innerRow1);
    row.appendChild(innerRow2);
    let modalBody = document.getElementById("modalBody");
    modalBody.insertAdjacentElement("afterbegin", row);
}

$(document).ready(function() {
    $("tr:not(:has(th))").hover(
        function () {
            $(this).css({"background-color":"#f2f2f2"});
        },
        function () {
            $(this).css({"background-color":"#f5feff"});
        }
    );
});



function removeItem(itemValue) {
    let result = items.find( ({ itemName }) => itemName === itemValue.itemName );
    let seenRes = seenItems.find( ({ itemName }) => itemName === itemValue.itemName );
    let oneItemPrice = (itemValue.price/itemValue.itemCount);
    console.log(oneItemPrice);
    if(result.itemCount > 1){
        result.price-= oneItemPrice;
        seenRes.price = result.price;
        result.itemCount--;
        seenRes.itemCount--;
        total-= oneItemPrice;
        document.getElementById("count" + itemValue.itemName).innerText = result.itemCount;
        document.getElementById("price" + itemValue.itemName).innerText = result.price + "$";
    }
    else{
        let index = items.findIndex(i => i.itemName === itemValue.itemName);
        let seenIndex = seenItems.findIndex(i => i.itemName === itemValue.itemName);
        total -= itemValue.price;
        items.splice(index, 1);
        seenItems.splice(seenIndex, 1);
        document.getElementById(itemValue.itemName).remove();
    }

    document.getElementById("total").innerText = "Total Price "+ total + "$";
    if(total === 0){
        document.getElementById("placeOrder").disabled = true;
    }
}

document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

$(document).mouseleave(function () {
    if (mouseY < 100) {
        if (popupCounter < 1) {
            alert("Goodbye! Hope to see you soon (:");
        }
        popupCounter ++;
    }
});


/*function removeallItem(itemValue) {
    let index = items.findIndex(i => i.itemName === itemValue.itemName);
    let seenIndex = seenItems.findIndex(i => i.itemName === itemValue.itemName);
    total -= itemValue.price;
    items.splice(index, 2);
    seenItems.splice(seenIndex, 2);
    document.getElementById(itemValue.itemName).remove();
}
function removeall() {
    var i;

    for (i = 0; i < seenItems.length; i++) {

        removeallItem(items[i]);
        removeallItem(seenItems[i]);

    }
    items.length=0;
    seenItems.length=0;
}
*/