# Raamatukogu

Raamatukogu on lihtne Node.js ja Expressi rakendus, mis haldab raamatute nimekirja, kasutajaid ning laenutusi. Projekt on mõeldud väikeseäri raamatukogu testimiseks ja arenduse demonstratsiooniks.

## Tehnoloogiad

- Node.js
- Express
- CORS
- GitHub Actions

## Käivitamine

1. Kloneeri repostiitorium:
   ```bash
   git clone https://github.com/<kasutajanimi>/raamatukogu-lab.git
   cd raamatukogu-lab
   ```
2. Paigalda sõltuvused:
   ```bash
   npm install
   ```
3. Käivita server:
   ```bash
   npm start
   ```
4. Ava lehitsejas või API-kliendis:
   ```
   http://localhost:3000
   ```

Rakendus kasutab porti `3000` vaikimisi.

## Testikasutajad

Süsteemis on kaks testkasutajat olemas:

- username: `mari`, password: `1234`
- username: `jaan`, password: `1234`

## API endpointid

### Kasutajad

| Meetod | URL | Kirjeldus |
|--------|-----|-----------|
| POST | /api/users/signup | Loo uus kasutaja (body: username, password, name) |
| POST | /api/users/login | Logi sisse kasutajanime ja parooliga |
| POST | /api/users/logout | Logi välja ja eemalda sessioon |
| GET | /api/users/me | Tagastab praegu sisse logitud kasutaja andmed |

### Raamatud

| Meetod | URL | Kirjeldus |
|--------|-----|-----------|
| GET | /api/books | Tagastab kõik raamatud |
| GET | /api/books/:id | Tagastab raamatu ID alusel |
| GET | /api/books/search | Otsib raamatuid pealkirja või autori järgi |
| GET | /api/books/genres | Tagastab kõik žanrid |
| GET | /api/books/genre/:genre | Tagastab antud žanriga raamatud |

### Laenud

| Meetod | URL | Kirjeldus |
|--------|-----|-----------|
| POST | /api/loans | Laena raamat (body: bookId, Authorization päis vajalik) |
| POST | /api/loans/:id/return | Tagasta laenatud raamat |
| GET | /api/loans | Tagastab kõik laenud |
| GET | /api/loans/me | Tagastab praeguse kasutaja laenud |

## Testid

Käivita testid lokaalselt:

```bash
npm install
node src/test.js
```

Kõik testid peavad näitama `PASS`.

## GitHub Actions

Lihtne CI pipeline jooksutab:

1. `npm install`
2. `node src/server.js` taustal
3. `node src/test.js`
4. süntaksi kontrolli `node --check` faili `src/server.js`, `src/routes/users.js`, `src/routes/books.js`, `src/routes/loans.js`

Deploy kontrolli etapis ehitatakse `docker compose build` ainult `main` branchil.
