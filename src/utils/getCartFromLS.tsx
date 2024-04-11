export default function getCartFromLS() {
    const data = localStorage.getItem("cart")
    return data ? JSON.parse(data) : []
}