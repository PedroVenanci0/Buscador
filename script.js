const paginas = [
    {
      nome: "blade_runner.html",
      apontadaPor: ["blade_runner", "interstellar", "matrix", "mochileiro"]
    },
    {
      nome: "duna.html",
      apontadaPor: ["interstellar", "mochileiro"]
    },
    {
      nome: "matrix.html",
      apontadaPor: ["blade_runner", "interstellar", "mochileiro"]
    },
    {
      nome: "interstellar.html",
      apontadaPor: ["blade_runner"]
    },
    {
      nome: "mochileiro.html",
      apontadaPor: ["blade_runner"]
    }
  ];

  function renderizarResultados(filtro = "") {
    const corpo = document.getElementById("results");
    corpo.innerHTML = "";

    paginas.forEach(pagina => {
      if (pagina.nome.toLowerCase().includes(filtro.toLowerCase())) {
        const linha = `
          <tr>
            <td>${pagina.nome}</td>
            <td>${pagina.apontadaPor.join(", ")}</td>
            <td>${pagina.apontadaPor.length}</td>
          </tr>
        `;
        corpo.innerHTML += linha;
      }
    });
  }

  document.getElementById("search").addEventListener("input", function () {
    renderizarResultados(this.value);
  });

  // Mostrar todos inicialmente
  renderizarResultados();