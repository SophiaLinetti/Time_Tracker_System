# Dokumentation – Zeiterfassungssystem

## Aufgabe
Zeiterfassungssystem für die Sportless GmbH
Ziel ist die Entwicklung einer webbasierten Applikation, mit der Teammitglieder ihre Arbeitszeiten projektbezogen erfassen und auswerten können. Das Tool beinhaltet verschiedene Benutzerrollen, ein Rollenkonzept und grundlegende Auswertungen für das Management.

## Projektziel & Hauptfunktionen
- Personen- und themenbezogene Zeiterfassung
- Rollenverwaltung (User/Admin)
- Auswertungen/Charts
- Änderungsnachverfolgung
- Zeiteinträge erfassen und verwalten

## Aufbau/Struktur
- Frontend: Next.js, Seiten unter `/app`
- Styling: Tailwind CSS in `globals.css`
- Authentifizierung: NextAuth.js
- DB: PostgreSQL via Neon, Anbindung mit Prisma
- ...


## Tageslog / Projektverlauf

### Montag, 08.07.2025
- Projekt-Repository aufgesetzt (GitHub)
- Next.js-Projekt erstellt und initiale Struktur angelegt (app, prisma, public etc.)
- NeonDB-Datenbank erstellt, Verbindung in `.env` eingerichtet
- Prisma konfiguriert, erstes Datenbankmodell (User, TimeEntry etc.) angelegt
- Erste Migration durchgeführt & Datenbank synchronisiert
- Dokumentation begonnen

### Dienstag, 09.07.2025
- NextAuth.js integriert für Authentifizierung (Credentials & GitHub-Provider)
- Prisma Adapter für NextAuth angebunden
- Test-User (Admin, Teamlead, Supervisor) händisch in DB eingefügt
- Session/JWT-Handling angepasst (Rolle & User-ID werden an Frontend übergeben)
- Auth-Flow ausführlich getestet (verschiedene Rollen)
- Frontend-Komponenten angepasst, Session-UI vereinfacht
- Dokumentation erweitert

---

## Individueller Lernfortschritt
- erste Erfahrung mit Prisma Migrations gesammelt
- erstmals NextAuth konfiguriert
- Integration von Authentifizierung mit NextAuth.js und rollenbasierter Rechtevergabe
- JWT-/Session-Handling und Debugging praxisnah umgesetzt
- Routine im Umgang mit VS Code, npm und Git-Terminal weiter verbessert.
- erste Berührung mit Cloud Deployment (Vercel), Build-Prozesse und Umgebungsvariablen.
- Dokumentation und Versionskontrolle in Git aktiv genutzt
- weitere praktische Erfahrung mit Next.js und dem Aufbau einer modernen Webanwendung


## Probleme & Lösungen
- Prisma Migration: Konnte Spalte nicht hinzufügen, weil bereits Daten in der DB waren. Lösung: Migration angepasst & default-Wert definiert.
- JWT Session Error: Warnung wegen fehlendem Secret – Hinweis gelesen, (optional) Secret gesetzt.


## Nächste Schritte
- TimeEntry-Komponente bauen
- Berechtigungen im Frontend nutzbar machen (Role Based Access Control)
- Testdaten für verschiedene Szenarien einpflegen