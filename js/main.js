let Likes = JSON.parse(localStorage.getItem('like')) || []
let sneakers = JSON.parse(localStorage.getItem('sneakers')) || []






const content = document.querySelector('.sneakers__content')


const CardLike = '../imgs/cardlike.svg';
const RedLike = '../imgs/RedLike.svg'

function renderCard(crasowok) {
    content.innerHTML = " "
    crasowok.forEach(item => {
        content.innerHTML += `
                         <div class="purchases__card">
                    <div data-id="${item.id}" class="purchases__like">
                        <img class="" src="${item.add ? RedLike : CardLike}" alt="like">
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
                </div> 
        `
    });

    const likes = document.querySelectorAll('.purchases__like')
    likes.forEach((elemt) => {
        elemt.addEventListener('click', () => {
            let id = elemt.getAttribute('data-id')
            // console.log(id);
            const newSneak = sneakers.filter((item) => {
                if (item.id == id) {
                    return item
                }
            }).map((item) => {
                return {
                    "id": item.id,
                    "title": item.title,
                    "price": item.price,
                    "add": true,
                    "image": item.image  // «Pine Green/White» Suede вариант. :contentReference[oaicite:0]{index=0}
                }
            })

            sneakers = sneakers.map((item) => {
                if (item.id == id) {
                    return {
                        "id": item.id,
                        "title": item.title,
                        "price": item.price,
                        "add": !item.add,
                        "image": item.image  // «Pine Green/White» Suede вариант. :contentReference[oaicite:0]{index=0}
                    }

                }
                else {
                    return item
                }
            })
            const found = Likes.find((item) => item.id == id)


            if (!found) {
                Likes.push(newSneak[0])
                console.log(Likes);

            }
            else {
                Likes.splice(Likes.indexOf(found), 1)


            }
            localStorage.setItem("like", JSON.stringify(Likes))


            localStorage.setItem("sneakers", JSON.stringify(sneakers))
            renderCard(sneakers)

        })
    })
}

renderCard(sneakers)

const input = document.querySelector('.sneakers__inp')
const btn = document.querySelector('.sneakers__lupa')

let val

btn.addEventListener('click', () => {

    val = input.value
    console.log(val);
    search
})


function search() {

    const filterSneakers = sneakers.filter((item) => {
        if (item.price != val) return item
    })
    console.log(filterSneakers);
    filterSneakers.forEach((item) => {
        content.innerHTML = ""
        content.innerHTML += `
                         <div class="purchases__card">
                    <div data-id="${item.id}" class="purchases__like">
                        <img class="" src="${item.add ? RedLike : CardLike}" alt="like">
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
                </div> 
        `
    })

}


