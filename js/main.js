const Likes = JSON.parse(localStorage.getItem('like')) || []
console.log(Likes);


const sneakers = [
    {
        "id": 1,
        "title": "Мужские Кроссовки Nike Blazer Mid Suede",
        "price": 12999,
        "add": false,
        "image": ""  // «Pine Green/White» Suede вариант. :contentReference[oaicite:0]{index=0}
    },
    {
        "id": 2,
        "title": "Мужские Кроссовки Nike Air Max 270",
        "price": 12999,
        "add": false,
        "image": ""  // White/Total Orange вариант. :contentReference[oaicite:1]{index=1}
    },
    {
        "id": 3,
        "title": "Мужские Кроссовки Nike Blazer Mid Suede (бежевые)",
        "price": 8499,
        "add": false,
        "image": ""  // пример бежевого варианта (можно заменить) :contentReference[oaicite:2]{index=2}
    },
    {
        "id": 4,
        "title": "Кроссовки Puma X Aka Boku Future Rider",
        "price": 8999,
        "add": false,
        "image": "https://images.puma.com/image/upload/f_auto%2Cq_auto%2Cb_rgb%3Afafafa%2Cw_2000%2Ch_2000/global/380169/01/sv01/fmt/png/PUMA-x-AKA-BOKU-Future-Rider-Trainers.png"  // multicolor вариант. :contentReference[oaicite:3]{index=3}
    },
    {
        "id": 5,
        "title": "Мужские Кроссовки Under Armour Curry 8",
        "price": 15199,
        "add": false,
        "image": ""  // реальное линка не найдена, вставь позже.
    },
    {
        "id": 6,
        "title": "Мужские Кроссовки Nike Kyrie 7",
        "price": 11299,
        "add": false,
        "image": ""  // пример, заменить на актуальное. :contentReference[oaicite:4]{index=4}
    },
    {
        "id": 7,
        "title": "Мужские Кроссовки Jordan Air Jordan 11",
        "price": 10799,
        "add": false,
        "image": ""  // Black/Red «Bred» вариант. :contentReference[oaicite:5]{index=5}
    },
    {
        "id": 8,
        "title": "Мужские Кроссовки Nike LeBron XVIII",
        "price": 16499,
        "add": false,
        "image": ""  // ссылка пример, заменить на точную. :contentReference[oaicite:6]{index=6}
    },
    {
        "id": 9,
        "title": "Мужские Кроссовки Nike LeBron XVIII Low",
        "price": 13999,
        "add": false,
        "image": ""  // вариант с низким верхом. :contentReference[oaicite:7]{index=7}
    },
    {
        "id": 10,
        "title": "Мужские Кроссовки Nike Blazer Mid Suede (зелёные вариант 2)",
        "price": 8499,
        "add": false,
        "image": ""  // аналогичный зелёный вариант. :contentReference[oaicite:8]{index=8}
    },
    {
        "id": 11,
        "title": "Кроссовки Puma X Aka Boku Future Rider (вариант 2)",
        "price": 8999,
        "add": false,
        "image": ""  // второй вариант. :contentReference[oaicite:9]{index=9}
    },
    {
        "id": 12,
        "title": "Мужские Кроссовки Nike Kyrie Flytrap IV",
        "price": 11299,
        "add": false,
        "image": ""  // пример, нужна точная ссылка.
    }
]

const content = document.querySelector('.sneakers__content')



const CardLike = '../imgs/cardlike.svg';
const RedLike = '../imgs/RedLike.svg'

function renderCard(crasowok) {
    console.log(sneakers);
    content.innerHTML=" "
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


    const like = document.querySelectorAll('.purchases__like')
    like.forEach((elemt) => {
        elemt.addEventListener('click', () => {
            let id = elemt.getAttribute('data-id')
            console.log(id);

            const newSneak = sneakers.filter((item) => {
                if(item.id == id) {
                    return {
                        "id": item.id,
                        "title": item.title,
                        "price": item.price,
                        "add": !item.add,
                        "image": item.image  // «Pine Green/White» Suede вариант. :contentReference[oaicite:0]{index=0}
                    }
                }
                const found=Likes.find((item)=>item.id==id)
            })
            if(!found){
                Likes.push(newSneak[0])
  
            }
            else{
                
            }

            localStorage.setItem("like",JSON.stringify(Likes))
            console.log(newSneak);
        })
    })

}
renderCard(sneakers)



