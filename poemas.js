function corrigirTexto(texto, callback) {
  fetch('https://api.languagetoolplus.com/v2/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      language: 'pt-BR',
      text: texto
    })
  })
  .then(res => res.json())
  .then(data => {
    let corrigido = texto;
    data.matches.forEach(match => {
      const replacement = match.replacements[0]?.value;
      if (replacement) {
        corrigido = corrigido.replace(match.context.text.substr(match.context.offset, match.context.length), replacement);
      }
    });
    callback(corrigido);
  })
  .catch(error => {
    console.error('Erro ao corrigir:', error);
    callback(null);
  });
}

fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const lista = document.getElementById('lista-poemas');
    posts.forEach(post => {
      const item = document.createElement('div');
      item.classList.add('post-card');

      item.innerHTML = `
        <div class="post-conteudo">
          <h3>${post.titulo}</h3>
          <p class="autor">@${post.autor}</p>
          <p class="trecho original">"${post.trecho}"</p>
          <button class="corrigir-btn">Corrigir</button>
          <p class="corrigido" style="display:none;"></p>
        </div>
      `;

      const botao = item.querySelector('.corrigir-btn');
      const paragrafoCorrigido = item.querySelector('.corrigido');

      botao.addEventListener('click', () => {
        botao.innerText = 'Corrigindo...';
        corrigirTexto(post.trecho, (corrigido) => {
          if (corrigido) {
            paragrafoCorrigido.innerText = `"${corrigido}"`;
            paragrafoCorrigido.style.display = 'block';
            botao.innerText = 'Corrigido!';
          } else {
            paragrafoCorrigido.innerText = 'Erro ao corrigir.';
            paragrafoCorrigido.style.display = 'block';
            botao.innerText = 'Tentar novamente';
          }
        });
      });

      lista.appendChild(item);
    });
  });
