const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UploadImagesController {
  async create(request, response) {
    try {
      if (!request.file) {
        throw new AppError("Nenhuma foto selecionada");
      }

      const { filename } = request.file;
      const insertedImage = await knex("images").insert({ filename });

      const imageId = insertedImage[0];
      return response.json({ imageId });
    } catch (error) {
      console.log("erro no upload da imagem", error);
      throw new AppError("erro no servidor");
    }
  }
}
module.exports = UploadImagesController;
