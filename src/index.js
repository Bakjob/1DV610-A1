let form = document.querySelector('form')
let intervalId

form.addEventListener('mouseover', () => {
  intervalId = setInterval(() => {
      let currentMargin = parseInt(window.getComputedStyle(form).margin) || 0
      // Generera en random direction.
      let direction = Math.floor(Math.random() * 4)
      // Utför förflyttning baserat på direction.
      switch(direction) {
        case 1:
          form.style.marginTop = (currentMargin + Math.random(100) * 100) + 'px'
          break
        case 2:
          form.style.marginRight = (currentMargin + Math.random(100) * 100) + 'px'
          break
        case 3:
          form.style.marginBottom = (currentMargin + Math.random(100) * 100) + 'px'
          break
        case 4:
          form.style.marginLeft = (currentMargin + Math.random(100) * 100) + 'px'
          break
      }
  }, 1)
})

form.addEventListener('mouseout', () => {
  clearInterval(intervalId)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let input = document.querySelector('#input')
  console.log(input.value)
  input.value = ''
  input.style.hidden = true
  getCat()
})

async function getCat() {
  console.log('getting cat')

  // Reset form position
  form.style.marginTop = '0px'
  form.style.marginRight = '0px'
  form.style.marginBottom = '0px'
  form.style.marginLeft = '0px'

  let response = await fetch('https://api.thecatapi.com/v1/images/search',
    {
    method: 'GET',
    headers: {
      'x-api-key': 'api_key=live_2s4WGD7frVPzkONg9FncifK6k2RLxeu9hvP0EZfej6O7Ph2K8Q7Z3rOl1R6sG6fr'
    }
  })

  if (!response.ok) {
    console.error('Error fetching cat')
  }

  console.log(response)

  let data = await response.json()
  console.log(data)
  let imgUrl = data[0].url

  let img = document.createElement('img')
  img.src = imgUrl

  let h1 = document.querySelector('h1')
  h1.innerText = 'Här har du en katt!'

  document.body.appendChild(img)
}
