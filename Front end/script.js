"use strict";

const overlay = document.querySelector(".overlay");
const featuredCarContainer = document.querySelector(".featured-car-container");
const category_tag = document.querySelector(".category-span");
const company_tag = document.querySelector(".company-span");
const price_tag = document.querySelector(".price-span");
const searchBarForm = document.querySelector(".search-bar");
const priceForm = document.querySelector(".form");
const searchInput = document.querySelector(".header-search");
const priceInputFrom = document.querySelector(".price-input-from");
const priceInputTo = document.querySelector(".price-input-to");

const category_popup = document.querySelector(".category-popup");
const brand_popup = document.querySelector(".brand-popup");
const price_popup = document.querySelector(".price-popup");

const categories = document.querySelectorAll(".car-icon-pack");
const companies = document.querySelectorAll(".brand-icon-pack");

overlay.addEventListener("click", closeAllPopup);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeAllPopup();
});

category_tag.addEventListener("click", () => {
  if (category_popup.classList.contains("hidden")) openCategoryPopup();
  else closeCategoryPopup();
});

company_tag.addEventListener("click", () => {
  if (brand_popup.classList.contains("hidden")) openCompanyPopup();
  else closeCompanyPopup();
});

price_tag.addEventListener("click", () => {
  if (price_popup.classList.contains("hidden")) openPricePopup();
  else closePricePopup();
});

function openCategoryPopup() {
  closeAllPopup();
  category_tag.style.color = "#fc2947";
  category_tag.style.fontWeight = "bold";
  category_popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function openCompanyPopup() {
  closeAllPopup();
  company_tag.style.color = "#fc2947";
  company_tag.style.fontWeight = "bold";
  brand_popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function openPricePopup() {
  closeAllPopup();
  price_tag.style.color = "#fc2947";
  price_tag.style.fontWeight = "bold";
  price_popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeCategoryPopup() {
  category_tag.style.color = "";
  category_tag.style.fontWeight = "";
  category_popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

function closeCompanyPopup() {
  company_tag.style.color = "";
  company_tag.style.fontWeight = "";
  brand_popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

function closePricePopup() {
  price_tag.style.color = "";
  price_tag.style.fontWeight = "";
  price_popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

function closeAllPopup() {
  category_tag.style.color = "";
  category_tag.style.fontWeight = "";
  company_tag.style.color = "";
  company_tag.style.fontWeight = "";
  price_tag.style.color = "";
  price_tag.style.fontWeight = "";
  category_popup.classList.add("hidden");
  brand_popup.classList.add("hidden");
  price_popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

categories.forEach((category) => {
  category.addEventListener("click", () => {
    getCarsByType("", "", category.dataset.category);
    closeAllPopup();
  });
});

companies.forEach((company) => {
  company.addEventListener("click", () => {
    getCarsByType("", company.dataset.brand, "");
    closeAllPopup();
  });
});

searchBarForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getCarsByType(searchInput.value, "", "");
  searchInput.value = "";
});

priceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getCarsByPrice(+priceInputFrom.value, +priceInputTo.value);
  closeAllPopup();
  priceInputFrom.value = priceInputTo.value = "";
});

function addCarCarts(cars) {
  featuredCarContainer.innerHTML = "";
  let html;
  cars.forEach((car) => {
    html = `
    <figure class="featured-car">
          <img
            class="car-img"
            src=${car.image}
            />
            <div class="car-detail">
            <span class="car-name">${car.name}</span>
            <div class="car-detail-container">
            <div class="car-category-pack pack">
            <i class="ph ph-car-simple"></i>
            <span class="car-category-name">${car.category}</span>
            </div>
            
            <div class="car-country-pack pack">
            <i class="ph ph-globe-hemisphere-east"></i>
            <span class="car-country">${car.country}</span>
            </div>
            
            <div class="car-stock-pack pack">
            <i class="ph ph-check-circle"></i>
            <span class="car-stock"><strong>${car.stock}</strong> Units</span>
            </div>

            <div class="car-year-pack pack">
            <i class="ph ph-calendar"></i>
            <span class="car-year"><strong>${car.year}</strong></span>
            </div>
            </div>
            <div class="car-price-pack">
            <span class="car-price">${car.price} USD</span>
            <button class="buy-button">BUY</button>
            </div>
            </div>
            </figure>
            `;
    featuredCarContainer.insertAdjacentHTML("beforeend", html);
  });
}

async function getCarsByType(name, brand, category) {
  const response = await fetch(
    `http://localhost:3000/cars?name=${name}&brand=${brand}&category=${category}`
  );
  const cars = await response.json();
  addCarCarts(cars);
}

async function getCarsByPrice(price_start, price_end) {
  const response = await fetch(
    `http://localhost:3000/cars/price?price_start=${price_start}&price_end=${price_end}`
  );
  const cars = await response.json();
  addCarCarts(cars);
}

(async function getAllCars() {
  const response = await fetch(
    `http://localhost:3000/cars/price?price_start=${0}&price_end=${10000000}`
  );
  const cars = await response.json();
  addCarCarts(cars);
})();
