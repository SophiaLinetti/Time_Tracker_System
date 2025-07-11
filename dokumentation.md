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

### Mittwoch/ Donnerstag, 10.-11.07.2025
- Prisma-Schema refaktoriert: Das alte Category-Modell entfernt, stattdessen Enum WorkLocation direkt in TimeEntry verwendet (HOME_OFFICE, REMOTE, BÜRO)
- Migrationen durchgeführt, Datenbankstruktur erfolgreich angepasst
- API-Route /api/timeentry angepasst: Erstellung neuer Zeiteinträge jetzt direkt mit location statt category, keine Referenzen mehr auf Category notwendig
- Zahlreiche Fehler beim Speichern und Abrufen von Einträgen analysiert (Datenbankfehler, fehlende Felder, falsche Relations, Prisma-Validierungen)
- Unterschiedliche Fehlerquellen rund um Authentifizierung und NextAuth/Session-Handling debuggt
- Frontend: TimeEntryForm.js fortlaufend angepasst, fetch-Requests und Fehlerbehandlung verfeinert
- Projekt weiter mit Git versioniert und Dokumentation jeweils aktuell gehalten

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
- Viele neue Erfahrungen im Bereich Fehleranalyse & Debugging gesammelt, auch wenn gefühlt mehr Zeit in der Fehlersuche als im Coden steckt
- Erkannt, wie wichtig ein sauberer Umgang mit Umgebungsvariablen (.env) für Auth und DB ist
- Anpassung von API-Routen auf neue Datenbankmodelle (z. B. Umstellung von Category auf location)
- Erfahrung gesammelt mit Prisma Studio zum Testen und Debuggen von Datenbankeinträgen
- Trotz einiger Frustmomente (Fehlermeldungen, Blockaden, fehlende Erfolge) nicht aufgegeben und systematisch Lösungen erarbeitet


## Probleme & Lösungen
- Prisma Migration: Konnte Spalte nicht hinzufügen, weil bereits Daten in der DB waren. Lösung: Migration angepasst & default-Wert definiert.
- JWT Session Error: Warnung wegen fehlendem Secret – Hinweis gelesen, (optional) Secret gesetzt.


## Nächste Schritte
- TimeEntry-Komponente bauen
- Berechtigungen im Frontend nutzbar machen (Role Based Access Control)
- Testdaten für verschiedene Szenarien einpflegen