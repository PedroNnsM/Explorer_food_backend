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
    console.log(image);
    const filename = await diskStorage.saveFile(image.filename);

    return response.json({ filename });
  }

  async update(request, response) {
    const diskStorage = new DiskStorage();
    const dishe_id = request.dishe.id;
    const imageFilename = request.file.filename;

    const dishe = await knex("dishes");

    if (dishe.image) {
      await diskStorage.deleteFile(dishe.image);
    }
    const filename = diskStorage.saveFile(imageFilename);
    dishe.image = filename;

    await knex("dishes").update(dishe).where({ id: dishe_id });

    return response.json(dishe);
  }
}
module.exports = ImagesController;
