const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('pokedex', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
// instance user auprès de sequelize
  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        // types: pokemon.types.join()
        // retrait join() suite mise en place setter voir models
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()));
    })
    console.log('La base de donnée a bien été initialisée !');
  })
}
// initialisation du models



  
module.exports = { 
  initDb, Pokemon, User
}
// export de la fonction initDB qui permet d'initialiser la bdd et model sequelize Pokemon pour s'en servir ailleurs dans le code.



