const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
    carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
    index++;
    prev.classList.add('show');
    track.style.transform = `translateX(-${index * carouselWidth}px)`;

    if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
        next.classList.add('hide');
    }
})

prev.addEventListener('click', () => {
    index--;
    next.classList.remove('hide');
    if (index === 0) {
        prev.classList.remove('show');
    }
    track.style.transform = `translateX(-${index * carouselWidth}px)`;
})

fetch('./javascript/api.json')
    .then(response => response.json())
    .then(object => {
        array = object.data;
        let card = document.getElementById('cards');
        for (let i = 0; i < array.length; i++) {
            let formatNumber = array[i].price;
            formatNum = formatNumber.toLocaleString();
            card.innerHTML += `
       <div class="card-container">
            <div class="card">
                <div class="img">
                   <img src="${array[i].imageUrl}"/>  
                </div>
                <div class="info">
                    <h2 class="info-title">${array[i].productName}</h2>
                    <p class="info-stars">Estrellas: ${array[i].stars}</p>
                    <p class="info-title">de ${array[i].listPrice}</p>
                    <p class="info-offer">por $ ${formatNum}</p>
                    <p class="info-title">o en 9x de R $ 28.87</p>
                    <button class="info-button">COMPRAR</button>
                </div>
            </div>
        </div>
        `;
        };
})
.catch(error => console.log('Hay un error'))