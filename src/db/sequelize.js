const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
// instance user auprès de sequelize

// const initDb = () => {
//   return sequelize.sync({force: true}).then(_ => {
//     admins.map(admin => {
//       Admin.create({
//         username: admin.name,
//         password: admin.password,
//       }).then(admin => console.log(admin.toJSON()));
//     })
//     console.log('La base de donnée a bien été initialisée !');
//   })
// }
// initialisation du models

module.exports = {
  Pokemon,
  User,
};
// export de la fonction initDB qui permet d'initialiser la bdd et model sequelize Pokemon pour s'en servir ailleurs dans le code.
