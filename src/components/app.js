import { GlobalStyle } from "./GlobalStyle";
import palavras, { imagens, alfabeto } from "../util";
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
import { useRef, useState } from "react";

export default function App() {
  const [inicio, setInicio] = useState(false);
  const [palavra, setPalavra] = useState([]);
  const btnAlfabetoRef = useRef([]);
  const letraRef = useRef([]);
  const [clicks, setClicks] = useState(0);
  const clicksPermitidos = 6;
  const [letrasAcertadas, setLetrasAcertadas] = useState([]);
  const imagemRef = useRef(null);
  const [imagem, setImagem] = useState(0);
  const [chute, setChute] = useState("");
  const [venceu, setVenceu] = useState(false);
  const [perdeu, setPerdeu] = useState(false);
  const inputRef = useRef(null)
  console.log("Clicks permitidos", clicksPermitidos);
  console.log("Imagens", imagens);

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
    var result = palavra.reduce((a, curr, index) => {
      var semAcento = curr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      console.log(semAcento, letraEscolhida);
      if (semAcento === letraEscolhida) a.push(index);
      return a;
    }, []);

    if (result.length > 0) {
      const letras = [...letrasAcertadas];
      letras.push(...result);
      console.log(letras);
      setLetrasAcertadas(letras);
      desabilitarBotoao(btnAlfabetoRef.current[id], true);
      mostrarLetraAcertada(result, letras);
    } else {
      setClicks(clicks + 1);
      console.log(clicks);
      if (imagem < clicksPermitidos) setImagem(imagem + 1);
      desabilitarBotoao(btnAlfabetoRef.current[id]);
      if (clicks + 1 === clicksPermitidos) {
        setPerdeu(true);
        travarBotoes();
        // setTimeout(() => {
        //   limparBtnsAlfabeto();
        //   setInicio(false);
        //   setPerdeu(false);
        //   setImagem(0);
        //   setClicks(0);
        // }, 5000);
      }
    }
  }

  function mostrarLetraAcertada(ids, letras) {
    for (const id of ids)
      letraRef.current[id].firstChild.classList.remove("escondido");
    if (letras.length === palavra.length) {
      // letras.forEach((l) => {
      //   letraRef.current[l].firstChild.classList.add("venceu");
      // });
      setVenceu(true);
      travarBotoes();
      reiniciar()
      // setTimeout(() => {
      //   limparBtnsAlfabeto();
      //   setInicio(false);
      //   setVenceu(false);
      // }, 5000);
    }
  }

  function desabilitarBotoao(botao, sucesso = false) {
    if (sucesso) {
      console.log(botao);
      botao.disabled = true;
      botao.classList.add("acertou");
    } else {
      console.log(botao);
      botao.disabled = true;
      botao.classList.add("errou");
    }
  }

  function limparBtnsAlfabeto() {
    // setTimeout(() => {
    btnAlfabetoRef.current.forEach((b) => {
      b.classList.remove("acertou");
      b.classList.remove("errou");
    });
    // }, 5000);
  }

  function travarBotoes() {
    btnAlfabetoRef.current.forEach((b) => {
      b.disabled = true;
    });
  }

  function arriscarChute() {
    const palavraString = palavra.join("");
    if (chute.toUpperCase() === palavraString) {
      setVenceu(true);

      reiniciar();
      // setTimeout(() => {
      //   limparBtnsAlfabeto();
      //   setInicio(false);
      //   setVenceu(false);
      // }, 5000);
    } else {
      setPerdeu(true);
      reiniciar();
    }
  }

  function reiniciar() {
    setTimeout(() => {
      limparBtnsAlfabeto();
      setInicio(false);
      setVenceu(false);
      setPerdeu(false);
      setImagem(0);
      setClicks(0);
      inputRef.current.value = "";
    }, 5000);    
  }

  return (
    <Container>
      <GlobalStyle />
      <Preview>
        <Imagem src={imagens[imagem]} ref={imagemRef} />
        <ContainerCol>
          <BtnAdicionaPalavra onClick={iniciarJogo}>
            Escolher Palavra
          </BtnAdicionaPalavra>
          <MarcadoresWapper>
            {inicio
              ? palavra.map((p, id) => (
                  <Marcador key={id} ref={(el) => (letraRef.current[id] = el)}>
                    <span
                      className={`${
                        venceu ? "venceu" : perdeu ? "perdeu" : "escondido"
                      }`}
                    >
                      {p.toUpperCase()}
                    </span>
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
        <InputTexto
          disabled={inicio ? false : true}
          onChange={(e) => setChute(e.target.value)}
          ref={inputRef}
        ></InputTexto>
        <BtnChutar disabled={inicio ? false : true} onClick={arriscarChute}>
          Chutar
        </BtnChutar>
      </ContainerRow>
    </Container>
  );
}
