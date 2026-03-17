# Script Vidéo — CarbonScope
**Hackathon Capgemini Rennes 2026 | Durée : ~10 minutes**

---

## 🎬 [00:00 – 00:40] INTRO — L'accroche

> *Musique douce en fond. Plan sur un bâtiment d'entreprise, puis cut vers l'écran.*

**[Voix off / Présentateur face caméra]**

"En 2025, le bâtiment représente près de 40 % des émissions mondiales de CO₂.
Les entreprises s'engagent à réduire leur empreinte carbone… mais par où commencer ?

Combien pèse réellement le siège social que vous occupez chaque matin ?
Combien de tonnes de CO₂ représente sa construction ? Son exploitation au quotidien ?

La plupart des organisations ne le savent pas. Pas parce qu'elles ne veulent pas — mais parce qu'il n'existe pas d'outil simple, accessible, et fiable pour le calculer.

C'est exactement le problème que nous avons décidé de résoudre."

---

## 🎬 [00:40 – 01:10] PRÉSENTATION DE L'ÉQUIPE

> *Split screen ou apparition des noms à l'écran.*

**[Présentateur]**

"Nous sommes une équipe de développeurs réunie pour ce Hackathon Capgemini Rennes 2026.
Notre mission : concevoir, développer et livrer en 48 heures une application fullstack de calcul d'empreinte carbone pour des sites physiques.

Au programme : un backend Java Spring Boot, un frontend React, une base PostgreSQL, le tout containerisé avec Docker et prêt à déployer."

---

## 🎬 [01:10 – 02:00] LE PROBLÈME

> *Slide ou visuel avec chiffres clés.*

**[Présentateur]**

"Prenons un exemple concret — le site Capgemini de Rennes.

- **11 771 m²** de surface
- **308 places de parking**
- **1 840 MWh** consommés chaque année
- **1 800 collaborateurs** au quotidien
- **1 037 postes de travail**

Ces données existent. Elles sont mesurables. Mais aujourd'hui, personne ne peut répondre simplement à la question : *quelle est l'empreinte carbone réelle de ce site ?*

Construction, exploitation, stationnement, énergie… tout est fragmenté, éparpillé, impossible à agréger sans outil dédié.

La conséquence ? Des décisions RSE prises à l'aveugle. Des objectifs de réduction fixés sans ligne de base solide. Et une opportunité manquée de piloter vraiment sa performance environnementale."

---

## 🎬 [02:00 – 02:45] LA SOLUTION — CarbonScope

> *Logo CarbonScope à l'écran, puis démo app.*

**[Présentateur]**

"Notre réponse s'appelle **CarbonScope**.

CarbonScope est une plateforme web fullstack qui permet à n'importe quelle organisation de :
- **Saisir** les caractéristiques d'un site physique en quelques secondes
- **Calculer** automatiquement son empreinte carbone — construction ET exploitation — selon les facteurs d'émission officiels de l'ADEME
- **Visualiser** les résultats avec des indicateurs clairs : CO₂ total, CO₂ par m², CO₂ par employé
- **Historiser** chaque calcul pour suivre l'évolution dans le temps

L'outil est simple, pédagogique, et opérationnel. Zéro expertise en bilan carbone requise."

---

## 🎬 [02:45 – 06:30] DÉMO DE L'APPLICATION

> *Capture d'écran de l'application en direct.*

