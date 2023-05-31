//esse arquivo vai definir a nossa tabela clients do BD relacional, dando ateh exemplo de como serao os atributos de um item dela
import db from '../db';
import Sequelize from 'sequelize'; //ferramenta que vamos usar para mapear o nossos banco e para usarmos o conceito de orientação objeto com um banco SQL

//vou exportar uma tabela definida
//obs: coloque o nome da tabela(client) no singular, pois o proprio sequelize vai tornar plural
export default db.define('client',{
    id:{
        type: Sequelize.INTEGER.UNSIGNED, //unsigned significa sempre positivo
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }
});