const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishesController {
  async create(request, response) {
    const { title, description, img, price, categories, dishes_ingredients } =
      request.body;
    const user_id = request.user.id;
    const imgDishesFileName = request.file.filename;

    const diskStorage = new DiskStorage();

    const [dish_id] = await knex("dishes").insert({
      title,
      description,
      user_id,
      img: filename,
      price,
    });

    if (
      !title ||
      !price ||
      !description ||
      !img ||
      !categories ||
      !dishes_ingredients
    ) {
      throw new AppError(
        "Não foi possivel realizar o cadastro. Preencha todos os campos"
      );
    }

    const categoriesInsert = categories.map((title) => {
      return {
        dish_id,
        title,
      };
    });

    await knex("categories").insert(categoriesInsert);

    const dishes_ingredientsInsert = dishes_ingredients.map((name) => {
      return {
        dish_id,
        ingredient_id,
      };
    });

    await knex("dishes_ingredients").insert(dishes_ingredientsInsert);

    const filename = await diskStorage.saveFile(imgDishesFileName);
    dish.img = filename;

    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;

    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const notesTags = userTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: notesTags,
      };
    });

    return response.json(notesWithTags);
  }
}

module.exports = DishesController;
