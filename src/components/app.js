import imagemInicial from "../assets/img/forca0.png";
import imagemErro1 from "../assets/img/forca1.png";
import imagemErro2 from "../assets/img/forca2.png";
import imagemErro3 from "../assets/img/forca3.png";
import imagemErro4 from "../assets/img/forca4.png";
import imagemErro5 from "../assets/img/forca5.png";
import imagemErro6 from "../assets/img/forca6.png";
import { GlobalStyle } from "./GlobalStyle";
import palavras from "../util";
import { alfabeto } from "../util";
import {
  AlfabetoLetra,
  AlfabetoWapper,
  BtnAdicionaPalavra,
  BtnChutar,
  Container,
  ContainerCol,
  ContainerRow,
  Imagem,
  InputTexto,
  Marcador,
  MarcadoresWapper,
  Preview,
} from "./styles";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [inicio, setInicio] = useState(false);
  const [palavra, setPalavra] = useState([]);
  const btnAlfabetoRef = useRef([]);
  const letraRef = useRef([]);
  const [clicks, setClicks] = useState(0);
  const clicksPermitidos = palavra.length;
  console.log("Clicks permitidos", clicksPermitidos)

  function iniciarJogo() {
    const palavraAleatoria = Array.from(
      palavras[Math.floor(Math.random() * palavras.length)].toUpperCase()
    );
    setPalavra(palavraAleatoria);
    setInicio(true);
    console.log("iniciou");
  }

  function verificarLetra(id) {
    console.log(`Voce cliclou em "${btnAlfabetoRef.current[id].innerText}"`);
    const letraEscolhida = btnAlfabetoRef.current[id].innerText;

    console.log(palavra);
    var result = palavra.reduce((a,curr,index)=>{
      var semAcento = curr.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      console.log(semAcento, letraEscolhida)
      if(semAcento == letraEscolhida)
        a.push(index);
      return a;
    },[]);
  
    if(result.length > 0){
      mostrarLetraAcertada(result);
    }
  }

  function mostrarLetraAcertada(ids){
    for(const id of ids) letraRef.current[id].firstChild.classList.remove("escondido");
  }

  return (
    <Container>
      <GlobalStyle />
      <Preview>
        <Imagem src={imagemInicial} />
        <ContainerCol>
          <BtnAdicionaPalavra onClick={iniciarJogo}>
            Escolher Palavra
          </BtnAdicionaPalavra>
          <MarcadoresWapper>
            {inicio
              ? palavra.map((p, id) => (
                  <Marcador 
                    key={id}
                    ref={el => letraRef.current[id] = el}
                  >
                    <span className="escondido">{p.toUpperCase()}</span>
                  </Marcador>
                ))
              : ""}
          </MarcadoresWapper>
        </ContainerCol>
      </Preview>
      <AlfabetoWapper>
        {alfabeto.map((letra, id) => (
          <AlfabetoLetra
            ref={(el) => (btnAlfabetoRef.current[id] = el)}
            onClick={() => verificarLetra(id)}
            disabled={inicio ? false : true}
            key={id}
          >
            {letra}
          </AlfabetoLetra>
        ))}
      </AlfabetoWapper>
      <ContainerRow>
        <p>Já sei a palavra:</p>
        <InputTexto disabled={inicio ? false : true}></InputTexto>
        <BtnChutar disabled={inicio ? false : true}>Chutar</BtnChutar>
      </ContainerRow>
    </Container>
  );
}
