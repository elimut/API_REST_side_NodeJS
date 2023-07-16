const validTypes = ['Plante', 'Poison', 'Vol', 'Feu', 'Eau', 'Insecte', 'Electrik', 'Normal', 'Fée'];
// tableau des types valides validator

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        // export  fonction de deux param: sequelize = objet représente la co à la bdd pour Sequelize, cet objet possède une propriété define qui permet de déclarer un nouveau models auprès de sequelize et datatypes = définit les types de données de chaque propriétés du models ex: name => string
        // return => retourne directement résultat méthode define. define retourne le nouveau models déclaré auprès de Sequelize, il pourra être utilisé ailleurs grâce à l'export.
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        // unicité de chaque objet, onn va pouvoir retirer getUniqueId de helper cqar c'est le rôle de la bdd de garantir l'unicité de l'id
      },
        //   la propriété define prend elle même 3 param, afin de mettre en place un nouveau models. Sequelize se base sur les models que nous déclarons pour construire les tables dans la bdd sql par la suite.
        // param: nom du models création de la table Pokemon (l2),avec un s par la suite. Puis, description du models, on décrit toutes les prop du modèle qui seront traduit en colonne dans la table. Pour chaque prop: un nom, un objt de config pour param le titre et le caracr obligatoire ou non de la prop. Le 3 ème param = est une option de param global. Facultatif pêrmet d'ajouter une config plus globale à notre model. Sequelize génère deux prop par défaut indépendamment des champs renseignés => createdAt date créa nouveau modèle et updatedAt date de modif d'une instance, mais l'on peut les modifier.
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // facultatif ou non?
        unique: {
          msg: `Le nom est déjà pris`
        },
        // contrainte d'unicité
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide."},
          notNull: {msg: "Le nom est une propriété requise."}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers."},
          notNull: {msg: "Les points de vie sont une propriété requise."},
          // déf de deux validateurs pour vérifier que le champ des points de vie est bien un nombre entier et le champ des pv n'est pas null grâce au validateur notNull avec message spécifique pour chaque validateur 
          min: {
            args: [0],
            // tableau pour délimiter la longueur => particularité de la syntaxe de Sequelize
            msg: "Les points de vie ne doivent pas être inférieur à 0."
          },
          max: {
            args: [999],
            msg: "Les points de vie ne doivent pas être supérieur à 999."
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement des nombres entiers."},
          notNull: {msg: "Les points de dégâts sont une propriété requise."},
          min: {
            args: [0],
            msg: "Les points de dégâts ne doivent pas être inférieur à 0."
          },
          max: {
            args: [999],
            msg: "Les points de dégâts ne doivent pas être supérieur à 999."
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilisez uniquement une URL valide pour l'image."},
          notNull: {msg: "Les URL sont une propriété requise."}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(',');
        },
        // à chaque fois que l'on récupère les types dans le code js, sequelize fournit: la valeur contenue dans la bdd soit la chaîne de carac. split on obtient [,]
        set(types){
          this.setDataValue('types', types.join());
        // inverse du getter transfo du tab de types de pokemon en chaine de caractère unique => sequelize.js
        },
        validate: {
          isTypesValid(value) {
            // définition d'une fonction isTypesValid => validateur avec un nom arbitraire que l'on a donné. Prend en pramètre la valeur value = valeur de la propriété types contenue en BDD sans prendre en compte le getter ou le setter de la propriété, on reçoit une valeur de typer x, y sous la forme de la chaîne de caractère et non sous forme d'un tableau.  
            if(!value) {
              throw new Error("Un pokémon doit avoir au moins un type.");
              // levée de l'erreur avec throw new Error
            }
            if(value.split(',').length > 3) {
              throw new Error("Un pokémon ne peut avoir plus de trois types.");
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d\'un pokémon doit appartenir à la liste suivante: ${validTypes}`);
              }
            // On est obligé de réappliquer le traitement du getter avec la méthode split() car Sequelize nous transmet la valeur brute aux niveaux des validateurs personnalisés = c'est à dire la donnée qui vient directement de la base de données SQL.
            });
          }
        }
      }
    }, {
      timestamps: true,
    // indique que nous souhaitons modifier le cpmt par défaut
      createdAt: 'created',
      updatedAt: false
    //   option de param global
    })
  }