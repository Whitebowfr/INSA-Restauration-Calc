# Calculateur de restauration INSA
Hello à toi !
Si tu es arrivé ici c'est que tu devais soit bien te faire chier, soit que tu es intéressé par le fonctionnement du site (ou les deux). Viens, je vais te montrer comment il fonctionne (comme ça tu pourra m'aider si tu le souhaite !)

## Setup
Comment faire pour lancer le site sur ton pc perso ?
#### 1. Téléchargement et installation
Tout d'abord, il te faudra Git (ou alors tu peux télécharger le code mais c'est moins propre). Je vais supposer que tu sais utiliser git, si c'est pas le cas il y a plein de tutos sur Internet pour bien démarrer. Il te faudra aussi NodeJS, la dernière version si possible, en soit je pense que ça marchera à partir de v14.
Une fois le code sur ton PC, tu peux lancer 
`npm install`
pour télécharger tous les packages utilisés (le plus gros étant material-icons, je verrais si je peux pas le réduire parce qu'il est pas très utile)
#### 2. Lancement
Une fois ici, tu peux simplement écrire 
`npm run start`
Et l'application se lancera toute seule ! Le site sera accessible sur `localhost:3000`. C'est beau quand même.
Et voilà ! tu peux maintenant modifier le code à ta guise, et voir tes changements en direct.
Je vais maintenant passer au code en lui-même, pour t'expliquer rapidement comment le projet est structuré.

## Structure
Le site est basé sur une unique page, qui est updaté dynamiquement à l'aide de React.
Elle est séparée en 4 blocs principaux, que tu peut voir dans `./src/App.js` :

#### Blocs
* `./src/DataSelection` : c'est là où la plupart des entrées vont être situées, c'est à dire celle de l'argent restant, du menu, des vacances, et des jours de la semaine.
Elle n'a besoin comme paramètre que des heures sélectionnées, car pour une quelconque raison c'est elle qui va calculer le nombre de repas dans le mois. Maintenant que je le vois c'est pas très opti, il faudrait tout offload à un fichier supérieur, et laisser ce module en étant seulement un module d'input.
C'est le plus complexe, on y reviendra plus tard.
* `./src/HoursSelection` : C'est là que l'utilisateur va pouvoir choisir les heures de ses repas. Celui là c'est un input pur.
* `./src/DataDisplay` : C'est le tableau qui va afficher le nombre de repas, le prix de chacun, et surtout, le montant restant ! C'est un output pur.
* `./src/About` : C'est uniquement un bouton affichant un texte, rien de spécial là dessus.

#### Utils
Il y a aussi un dossier `./src/utils`, c'est là dedans qu'on va trouver différentes fonctions utilisées un peu partout. Dans `calendar.js`, on va trouver toutes les fonctions liées aux dates, comme par exemple celle pour détecter les vacances, compter le nombre de jours etc. Elles sont un peu documentées.
`localStorage.js` contient un module utilisé dans tous les input du site, il permet de stocker automatiquement les entrées de l'utilisateur dans le localStorage, et de les récupérer à chaque render.
`overflowcalc.js` contient quelques fonctions pour récupérer des exemples d'utilisation de l'argent en trop (ou qu'il manque !) sous forme de texte propre.
`pricesCalc.js` permet de récupérer les prix par défaut et le solde par mois.

#### DataSelection
C'est la classe la plus compliquée. Paradoxalement, `DataSelection.js` est très simple, il permet juste de rassembler les différentes infos des input avant de les transmettre à `App.js`.
- `MenuSelection.js` : De même, rien de spécial, un `Select`. Il inclus la checkbox pour les vacances aussi pour je ne sais quelle raison. Aucun traitement n'est fait ici, il fait tout passer direct à `DataSelection.js`
- `MoneyInput.js` : Rien de bien compliqué, à part le fait qu'il doive savoir quand changer l'argent total par l'argent de début de mois.
- `MealSelection.js` : C'est là que ça se complique. En effet, c'est lui qui fait tous les calculs sur le nombre de repas dans la semaine. Il est compliqué mais compréhensible (je crois).


C'est à peu près tout ce qu'il y a comme code là dedans, si tu a encore des questions hésite pas à me contacter sur discord : **Whitebow#0749**
Et surtout, hésite pas à mettre un pull request si tu fais un truc dessus !!
