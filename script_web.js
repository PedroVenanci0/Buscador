const paginas = [
  'filmes/blade_runner.html',
  'filmes/duna.html',
  'filmes/interstelar.html',
  'filmes/matrix.html',
  'filmes/mochileiro.html',
  'filmes/nova_pagina.html'
];

async function buscarTermo(termo) {
  const resultados = [];

  for (let pagina of paginas) {
    const resposta = await fetch(pagina);
    const texto = await resposta.text();

    // Identificar quem aponta para essa página
    let apontadaPor = [];
    for (let outraPagina of paginas) {
      if (outraPagina !== pagina) {
        const respOutra = await fetch(outraPagina);
        const textoOutra = await respOutra.text();
        if (textoOutra.includes(pagina)) {
          apontadaPor.push(outraPagina);
        }
      }
    }

    const ocorrencias = (texto.match(new RegExp(termo, 'gi')) || []).length;
    const linksRecebidos = apontadaPor.length;
    const autoreferencia = texto.includes(pagina);

    let pontos = linksRecebidos * 10 + ocorrencias * 5;
    if (autoreferencia) pontos -= 15;

    resultados.push({
      pagina,
      pontos,
      linksRecebidos,
      ocorrencias,
      autoreferencia
    });
  }

  resultados.sort((a, b) => {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    if (b.linksRecebidos !== a.linksRecebidos) return b.linksRecebidos - a.linksRecebidos;
    if (b.ocorrencias !== a.ocorrencias) return b.ocorrencias - a.ocorrencias;
    return a.autoreferencia ? 1 : -1;
  });

  exibirResultados(resultados);
}

function exibirResultados(resultados) {
  const corpo = document.getElementById('results');
  corpo.innerHTML = '';

  resultados.forEach(res => {
    const linha = `
      <tr>
        <td>${res.pagina}</td>
        <td>${res.linksRecebidos}</td>
        <td>${res.ocorrencias}</td>
        <td>${res.pontos}</td>
        <td>${res.autoreferencia}</td>
      </tr>
    `;
    corpo.innerHTML += linha;
  });
}

document.getElementById('search').addEventListener('input', function() {
  const termo = this.value.trim();
  if (termo.length >= 2) {
    buscarTermo(termo);
  } else {
    document.getElementById('results').innerHTML = '';
  }
});
