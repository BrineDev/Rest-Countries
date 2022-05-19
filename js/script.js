const $cardBox = document.querySelector('.cardsBox')
const $loader = document.querySelector('.loader')

const baseURL = 'https://restcountries.com/v3.1/all'

function getCountries() {

    $loader.classList.add('show')

    fetch(`${baseURL}`)
    .then(response => response.json())
    .then(res => {
        $loader.classList.remove('show')
        const data = res

        const renderToHtml = data.map((data) => cardTemplate(data)).join('')

        $cardBox.innerHTML = renderToHtml
        searchCountry(res)
    })
}

window.addEventListener('DOMContentLoaded', getCountries())

function cardTemplate({ area, capital, flags, name, population, region }) {
    const {common } = name
    const { png } = flags

    return`
        <div class="card">
            <div class="cardHeader" style="background: url(${ png }) center / cover;">
            </div>

            <div class="cardMain">
                <h2>${common}</h2>
                <p><b>Area: </b> ${ area }</p>
                <p><b>Population: </b>${ population }</p>
                <p><b>Region: </b>${ region }</p>
                <p><b>Capital:</b> ${ capital  }</p>
            </div>
        </div>        
    `
}

// SEARCH

const $searchInput = document.querySelector('.search')

function searchCountry (data) {
  $searchInput.addEventListener('input', e => {
    let value = e.target.value.toLowerCase()
    const newData = data.filter(({ name }) => {
      return name.common.toLowerCase().includes(value)
    })
    console.log(newData)
    $cardBox.innerHTML = newData.map((data) => cardTemplate(data)).join('')
  })
}

// $searchInput.addEventListener('input', e => {
//   const value = e.target.value.toLowerCase()
//   console.log(value)

//   const newTodos = todos.filter(({ common, capital }) => common.toLowerCase().includes(value) || capital.toLowerCase().includes(value))

//   if (newTodos.length !== 0) {

//     const renderToHtml = data.map((data) => cardTemplate(data))

//     $cardBox.innerHTML = renderToHtml

//   } else {
//     $container.innerHTML = `<h1 style="text-align: center; color: #000">Ничего не найдено!</h1>`
//   }
// })