const { Router, request, response } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.patch("/change-role/:id", usersController.changeRole);
usersRoutes.put("/", ensureAuthenticated, usersController.update);


module.exports = usersRoutes;
