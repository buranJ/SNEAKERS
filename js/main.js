let likes = JSON.parse(localStorage.getItem('like')) || [];
let sneakers = JSON.parse(localStorage.getItem('sneakers')) || [];

const content = document.querySelector('.sneakers__content');
const searchInput = document.querySelector('.sneakers__inp');
const searchButton = document.querySelector('.sneakers__lupa');

const cardLikeIcon = '../imgs/cardlike.svg';
const redLikeIcon = '../imgs/RedLike.svg';

function showAllCards() {
    content.innerHTML = "";
    
    sneakers.forEach((item) => {
        content.innerHTML += `
            <div class="purchases__card">
                <div data-id="${item.id}" class="purchases__like">
                    <img src="${item.add ? redLikeIcon : cardLikeIcon}" alt="like">
                </div>
                <img src="${item.image}" alt="" class="purchases__crosovok">
                <p class="purchases__about">${item.title}</p>
                <div class="purchases__prise">
                    <p class="purchases__prise-text">
                        <span>ЦЕНА:</span> ${item.price}
                    </p> 
                    <div class="purchases__prise-plus">
                        <img class="purchases__prise-img" src="../imgs/plus.svg" alt="plus">
                    </div>
                </div>
            </div>
        `;
    });
    
    addLikeListeners();
}

function addLikeListeners() {
    const likeButtons = document.querySelectorAll('.purchases__like');
    
    likeButtons.forEach((button) => {
        button.addEventListener('click', likeButtonClicked);
    });
}

function likeButtonClicked(event) {
    const button = event.currentTarget;
    const id = button.getAttribute('data-id');
    
    sneakers = sneakers.map((item) => {
        if (item.id == id) {
            item.add = !item.add;
            
            if (item.add) {
                addToLikes(item);
            } else {
                removeFromLikes(id);
            }
        }
        return item;
    });
    
    localStorage.setItem('sneakers', JSON.stringify(sneakers));
    localStorage.setItem('like', JSON.stringify(likes));
    
    showAllCards();
}

function addToLikes(sneaker) {
    const alreadyExists = likes.find((item) => item.id == sneaker.id);
    
    if (!alreadyExists) {
        likes.push({
            id: sneaker.id,
            title: sneaker.title,
            price: sneaker.price,
            add: true,
            image: sneaker.image
        });
    }
}

function removeFromLikes(id) {
    likes = likes.filter((item) => item.id != id);
}

function searchProducts() {
    const searchText = searchInput.value.toLowerCase();
    
    if (searchText === '') {
        showAllCards();
        return;
    }
    
    const foundProducts = sneakers.filter((item) => {
        const sneakerTitle = item.title.toLowerCase();
        return sneakerTitle.includes(searchText);
    });
    
    content.innerHTML = "";
    
    if (foundProducts.length === 0) {
        content.innerHTML = '<p style="font-size: 18px; text-align: center;">Ничего не найдено</p>';
        return;
    }
    
    foundProducts.forEach((item) => {
        content.innerHTML += `
            <div class="purchases__card">
                <div data-id="${item.id}" class="purchases__like">
                    <img src="${item.add ? redLikeIcon : cardLikeIcon}" alt="like">
                </div>
                <img src="${item.image}" alt="" class="purchases__crosovok">
                <p class="purchases__about">${item.title}</p>
                <div class="purchases__prise">
                    <p class="purchases__prise-text">
                        <span>ЦЕНА:</span> ${item.price}
                    </p> 
                    <div class="purchases__prise-plus">
                        <img class="purchases__prise-img" src="../imgs/plus.svg" alt="plus">
                    </div>
                </div>
            </div>
        `;
    });
    
    addLikeListeners();
}

searchButton.addEventListener('click', searchProducts);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

showAllCards();