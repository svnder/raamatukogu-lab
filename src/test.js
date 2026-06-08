const http = require("http");

let passed = 0;
let failed = 0;
let token = null;
let loanId = null;

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: "localhost", port: 3000, path, method, headers: { "Content-Type": "application/json", ...headers } },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => { try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch { resolve({ status: res.statusCode, body: d }); } });
      }
    );
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function test(name, condition, actual) {
  if (condition) { console.log(`  PASS: ${name}`); passed++; }
  else { console.log(`  FAIL: ${name} — saadi: ${JSON.stringify(actual)}`); failed++; }
}

async function run() {
  console.log("\nKäivitan automaatteste...\n");

  console.log("1. Tervise kontroll");
  const h = await request("GET", "/health").catch(() => ({ status: 0 }));
  test("Server vastab", h.status === 200, h.status);
  test("Staatus on ok", h.body && h.body.status === "ok", h.body);

  console.log("\n2. Raamatud");
  const b = await request("GET", "/api/books");
  test("Raamatud laetakse", b.status === 200, b.status);
  test("Raamatuid on olemas", b.body.books && b.body.books.length > 0, b.body);

  console.log("\n3. Raamatute otsing");
  const s = await request("GET", "/api/books/search?title=1984");
  test("Otsing töötab", s.status === 200, s.status);
  test("Leidis raamatu", s.body.count > 0, s.body);
  console.log("\n3.1. Raamatute otsing autori järgi");

  const authorSearch = await request("GET", "/api/books/search?author=orwell");

  test("Autori järgi otsing töötab", authorSearch.status === 200, authorSearch.status);
  test("Autori järgi leiti raamat", authorSearch.body.count > 0, authorSearch.body);

  console.log("\n4. Sisselogimine");
  const l = await request("POST", "/api/users/login", { username: "mari", password: "1234" });
  test("Sisselogimine õnnestus", l.status === 200, l.status);
  test("Token on olemas", l.body.token !== undefined, l.body);
  token = l.body.token;

  console.log("\n5. Vale parool");
  const w = await request("POST", "/api/users/login", { username: "mari", password: "vale" });
  test("Vale parool tagastab 401", w.status === 401, w.status);

  console.log("\n6. Raamatu laenutus");
  const loan = await request("POST", "/api/loans", { bookId: 1 }, { Authorization: token });
  test("Laenutus õnnestus", loan.status === 201, loan.status);
  test("Raamat on laenatud", loan.body.loan !== undefined, loan.body);
  loanId = loan.body.loan && loan.body.loan.id;

  console.log("\n7. Sama raamat uuesti");
  const loan2 = await request("POST", "/api/loans", { bookId: 1 }, { Authorization: token });
  test("Laenatud raamat tagastab 409", loan2.status === 409, loan2.status);

  console.log("\n8. Raamatu tagastamine");
  if (loanId) {
    const ret = await request("POST", `/api/loans/${loanId}/return`, {}, { Authorization: token });
    test("Tagastamine õnnestus", ret.status === 200, ret.status);
  }

  console.log("\n9. Statistika");
  const stats = await request("GET", "/api/stats");
  test("Statistika töötab", stats.status === 200, stats.status);

  console.log(`\nTulemused: ${passed} läbis, ${failed} ebaõnnestus`);
  process.exit(failed === 0 ? 0 : 1);
}

run().catch((e) => { console.error("Viga:", e.message); process.exit(1); });
