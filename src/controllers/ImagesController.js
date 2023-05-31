const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ImagesController {
  async create(request, response) {
    dish_id = request.dish.id
    const imageFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    if (!request.file) {
      throw new AppError("Nenhuma foto selecionada");
    }

    const filename = await diskStorage.saveFile(imageFileName);
    const insertedImage = await knex("images").insert({ filename });
    dish.img = filename

    const imageId = insertedImage;
    return response.json({ imageId });
  }
}
module.exports = ImagesController;
