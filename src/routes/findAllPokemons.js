const { Pokemon } = require('../db/sequelize')
const auth = require("../auth/auth");
const { Op } = require('sequelize');
  
module.exports = (app) => {
  app.get('/api/pokemons',auth ,(req, res) => {
    // passer middleware auth en deuxième argument de la route pour sécurisation
    if(req.query.name) {
      const name = req.query.name;
      // const limitUser = parseInt(req.query.limit);
      // (limitUser != 5)? limitUser : limitUser = 5;
      const limitUser = parseInt(req.query.limit) || 5; //tuto, vérifier ternaire

      if(name.length < 2){
        const message = "Le terme de la recherche doit contenir au moins deux caractères. Réessayez.";
        return res.status(400).json({ message});
      }

      return Pokemon.findAndCountAll({ 
        where: { 
        // va chercher 2 infos en bdd: nombre total et résultats demandés
          name: { 
            [Op.like]: `%${name}%` 
          }
        },
        order: ['name'],
        // nous passons un tableau contenant deux informations: la prop du models Sequelize, sur laquelle on souhaite ordonner les résultats et l'ordre croissant ou décroissant, par défaut croissant
        limit: limitUser
      })
      .then(({count, rows}) => {
        const message =  `Il ya ${count} pokémons qui correpondent au terme de la recherche ${name}`;
        res.json({ message, data: rows});
      })
      // on récupère les deux informations retournées par la méthode. Paramètres imposés par findAndCountAll, on récupère donc les var count et rows à la place de pokémons.
    } else {
    Pokemon.findAll({ order: ['name'] })
    // findAll retourne une promesse = requête que Sequelize va effectuer à la bdd => échoue ou réussit
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons });
      })
      .catch(error => {
        const message = "La liste des pokémons n'a pas pu être chargée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error});
      });
      // interception des erreurs avec la méthode catch des promesses de JS. Une fois capturée il reste à retourner un message d'erreur 
    }
  })
}
