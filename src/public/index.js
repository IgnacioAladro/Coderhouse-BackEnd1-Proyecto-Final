const socket = io();

socket.on('productAdded', (product) => {
    const productList = document.getElementById('product-list');
    const newProduct = document.createElement('li');
    newProduct.textContent = `${product.title} - ${product.price}`;
    productList.appendChild(newProduct);
});

socket.on('productRemoved', (productId) => {
    const productList = document.getElementById('product-list');
    const productItems = productList.getElementsByTagName('li');
    for (let i = 0; i < productItems.length; i++) {
        if (productItems[i].textContent.startsWith(`${allProducts[productId].title}`)) {
            productList.removeChild(productItems[i]);
            break;
        }
    }
});
