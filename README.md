# Test technique TARAM

## Description

Système de gestion de contenus éditoriaux avec un back-office d’administration et un système de notifications par email.  
Développé dans le cadre du test technique TARAM Group.

---

## Prérequis

- Node.js v18+
- pnpm

Installation de pnpm :

````bash
npm install -g pnpm

## Installation

### Backend

```bash
cd server
cp .env.example .env
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm db:seed
````

### Frontend

```bash
cd client
pnpm install
```

## Lancement

### Backend (port 3001)

```bash
cd server
pnpm dev
```

### Frontend (port 5173)

```bash
cd client
pnpm dev
```

## Tests

```bash
cd server
pnpm test
```

L'application est accessible sur http://localhost:5173

Variables d'environnement

Copier server/.env.example vers server/.env :

PORT=3001
DATABASE_URL="file:./dev.db"

Choix techniques

Architecture

- Backend : Express + TypeScript + Prisma ORM + SQLite + architecture MVC (controllers /
  services / routes) pour une séparation claire des responsabilités
- Frontend : React + Vite + TypeScript + shadcn/ui + Tailwind CSS, composants réutilisables

## Choix technologiques

- **Prisma + SQLite** : ORM type-safe, base de données légère, zéro configuration serveur.
- **React Query** : Gestion du cache serveur, états loading/error/success et invalidation cache automatique.
- **Zod (v4)** : Validation côté serveur avec inférence automatique des types TypeScript.
- **shadcn/ui** : Composants accessibles, modernes et facilement personnalisables.
- **Recharts** : Création des graphiques du dashboard.
- **Sonner** : Notifications toast pour le feedback utilisateur.
- **Zustand** : State management léger. Contrairement à Redux, il ne repose pas sur un Provider; le store est accessible n'importe où via des hooks.

  Compromis (limites de temps)
  - Authentification et permissions (admin vs éditeur) non implémentées
  - Pas d'éditeur de texte riche (textarea simple)
  - Tri des colonnes du tableau non implémenté

  Dashboard
  - ✅ Statistiques (total, publiés, brouillons, mis en avant)
  - ✅ Graphique de répartition par catégorie
  - ✅ 5 derniers articles publiés
  - ✅ Dernières notifications envoyées

  Gestion des articles
  - ✅ CRUD complet (création, édition, suppression)
  - ✅ Prévisualisation en temps réel à côté du formulaire
  - ✅ Filtrage multi-critères (statut, catégorie, réseau, mis en avant)
  - ✅ Recherche en temps réel sur titre et contenu
  - ✅ Pagination (20 items/page)
  - ✅ Actions rapides (éditer, supprimer, archiver, mettre en avant)
  - ✅ Changement de statut en masse (sélection multiple)
  - ✅ Auto-sauvegarde toutes les 30 secondes (édition)
  - ✅ Indication visuelle des modifications non enregistrées
  - ✅ Dialogue de confirmation avant suppression
  - ✅ Validation en temps réel (titre min 5 car., contenu min 50 car.)

Gestion des catégories

- ✅ Liste avec couleurs visuelles et compteur d'articles
- ✅ Création / édition / suppression
- ✅ Suppression bloquée si catégorie utilisée (erreur 409)
- ✅ Dialogue de confirmation avant suppression

Module de notifications

- ✅ Formulaire d'envoi (sélection article, destinataires, sujet pré-rempli)
- ✅ Prévisualisation de l'email HTML généré
- ✅ Historique (article, nombre de destinataires, date, statut envoyé/échoué)

Import de données

- ✅ Interface d'upload de fichier JSON
- ✅ Affichage du résultat (succès/erreurs par ligne)
- ✅ Résolution automatique catégories/réseaux par nom

Autres

- ✅ Validation des données (Zod côté serveur)
- ✅ Gestion des états de chargement et erreurs
- ✅ TypeScript strict (front + back)
- ✅ Données de démonstration (12 articles, 4 catégories, 3 réseaux, 3 notifications)

## Améliorations possibles (avec plus de temps)

- Gestion des permissions (admin vs éditeur) avec middleware d’autorisation.
- Intégration d’un éditeur de texte riche (TipTap ou Lexical).
- Tri des colonnes du tableau.
- Tests end-to-end avec Playwright.
- Code splitting et lazy loading des pages.
- Responsive design plus avancé.
- Bloquer la sauvegarde d'article si les conditions de validation ne sont pas remplies

## Tests

```bash
cd server
pnpm test
```

Tests unitaires sur les services backend :

- Filtrage des articles par statut.
- Calcul des statistiques.
- Suppression d’une catégorie protégée (erreur 409).
- Gestion des erreurs 404. Données de démonstration

Le seed pré-charge :

- 4 catégories : Technologie, Business, Design, Marketing
- 3 réseaux : TARAM France, TARAM Europe, TARAM International
- 12 articles (6 publiés, 3 brouillons, 3 archivés, 2 mis en avant)
- 3 notifications (2 envoyées, 1 échouée)

## Format d’import JSON attendu

```json
[
  {
    "title": "Titre de l'article",
    "content": "Contenu de l'article (minimum 50 caractères)...",
    "excerpt": "Résumé",
    "author": "Nom de l'auteur",
    "category": "nom-categorie",
    "network": "TARAM France"
  }
]
```

## Difficultés rencontrées

- **Prisma avec libSQL** : Initialement, j'ai utilisé la mauvaise bibliothèque pour configurer Prisma avec SQLite. L’utilisation de `@prisma/adapter-libsql` est nécessaire pour SQLite, ce qui ajoute une étape `prisma generate` avant les migrations.
- **React 19** : React impose désormais une gestion plus stricte des effets avec `useEffect`. Sur certaines fonctionnalités, notamment la page de création d’article, il a fallu explorer la documentation pour gérer correctement l’état et optimiser les performances.
- **Types avec React Query** : Le callback `onError` des mutations typait le paramètre en `Error`. Il a été nécessaire de caster en `AxiosError` pour accéder correctement à la réponse de l’API.

## Outil IA utilisé / Assistance

Assistance IA : **GitHub Copilot**.
