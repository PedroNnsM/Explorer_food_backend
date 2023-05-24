const sqliteConnection = require("../database/sqlite");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);
    return user;
  }
  async findById(id) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    return user;
  }

  async changeRole({ id, role }) {
    try {
      const database = await sqliteConnection();

      await database.run("UPDATE users SET role = (?) WHERE id = (?)", [
        role,
        id,
      ]);

      const userUpdated = await this.findById(id)
      
      return userUpdated;
    } catch (error) {
      console.log(error);
    }
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return { id: userId };
  }
}
module.exports = UserRepository;
