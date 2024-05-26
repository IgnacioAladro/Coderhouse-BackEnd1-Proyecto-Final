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

/* socket.on('deleteProduct', (productId) => {
    console.log('Evento con ID:', productId);

    const deleteProduct = (productItem) => {
        try {
            productItem.remove();
            console.log('Producto eliminado:', productItem.dataset.productId);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const productItem = document.querySelector(`li[data-product-id="${productId}"]`);
    
    if (productItem) {
        deleteProduct(productItem);
    } else {
        console.log('Producto no encontrado para eliminar:', productId);
    }
}); */

/* socket.on('deleteProduct', (productId) => {
    console.log('Eliminar producto con ID:', productId);

    const productList = document.getElementById('products-list');
    const productItems = productList.getElementsByClassName('product-item');

    for (let i = 0; i < productItems.length; i++) {
        const productItem = productItems[i];
        const productIdInput = productItem.querySelector('input[type="hidden"]');

        if (productIdInput && productIdInput.value === productId) {
            productList.removeChild(productItem);
            console.log('Producto eliminado:', productId);
            break;
        }
    }
}); */


socket.on('deleteProduct', (productId) => {
    console.log('Eliminar producto con ID:', productId);

    const productList = document.getElementById('products-list');
    const productItems = productList.querySelectorAll('li[data-product-id]');

    for (let i = 0; i < productItems.length; i++) {
        const productItem = productItems[i];
        const productItemId = productItem.getAttribute('data-product-id');

        if (productItemId === productId) {
            productItem.remove();
            console.log('Producto eliminado:', productId);
            break;
        }
    }
});