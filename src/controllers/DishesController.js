const knex = require("../database/knex");
const IngredientRepository = require("../repositories/IngredientRepository");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, description, price, image, category, ingredients } =
      request.body;

    console.log(title, description, price, ingredients);
    if (!title || !description || !price || !ingredients) {
      throw new AppError("Insira todos os campos");
    }

    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      price,
      image,
      category,
    });

    const dishIngredients = [];

    const ingredientRepository = new IngredientRepository();

    for (const ingredientTitle of ingredients) {
      let ingredient = await ingredientRepository.findByTitle(ingredientTitle);

      if (!ingredient) {
        ingredient = await ingredientRepository.create({
          title: ingredientTitle,
        });
      }

      dishIngredients.push({
        dish_id,
        ingredient_id: ingredient.id,
      });
    }

    await knex("dishes_ingredients").insert(dishIngredients);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const dishesIngredients = await knex("dishes_ingredients").where({dish_id: id})

    return response.json({
      ...dish,
      dishesIngredients,
    });
  }
}

module.exports = DishesController;
