const knex = require("../database/knex");
const IngredientRepository = require("../repositories/IngredientRepository");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, description, price, image, category, ingredients } =
      request.body;

      
    if (!title || !description || !price || !ingredients) {
      throw new AppError("Insira todos os campos");
    }

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      price,
      image,
      category,
    });

    const insertIngredients = ingredients.map((name) => {
      return {
        dish_id,
        name,
      }
    })
    await knex('ingredients').insert(insertIngredients)

   

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
        .map((ingredient) => ingredient.trim());

      // Subquery para obter os IDs dos pratos que possuem os ingredientes informados
      const subquery = knex("dishes_ingredients")
        .select("dish_id")
        .whereIn("ingredient_id", function () {
          this.select("id")
            .from("ingredients")
            .whereIn("name", filterIngredients);
        });

      // Consulta para obter os pratos com base no título e nos ingredientes
      dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.title",
          "dishes.category",
          "dishes.description",
          "dishes.price",
        ])
        .whereLike("dishes.title", `%${title}%`)
        .whereIn("dishes.id", subquery)
        .groupBy("dishes.id")
        .orderBy("dishes.title");
    } else {
      dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const allDishesIngredients = await knex("dishes_ingredients")
      .select([
        "ingredients.name",
        "ingredients.id",
        "dishes_ingredients.dish_id",
      ])
      .innerJoin(
        "ingredients",
        "ingredients.id",
        "dishes_ingredients.ingredient_id"
      );

    const dishesWithIngredients = dishes.map((dish) => {
      const dishIngredients = allDishesIngredients.filter(
        (dishIngredient) => dishIngredient.dish_id === dish.id
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
