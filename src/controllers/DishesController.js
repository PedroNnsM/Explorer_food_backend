const knex = require("../database/knex");

const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DishesController {
  async create(request, response) {
    const { title, description, price,img } = request.body;

    if ((!title, !description, !price)) {
      throw new AppError("Insira todos os campos");
    }

    const user_id = request.user.id;
   
    //pegar o LastId
    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      price,
      img,
    });
    // [] TODO - rota de subir imagem
    // [] TODO -
    // let newIngredientsId = [];
    // ingredients.forEach((ingredient) => {
    // if(ingredient não é um número) {
    // const newIngredient = IngredientRepository.create(ingredient)
    // newIngredientsId.push(newIngredient)
    // }
    // })

    // const ingredientsToRelate = [...newIngredientsId, ingredientsIds]
    // ingredientsToRelate.forEach(ingredient => {
    //   await DishesIngredient.create(dish_id, ingredient)
    // })

    // const insertedIngredients = await knex("ingredients")
    //   .insert(ingredientsInsert)
    //   .returning("id");

    // const ingredientIds = insertedIngredients.map((row) => row.id);

    // const dishesIngredientsInsert = dishes_ingredients.map(() => {
    //   return {
    //     dish_id,
    //     ingredient_id: ingredientIds,
    //   };
    // });

    // await knex("categories").insert(categoriesInsert);
    // await knex("dishes_ingredients").insert(dishesIngredientsInsert);

    

    return response.json();
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
