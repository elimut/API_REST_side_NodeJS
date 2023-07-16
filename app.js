// Retrieving the Express package using require
// Récupération du paquet express dans code avec require => récup dépendance dans node modules
const express = require('express');
const morgan = require('morgan');
// import morgan et utilisation à la place du logger,utilisation dans le code
const favicon = require ('serve-favicon');
// dépendance favicon
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
// récup par module sequelize

// Creating an instance of the Express application
// Serveur web sur lequel fonctionnera notre API REST
const app = express();
// Port sur lequel nous allons démarrer notre API REST par la suite
// Port on which we will start our REST API later
const port = 3000 ;

app
    .use(favicon(__dirname + '/favicon.ico'))                                                                                                                           
    .use(morgan('dev'))
    .use(bodyParser.json());
// combi des middleware, bien télécharger favicon
// appel de la méthode use autant de fois que l'on a de middlewares à implémenter
// on peut les chaîner les uns à la suite des autres afin d'établir un ordre en eux
// __dirname est une variable d'environnement qui vous indique le chemin absolu du répertoire contenant le fichier en cours d'exécution.

sequelize.initDb();

// endpoints:
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);
require('./src/routes/createUser')(app);


// Ajout de la gestion des erreurs: express intercepte toutes les demandes du client qui ne correspondent pas à une route déclarée précedemment.
// Add error handling: express intercepts all client requests that don't match a previously declared route.
app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.";
    res.status(404).json({message});
    // méthode status d'express pour définir un statut à notre réponse. param code statut HTTP à retourner à nos clients. endpoint qui n'existent pas
})


// démarre API REST sur port 3000
// Starting the server and listening on a specified port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
