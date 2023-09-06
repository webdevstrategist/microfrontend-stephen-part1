import {mount} from "products/ProductsIndex"
import { mount as cartMount } from "cart/CartShow"

mount(document.getElementById("products-l"))

cartMount(document.getElementById("cart-l"))