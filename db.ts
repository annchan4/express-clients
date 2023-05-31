import { Sequelize } from "sequelize"; //ferramenta que vamos usar para mapear o nossos banco e para usarmos o conceito de orientação objeto com um banco SQL
//esse vai ser o arquivo de configuracao com nosso banco de dados mysql

//vamos pegar do .env alguns itens...
var dbName = process.env.DB_NAME!; //obs: coloquei esses ! no fim para evitar erro na funcao sequelize abaixo, porque essas variaveis n podem ser vazias
var dbUser = process.env.DB_USER!;
var dbPassword = process.env.DB_PASSWORD;
var dbHost = process.env.DB_HOST;

//vamos criar a variavel que vai fazer a comunicacao com BD usando sequelize
var sequelize = new Sequelize(dbName,dbUser,dbPassword, {
    dialect:'mysql',
    host: dbHost
});

export default sequelize; //vai ser usado pelo app.ts, clientsModel.ts