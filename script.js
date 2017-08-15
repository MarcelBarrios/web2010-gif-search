const giphy_endpoint = 'http://api.giphy.com/v1' // query key is 'q'
const giphy_api_key = '3f4c9a279279444a98a605768929d88b' // query key is 'api_key'

const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-form input')
const dropdown = document.querySelector('.dropdown')
const results = document.querySelector('.results')
// Documention for Azure Search Suggestion API:
// https://docs.microsoft.com/en-us/rest/api/cognitiveservices/bing-autosuggest-api-v7-reference

function getGifs(term, path, callback) {
  const type = (stickers.checked === true) ? "stickers" : 'gifs'

  axios(`${giphy_endpoint}/${type}/${path}?api_key=${giphy_api_key}&q=${term}`)
  .then(function(res) {
    console.log(res);

    callback(res, type === 'stickers')
  })
}

    // for (let i = 0; i < response.data.data.length; i++) {
    //   const gif_url = response.data.data[i].images.preview_gif.url
    //
    //   results.innerHTML +=
    //     <a target= "_blank" rel="nooponer" href="${response.data.data[i].url}">
    //   <img class="image" src="${gif_url}">
    //   </a>

  function displayManyGifs(response, areStickers) {
     for (let i = 0; i < response.data.data.length; i++) {
       const gif_url = response.data.data[i].images.preview_gif.url

       results.innerHTML += `
         <a target= "_blank" rel="nooponer" href="${response.data.data[i].url}">
       <img class="image ${(areStickers) ? 'stickers' : ''}" src="${gif_url}">
       </a>
     `
    }
   }



searchForm.addEventListener('submit', function(event) {
  event.preventDefault()

  if (searchInput.value === "")
    return
  results.innerHTML = ""


  getGifs(searchInput.value, 'search', displayManyGifs)
})

random.addEventListener('click', function() {
  getGifs('', 'random', function(response) {

    // axios(`${giphy_endpoint}random?api_key=${giphy_api_key}&q=${giphy_endpoint}&limit=20`).then(function(response) {
    //   console.log(response)
    //
    results.innerHTML = `
      <a target= "_blank" rel="nooponer" href="${response.data.data.url}">
    <img class="image" src="${response.data.data.image_url}">
    </a>
    `
  })
})

trending.addEventListener('click', function() {
  results.innerHTML = ""
  getGifs('', 'trending', displayManyGifs)
})
