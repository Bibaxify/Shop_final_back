import express from "express"; // npm i express
import path from "path";
import mysql from "mysql2/promise"; // npm i mysql2
import { fileURLToPath } from "url";
import cors from "cors"

import "dotenv/config"; // npm install dotenv

const app = express();
const PORT = 9000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { HOSTNAME_DB, NAME_DB, USERNAME_DB, PASSWORD_DB } = process.env;

app.use(express.static(path.join(__dirname + "/public"))); // accés aux fichiers du dossier public
app.use(express.json()); // permet la recuperation des données du formulaire
app.use(express.urlencoded({ extended: true })); // récupération des données d'un formulaire html


app.use(cors())
// CONNECTION A LA BDD

const pool = mysql.createPool({
    connectionLimit: 10000,
    host: HOSTNAME_DB,
    database: NAME_DB,
    user: USERNAME_DB,
    password: PASSWORD_DB,
});

pool.getConnection().then((res) => {
    //res récupére la promesse de la const pool
    console.log(res.config.database);
});


// POST

app.post("/api/v1/produit/add", async (req, res) => {
    // console.log(req.body.title);
    const result = await pool.execute(
        "INSERT INTO `product`(`name_product`, `description`, `price`, `id_category`) VALUES (?,?,?,?)",
        [
            req.body.name_product,
            req.body.description,
            req.body.price,
            req.body.id_category
        ]
    );
    res.json({
        statut : 201,
        message : "produit bien ajouté"
    });
    console.log("result");
});

app.post("/api/v1/categorie/add", async (req, res) =>{
    const result = await pool.execute(
        "INSERT INTO `category`(`name_category`) VALUES (?)",
        [
            req.body.name_category
        ]
        )
        res.json({
            statut : 201,
            message : "categorie bien ajoutée"
        });
})

app.post("/api/v1/user/add", async (req, res) =>{
    const result = await pool.execute(
        "INSERT INTO `user`(`name`, `firstname`) VALUES (?,?)",
        [
            req.body.name,
            req.body.firstname
        ]
        )
        res.json({
            statut : 201,
            message : "user bien ajouté"
        });
})

app.post

app.listen(PORT, () => {
    console.log(`listening at : http://localhost:${PORT}`);
});
