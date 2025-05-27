const axios = require('axios');
const cheerio = require('cheerio');

const paginasVisitadas = new Set();
const dadosPaginas = {};

async function crawl(url) {
  if (paginasVisitadas.has(url)) return;
  paginasVisitadas.add(url);

  try {
    const resposta = await axios.get(url);
    const html = resposta.data;
    const $ = cheerio.load(html);

    const links = [];
    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('#')) { 
        const fullLink = new URL(href, url).href;
        links.push(fullLink);
      }
    });

    dadosPaginas[url] = {
      html,
      links,
      apontadaPor: []
    };

    for (let link of links) {
      await crawl(link);
    }

  } catch (err) {
    console.error(`Erro ao acessar ${url}: ${err.message}`);
  }
}

function construirRelacionamento() {
  for (let pagina in dadosPaginas) {
    dadosPaginas[pagina].links.forEach(link => {
      if (dadosPaginas[link]) {
        dadosPaginas[link].apontadaPor.push(pagina);
      }
    });
  }
}

function buscar(termo) {
  const resultados = [];

  for (let pagina in dadosPaginas) {
    const { html, apontadaPor, links } = dadosPaginas[pagina];
    const autoreferencia = apontadaPor.includes(pagina);
    const ocorrencias = (html.match(new RegExp(termo, 'gi')) || []).length;
    let pontos = apontadaPor.length * 10 + ocorrencias * 5;

    if (autoreferencia) pontos -= 15;

    resultados.push({
      pagina,
      pontos,
      linksRecebidos: apontadaPor.length,
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

  return resultados;
}

(async () => {
  const urlInicial = 'https://pedrovenanci0.github.io/Buscador/filmes/blade_runner.html';
  await crawl(urlInicial);
  construirRelacionamento();

  const termo = 'Universo'; // ou qualquer termo que quiser testar
  const resultado = buscar(termo);

  console.table(resultado);
})();
