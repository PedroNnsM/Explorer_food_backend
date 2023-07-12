const knex = require("../database/knex");

const IngredientRepository = require("../repositories/IngredientRepository");
const AppError = require("../utils/AppError");

class IngredientsController {
  async index(request, response) {
    const { search } = request.query;

    let ingredients = knex("ingredients").groupBy("name");

    if (search) {
      ingredients = ingredients.whereRaw(
        "UPPER(name) LIKE ?",
        `%${search.toUpperCase()}%`
      );
    }

    const result = await ingredients;

    return response.json(result);
  }

  async create(request, response) {
    const { name } = request.body;

    const ingredientRepository = new IngredientRepository();

    const checkIngredientExists = await ingredientRepository.findByTitle(name);

    if (checkIngredientExists) {
      throw new AppError(
        "Esse ingrediente já está cadastrado no banco de dados."
      );
    }

    const newIngredient = await ingredientRepository.create({ name });

    return response.status(201).json(newIngredient);
  }
}

module.exports = IngredientsController;
