let fruits = [
    {id: 0, title: 'apples', price: 10, img: 'https://i.ytimg.com/vi/7bHUhmgZJKc/hqdefault.jpg'},
    {id: 1,title: 'oranges', price: 20, img: 'http://zayifliyoruz.biz/wp-content/uploads/2015/01/portakal.jpg'},
    {id: 2,title: 'mango', price: 30, img: 'https://www.med2.ru/timg/160/0260200x200.jpg'}
]

const modalPrice = $.modal({
    title: 'Цена на товар',
    isClosable: true,
    content: '',
    width: '',
    footerButtons: [
    {text: 'Закрыть', type: 'primary', handler() {
    	modalPrice.close()
    }}
    ]
})



const toHTML = fruit => `
<div class="col">
	<div class="card" style="width: 18rem;">
        <img src=${fruit.img} class="card-img-top" alt="${fruit.title}">
            <div class="card-body" data-title=${fruit.title}>
                <h5 class="card-title" >${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a> 
                <a href="#" class="btn btn-danger" data-btn="delete" data-id="${fruit.id}">Удалить</a> 
            </div>
    </div>
</div>
`
document.addEventListener('click', (event) => {
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    fruit = fruits.find(p => p.id === id)
    if(btnType === 'price') {
        modalPrice.open()
                modalPrice.setContent(
                `<p> Стоимость ${fruit.title} равна <span><b>${fruit.price}</b>$</span></p>`
        )
    }
    else if(btnType === 'delete') {
        $.confirm({
            title: 'Вы уверены?',
            content: `
            <p>Вы удаляете ${fruit.title}</p>
            `
        }).then( () => {
            fruits = fruits.filter(f => f.id !== id)
            render()
            console.log('delete')
        }).catch( () => {
            console.log('cancele')  
        })
    }
    })

const render = () => document.querySelector('#fruits').innerHTML = fruits.map(toHTML).join('')

render()







///////////////////////////////////////////////////////
//Кнопки для окна "Посмотеть цену"
const fruitPriceModalButtons = [
    {text: 'Хорошо', type: 'primary', handler() {
        console.log('primary button clicked')
        modal.close()
    }}
]

//Кнопки для окна "Удалить"
const fruitDeleteModalButtons = [
    {text: 'Оставить', type: 'primary', handler() {
        console.log('primary button clicked')
        modal.close()
    }},
    {text: 'Удалить', type: 'danger', handler(el) {
        console.log('danger button clicked')
    }}
]

////////Кнопки для карточек товаров
const fruitCardButtons = [
    {text: 'Посмотреть цену', type: 'primary', handler(el) {
        let content = `
            <p data-${el.toElement.parentNode.parentNode.dataset.title}>
                Цена на ${el.toElement.parentNode.parentNode.dataset.title} : 
                ${el.toElement.parentNode.parentNode.dataset.price}
            </p>
            `
        modal.setContent(content)
        modal.setButtons(fruitPriceModalButtons)
        modal.open()
    }},
    {text: 'Удалить', type: 'danger', handler(el) {
        console.log('danger button clicked')
        let content = `Удалить ${el.toElement.parentNode.parentNode.dataset.title} из списка товаров?`
        modal.setContent(content)
        modal.setButtons(fruitDeleteModalButtons)
        modal.open()
    }}
]
//////

//////Первичные опции модельного окна

////////


