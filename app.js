 // Retrieving the Express package using require
// Récupération du paquet express dans code avec require => récup dépendance dans node modules
const express = require('express');
const favicon = require ('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');
const cors = require('cors');
// create server https:
const fs = require('fs');
const path = require('path');
const https = require('https');

// Creating an instance of the Express application
// Serveur web sur lequel fonctionnera notre API REST
const app = express();
// Port sur lequel nous allons démarrer notre API REST par la suite. En local port = 3000car porcess.env.port vaut undefined, sur Heroku, aura la valeur attribuée dynamiquement par Herokusur l'environnement de prod.
// Port on which we will start our REST API later
const port = process.env.PORT || 3000;
/* On récupère notre clé privée et notre certificat (ici ils se trouvent dans le dossier certificate) */
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));

const options = { key, cert };

app
    .use(favicon(__dirname + '/favicon.ico'))                                                                                                                           
    .use(cors())
    .use(bodyParser.json());
// combi des middleware, bien télécharger favicon
// appel de la méthode use autant de fois que l'on a de middlewares à implémenter
// on peut les chaîner les uns à la suite des autres afin d'établir un ordre en eux
// __dirname est une variable d'environnement qui vous indique le chemin absolu du répertoire contenant le fichier en cours d'exécution.

sequelize.initDb();

// endpoints:
app.get('/', (req, res) =>{
  res.json('Hello, Heroku!');
})
// test déploiement hors BDD. Pas de fichier spé car code temporaire.
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
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

