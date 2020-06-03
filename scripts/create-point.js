

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
    
    fetch(url)
    .then(res =>  res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
    })

    citySelect.disabled = false;


}

document.querySelector('select[name = uf]').addEventListener('change', getCities);