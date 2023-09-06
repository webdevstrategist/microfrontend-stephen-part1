import { faker } from '@faker-js/faker';


const mount = (el) => {
    const size = faker.datatype.number({
        'min': 1,
        'max': 20
    });
    
    const cart = `<p>Cart is having ${ size } items.</p>`
    el.innerHTML = cart
}

if(process.env.NODE_ENV === "development"){
    const el = document.getElementById("cart-dev")
    if(el){
        mount(el)
    }
}

export { mount }