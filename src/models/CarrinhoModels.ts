import database from "../database";

export default class CarrinhoModels {

    static async getId(userId: Number): Promise<Number> {
        const pool = database.promise();
        const [carrinho]: any[] = <any[]> await pool.query('SELECT IDCARRINHO FROM CARRINHO WHERE IDUSUARIO = ?',
            [userId]
        )

        const id: Number = carrinho.shift().IDCARRINHO;
        return id;
    }

    static async getAll(idUser: Number) {
        const pool = database.promise();
        const list = [];

        const [planos]: any[] = <any[]> await pool.query('SELECT PLANO.IDPLANO, PLANO.NOME, PLANO.PRECO, PLANO.PERIODO FROM USUARIO INNER JOIN CARRINHO ON USUARIO.IDUSUARIO = CARRINHO.IDUSUARIO INNER JOIN CARRINHO_PLANO ON CARRINHO.IDCARRINHO = CARRINHO_PLANO.IDCARRINHO INNER JOIN PLANO ON CARRINHO_PLANO.IDPLANO = PLANO.IDPLANO WHERE CARRINHO.IDUSUARIO = ?',
            [idUser]
        )

        for(let i = 0; i < planos.length; i++) {
            const [produtos]: any[] = <any[]> await pool.query('SELECT PRODUTO.IDPRODUTO, PRODUTO.DESCRICAO FROM PLANO INNER JOIN PLANO_PRODUTO ON PLANO.IDPLANO = PLANO_PRODUTO.IDPLANO INNER JOIN PRODUTO ON PLANO_PRODUTO.IDPRODUTO = PRODUTO.IDPRODUTO WHERE PLANO.IDPLANO = ?',
                [planos[i].IDPLANO]
            );

            planos[i].PRODUTOS = produtos;
            list.push(planos[i]);
        }

        return list;
    }

    static async getById(idUser: Number, id: Number) {
        const pool = database.promise();
        
        const [planos]: any[] = <any[]> await pool.query("SELECT PLANO.IDPLANO, PLANO.NOME, PLANO.PRECO, PLANO.PERIODO FROM CARRINHO_PLANO INNER JOIN CARRINHO ON CARRINHO_PLANO.IDCARRINHO = CARRINHO.IDCARRINHO INNER JOIN PLANO ON CARRINHO_PLANO.IDPLANO = PLANO.IDPLANO WHERE CARRINHO.IDUSUARIO = ? AND PLANO.IDPLANO = ?", 
            [idUser, id]
        );

        if(planos.length <= 0) {
            return false;
        }

        const plano = planos.shift();
        const [produtos]: any[] = <any[]> await pool.query('SELECT PRODUTO.IDPRODUTO, PRODUTO.DESCRICAO FROM CARRINHO_PLANO INNER JOIN CARRINHO ON CARRINHO_PLANO.IDCARRINHO = CARRINHO.IDCARRINHO INNER JOIN PLANO ON CARRINHO_PLANO.IDPLANO = PLANO.IDPLANO INNER JOIN PLANO_PRODUTO ON PLANO_PRODUTO.IDPLANO = PLANO.IDPLANO INNER JOIN PRODUTO ON PLANO_PRODUTO.IDPRODUTO = PRODUTO.IDPRODUTO WHERE CARRINHO.IDUSUARIO = ? AND PLANO.IDPLANO = ?', 
            [idUser, id]
        );

        plano.PRODUTOS = produtos;
        return plano;
    }

    static async addPlano(idUser: Number, idPlano: Number) {

        try {
            const idCarrinho: Number = await this.getId(idUser);
            const pool = database.promise();
            await pool.query('INSERT INTO CARRINHO_PLANO(IDCARRINHO, IDPLANO) VALUES(?, ?)',
                [idCarrinho, idPlano]
            )
        }
        catch(error) {
            console.log(error);
        }
    }
    
    static async deleteById(idUser: Number, id: Number) {
        const pool = database.promise();

        const [carrinho]: any = <any> await pool.query('SELECT IDCARRINHO FROM CARRINHO INNER JOIN USUARIO ON CARRINHO.IDUSUARIO = USUARIO.IDUSUARIO WHERE CARRINHO.IDUSUARIO = ?',
            [idUser]
        )

        const idCarrinho: Number = carrinho.shift().IDCARRINHO;
        await pool.query('DELETE FROM CARRINHO_PLANO WHERE IDCARRINHO = ? AND IDPLANO = ?',
            [idCarrinho, id]
        );
    }
    
    static async deleteAll(idUser: Number) {
        try {
            const idCarrinho: Number = await this.getId(idUser);
            const pool = database.promise();
            await pool.query('DELETE FROM CARRINHO_PLANO WHERE IDCARRINHO = ?',
                idCarrinho
            )
        }
        catch(error) {
            console.log(error);
        }   
    }
}