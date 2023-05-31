import {Router,urlencoded} from 'express'; //usaremos essa classe do express, a urlencoded serve para conseguirmos adicionar novos itens no bd sem que req.body fique undefined
import clientsController from '../controllers/clientController';

//essa classe vai armazenar todas as rotas do nosso sistema, ou seja a url de todas as pags e urls que podemos acessar
const router = Router();

//adicionaremos rotas para nosso servidor...
//a pagina inicial vai ser o abaixo (antes era o /), vai ser acessado usando localhost:3000/ no navegador
router.get('/clients',clientsController.index); //vou chamar a funcao index do clientController.ts, a classe que vai renderizar a pagina

//a pagina abaixo vai servir para criar novos clientes e inserir no BD
router.get('/clients/create',clientsController.create);
router.post('/clients', urlencoded(), clientsController.store);

//obs: a rota abaixo como tem apenas :id deve sempre vir depois de todas as rotas /clients/
//a pagina abaixo vai exibir os dados de um cliente do BD, tendo como parametro o id dele na url
router.get('/clients/:id',clientsController.show);

//a pagina abaixo vai mostrar uma pagina para editar um cliente do BD
router.get('/clients/:id/edit',clientsController.edit);
router.put('/clients/:id', urlencoded(), clientsController.update);

//a rota abaixo vai servir para deletar um cliente no BD
router.delete('/clients/:id', clientsController.destroy);

//o router.get abaixo recebe parametro(id) e vai fazer alguma coisa com isso
router.get('/produto/:id',clientsController.produto);

//o router.get acima daria erro que se eu passasse um id invalido ou nenhum id...
//o router.get abaixo ilustra o exemplo de como usar um parametro opcional(basta usar o ?)
router.get('/saudacao/:nome?', clientsController.saudacao);




export default router; //precisamos exportar para que app.ts, a classe que inicia o servidor, possa usar