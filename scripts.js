document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:8000/api/products/')
        .then(response => response.json())
        .then(data => {
            const ul = document.querySelector('ul.list-group');
            data.forEach(product => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${product.name} - ${product.description} - R$${product.price}`;
                ul.appendChild(li);
            });
        })
        .catch(error => console.error('Erro:', error));
});

document.querySelector('#createProduct').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('input[name="productName"]').value;
    const description = document.querySelector('input[name="productDescription"]').value;
    const price = parseFloat(document.querySelector('input[name="productPrice"]').value);
    const stock = parseInt(document.querySelector('input[name="productQuantity"]').value, 10);

    const product = {
        name,
        description,
        price,
        stock
    };

    fetch('http://127.0.0.1:8000/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Produto criado:', data);
            // Atualizar a lista de produtos sem recarregar a página
            const ul = document.querySelector('ul.list-group');
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${data.name} - ${data.description} - R$${data.price}`;
            ul.appendChild(li);

            // Limpar o formulário após o envio
            document.querySelector('#createProduct').reset();

            // Fechar o modal após o envio
            const modalElement = document.querySelector('#addProductModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});
