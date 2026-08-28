# Documentation du projet Izi Facture

Ce document a été généré pour résumer l'état actuel de l'application "Izi Facture", sa structure, ses technologies et pour servir de point de repère aux futurs modèles IA qui travailleront sur cette base de code.

## 📌 Ce que l'application fait
**Izi Facture** est une application web moderne de gestion de facturation et de suivi de la relation client, conçue pour les entreprises ou les indépendants. Elle permet de suivre les indicateurs financiers clés, de gérer des clients, et d'organiser les factures de la création jusqu'au paiement.

## 🚀 Fonctionnalités implémentées
- **Tableau de bord (Dashboard)** : Présente des indicateurs clés (KPIs) de performance comme les montants en retard, les prochaines échéances, le délai moyen de paiement, et l'argent disponible.
- **Gestion des factures** :
  - Liste interactive des factures.
  - Recherche par client ou par numéro de facture.
  - Filtrage rapide selon le statut (Toutes, Brouillons, Envoyées, Payées, En retard).
  - Affichage de l'état avec des badges de statut visuels.
- **Gestion des clients** :
  - Annuaire des clients présentés sous forme de cartes.
  - Recherche en temps réel.
  - Modal de création d'un nouveau client (actuellement géré de manière locale/simulée).

## 📂 Structure des fichiers
```text
d:\Izi Facture\
├── package.json
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── (app)/                  # Groupe de routes principal
│   │   │   ├── clients/page.tsx    # Page de la liste des clients
│   │   │   ├── factures/page.tsx   # Page de la liste des factures
│   │   │   ├── parametres/         # Page des paramètres
│   │   │   ├── tableau-de-bord/    # Page d'accueil / Dashboard
│   │   │   └── layout.tsx          # Mise en page du groupe (app)
│   │   ├── globals.css             # Variables CSS et styles globaux
│   │   ├── layout.tsx              # Layout racine (Root Layout)
│   │   └── page.tsx                # Point d'entrée
│   ├── components/
│   │   ├── dashboard/              # Composants pour le tableau de bord (StatTile, UnpaidPanel)
│   │   ├── layout/                 # Composants structurels de mise en page
│   │   ├── providers/              # Fournisseurs de contexte (AppProvider)
│   │   └── ui/                     # Composants réutilisables (InvoiceStatusBadge, Money)
│   └── lib/
│       ├── data/fixtures.ts        # Données factices pour simuler une base de données
│       ├── format.ts               # Utilitaires de formatage (dates, monnaie)
│       └── utils.ts                # Utilitaires généraux (clsx, tailwind-merge)
```

## 🛠️ Technologies utilisées
- **Framework Core** : [Next.js 14](https://nextjs.org/) (Utilisation de l'App Router)
- **Librairie UI** : [React 18](https://react.dev/)
- **Stylisation** : [Tailwind CSS](https://tailwindcss.com/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Visualisation de données** : [Recharts](https://recharts.org/)
- **Utilitaires** : `date-fns` (manipulation des dates), `clsx` et `tailwind-merge` (fusion des classes Tailwind).
- **Langage** : [TypeScript](https://www.typescriptlang.org/)

## 🎨 Décisions de design et d'architecture
1. **App Router & Server/Client Components** : Utilisation du dernier standard Next.js (dossier `app/`). Plusieurs pages interactives utilisent la directive `"use client"` car elles ont besoin d'interagir avec le state global de l'application pour le filtrage et la recherche.
2. **Gestion d'État Mockée** : Dans l'attente d'une véritable base de données, l'état global et les opérations (ajout, lecture) sont gérés par un `AppProvider` (React Context) initialisé avec des données situées dans `lib/data/fixtures.ts`.
3. **Design System** : Utilisation d'un système de classes personnalisé étendant Tailwind (ex: `.rounded-card`, `.bg-surface`, `.text-ink`, `.text-muted`) pour assurer une cohérence visuelle élégante.
4. **Devise** : La devise par défaut semble être le Franc CFA (XOF), comme vu dans le formatage des montants de la page factures.

## 🤖 Instructions pour le futur modèle IA
Si vous (un autre modèle IA) êtes amené à travailler sur ce projet à l'avenir, veuillez suivre ces consignes :

1. **Intégration d'un Backend/Base de données** :
   - C'est la prochaine grande étape. L'`AppProvider` devra être progressivement remplacé par des composants serveurs (Server Components) pour la récupération de données (fetching), et par des Server Actions ou API Routes pour les mutations (ex: ajout d'un client).
   - Veillez à conserver la structure TypeScript des modèles (comme `Client` ou l'équivalent pour les factures) lors du passage à un ORM comme Prisma.
2. **Style et UI** :
   - Respectez les variables CSS définies dans `src/app/globals.css`.
   - Lors de la création de nouveaux composants UI, utilisez les utilitaires présents dans `src/lib/utils.ts` (comme `cn` ou la fusion de `clsx/twMerge`) pour gérer dynamiquement les classes Tailwind.
   - Ne créez pas de styles en dur si une variable CSS sémantique (`text-ink`, `bg-surface`, `border-border`) existe déjà.
3. **Architecture des composants** :
   - Isolez la logique complexe en créant de nouveaux composants dans `src/components/ui/` ou des sous-dossiers spécifiques à la fonctionnalité.
   - Préférez la composition et maintenez les fichiers raisonnablement petits.
4. **Devise et Formatage** :
   - Faites attention aux fonctions de formatage dans `src/lib/format.ts`. Si la devise doit devenir dynamique, c'est là qu'elle devra être modifiée en priorité.
