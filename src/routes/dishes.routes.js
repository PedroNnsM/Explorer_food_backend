const { Router } = require("express");
const uploadConfig = require("../configs/upload");

const UploadImagesController = require("../controllers/SessionsController");
const uploadImagesController = new UploadImagesController();

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");

const dishesRoutes = Router();

const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.patch(
  "/image",
  upload.single("img"),
  uploadImagesController.create
);
dishesRoutes.delete("/:id", dishesController.delete);

module.exports = dishesRoutes;
