import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
let countries = [];
const port = 3000;
const db = new pg.Client({
  user: "username",
  host: "hostname",
  database: "dbname",
  password: "password",
  port: 5432 // default PostgreSQL port
});

db.connect();

function synchronizeValues() {
db.query("SELECT country_code FROM visited_countries", (err, result) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    // console.log(countries);
  }
});
}
synchronizeValues();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json()); // or bodyParser.json()

app.get("/", async (req, res) => {
  //Write your code here.
  res.render("index.ejs", { countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  let code_to_store;
  let country_to_store = "%" + req.body.country + "%";
  console.log(country_to_store.charAt(1));
  country_to_store = country_to_store.charAt(1).toUpperCase() + country_to_store.slice(2).toLowerCase();

  db.query(`SELECT country_code FROM countries WHERE country_name LIKE $1`, [country_to_store], (err, result) => {
    if (err || result.rows.length === 0) {
      let errorMessage = "Country does not exist!";
      res.render("index.ejs", {countries, total: countries.length, error: errorMessage});
    }
    else {
      code_to_store = result.rows[0].country_code.toString();
      console.log("Value passed to DB:", code_to_store, typeof code_to_store);
      // console.log(code_to_store);
    }

    db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [code_to_store], (err, result) => {
  if (err){
    let errorMessage = "Country already added :)";
    res.render("index.ejs", {countries, total: countries.length, error: errorMessage});
  }
  else {
    // console.log(result.rows[0]);
    // console.log(result.rows[0]);
    synchronizeValues();
    res.redirect("/");
  }
});
  });


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
