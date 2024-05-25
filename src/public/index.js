const socket = io();

socket.on('productAdded', (product) => {
    const productList = document.getElementById('product-list');
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

socket.on('deleteProduct', (product) => {
    const productList = document.getElementById('product-list');
    const productItems = productList.getElementsByClassName('product-item');
    for (let i = 0; i < productItems.length; i++) {
        const title = productItems[i].querySelector('h3').textContent;
        if (title === allProducts[product].title) {
            productList.removeChild(productItems[i]);
            break;
        }
    }
});
