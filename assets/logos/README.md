# Logos des expériences

Affichés en **flottant** à côté de chaque entrée de la timeline (section Parcours).
Le code charge automatiquement `assets/logos/<nom>.svg` — il suffit de déposer le
fichier officiel sous le bon nom (écraser le placeholder existant).

## Fichiers attendus

| Fichier            | Expérience                                  |
|--------------------|---------------------------------------------|
| `ovhcloud.svg`     | OVHcloud — Account Manager FSI *(officiel ✓)* |
| `alain.svg`        | Agence alAin — Co-fondateur                 |
| `bnpparibas.svg`   | BNP Paribas — Stage VC Impact               |
| `etna.svg`         | ETNA EDHEC Télévision                       |
| `edhec.svg`        | EDHEC Business School                       |
| `mariecurie.svg`   | Prépa D2 — Lycée Marie Curie                |
| `sgdf.svg`         | Scouts et Guides de France — Directeur de camp |

## Conseils

- **Format** : SVG de préférence (net à toute taille). PNG transparent accepté
  si tu renommes en `.svg` n'est pas possible — dis-le moi, j'ajusterai le `src`.
- **Fond transparent** : le logo flotte, pas de carte. Évite un logo blanc sur
  fond transparent (invisible sur fond clair) — privilégie la version couleur/sombre.
- **Cadrage** : icône carrée *ou* logotype horizontal, les deux marchent — le CSS
  cale sur une hauteur de 40px et laisse la largeur s'adapter.
