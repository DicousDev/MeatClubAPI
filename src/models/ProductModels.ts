import database from "../database";

export default class ProductModels {
    
    static async getAll() {
        const pool = database.promise();
        const [produtos]: any[] = <any[]> await pool.query('SELECT * FROM PRODUTO');
        return produtos;
    }
    
    static async create(produto: String) {
        const pool = database.promise();
        await pool.query('INSERT INTO PRODUTO(DESCRICAO) VALUES(?)',
            [produto]
        )
    }

    static async deleteById(id: Number) {
        const pool = database.promise();
        await pool.query('DELETE FROM PRODUTO WHERE `IDPRODUTO` = ?',
            [id]
        )
    }

    static async findById(id: Number) {
        const pool = database.promise();
        const [produtos]: any = <any> await pool.query('SELECT * FROM PRODUTO WHERE `IDPRODUTO` = ?',
            [id]
        )

        return produtos.shift();
    }
}