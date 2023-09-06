import { faker } from '@faker-js/faker';

const mount = (el) => {
    let products = '';
    [...Array(3)].forEach((value)=>{
        products += `<div>${faker.commerce.productName()}</div>`
    })
    el.innerHTML = products
}

if(process.env.NODE_ENV === "development"){
    const el = document.getElementById("products-list")
    if(el){
        mount(el)
    }
}

export { mount }