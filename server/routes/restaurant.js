const express = require("express");
const router = express.Router();
const db = require("../db");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const result = await db.query(
        "SELECT * FROM restaurant ORDER BY id DESC"
      );
      res.json({
        status: "success",
        data: result.rows,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, location, price_range } = req.body;
      const newRestaurant = await db.query(
        "INSERT INTO restaurant (name, location, price_range) VALUES ($1,$2,$3) RETURNING *",
        [name, location, price_range]
      );

      res.json({
        status: "success",
        data: newRestaurant.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const restaurant = await db.query(
        "SELECT * FROM restaurant WHERE id = $1",
        [id]
      );

      res.json({
        status: "success",
        data: restaurant.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res, next) => {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const updateRes = await db.query(
      "UPDATE restaurant SET name= $1, location= $2, price_range= $3 where id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    try {
      res.json({
        status: "success",
        data: updateRes.rows[0],
      });
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res, next) => {
    const { id } = req.params;
    const deleteRes = await db.query("DELETE FROM restaurant where id=$1", [
      id,
    ]);
    try {
      res.json({
        status: "success",
        data: deleteRes.rows,
      });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
