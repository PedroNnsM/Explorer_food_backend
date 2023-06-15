const knex = require("../database/knex");

const IngredientRepository = require("../repositories/IngredientRepository");
const AppError = require("../utils/AppError");

class IngredientsController {
  async index(request, response) {
    const { search } = request.query;

    let ingredients = knex("ingredients").groupBy("title");

    if (search) {
      ingredients = ingredients.whereRaw(
        "UPPER(title) LIKE ?",
        `%${search.toUpperCase()}%`
      );
    }

    const result = await ingredients;

    return response.json(result);
  }

  async create(request, response) {
    const { title } = request.body;

    const ingredientRepository = new IngredientRepository();

    const checkIngredientExists = await ingredientRepository.findByTitle(title);

    if (checkIngredientExists) {
      throw new AppError(
        "Esse ingrediente já está cadastrado no banco de dados."
      );
    }

    const newIngredient = await ingredientRepository.create({ title });

    return response.status(201).json(newIngredient);
  }
}

module.exports = IngredientsController;
