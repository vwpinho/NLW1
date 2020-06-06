function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    .then( res => res.json() )
    .then( states => {
        console.log(states.length)
        for( i=0 ; i < 33; i++) {
            ufSelect.innerHTML += `<option value="${states[i].id}">${states[i].nome}</option>`
        }
    })

}

populateUFs();


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const ufValue = event.target.value
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/mesorregioes`
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)