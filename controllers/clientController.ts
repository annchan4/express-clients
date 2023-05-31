//essa classe vai ser meu Controller, responsavel por auxiliar o clients.ts a determinar as rotas (urls) do meu servidor
//vai ser mais util quando formos trabalhar com fazer conexao com BD, pois eh algo mais complexo que apena suma pagina html

import {Request,Response} from 'express';
import { IClients } from '../models/clients';
import ClientRepository from '../models/clientsModel';

//funcao que vai apresentar a pagina inicial do servidor, a index.pug
//obs: essa function teve de ser async por causa do await abaixo
async function clients(req:Request,res:Response,next:any)
{
    //esse res, vem de response. Eh a resposta que o servidor vai dar ao cliente
    var clients = await ClientRepository.findAll(); //pegar todos os itens da tabela clients do BD
    res.render('clients',{clients:clients}); //vou mostrar index.pug e passando esse parametro (NomeDaVariavelNaView:NomeDaVariavelAquiNesteArquivo)
}

//funcao que vai apresentar a pag com dados de um cliente do BD, com parametro id obrigatorio
async function show(req:Request,res:Response,next:any)
{
    var idDaUrl = req.params.id;
    var client = await ClientRepository.findByPk(idDaUrl);
    res.render('show',{client:client});
}

//funcao que vai mostrar pagina para adicionar um novo cliente no BD
function create(req:Request,res:Response,next:any)
{
    res.render('create');
}

//funcao que vai interpretar a rota post para de fato adicionar um cliente ao BD
async function store(req:Request,res:Response,next:any)
{
    //finalmente vou usar a interface IClients!
    try
    {
        //finalmente vou usar a interface IClients!
        const client = req.body as IClients;
        await ClientRepository.create({name: client.name, email: client.email});
        res.redirect('/clients');//vou voltar para a pag inicial
    }
    catch(error)
    {
        console.log(error);
        res.status(500).end();//retorna para o cliente um erro 500
    }
}

//funcao que vai mostrar uma pagina para edicao de dados de um cliente, dada uma url com o id dele
async function edit(req:Request,res:Response,next:any)
{
    try
    {
        var idPassadoNaUrl = req.params.id;
        var client = await ClientRepository.findByPk(idPassadoNaUrl);
        if(client == null)
        {
            res.status(404).send('Não encontrado');//se o cliente n foi achado, vou retornar pag com erro 404 e uma mensagem
        }
        else
        {
            res.status(200).render('edit', {clientParaView:client}); //vou retornar o codigo 200 (sucesso) e renderizar uma nova view edit passando a variavel client
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).end();//retorna para o cliente um erro 500
    }
}
//funcao que vai interpretar a rota put para de fato editar um cliente no BD
async function update(req:Request,res:Response,next:any)
{
    try
    {
        var client = req.body as IClients;
        await ClientRepository.update(client, {
            where: {id: req.params.id}
        });
        //no update, o segundo param vai ser especificando no bd qual o id do cliente que quero editar
        res.redirect('/clients');//vou voltar para a pag inicial
    }
    catch(error)
    {
        console.log(error);
        res.status(500).end();//retorna para o cliente um erro 500
    }
}

//funcao que vai deletar um cliente do BD
async function destroy(req:Request,res:Response,next:any)
{
    try
    {
        await ClientRepository.destroy({
            where:{id:req.params.id}
        }); 
        //vou deletar o cliente com o id que passei como parametro na url
        res.redirect('/clients');//vou voltar para a pag inicial, senao vai ficar uma pagina num loop
    }
    catch(error)
    {
        console.log(error);
        res.status(500).end();//retorna para o cliente um erro 500
    }
}

//funcao que vai apresentar a pag produto, com parametro id obrigatorio
function produto(req:Request,res:Response,next:any)
{
    var produtos = []; //vai ser um array de objetos
    produtos[0] = {nome:'memória RAM',descricao:'16gb'};
    produtos[1] = {nome:'placa de vídeo',descricao:'8gb'};
    produtos[2] = {nome:'monitor',descricao:'fullHD'};
    var id = parseInt(req.params.id); //peguei o parametro id passar para essa url. Como era string, converti
    var produto = produtos[id];
    
    res.render('produto',{produtoParaView:produto});//vou mostrar produto.pug e passando esse parametro (NomeDaVariavelNaView:NomeDaVariavelAquiNesteArquivo)
}

//funcao que vai apresentar a pag saudacao, com parametro opcional
function saudacao(req:Request,res:Response,next:any)
{
    var saudacaoInformadaNaUrl;
    if(req.params.nome == undefined)
    {
        //usuario n informou parametro algum
        saudacaoInformadaNaUrl = "NenhumNomeInformado";
    }
    else
    {
        saudacaoInformadaNaUrl = req.params.nome;
    }
    res.render('saudacao',{'saudacaoParaView':saudacaoInformadaNaUrl});
}

//sempre eu eu tiver uma nova funcao nesse arquivo, devo exportar abaixo
export default {index: clients,produto,saudacao,show,create,store,edit,update,destroy};//preciso exportar para que clients.ts (a classe que cuida do redirecionamento para outras paginas) possa usar