import express from 'express';
import clientsRouter from './routes/clients'; //iremos importar coisas da classe que vai armazenar todas as rotas do nosso sistema, ou seja todas as pags e urls que poderes acessar
import methodOverride from 'method-override'; //esse pacote serve para conseguirmos usar o metodo put do http na nossa edit.pug (pag de editar clientes)
import db from './db'; //importar coisas do arquivo de configuracao com BD


const app = express();
var porta = parseInt(`${process.env.PORT}`); //vou pegar do .env (arquivo que armazena variaveis de ambiente) qual a porta que vou usar

app.use(methodOverride('_method')); //para conseguirmos usar o metodo put do http na nossa edit.pug (pag de editar clientes)
//eh necessario fazer isso antes do app.use(clientsRouter)

//assim que o servidor obter uma requisicao, ele vai usar o clientsRouter e redirecionar para outras paginas, de outras rotas
app.use(clientsRouter);
//o abaixo eh necessario para conseguirmos acessar qualquer req.body as IClients no clientController, por exemplo ao inserir novos itens no BD ou editar. 
//Ou seja, para receber dados json do formulario 
app.use(express.urlencoded({extended:true}));
//app.set significa passar configuracoes da aplicacao
app.set('view engine','pug');//vamos usar a view engine pug
app.set('views','./views') //as views irao ficar na pasta views

//criaremos um servidor
/*app.listen(porta,() =>{
    console.log("Servidor funcionando na porta " + porta);
}); */
//parametros: porta e metodo que vai acionar quando iniciar

//coisas para conexao com BD...
db.sync().then(() => {
    console.log('Conectado com sucesso ao banco:' + process.env.DB_NAME);
}).then(() =>{
    //criaremos um servidor
    app.listen(porta,() =>{
        console.log("Servidor funcionando na porta " + porta);
    });
});