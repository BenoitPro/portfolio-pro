# Logos des expériences

Affichés en **flottant** à côté de chaque entrée de la timeline (section Parcours).

## Comment remplacer un logo

Dépose le fichier officiel sous le **nom de base** ci-dessous (via *Add file → Upload
files* sur GitHub, ou en commit). **L'extension n'a pas d'importance** : le code essaie
`.svg` puis bascule automatiquement sur `.png`, `.jpg`, `.jpeg`, `.webp`. Le fichier
écrase le placeholder existant et s'affiche tout seul — aucun code à toucher.

| Nom de base   | Expérience                                       |
|---------------|--------------------------------------------------|
| `ovhcloud`    | OVHcloud — Account Manager FSI                    |
| `alain`       | Agence alAin — Co-fondateur                       |
| `bnpparibas`  | BNP Paribas — Stage VC Impact                     |
| `etna`        | ETNA EDHEC Télévision                             |
| `edhec`       | EDHEC Business School                             |
| `mariecurie`  | Prépa D2 — Lycée Marie Curie                      |
| `sgdf`        | Scouts et Guides de France — Directeur de camp    |

> Si tu uploades un PNG `edhec.png`, supprime ou laisse `edhec.svg` : le code tentera
> d'abord `.svg`. Pour forcer le PNG, supprime le `.svg` correspondant.

## Conseils rendu

- **Fond transparent** : le logo flotte, pas de carte. Évite un logo **blanc** sur fond
  transparent (invisible sur fond clair) — privilégie la version couleur/sombre.
- **Cadrage** : icône carrée *ou* logotype horizontal, les deux marchent — le CSS cale
  sur une hauteur de 40px (largeur auto, max 132px).

Les SVG actuellement présents sont des **recréations vectorielles** faites d'après les
logos officiels, en attendant tes fichiers originaux.
