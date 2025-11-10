let likes = JSON.parse(localStorage.getItem('like')) || [];

const bookmarksContent = document.querySelector('.bookmarks__content');
const bookmarksLink = document.querySelector('.bookmarks__link');

function showBookmarks() {
    if (likes.length === 0) {
        if (bookmarksLink) {
            bookmarksLink.style.display = "none";
        }
        
        bookmarksContent.innerHTML = `
            <div class="bookmarks__smail">
                <img src="../imgs/smail2.svg" alt="smail" class="emtycard__img">
            </div>
            <div class="bookmarks__coment">
                <h3 class="bookmarks__title">Закладок нет :(</h3>
                <p class="bookmarks__text">Вы ничего не добавляли в закладки</p>
                <a href="/" class="bookmarks__btn">
                    <span><img src="../imgs/strelcaemty.png" alt=""></span>
                    Вернуться назад
                </a>
            </div>
        `;
    } else {
        if (bookmarksLink) {
            bookmarksLink.style.display = "block";
        }
        
        bookmarksContent.innerHTML = "";
        
        likes.forEach((item) => {
            bookmarksContent.innerHTML += `
                <div class="purchases__card">
                    <div data-id="${item.id}" class="purchases__like">
                        <img src="../imgs/RedLike.svg" alt="like">
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
        
        addRemoveLikeListeners();
    }
}

function addRemoveLikeListeners() {
    const likeButtons = document.querySelectorAll('.purchases__like');
    
    likeButtons.forEach((button) => {
        button.addEventListener('click', removeLike);
    });
}

function removeLike(event) {
    const button = event.currentTarget;
    const id = button.getAttribute('data-id');
    
    likes = likes.filter((item) => item.id != id);
    
    localStorage.setItem('like', JSON.stringify(likes));
    
    showBookmarks();
}

showBookmarks();