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
    const dishesIngredients = await knex("dishes_ingredients").where({
      dish_id: id,
    });

    return response.json({
      ...dish,
      dishesIngredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredient) => ingredient.trim(""));

      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.category",
          "dishes.description",
          "dishes.price",
        ])
        .whereLike("dishes.title", `%${title}%`)
        .whereIn("ingredients.title", filterIngredients)
        .innerJoin(
          "dishes_ingredients",
          "dishes.id",
          "dishes_ingredients.dish_id"
        )
        .innerJoin(
          "ingredients",
          "ingredients.id",
          "dishes_ingredients.ingredient_id"
        )
        .groupBy("dishes.id")
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const allIngredients = await knex("dishes_ingredients");
    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = allIngredients.filter(
        (ingredient) =>
          ingredient.dish_id === dish.id &&
          ingredient.ingredient_id === ingredient.id
      );

      return {
        ...dish,
        ingredients: dishIngredients,
      };
    });
    return response.json(dishesWithIngredients);
  }
}

module.exports = DishesController;
