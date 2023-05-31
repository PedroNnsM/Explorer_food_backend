const { Router } = require("express");

const UploadImagesController = require("../controllers/SessionsController");
const uploadImagesController = new UploadImagesController();

const uploadImagesRoutes = Router();

uploadImagesRoutes.post("/", uploadImagesController.create);

module.exports = uploadImagesRoutes;
