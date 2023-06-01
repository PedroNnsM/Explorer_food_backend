const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, description, price, img, category } = request.body;
    const ingredients = request.body.ingredients;
    console.log(ingredients);
    if (!title || !description || !price || !ingredients) {
      throw new AppError("Insira todos os campos");
    }

    const user_id = request.user.id;

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      price,
      img,
      category,
    });

    const dishIngredients = ingredients.map((ingredient) => {
      return {
        dish_id,
        ingredient_id: ingredient,
      };
    });

    await knex("dishes_ingredients").insert(dishIngredients);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    return response.json({
      ...dish,
    });
  }
}

module.exports = DishesController;
