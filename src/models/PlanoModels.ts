import database from "../database";

export default class PlanoModels {

    static async getAll() {
        const list = [];
        const pool = database.promise();
        const [planos]: any[] = <any[]> await pool.query('SELECT * FROM PLANO')
        
        for(let i = 0; i < planos.length; i++) {
            const [produtos]: any[] = <any[]> await pool.query("SELECT PRODUTO.IDPRODUTO, PRODUTO.DESCRICAO FROM PLANO INNER JOIN PLANO_PRODUTO ON PLANO.IDPLANO = PLANO_PRODUTO.IDPLANO INNER JOIN PRODUTO ON PLANO_PRODUTO.IDPRODUTO = PRODUTO.IDPRODUTO WHERE PLANO.IDPLANO = ?",
                [planos[i].IDPLANO]
            );

            planos[i].PRODUTOS = produtos; 
            list.push(planos[i]);
        }

        return list;
    }

    static async getById(id: Number) {
        const pool = database.promise();
        const [planos]: any = <any> await pool.query('SELECT * FROM PLANO WHERE IDPLANO = ?',
            [id]
        );

        if(planos.length <= 0) {
            return false;
        }

        const plano = planos.shift();
        const [produtos]: any[] = <any[]> await pool.query("SELECT PRODUTO.IDPRODUTO, PRODUTO.DESCRICAO FROM PLANO INNER JOIN PLANO_PRODUTO ON PLANO.IDPLANO = PLANO_PRODUTO.IDPLANO INNER JOIN PRODUTO ON PLANO_PRODUTO.IDPRODUTO = PRODUTO.IDPRODUTO WHERE PLANO.IDPLANO = ?",
            [id]
        );

        plano.PRODUTOS = produtos;
        return plano;
    }

    static async create(nome: String, preco: String, periodo: String) {
        const pool = database.promise();
        await pool.query('INSERT INTO PLANO(NOME, PRECO, PERIODO) VALUES(?, ?, ?)',
            [nome, preco, periodo]
        )
    }

    static async addProduto(id: Number, idProduto: Number) {
        const pool = database.promise();
        await pool.query('INSERT INTO PLANO_PRODUTO(IDPLANO, IDPRODUTO) VALUES(?, ?)',
            [id, idProduto]
        )
    }

    static async deleteById(id: Number) {
        const pool = database.promise();

        await pool.query('DELETE FROM PLANO_PRODUTO WHERE `IDPLANO` = ?',
            [id]
        )

        await pool.query('DELETE FROM PLANO WHERE `IDPLANO` = ?',
            [id]
        )
    }
}