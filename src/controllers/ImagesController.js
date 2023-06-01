const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ImagesController {
  async create(request, response) {
    const image = request.file;

    if (!image) {
      throw new AppError("Nenhuma foto selecionada");
    }
    const diskStorage = new DiskStorage();
console.log(image)
    const filename = await diskStorage.saveFile(image.filename);

    return response.json({filename});
  }
}
module.exports = ImagesController;
