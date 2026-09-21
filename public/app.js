"use strict";

const errorBox = document.querySelector('#error');
const list = document.querySelector('#list');
const form = document.querySelector('#form')

async function loadProducts() {

    const response = await fetch('/api/products');

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}



function render(products) {
    list.innerHTML = '';

    for (const product of products) {
        const li = document.createElement('li');
        li.textContent = `${product.title} — ${product.price} грн `;
        list.append(li);
    }
}



async function refresh() {
    try {
        errorBox.textContent = '';
        const products = await loadProducts();

        render(products);
    } catch (err) {
        errorBox.textContent = `Не вдалось завантажити: ${err.message}`;
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const title = data.get('title');
    const price = Number(data.get('price'));

    try {
        errorBox.textContent = '';

        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price }),
        });

        if (!res.ok) {
            const body = await res.json();
            errorBox.textContent = body.error;
            return;
        }

        form.reset();
        await refresh();
    } catch (err) {
        errorBox.textContent = err.message;
    }
    
});

refresh();