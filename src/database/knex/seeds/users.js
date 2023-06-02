/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      name: "Sou Admin",
      email: "admin@email.com",
      password: "$2a$08$qAaN2Odtk1sOPwS1b9lP6euhH7qW.ps1BYRIaMdOGsZ7XeGch0pky",
      admin: true,
    },
  ]);
};
