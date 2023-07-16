# API NodeJS  applicationAngular

Développement d'une API REST avec NodeJS, Express, Sequelize et ajout d'une application en Angular.

Réadaptation du cours d'Udemy, avec création d'un endpoint create user.

Création dossier source, et du fichier qui sera le point d'entrée de l' API REST = app.js
npm init => mise en place package.json pour démarrer le projet en NodeJS.

Dossier, fichier point entrée de l'application = App.js.

Terminal, exécution => node APP.js

Pour démarrer un projet Node.js ou js, il est nécessaire de mettre en place un fichier **package.json** (rapide description du projet, et liste des dépendances de l'appli, et des dépendances des dépendances. On peut égelment y mettre en place des scripts pour  simplifier et automatiser des tâches).
=> soit à la main, soit avec une commande npm = **npm init**.
Dans le fichier, remplacer test par start dans scripts, et enlever echo => node app.js.
Puis npm run start => script appelle node app.js et démarre projet.

### Ajout des dépendances

Pour API REST:
**Express. js = framework pour créer des API REST avec Node.js.**
=> installation:
npm install express --save
npm télécharge express, dans dossier node modules.
npm regarde package.json mais de la librairie express, car paquet js qui a lui même ses dépendances.

--save afin de déclarer express dans les dépendances, et non juste en local sur machine via node modules.

création gitignoe

déf port code etc

trad en anglais


Envoie d'une requête get via API REST, et a retourné une réponse:

    const express = require('express');
    //  Récupération du paquet express dans code avec require => récup dépendance dans node modules
    const app = express();
    // serveur web sur lequel fonctionnera notre API REST
    const port = 3000 ;
    // port sur lequel nous allons démarrer notre API REST par la suite

    app.get('/', (req, res) => res.send('Hello express'));
    // déf du premier endpoint, coeur d'express. 
    // Chaque élément est important pour définir un point de terminaison:
    // 1- coeur de la requête: get, prend 2 arguments en param => le chemin de la requête, chemin de la route qui va permettre de traiter ce point de terminaison (ici route par défaut) et => fonction qui fournit une réponse à notre client quand point de terminaison est appelé, cette fonction prend également 2 arguments req = récupération de l'objet request qui correspond à la requête reçue en entrée par notre point de terminaison, et res = response objet à renvoyer depuis express au client.
    // Ici on utilise méthode send de l'objet response pour renvoyer le msg

    app.listen(port, () => console.log(`Notre appli Node est démarrée sur : http://localhost: ${port}`));
    // démarre API REST sur port 3000

Lancement de l'API REST avec:
npm run start

En cas de changement de code, il faut couper la commande npm start et relancer, et rafraîchir le navigateur. Il faut y remédier.*


#### Installation nodemon

**npm install nodemon --save -dev => il existe deux types de dépendances: dépendances du projet dans dependencies, --save et dependencies du projet pendant le développement, devDependencies, comme nodemon.Une fois l'application déployée, elle n'aura pas à être relancée.**

Il faut mettre à jour le script de démarrage: nodemon app.js.

npm run start

**Accès navigateur: localhost:3000**

>C'est quoi un serveur localhost ? Qu'est-ce que Localhost ? Et comment cela s'applique à ... Dans le réseau informatique, « localhost » fait référence à l'ordinateur sur lequel un certain programme est en cours d'exécution. Par exemple, si vous exécutez un programme sur votre propre ordinateur (comme un navigateur Web ou un environnement de développement Web local), alors votre ordinateur est le « localhost ».


import des modules
moragn
bodyparser
sequelize
favicon

Mise en place de HTTPS
Comme dit dans le précédent article, la première étape de la sécurisation d’une API REST est l’utilisation du protocole HTTPS. Pour cela, il nous faut obtenir un certificat SSL.

Plusieurs solutions s’offrent à nous :

Obtenir notre certificat SSL auprès d’une autorité de certification (pensez à Let’s Encrypt qui est gratuit);
Générer un certificat auto signé.
Pour cet article, nous allons générer un certificat auto signé.

Pour une mise en production, utiliser toujours un certificat obtenu auprès d’une autorité de certification.

Générer un certificat auto signé
Afin de générer notre certificat auto signé, nous avons besoin de OpenSLL et de lancer cette ligne de commande : 

Création du certificat SSL
openssl req -nodes -new -x509 -keyout server.key -out server.cert
Nous obtenons deux fichiers :

server.key qui contient la clé privée;
server.cert qui contient le certificat.
Création du serveur HTTPS
Il nous faut maintenant créer notre serveur HTTPS :

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
 
/* On créer notre application Express */
const app = express();
 
/* On récupère notre clé privée et notre certificat (ici ils se trouvent dans le dossier certificate) */
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));
 
