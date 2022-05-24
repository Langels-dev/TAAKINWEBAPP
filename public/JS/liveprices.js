/* VARIABLES LIVE PRICES */
const combo = document.getElementById("combo");
const card = document.querySelector("#prices");
const arrow = document.querySelector("#arrow");
const liveCard = document.querySelector("#prices .liveCard");
let title = document.getElementById("titlePrices");
let bidValues = document.getElementById("bid");
let askValues = document.getElementById("ask");
/* VARIABLES LIVE PRICES */

/* EVENTS FOR THE CARD */

var SizeWidth = function () {
  this.width = window.innerWidth;
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("card") === "active") {
    openCard();
  }
});

window.addEventListener("resize", SizeWidth);

arrow.addEventListener("click", () => {
  if (new SizeWidth().width > 670) {
    if (card.classList.contains("close")) {
      defaultCard();
    } else {
      openCard();
    }
  } else {
    if (new SizeWidth().width <= 670 && card.style.left != "-205px") {
      widthCard();
    } else {
      widthDefaultCard();
    }
  }
});

function openCard() {
  localStorage.setItem("card", "active");
  card.classList.add("close");
  setTimeout(() => {
    arrow.classList.add("change");
    liveCard.classList.add("shrink");
  }, 400);
}

function defaultCard() {
  localStorage.removeItem("card");
  liveCard.classList.remove("shrink");
  setTimeout(() => {
    card.classList.remove("close");
    arrow.classList.remove("change");
  }, 800);
}

function widthCard() {
  card.style.left = "-205px";
  setTimeout(() => {
    arrow.style.top = "45px";
    arrow.style.transform = "translateX(320px) rotate(-90deg)";
    liveCard.style.left = "20px";
    liveCard.style.transform = "scale(1.1)";
  }, 400);
}

function widthDefaultCard() {
  arrow.style.removeProperty("top");
  arrow.style.removeProperty("transform");
  liveCard.style.removeProperty("left");
  liveCard.style.removeProperty("transform");
  setTimeout(() => {
    card.style.removeProperty("left");
  }, 800);
}

/* EVENTS FOR THE CARD */

/* API PRICES METALS */

var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-abvpot18l04gjpyt-io");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

combo.addEventListener("change", () => {
  if (parseFloat(combo.value) === 1) {
    Gold();
  } else {
    Silver();
  }
});

async function Gold() {
  try {
    const respuesta = await fetch(
      "https://www.goldapi.io/api/XAU/USD",
      requestOptions
    );
    const resultado = await respuesta.json();
    title.innerHTML = `<span class="iconify" data-icon="ant-design:gold-filled" style="color: #f3cf02;"></span> GOLD / ${resultado.metal}`;
    let bid = resultado.bid.toString();
    let ask = resultado.ask.toString();

    bidValues.textContent = bid.replace(".", ",");
    askValues.textContent = ask.replace(".", ",");
  } catch (error) {
    console.log(error);
  }
}

async function Silver() {
  try {
    const respuesta = await fetch(
      "https://www.goldapi.io/api/XAG/USD",
      requestOptions
    );
    const resultado = await respuesta.json();
    title.innerHTML = `<span class="iconify" data-icon="ant-design:gold-filled" style="color: lightgray;"></span> SILVER / ${resultado.metal}`;
    let bid = resultado.bid.toString();
    let ask = resultado.ask.toString();

    bidValues.textContent = bid.replace(".", ",");
    askValues.textContent = ask.replace(".", ",");
  } catch (error) {
    alert("hubo un error");
    console.log(error);
  }
}

/* API PRICES METALS */
