fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const lista = document.getElementById('lista-poemas');
    posts.forEach(post => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <h3 class="titulo-poema">${post.titulo}</h3>
        <p class="autor-poema">por ${post.autor}</p>
        <p class="trecho-poema">"${post.trecho}"</p>
      `;
      lista.appendChild(item);
    });
  })
  .catch(error => console.error('Erro ao carregar os posts:', error));
