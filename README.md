# Raamatukogu

Raamatukogu on lihtne veebirakendus raamatukogu haldamiseks. Rakenduses saab vaadata raamatuid, otsida raamatuid pealkirja ja autori järgi, registreerida kasutajaid, sisse logida ning raamatuid laenutada ja tagastada.

## Tehnoloogiad

* Node.js
* Express.js
* JavaScript
* HTML
* CSS
* Docker
* Docker Compose
* GitHub Actions

## Käivitamine

### Dockeriga

```bash
docker compose up --build
```

Rakendus avaneb aadressil:

```text
http://localhost:3000
```

Konteineri peatamine:

```bash
docker compose down
```

### Ilma Dockerita

```bash
npm install
node src/server.js
```

## Testikasutajad

| Kasutajanimi | Parool |
| ------------ | ------ |
| mari         | 1234   |
| jaan         | 1234   |

## API endpointid

### Kasutajad

| Meetod | URL               | Kirjeldus                               |
| ------ | ----------------- | --------------------------------------- |
| POST   | /api/users/signup | Uue kasutaja registreerimine            |
| POST   | /api/users/login  | Kasutaja sisselogimine                  |
| POST   | /api/users/logout | Kasutaja väljalogimine                  |
| GET    | /api/users/me     | Sisselogitud kasutaja andmete vaatamine |
| GET    | /api/users        | Kõigi kasutajate vaatamine              |

### Raamatud

| Meetod | URL                             | Kirjeldus                           |
| ------ | ------------------------------- | ----------------------------------- |
| GET    | /api/books                      | Kõigi raamatute vaatamine           |
| GET    | /api/books/:id                  | Ühe raamatu vaatamine ID järgi      |
| GET    | /api/books/search?title=1984    | Raamatu otsimine pealkirja järgi    |
| GET    | /api/books/search?author=orwell | Raamatu otsimine autori järgi       |
| GET    | /api/books/genres               | Kõigi žanrite vaatamine             |
| GET    | /api/books/genre/:genre         | Raamatute filtreerimine žanri järgi |

### Laenud

| Meetod | URL                   | Kirjeldus                               |
| ------ | --------------------- | --------------------------------------- |
| POST   | /api/loans            | Raamatu laenutamine                     |
| POST   | /api/loans/:id/return | Raamatu tagastamine                     |
| GET    | /api/loans            | Kõigi laenude vaatamine                 |
| GET    | /api/loans/me         | Sisselogitud kasutaja laenude vaatamine |

### Statistika

| Meetod | URL        | Kirjeldus                      |
| ------ | ---------- | ------------------------------ |
| GET    | /api/stats | Rakenduse statistika vaatamine |

Statistika sisaldab:

* raamatute koguarvu
* saadaval olevate raamatute arvu
* laenude koguarvu
* aktiivsete laenude arvu
* tagastatud laenude arvu
* kasutajate koguarvu

## Testid

Enne testide käivitamist peab server töötama.

Ühes terminalis:

```bash
node src/server.js
```

Teises terminalis:

```bash
node src/test.js
```

Kõik testid peavad läbima.

## GitHub Actions

Projektis on GitHub Actions workflow:

```text
.github/workflows/ci.yml
```

Workflow käivitub automaatselt iga push'i ja pull request'i korral main branchi suhtes.

Pipeline teeb järgmised sammud:

1. Paigaldab sõltuvused.
2. Käivitab rakenduse.
3. Käivitab automaattestid.
4. Kontrollib JavaScripti süntaksit.
5. Ehitab Docker image'i.

## GitHub Project

Sprinti planeerimiseks kasutati GitHub Project Kanban tahvlit:

```text
Raamatukogu Sprint 1
```

Kanban veerud:

```text
Todo → In Progress → Review → Done
```

## Lisatud funktsioonid

Selle töö käigus lisati või kontrolliti järgmised funktsioonid:

1. Raamatute otsing autori järgi.
2. Statistikasse tagastatud laenude arv.
