let Likes = JSON.parse(localStorage.getItem('like')) || []
const book = document.querySelector('.bookmarks__content')
const link=document.querySelector('.bookmarks__link')
console.log(book);

console.log(Likes);

function haveCrosovok(items) {
    if (items) {
        book.innerHTML = ''
        Likes.forEach(item=> {
        
        book.innerHTML += `
                                     <div class="purchases__card">
                    <div data-id="${item.id}" class="purchases__like">
                        <img class="" src=".././imgs/RedLike.svg" alt="like">
                    </div>
                    <img  src="${item.image}" alt="" class="purchases__crosovok">
                    <p class="purchases__about">${item.title}</p>
                    <div class="purchases__prise">
                        <p class="purchases__prise-text">
                            <span>ЦЕНА:</span>  ${item.price}
                        </p> 
                        <div class="purchases__prise-plus">
                            <img class="purchases__prise-img" src="../imgs/plus.svg" alt="plus">
                        </div>
                    </div>
                </div> `
        })
    }  if(Likes.length==0) {
            link.style.display="none"
        book.innerHTML=`
                    <div class="bookmarks__smail">
                        <img src="../imgs/smail2.svg" alt="smail" class="emtycard__img">
                    </div>
                    <div class="bookmarks__coment">
                        <h3 class="bookmarks__title">Закладок нет :(</h3>
                        <p class="bookmarks__text">Вы ничего не добавляли в закладки</p>
                        <a href="/" class="bookmarks__btn"><span><img src="../imgs/strelcaemty.png" alt=""></span>Вернуться
                            назад</a>
                    </div>
        `
    }

    function notLike(items) {
        const dontLike = document.querySelectorAll('.purchases__like')
            dontLike.forEach((element) => {
                element.addEventListener('click', () => {
                    
                    let id = element.getAttribute('data-id')
                    const found=Likes.find((item)=>item.id==id)
                    Likes.splice(Likes.indexOf(found),1)
                    
                                localStorage.setItem("like",JSON.stringify(Likes))
                                console.log(Likes);
                                haveCrosovok(Likes)
                })
            })
                        
        }
    notLike()
    
}
haveCrosovok(Likes)

