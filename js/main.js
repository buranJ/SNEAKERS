let likes = JSON.parse(localStorage.getItem('like')) || [];
let sneakers = JSON.parse(localStorage.getItem('sneakers')) || [];
let Cart = JSON.parse(localStorage.getItem('cart')) || [];

const content = document.querySelector('.sneakers__content');
const searchInput = document.querySelector('.sneakers__inp');
const searchButton = document.querySelector('.sneakers__lupa');

const cart = document.querySelector('.header__icon');
const allCart = document.querySelector('.cart__content');
const x = document.querySelector('.cart__x');
const cartSneak = document.querySelector('.cart__sneakers');

const cardLikeIcon = '../imgs/cardlike.svg';
const redLikeIcon = '../imgs/RedLike.svg';

function showAllCards() {
    content.innerHTML = "";

    sneakers.forEach((item) => {
        content.innerHTML += `
            <div class="purchases__card">
                <div data-id="${item.id}" class="purchases__like">
                    <img src="${item.add ? redLikeIcon : cardLikeIcon}">
                </div>
                <img src="${item.image}" class="purchases__crosovok">
                <p class="purchases__about">${item.title}</p>

                <div class="purchases__prise">
                    <p class="purchases__prise-text"><span>ЦЕНА:</span> ${item.price}</p>

                    <div class="purchases__prise-plus" data-cart="${item.id}">
                        <img class="purchases__prise-img" src="../imgs/plus.svg">
                    </div>
                </div>
            </div>
        `;
    });

    addLikeListeners();
    funCart();
}

function addLikeListeners() {
    document.querySelectorAll('.purchases__like').forEach((button) => {
        button.addEventListener('click', likeButtonClicked);
    });
}

function likeButtonClicked(event) {
    const id = event.currentTarget.getAttribute('data-id');

    sneakers = sneakers.map((item) => {
        if (item.id == id) {
            item.add = !item.add;

            if (item.add) addToLikes(item);
            else likes = likes.filter(i => i.id != id);
        }
        return item;
    });

    localStorage.setItem('sneakers', JSON.stringify(sneakers));
    localStorage.setItem('like', JSON.stringify(likes));

    showAllCards();
}

function addToLikes(s) {
    if (!likes.find(i => i.id == s.id)) likes.push(s);
}

function searchProducts() {
    const text = searchInput.value.toLowerCase();

    if (!text) return showAllCards();

    const found = sneakers.filter((item) =>
        item.title.toLowerCase().includes(text)
    );

    content.innerHTML = "";

    if (found.length === 0) {
        return content.innerHTML = `<p style="text-align:center">Ничего не найдено</p>`;
    }

    found.forEach((item) => {
        content.innerHTML += `
            <div class="purchases__card">
                <div data-id="${item.id}" class="purchases__like">
                    <img src="${item.add ? redLikeIcon : cardLikeIcon}">
                </div>
                <img src="${item.image}" class="purchases__crosovok">
                <p class="purchases__about">${item.title}</p>

                <div class="purchases__prise">
                    <p class="purchases__prise-text">
                        <span>ЦЕНА:</span> ${item.price}
                    </p> 
                    <div class="purchases__prise-plus">
                        <img data-id="${item.id}" class="purchases__prise-img" src="../imgs/plus.svg" alt="plus">
                    </div>
                </div>
            </div>
        `;
    });

    addLikeListeners();
    funCart();
}

searchButton.addEventListener('click', searchProducts);
searchInput.addEventListener('keypress', (e) => e.key === 'Enter' && searchProducts());

showAllCards();


cart.addEventListener('click', () => allCart.style.right = "0");
x.addEventListener('click', () => allCart.style.right = "-500px");

function renderCart() {
    cartSneak.innerHTML = "";

cart.addEventListener('click', () => {
    allCart.style.right = 0
})

x.addEventListener('click', () => {
    allCart.style.right = '-50% '
})
const disCart=document.querySelector('.cart__content')
function renderCart(){
    if(Cart.length==0){
       disCart.innerHTML+=`<div class="cart__empty">
        <img src="./imgs/cart.svg" alt="cart empty" class="cart__empty-img">
        <h2 class="cart__empty-title">Корзина пустая</h2>
        <p class="cart__empty-text">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
        <button class="cart__empty-btn">Вернуться назад</button>
    </div>`
    }
    else{
      
        
        const sneak=Cart.map((item)=>{
return `<div class="sneakers__content">
                    <img src="" alt="" class="sneakers__img">
                    <div class="sneakers__text">
                        <h2 class="sneakers__title">${item.title}</h2>
                        <h2 class="sneakers__price"></h2>
                    </div>
                    <button class="sneakers__btn"></button>
                </div>`
        })
        console.log(sneak);
        
        cartSneak.innerHTML=sneak[0]
        
    }
}
renderCart()
const addCart = document.querySelectorAll('.purchases__prise-img')


function funCart() {
    addCart.forEach((add) => {
        add.addEventListener("click", () => {
            const addId = add.getAttribute('data-id');
            console.log(addId);

            const addedCart = sneakers.filter((item) => item.id == addId)
            const found = sneakers.find((item) => item.id == addId)
            if (!found) {
                Cart.push(addedCart[0])
                localStorage.setItem("cart", JSON.stringify(Cart))
            }
        })

    })

}
funCart()


    cartSneak.innerHTML = Cart.map(item => `
        <div class="cart__item">
            <img src="${item.image}" class="cart__item-img">

            <div class="cart__item-text">
                <h2 class="cart__item-title">${item.title}</h2>
                <h2 class="cart__item-price">${item.price}</h2>
            </div>

            <button class="cart__item-btn" data-remove="${item.id}">
                Удалить
            </button>
        </div>
    `).join("");
}






function funCart() {
    document.querySelectorAll('.purchases__prise-plus').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-cart');

            const item = sneakers.find(i => i.id == id);
            if (!item) return;

            Cart.push(item);
            localStorage.setItem('cart', JSON.stringify(Cart));

            renderCart();
        });
    });
}

renderCart();
