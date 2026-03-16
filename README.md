git # CarbonScope

Application fullstack de calcul de l'empreinte carbone d'un site physique — **Palier 1**.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend | React |
| Backend | Java Spring Boot (API REST) |
| Base de données | PostgreSQL |
| Authentification | JWT |
| Déploiement | Local ou Docker |

---

## Palier 1 — Socle fonctionnel

### Objectif

Permettre à un utilisateur de saisir les caractéristiques d'un site physique, de calculer son empreinte carbone et d'afficher le résultat. Chaque calcul est persisté en base de données.

---

### Fonctionnalités

#### 1. Formulaire de saisie d'un site (Frontend React)

L'utilisateur renseigne les informations suivantes :

| Champ | Description | Unité |
|---|---|---|
| Nom du site | Identifiant libre du site | — |
| Surface totale | Surface du bâtiment | m² |
| Nombre de places de parking | Total toutes catégories | places |
| Consommation énergétique annuelle | Électricité + chauffage | MWh/an |
| Nombre d'employés | Effectif sur site | personnes |
| Nombre de postes de travail | Équipements informatiques | postes |

#### 2. Calcul de l'empreinte carbone (Backend Spring Boot)

Le calcul est effectué côté serveur. Il couvre deux grandes catégories :

**Construction**
- Empreinte des matériaux de construction (structure béton, acier, vitrages…)
- Empreinte du parking (différenciée selon le type : aérien, sous-sol, sous-dalle)

**Exploitation**
- Empreinte de la consommation énergétique (facteur d'émission réseau électrique)
- Empreinte liée aux postes de travail (équipements informatiques)

> Les facteurs d'émission utilisés sont issus des bases de données open-source (Base Carbone ADEME ou équivalent).

#### 3. Affichage du résultat (Frontend React)

Après soumission du formulaire, l'application affiche :

- Le total CO₂ du site en **tonnes CO₂ équivalent (tCO₂e)**
- La répartition entre la part **construction** et la part **exploitation**
- L'empreinte **par m²** et **par employé**

#### 4. Historique en base de données

Chaque calcul effectué est sauvegardé en base PostgreSQL avec :

- Les données d'entrée du formulaire
- Les résultats du calcul (total, construction, exploitation)
- La date et l'heure du calcul

---

## Données de référence (site réel fourni)

| Donnée | Valeur |
|---|---|
| Surface totale | 11 771 m² |
| Places de parking — sous-dalle | 41 |
| Places de parking — sous-sol | 184 |
| Places de parking — aériennes | 83 |
| Consommation énergétique (2025) | 1 840 MWh/an |
| Nombre de collaborateurs | ~1 800 |
| Postes de travail | 1 037 |

Ces valeurs servent de jeu de données de démonstration.

---

## Architecture

```
carbonscope/
├── frontend/          # Application React
│   ├── src/
│   │   ├── components/
│   │   │   ├── SiteForm.jsx       # Formulaire de saisie
│   │   │   └── ResultCard.jsx     # Affichage du résultat CO₂
│   │   └── App.jsx
│   └── package.json
│
└── backend/           # API REST Spring Boot
    └── src/main/java/
        ├── controller/
        │   └── CarbonController.java   # POST /api/calculate
        ├── service/
        │   └── CarbonService.java      # Logique de calcul
        ├── model/
        │   └── Site.java               # Entité JPA
        └── repository/
            └── SiteRepository.java     # Persistance PostgreSQL
```

---

## API REST

### `POST /api/calculate`

Calcule l'empreinte carbone d'un site et persiste le résultat.

**Request body**
```json
{
  "name": "Siège Rennes",
  "surfaceM2": 11771,
  "parkingSpots": 308,
  "energyMwh": 1840,
  "employees": 1800,
  "workstations": 1037
}
```

**Response**
```json
{
  "id": 1,
  "name": "Siège Rennes",
  "totalCo2Tons": 4250.5,
  "constructionCo2Tons": 2800.0,
  "exploitationCo2Tons": 1450.5,
  "co2PerM2": 361.1,
  "co2PerEmployee": 2.36,
  "calculatedAt": "2026-03-16T10:30:00"
}
```

### `GET /api/history`

Retourne la liste de tous les calculs sauvegardés.

---

## Base de données

### Table `site_calculation`

| Colonne | Type | Description |
|---|---|---|
| `id` | SERIAL PRIMARY KEY | Identifiant |
| `name` | VARCHAR | Nom du site |
| `surface_m2` | FLOAT | Surface en m² |
| `parking_spots` | INT | Nombre de places |
| `energy_mwh` | FLOAT | Consommation MWh/an |
| `employees` | INT | Nombre d'employés |
| `workstations` | INT | Nombre de postes |
| `total_co2_tons` | FLOAT | Total tCO₂e |
| `construction_co2_tons` | FLOAT | Part construction |
| `exploitation_co2_tons` | FLOAT | Part exploitation |
| `calculated_at` | TIMESTAMP | Date du calcul |

---

## Lancement du projet

### Prérequis

- Node.js 18+
- Java 17+
- PostgreSQL 14+
- (Optionnel) Docker & Docker Compose

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Variables d'environnement (backend)

```
DB_URL=jdbc:postgresql://localhost:5432/carbonscope
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
```

---

## Critères de validation du Palier 1

- [ ] Formulaire de saisie fonctionnel (React)
- [ ] Calcul CO₂ correct côté backend (construction + exploitation)
- [ ] Résultat affiché sur le frontend (total, répartition, ratios)
- [ ] Données sauvegardées en base PostgreSQL
- [ ] API REST opérationnelle (`POST /api/calculate`)