**[Présentateur — en montrant l'interface]**

"Laissez-moi vous montrer CarbonScope en action."

---

### [02:45 – 03:30] — Le formulaire

"Sur la page d'accueil, on arrive directement sur le formulaire de saisie.

Je renseigne le site Capgemini Rennes :
- Nom du site : *Siège Rennes*
- Surface : *11 771 m²*
- Places de parking : *308*
- Consommation énergétique : *1 840 MWh par an*
- Nombre d'employés : *1 800*
- Postes de travail : *1 037*

> *Clic sur 'Charger les données de démo' ou saisie manuelle.*

En quelques secondes, toutes les données sont prêtes. Et je clique sur **'Calculer l'empreinte'**."

---

### [03:30 – 04:30] — Le résultat

> *Affichage de la ResultCard.*

"Voilà le résultat.

On voit immédiatement le **total CO₂** du site, exprimé en tCO₂e.

Puis la répartition entre deux grandes catégories :
- La **construction** — ce que le bâtiment a coûté en carbone pour être construit : béton, acier, verre...
- L'**exploitation** — ce que le bâtiment consomme chaque année : énergie, stationnement, infrastructure quotidienne.

La barre de répartition donne un coup d'œil immédiat sur ce qui pèse le plus lourd. Et en bas, deux ratios précieux pour la comparaison : **CO₂ par m²** et **CO₂ par employé**.

Ces deux indicateurs permettront plus tard de comparer des sites de tailles très différentes sur une base normalisée."

---

### [04:30 – 05:15] — L'historique

> *Scroll vers la HistoryTable.*

"Chaque calcul est automatiquement enregistré dans la base PostgreSQL.

Ici, le tableau d'historique affiche tous les sites analysés avec leur date, leurs valeurs détaillées, et leurs ratios.

Pourquoi c'est important ? Parce qu'un bilan carbone n'a de valeur que comparé à lui-même dans le temps. Si l'année prochaine vous installez des panneaux solaires ou réduisez la surface de parking, vous pourrez mesurer l'impact réel de cette décision."

---

### [05:15 – 06:30] — Robustesse technique

> *Brève capture du docker-compose ou du terminal.*

"Côté technique, l'application est entièrement **dockerisée**.

Un simple `docker compose up --build` suffit pour lancer les trois services :
- Le **frontend React** servi par nginx sur le port 3000
- Le **backend Spring Boot** sur le port 8080
- La **base PostgreSQL** avec initialisation automatique

Aucune configuration manuelle. Aucune dépendance à installer. Déployable en moins de 5 minutes sur n'importe quelle machine — ce qui est exactement ce qu'il faut pour une solution multi-campus."

---

## 🎬 [06:30 – 08:00] ARCHITECTURE & CHOIX TECHNIQUES

> *Schéma d'architecture simple à l'écran.*

**[Présentateur]**

"Parlons de l'architecture."

---

**Backend — Java Spring Boot 3.2**

"Nous avons choisi Spring Boot pour sa robustesse, son écosystème mature, et sa parfaite adéquation avec les standards Capgemini.

L'API REST expose deux endpoints principaux :
- `POST /api/calculate` — reçoit les données d'un site, applique les formules ADEME, persiste le résultat
- `GET /api/history` — retourne l'historique de tous les calculs

Les formules de calcul sont basées sur les **facteurs d'émission officiels ADEME** :
- Béton armé : 310 kg CO₂e / tonne
- Acier : 2 900 kg CO₂e / tonne
- Verre : 1 350 kg CO₂e / tonne
- Électricité réseau : 0,0571 kg CO₂e / kWh
- Parking : 1,5 tonne CO₂e par place

Spring Security est en place pour sécuriser les endpoints, avec une configuration CORS adaptée."

---

**Frontend — React + Tailwind CSS**

"Le frontend est développé en React avec Tailwind CSS. L'interface est volontairement simple et directe : on arrive sur le formulaire, on saisit, on voit le résultat. Pas de friction, pas de menus inutiles.

Les composants sont découplés et réutilisables — `SiteForm`, `ResultCard`, `HistoryTable` — ce qui facilite l'évolution future vers un dashboard plus complet ou une intégration Angular comme spécifié dans le cahier des charges."

---

**Base de données — PostgreSQL 15**

"PostgreSQL stocke chaque calcul avec son horodatage, les données brutes du site, et tous les indicateurs calculés. La table `site_calculations` est créée automatiquement par Hibernate au démarrage. Prêt pour l'historisation avancée et les futures comparaisons multi-sites."

---

## 🎬 [08:00 – 08:50] PALIERS ATTEINTS

> *Tableau des paliers à l'écran.*

**[Présentateur]**

"Regardons les paliers du cahier des charges."

**Palier 1 — Base fonctionnelle ✅**
"Socle complet opérationnel : backend Spring Boot, base PostgreSQL, frontend avec formulaire, calcul CO₂, affichage du résultat, historique en base. Ce palier est entièrement validé."

**Palier 2 — Dashboard & indicateurs ✅ (partiel)**
"Les KPIs sont affichés : CO₂ total, CO₂ par m², CO₂ par employé. La répartition construction / exploitation est visualisée. Il manque les graphiques interactifs avancés et l'application mobile React Native — des fonctionnalités prévues en évolution."

**Palier 3 — Fonctions avancées 🔜**
"La comparaison multi-sites et l'export PDF sont les prochaines étapes naturelles de la roadmap."

---

## 🎬 [08:50 – 09:40] PERSPECTIVES & ROADMAP

> *Slide roadmap simple.*

**[Présentateur]**

"CarbonScope est conçu pour évoluer.

**Court terme :**
- Application mobile React Native pour la saisie terrain
- Authentification JWT complète
- Graphiques interactifs (Chart.js / Recharts)

**Moyen terme :**
- Comparaison multi-sites sur un même dashboard
- Export PDF de rapport bilan carbone
- Intégration API ADEME officielle pour les facteurs d'émission en temps réel

**Long terme :**
- Déploiement multi-campus Capgemini France
- Module de recommandations automatiques pour la réduction des émissions
- Connexion aux outils RSE existants (Power BI, Salesforce Sustainability Cloud)

L'architecture modulaire que nous avons mise en place rend toutes ces évolutions naturelles — sans refonte majeure."

---

## 🎬 [09:40 – 10:00] CONCLUSION

> *Retour face caméra. Ton confiant.*

**[Présentateur]**

"CarbonScope, c'est une réponse concrète à un problème réel.

En 48 heures, nous avons livré une application fonctionnelle, dockerisée, basée sur des données officielles, et prête à mesurer l'empreinte carbone du site Capgemini de Rennes — ou de n'importe quel autre site.

Parce que ce qu'on ne mesure pas, on ne peut pas le réduire.

Merci."

> *Logo CarbonScope. Fin.*

---

## 📋 Notes de production

| Séquence | Durée | Visuel suggéré |
|---|---|---|
| Intro accroche | 40s | Caméra / B-roll bâtiment |
| Présentation équipe | 30s | Face caméra ou noms à l'écran |
| Problème | 50s | Slide chiffres Rennes |
| Solution | 45s | Logo + description |
| Démo formulaire | 45s | Capture écran app |
| Démo résultat | 60s | Capture écran app |
| Démo historique | 45s | Capture écran app |
| Robustesse Docker | 75s | Terminal / docker-compose |
| Architecture | 90s | Schéma technique |
| Paliers | 50s | Tableau paliers |
| Roadmap | 50s | Slide roadmap |
| Conclusion | 20s | Face caméra |
| **TOTAL** | **~10 min** | |
