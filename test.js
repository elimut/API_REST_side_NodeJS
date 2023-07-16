
console.log(process.env);
// accès à l'ensemble des variables d'env en passant par l'objet global process. Fourni directement par NodeJs. node test.js
console.log(process.env.PORT);
// Accès à une variable spécifique => undefined, la var d'env port n'est pas définie sur l'ordi. Cependant les plateformes d'hébergement comme Heroku utilisent  ette variable port pour démarrer notre serveur NodeJs en production