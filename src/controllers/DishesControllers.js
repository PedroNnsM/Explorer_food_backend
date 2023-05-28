const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    const {
      title,
      description,
      img,
      price,
      categories,
      dishes_ingredients,
      ingredients,
    } = request.body;
    const user_id = request.user.id;
    const imgDishesFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    if (
      !title ||
      !price ||
      !description ||
      !img ||
      !categories ||
      !dishes_ingredients
    ) {
      throw new AppError(
        "Não foi possível realizar o cadastro. Preencha todos os campos"
      );
    }

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      user_id,
      img: filename,
      price,
    });

    const categoriesInsert = categories.map((title) => {
      return {
        dish_id,
        title,
      };
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        name,
      };
    });

    const insertedIngredients = await knex("ingredients")
      .insert(ingredientsInsert)
      .returning("id");

    const ingredientIds = insertedIngredients.map((row) => row.id);

    const dishesIngredientsInsert = dishes_ingredients.map(() => {
      return {
        dish_id,
        ingredient_id: ingredientIds,
      };
    });

    await knex("categories").insert(categoriesInsert);
    await knex("dishes_ingredients").insert(dishesIngredientsInsert);

    const filename = await diskStorage.saveFile(imgDishesFileName);
    dish.img = filename;

    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const dishes_ingredients = await knex("dishes_ingredients")
      .where({ dish_id: id })
      .orderBy("name");
    const categories = await knex("categories")
      .where({ dish_id: id })
      .orderBy("created_at");

    return response.json({
      ...dish,
      dishes_ingredients,
      categories,
    });
  }
}

module.exports = DishesController;
