document.addEventListener('DOMContentLoaded', () => {
    // Ordena os itens na carga da página
    sortItems();
});

function contribuir(nomeDoItem, ofertaDoItem, codigoDoItem) {
    const numeroWhatsApp = '41998141014';
    const mensagem = `Olá, Rôney, gostaria de contribuir adquirindo o ${nomeDoItem} por ${ofertaDoItem}`;
    const url = `https://api.whatsapp.com/send?phone=+55${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterItems() {
    const input = removeAccents(document.getElementById('searchInput').value.toLowerCase());
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const sortPrice = document.getElementById('sortPrice').value;
    const itemsContainer = document.querySelector('.grid-container');
    const items = itemsContainer.querySelectorAll('.item');

    // Converte NodeList para array para facilitar a manipulação
    const itemsArray = Array.from(items);

    itemsArray.forEach(item => {
        const title = removeAccents(item.querySelector('.item-nome').textContent.toLowerCase());
        const details = removeAccents(item.querySelector('.item-tipo').innerHTML.toLowerCase());
        const priceText = details.match(/r\$ (\d+,\d+)/i);
        const price = priceText ? parseFloat(priceText[1].replace(',', '.')) : 0;

        const matchesText = title.indexOf(input) > -1 || details.indexOf(input) > -1;
        const matchesPrice = (!minPrice || price >= parseFloat(minPrice)) && (!maxPrice || price <= parseFloat(maxPrice));

        if (matchesText && matchesPrice) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    // Ordenação por preço
    if (sortPrice === 'asc') {
        itemsArray.sort((a, b) => {
            const priceA = getPrice(a);
            const priceB = getPrice(b);
            return priceA - priceB;
        });
    } else if (sortPrice === 'desc') {
        itemsArray.sort((a, b) => {
            const priceA = getPrice(a);
            const priceB = getPrice(b);
            return priceB - priceA;
        });
    }

    // Ordena para colocar itens não vendidos primeiro
    itemsArray.sort((a, b) => {
        const isSoldA = isSold(a);
        const isSoldB = isSold(b);
        if (isSoldA && !isSoldB) {
            return 1;
        } else if (!isSoldA && isSoldB) {
            return -1;
        } else {
            return 0;
        }
    });

    // Reorganiza os itens conforme a ordenação
    itemsArray.forEach(item => itemsContainer.appendChild(item));
}

function getPrice(item) {
    const details = item.querySelector('.item-tipo').innerHTML.toLowerCase();
    const priceText = details.match(/r\$ (\d+,\d+)/i);
    return priceText ? parseFloat(priceText[1].replace(',', '.')) : 0;
}

function isSold(item) {
    return item.querySelector('.item-foto[src="./Fotos/Vendido.png"]') !== null;
}

function sortItems() {
    const itemsContainer = document.querySelector('.grid-container');
    const itemsArray = Array.from(itemsContainer.children);

    // Ordena para colocar itens não vendidos primeiro
    itemsArray.sort((a, b) => {
        const isSoldA = isSold(a);
        const isSoldB = isSold(b);
        if (isSoldA && !isSoldB) {
            return 1;
        } else if (!isSoldA && isSoldB) {
            return -1;
        } else {
            return 0;
        }
    });

    // Reorganiza os itens conforme a ordenação
    itemsArray.forEach(item => itemsContainer.appendChild(item));
}



