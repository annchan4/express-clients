//esse arquivo vai criar uma interface para inserirmos e acessarmos itens da nossa tabela(table) de clientes
//essa interface vai ser usada pelo clientController.ts, o arquivo que auxilia a renderizar as rotas da minha aplicacao
//vai ter utilidade quando formos usar a funcao para adicionar um item no BD
export interface IClients{
    id:number;
    name:string,
    email:string
}