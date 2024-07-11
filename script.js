function contribuir(nomeDoItem, ofertaDoItem, codigoDoItem) {
    const numeroWhatsApp = '41998141014';
    const mensagem = `Olá, Rôney, gostaria de contribuir adquirindo o ${nomeDoItem} por ${ofertaDoItem}`;
    const url = `https://api.whatsapp.com/send?phone=+55${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
