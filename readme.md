# Todolist - Explication du code

## Choix et décisions

### Structure du composant TodoPage
J'ai choisi de regrouper toute la logique de la todolist dans un seul composant `TodoPage`. Bien que cela puisse sembler un peu monolithique, cela permet de garder une vision d'ensemble du fonctionnement de l'application et de faciliter la maintenance à long terme.

### Gestion de l'état
J'ai utilisé les hooks `useState` et `useEffect` pour gérer l'état de l'application. Le `useState` permet de stocker les tâches, la tâche en cours d'édition et le nom de la nouvelle tâche. Le `useEffect` permet de récupérer les tâches lors du montage du composant.

### Implémentation des fonctionnalités
Pour l'implémentation des fonctionnalités de suppression, d'édition et d'ajout de tâches, j'ai choisi d'utiliser les requêtes HTTP correspondantes (DELETE, PATCH et POST) sur l'API. Après chaque opération, j'appelle la fonction `handleFetchTasks` pour rafraîchir la liste des tâches.

### Gestion de l'édition
Pour la fonctionnalité d'édition, j'ai choisi de mettre en place un état `editingTask` qui permet de suivre la tâche en cours d'édition. Cela permet d'afficher un champ de texte éditable pour cette tâche spécifique.

## Points de blocage rencontrés

### Mise à jour de la tâche en cours d'édition
Au début, j'avais des problèmes pour mettre à jour la tâche en cours d'édition, car je ne mettais pas à jour correctement l'état `editingTask`. J'ai résolu ce problème en ajoutant une fonction `handleTaskNameChange` qui met à jour cet état à chaque modification du champ de texte.

### Désactivation du bouton d'enregistrement
Une autre difficulté a été de désactiver le bouton d'enregistrement lorsque le nom de la tâche n'a pas changé. J'ai résolu ce problème en vérifiant la valeur de `editingTask.name` avant d'autoriser l'enregistrement.

### Mise à jour de l'état des tâches
Initialement, je mettais à jour l'état des tâches (terminées/non terminées) en appelant à nouveau l'API. Cependant, j'ai pu optimiser cette fonctionnalité en mettant à jour directement l'état local des tâches sans passer par l'API.

Dans l'ensemble, le développement de cette todolist m'a permis de mettre en pratique mes connaissances en React, TypeScript et Material-UI, tout en rencontrant quelques défis techniques que j'ai pu résoudre au fur et à mesure.