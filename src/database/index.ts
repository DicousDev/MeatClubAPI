import config from "../config";
import mysql2 from "mysql2";

const database = mysql2.createConnection(config);

database.connect(function(error) {
    if(error) {
        return console.log("Erro de conexão MySQL");
    }

    return console.log("Conexão com MySQL estabelecida com sucesso!");
})

export default database;