const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-series");
const template = document.querySelector("#template-serie");


const apiKey = "cv__NX-ubAbteh2Hk7jh4eRNzaqq3TWwF17ZeKOv3QJzsB-hswOVqURXqPlKKpQhx32";

const apiUrl = "https://api-ds.codeverse.dev.br/api/series";

async function buscarSeries() {


  resposta.textContent="Carregando séries..."
  
  try {
  
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
 
    if(!retorno.ok){
      throw new Error("Não foi possível carregar as séries.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    
    for (const serie of resultado.data){
      

      const card = template.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".nome").textContent = serie.title;
      card.querySelector(".genero").textContent = serie.genero;
      card.querySelector(".numero_temporadas").textContent = serie.numero_temporadas;
      card.querySelector(".ano_lancamento").textContent = serie.ano_lancamento;
      card.querySelector(".plataforma").textContent = serie.plataforma;
      

      

      const imagem = card.querySelector(".imagem-serie");

      if (serie.imageUrl){
        imagem.src = serie.imageUrl;
        imagem.alt = serie.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      // adiciona o card preenchido na tela

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar as séries. Tente novamente!" 
  }
}

// Executar no arquivo

buscarSeries();