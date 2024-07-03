const express = require("express");
const { connectToDb, getDb } = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());

let db;
connectToDb(() => {
  app.listen(3000);
  db = getDb();
});

app.get("/cars", (req, res) => {
  const name = req.query.name.toLowerCase();
  const brand = req.query.brand.toLowerCase();
  const category = req.query.category.toLowerCase();

  if (name) {
    key = "name";
    value = name;
  }

  if (brand) {
    key = "brand";
    value = brand;
  }

  if (category) {
    key = "category";
    value = category;
  }

  let cars = [];
  db.collection("cars")
    .find()
    .forEach((car) => {
      if (car[key].toLowerCase() == value) {
        cars.push(car);
      }
    })
    .then(() => {
      res.status(200).json(cars);
    });
});

app.get("/cars/price", (req, res) => {
  const price_start = req.query.price_start;
  const price_end = req.query.price_end;
  let cars = [];

  db.collection("cars")
    .find()
    .forEach((car) => {
      if (
        +car.price.replace(/\s/g, "") >= price_start &&
        +car.price.replace(/\s/g, "") <= price_end
      ) {
        cars.push(car);
      }
    })
    .then(() => {
      res.status(200).json(cars);
    });
});
