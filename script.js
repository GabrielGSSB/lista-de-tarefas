let banco = [
    {'tarefa': 'Estudar JS', 'status': ''},
    {'tarefa': 'Entregar ao Isaque', 'status': 'checked'}
]; //variável criada para armazenar as tarefas

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))
const criarTarefa = (tarefa, status,indice) =>{
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.setAttribute("draggable", true);
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item)
}; //variável/função para adicionar as tarefas segundo os parâmetros passados pelo usuário

const limparTarefas = () =>{
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
}
}; //função criada para limpar tela antes de cada atualização afim de evitar duplicação das tarefas na lista

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => criarTarefa(item.tarefa, item.status, indice)); //verificação do array para exibição na tela do que está no banco de dados
}; 

const adicionarTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco()
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco)
        atualizarTela();
        evento.target.value = '';
    }
}; //função para adicionar tarefa a partir do apertar a tecla enter, puxando do banco de dados e em seguida apagando o texto da caixa

const removerTarefa = (indice) =>{
    const banco = getBanco()
    banco.splice (indice,1)
    setBanco(banco)
    atualizarTela();
}; //indicar quem deve ser removido quando a função for chamada

const atualizarTarefa = (indice) =>{
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco (banco)
    atualizarTela()
};

const itemClicado = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice= elemento.dataset.indice
        removerTarefa(indice);
    }else if (elemento.type === 'checkbox'){
        const indice= elemento.dataset.indice;
        atualizarTarefa (indice)
    };
}//remover tarefa ao clicar no X

document.getElementById('newItem').addEventListener('keypress', adicionarTarefa);
document.getElementById('todoList').addEventListener('click', itemClicado);

atualizarTela()

/*arrastar e soltar

const arrastaveis = document.querySelectorAll("[draggable='true']");
const areaSoltar = document.querySelector(".todo__list")

function comecarArrastar() {
    console.log("Começou a arrastar");   

    this.classList.add("arrastando");
}
function permitidoSoltar() {
    const tarefaArrastada = document.querySelector(".arrastando")
    this.appendChild(tarefaArrastada);
    
}
arrastaveis.forEach((arrastaveis) =>{
    arrastaveis.addEventListener("dragstart", comecarArrastar);
})

areaSoltar.addEventListener("dragover", permitidoSoltar);
*/