const options = { key, cert };
 
/* Puis on créer notre serveur HTTPS */
https.createServer(options, app).listen(8080, () => {
  console.log('App is running ! Go to https://localhost:8080');
});
Voilà c’était simple non ? Notre serveur utilise maintenant le protocole HTTPS.

Il existe également une autre solution possible qui consiste à déporter la responsabilité de la communication HTTPS entre le client et le serveur à ce qu’on appelle un “reverse proxy“.

Un reverse proxy ? C’est quoi ?
Voyons la définition de notre cher Wikipédia :

Un proxy inverse (reverse proxy) est un type de serveur, habituellement placé en frontal de serveurs web. Contrairement au serveur proxy qui permet à un utilisateur d’accéder au réseau Internet, le proxy inverse permet à un utilisateur d’Internet d’accéder à des serveurs internes.

HTTPS://FR.WIKIPEDIA.ORG/WIKI/PROXY_INVERSE
Bon, pour une fois c’est assez clair, le reverse proxy permet simplement de faire l’intermédiaire entre vos serveurs internes et un client.

 

Principe d'un reverse proxy
Principe d’un reverse proxy

Il existe plusieurs solutions de reverse proxy sur le marché comme HAProxy ou encore Traefik , mais la plus connue d’entre elles est nginx. Voyons rapidement comment la mettre en place.

Mise en place de nginx
Tout d’abord, commençons par l’installation de nginx:

sudo apt-get install nginx
Une fois installé, il nous faut créer un fichier contenant notre “server block” qui est l’équivalent des virtual hosts d’Apache :

sudo vim /etc/nginx/sites-available/www.example.com.conf
Voici le contenu du fichier :

upstream mon_api{
    server localhost:8080;
}
 
