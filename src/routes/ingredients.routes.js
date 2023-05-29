const { Router } = require("express");

const IngredientsController = require("../controllers/IngredientsController");
// const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoutes = Router();


const ingredientsController = new IngredientsController();

// ingredientsController.use(ensureAuthenticated);

ingredientsRoutes.get("/", ingredientsController.index);
ingredientsRoutes.post("/", ingredientsController.create);

module.exports = ingredientsRoutes;
