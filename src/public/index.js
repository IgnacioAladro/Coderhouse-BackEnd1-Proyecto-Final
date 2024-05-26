const socket = io();

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
    const productDeleted = document.querySelector(`li[data-product-id="${productId}"]`);
    if (productDeleted) {productDeleted.remove();}
});