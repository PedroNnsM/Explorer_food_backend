const { Router } = require("express");

const ImagesController = require("../controllers/ImagesController");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const imagesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const imagesController = new ImagesController();

imagesRoutes.post("/", upload.single("image"), imagesController.create);

module.exports = imagesRoutes;
