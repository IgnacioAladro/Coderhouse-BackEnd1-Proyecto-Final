const socket = io();

let productsListON = [];

socket.on('initialProducts', (products) => {

})

socket.on('productAdded', (product) => {
    const productList = document.getElementById('products-list');
    const newProduct = document.createElement('li');
    newProduct.classList.add('product-item');

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const title = document.createElement('h3');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `Precio: $${product.price}`;

    productInfo.appendChild(title);
    productInfo.appendChild(description);
    productInfo.appendChild(price);
    newProduct.appendChild(productInfo);
    productList.appendChild(newProduct);
});

socket.on('deleteProduct', (productId) => {
    console.log('Se escucho la eliminacion del producto con ID:', productId);

    const productList = document.getElementById('products-list');
    const productItems = productList.querySelectorAll('li[data-product-id]');

    for (let i = 0; i < productItems.length; i++) {
        const productItem = productItems[i];
        const productItemId = productItem.getAttribute('data-product-id');

        if (productItemId === productId) {
            productItem.remove();
            console.log(`El prodcuto con ID ${productId} se a eliminado de la vista del cliente`);
            break;
        }
    }
});

