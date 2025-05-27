# Buscador Simplificado de Páginas de Filmes

## 📚 Descrição

Este projeto é um **buscador simplificado** que navega entre páginas HTML de filmes de ficção científica, coleta links, extrai informações e ranqueia os resultados com base em critérios definidos.

## 👥 Integrantes da Equipe

- Pedro Victor Venancio dos Santos
- Felipe Gabriel
- Kawã Sousa

## 🚀 Como funciona

- As páginas possuem links entre si e estão hospedadas no GitHub Pages.
- O **crawler** inicia a partir de uma das páginas e percorre todas as demais, evitando visitar a mesma página mais de uma vez.
- O **buscador** aplica os seguintes critérios de ranqueamento:

  - ➕ **+10 pontos** por cada link recebido.
  - ➕ **+5 pontos** por cada ocorrência do termo buscado.
  - ➖ **-15 pontos** de penalização por autoreferência.

- Os resultados da busca são exibidos de forma clara e ordenada.

## 🛠️ Tecnologias utilizadas

- **JavaScript (Node.js)**
- **Axios** — para requisições HTTP.
- **Cheerio** — para extração e manipulação de conteúdo HTML.
- **HTML5** — estrutura das páginas.
- **GitHub Pages** — hospedagem das páginas.
