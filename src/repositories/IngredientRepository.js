const sqliteConnection = require("../database/sqlite");

class IngredientRepository {
  async findByTitle(title) {
    const database = await sqliteConnection();

    const ingredient = await database.get(
      "SELECT * FROM ingredients WHERE UPPER(title) = UPPER(?)",
      [title]
    );

    return ingredient;
  }

  async findById(id) {
    const database = await sqliteConnection();

    const ingredient = await database.get(
      "SELECT * FROM ingredients WHERE id = (?)",
      [id]
    );

    return ingredient;
  }

  async create({ title }) {
    const database = await sqliteConnection();

    let newIngredient;

    const newIngredientInsert = await database.run(
      "INSERT INTO ingredients (title) VALUES (?)",
      [title]
    );

    if (newIngredientInsert && newIngredientInsert.lastID) {
      newIngredient = await this.findById(newIngredientInsert.lastID);
    }

    return newIngredient;
  }
}
module.exports = IngredientRepository;
