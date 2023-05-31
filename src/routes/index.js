const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const dishesRoutes = require("./dishes.routes");
const ingredientsRoutes = require("./ingredients.routes");
const uploadImagesRoutes = require("./uploadImagesRoutes.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/ingredients", ingredientsRoutes);
routes.use("/uploadImages", uploadImagesRoutes);

module.exports = routes;