server {
    listen       443 ssl http2;
    listen [::]:443 ssl http2;
    server_name  example.com www.example.com;
 
    ssl_certificate      path/server.cert;
    ssl_certificate_key  path/server.key;
    location / {
      proxy_pass http://mon_api;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
}
Pensez à modifier l’adresse et le port de votre API, votre nom de domaine, ainsi que le chemin d’accès de votre certificat et de votre clé privée.

Activons ensuite notre “server block” :

sudo ln -s /etc/nginx/sites-available/www.example.com.conf /etc/nginx/sites-enabled/www.example.com.conf
Pour terminer, redémarrons notre serveur nginx :

sudo systemctl reload nginx
Votre API est maintenant accessible en HTTPS via votre nom de domaine.

Authentification via JWT
Pour commencer, il nous faut une route permettant aux utilisateurs de se connecter et récupérer un JWT. Nous aurons besoin de la librairie jsonwebtoken pour créer nos JWT :

npm install --save jsonwebtoken
Créons ensuite notre route de connexion :

const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('./models');
const config = require('./config');
 
app.post('/login', async (req, res, next) => {
  try {
    /* 1. On récupère le nom d'utilisateur et le mot de passe dans la requête */
    const { username, password } = req.body;
 
    /* 2. On envoie une erreur au client si le paramètre username est manquant */
    if (!username) {
      return res.status(400).json({ message: 'missing_required_parameter', info: 'username' });
    }
    /* 3. On envoie une erreur au client si le paramètre password est manquant */
    if (!password) {
      return res.status(400).json({ message: 'missing_required_parameter', info: 'password' });
    }
 
    /* 4. On authentifie l'utilisateur */
    const user = await User.authenticate(username, password);
 
    /* 5. On envoie une erreur au client si les informations de connexion sont erronées */
    if (!user) {
      return res.status(401).json({
        message: 'Username or password is incorrect'
      });
    }
 
    /* 6. On créer le JWT */
    const accessToken = jwt.sign(
      { firstName: user.firstName, lastName: user.lastName },
      config.accessToken.secret,
      {
        algorithm: config.accessToken.algorithm,
        audience: config.accessToken.audience,
        expiresIn: config.accessToken.expiresIn / 1000,
        issuer: config.accessToken.issuer,
        subject: user.id.toString()
      }
    );
 
    /* 7. On créer le refresh token et on le stocke en BDD */
    const refreshToken = crypto.randomBytes(128).toString('base64');
 
    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: Date.now() + config.refreshToken.expiresIn
    });
 
    /* 7. On envoie au client le JWT et le refresh token */
    return res.json({
      accessToken,
      tokenType: config.accessToken.type,
      accessTokenExpiresIn: config.accessToken.expiresIn,
      refreshToken,
      refreshTokenExpiresIn: config.refreshToken.expiresIn
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});
L’étape suivante est de sécuriser nos routes pour permettre uniquement aux utilisateurs authentifiés d’y accéder. Imaginons que nous ayons la route suivante :

app.get('/anything', (req, res) => {
  let data;
  /* récupération de données ... */
  res.json(data);
});
Comment protéger celle-ci à l’aide d’un JWT ? et bien nous allons utiliser un middleware.

Hey dis donc Jamy, c’est quoi un middleware ?
Un middleware est simplement une fonction permettant d’effectuer un traitement avant celui défini par les routes. Il possible de créer ce qu’on appelle une chaîne de middleware ou pipeline comme nous le montre le schéma suivant :

 

Chaîne de middleware Express
Chaîne de middleware

Chaque middleware, une fois son traitement terminé, peut soit faire appel au middleware suivant ou stopper la chaîne et envoyer une réponse au client.

La signature d’une fonction middleware est la suivante :

function(req, res, next) { /* ... */ }
req : La requête HTTP du client;
res: La réponse HTTP à envoyer au client;
next: Un callback vers le prochain middleware;
Il existe un autre type de middleware permettant de traiter les erreurs qui possède la signature suivante :

function(err, req, res, next) { /* ... */ }
Celui-ci peut être appelé en passant l’erreur en paramètre de la fonction next .

Middleware d’authentification
Revenons à nos moutons ! Voyons maintenant comment créer un middleware permettant de gérer l’authentification via les JWT et de renvoyer une erreur au client si l’authentification échoue.

Comme nous l’avons vu précédemment, un middleware permet d’accéder à la requête HTTP du client, nous devons donc récupérer le JWT présent dans les en-têtes de celle-ci, vérifier que celui-ci est valide et qu’il est bien associé à un utilisateur présent dans notre base de données :

Middleware d'authentification
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const { secret, algorithm } = require('./config');
 
async function auth(req, res, next) {
  try {
    const { headers } = req;
    /* 1. On vérifie que le header Authorization est présent dans la requête */
    if (!headers || !headers.authorization) {
      return res.status(401).json({
        message: 'Missing Authorization header'
      });
    }
 
    /* 2. On vérifie que le header Authorization contient bien le token */
    const [scheme, token] = headers.authorization.split(' ');
 
    if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
      return res.status(401).json({
        message: 'Header format is Authorization: Bearer token'
      });
    }
 
    /* 3. On vérifie et décode le token à l'aide du secret et de l'algorithme utilisé pour le générer */
    const decodedToken = jwt.verify(token, secret, {
      algorithms: algorithm
    });
 
    /* 4. On vérifie que l'utilisateur existe bien dans notre base de données */
    const userId = decodedToken.sub;
    const user = await User.findOne({ where: { id: userId } });
 
    if (!user) {
      return res.status(401).json({
        message: `User ${userId} not exists`
      });
    }
 
    /* 5. On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
    req.user = user;
 
    /* 7. On appelle le prochain middleware */
    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
}
Protégeons ensuite notre route. Pour cela il suffit d’appeler notre middleware juste avant le “handler” de notre route :

app.get('/anything', auth, (req, res) => {
  let data;
  /* récupération de données ... */
 
  res.json(data);
});
Notre route est maintenant protégée ! Rien de bien compliqué.

On a fini ?
Oui c’est terminé, ce n’était pas la mer à boire hein ? Comme je l’ai dit en introduction le but de l’article n’était pas de vous montrer comment créer une application Express de A à Z, mais de se concentrer sur la mise en place du protocole HTTPS et de la sécurisation de nos routes à l’aide de JWT. Certaines parties n’ont donc pas été présentées notamment celles concernant l’interaction avec la base de données ou encore la connexion d’un utilisateur et la génération d’un JWT associé, c’est pourquoi j’ai créé un projet complet sur github. N’hésitez surtout pas à aller voir et me poser des questions si besoin.

Des middlewares permettant de gérer l’authentification via JWT existent, comme par exemple express-jwt ou encore passport-jwt je vous invite grandement à aller y jeter un coup d’œil, la curiosité est la meilleure des qualités pour un développeur.

J’ai dit dans la première partie qu’il était également possible de protéger son API à l’aide d’une clé d’API donc pour celles et ceux que ça intéresse, j’ai écrit un middleware disponible sur github. 

Bon, on a pas encore fini avec la sécurité d’une API REST, il y aura une partie 3 à cet article qui portera sur le stockage des JWT notamment coté front cela parlera de failles XSS et CSRF je n’en dis pas plus… par contre je ne sais pas encore pour quand c’est prévu, mais promis pas dans 2 ans ! Entre-temps d’autres articles arriveront. On se retrouve bientôt ! 

https://www.codeheroes.fr/2018/03/23/securiser-une-api-rest/
https://www.sitepoint.com/how-to-use-ssltls-with-node-js/

npm install openssl-nodejs

https://www.npmjs.com/package/openssl-nodejs


