

function populateUFs(){
    var ufSelect = document.querySelector('select[name = uf]');
    /*
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => {
        return res.json()
    }).then()*/
    //Mesmo código acima, porém como a função recebe só um argumento pode-se escrever dessa forma mais limpa
    //Simplesmente, a função anônima está retornando um valor
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res =>  res.json())
    .then(states => {
        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs();

function getCities(event){
    var citySelect = document.querySelector('select[name = city]');
    var stateInput = document.querySelector('input[name = state]');

    const indexOfSelectState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectState].text;

    var ufValue = event.target.value;
    var url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    citySelect.innerHTML = '<option value>Selecione uma cidade</option>';
    citySelect.disabled = true;

    fetch(url)
    .then(res =>  res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    })

    citySelect.disabled = false;


}

document.querySelector('select[name = uf]').addEventListener('change', getCities);

//Itens de coleta

const itensToColet = document.querySelectorAll('.items-grid li');

for(item of itensToColet){
    item.addEventListener('click', handleSelectedItem);
}


const collectedItems = document.querySelector('input[name=items]');

let selectedItems = [];

function handleSelectedItem(event){

    const itemLi = event.target;
    const itemId = itemLi.dataset.id;
    
    itemLi.classList.toggle('selected');

    //1 - Verificar se existem items selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        //retorna o resultado da operação, true ou false
        return item == itemId;
    })
    // 3 - Se já estiver selecionado tirar da seleção
    if(alreadySelected != -1){
        //A função anônima é executada para cada item do array, e retorna true ou falso
        //A função vai verificar se o item é diferente dos items presentes no array, se for, ele
        //será incluso no novo array
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    }else{
        //4 - Senão, adicionar a seleção
        selectedItems.push(itemId);
    }

    
    //2 - Se sim, pegar os items 5 - Att o hidden input com o item selecionado
    collectedItems.value = selectedItems;
   

    

    /*

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound  = item == itemId;
        return itemFound
    })

    const alreadySelected = selectedItems.findIndex(item => item == itemId)
    */


}