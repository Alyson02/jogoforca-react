import { GlobalStyle } from "./GlobalStyle";
import palavras, { imagens } from "../util";
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
import Jogo from "./jogo";
import Letras from "./letras";
import Chute from "./chute";

export default function App() {
  const [inicio, setInicio] = useState(false);
  const [palavra, setPalavra] = useState([]);
  const btnAlfabetoRef = useRef([]);
  const letraRef = useRef([]);
  const [erros, setErros] = useState(0);
  const errosPermitidos = 6;
  const [letrasAcertadas, setLetrasAcertadas] = useState([]);
  const imagemRef = useRef(null);
  const [imagem, setImagem] = useState(0);
  const [chute, setChute] = useState("");
  const [venceu, setVenceu] = useState(false);
  const [perdeu, setPerdeu] = useState(false);
  const inputRef = useRef(null);
  const btnChutarRef = useRef(null);
  console.log(palavra);

  //#region Funções
  function iniciarJogo() {
    const palavraAleatoria = Array.from(
      palavras[Math.floor(Math.random() * palavras.length)].toUpperCase()
    );
    console.log(inicio);
    setPalavra(palavraAleatoria);
    setInicio(true);
  }

  function verificarLetra(id) {
    const letraEscolhida = btnAlfabetoRef.current[id].innerText;
    const result = verificarLetrasAcertadas(letraEscolhida);
    if (result.length > 0) {
      setLetrasAcertadas([...letrasAcertadas, ...result]);
      desabilitarBotoao(btnAlfabetoRef.current[id], true);
      mostrarLetraAcertada(result);
    } else {
      setErros(erros + 1);
      if (imagem < errosPermitidos) setImagem(imagem + 1);
      desabilitarBotoao(btnAlfabetoRef.current[id]);
      if (erros + 1 === errosPermitidos) {
        setPerdeu(true);
        travarInteracao();
      }
    }
  }

  function verificarLetrasAcertadas(letraEscolhida) {
    return palavra.reduce((a, curr, index) => {
      var semAcento = curr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (semAcento === letraEscolhida) a.push(index);
      return a;
    }, []);
  }

  function mostrarLetraAcertada(ids) {
    for (const id of ids)
      letraRef.current[id].firstChild.classList.remove("escondido");
    console.log(letrasAcertadas);
    if (letrasAcertadas.length + 1 === palavra.length) {
      setVenceu(true);
      travarInteracao();
    }
  }

  function desabilitarBotoao(botao, sucesso = false) {
    if (sucesso) {
      botao.disabled = true;
      botao.classList.add("acertou");
    } else {
      botao.disabled = true;
      botao.classList.add("errou");
    }
  }

  function limparBtnsAlfabeto() {
    btnAlfabetoRef.current.forEach((b) => {
      b.classList.remove("acertou");
      b.classList.remove("errou");
    });
  }

  function travarInteracao() {
    btnAlfabetoRef.current.forEach((b) => {
      b.disabled = true;
    });
    inputRef.current.disabled = true;
    btnChutarRef.current.disabled = true;
  }

  function destravarInteracao() {
    btnAlfabetoRef.current.forEach((b) => {
      b.disabled = false;
    });
    inputRef.current.disabled = false;
    btnChutarRef.current.disabled = false;
  }

  function arriscarChute() {
    const palavraString = palavra
      .join("")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (chute.toUpperCase() === palavraString) {
      setVenceu(true);
      travarInteracao();
    } else {
      setPerdeu(true);
      travarInteracao();
      setImagem(6);
    }
  }

  function reiniciar() {
    limparBtnsAlfabeto();
    setInicio(false);
    setVenceu(false);
    setPerdeu(false);
    setLetrasAcertadas([]);
    setImagem(0);
    setErros(0);
    inputRef.current.value = "";
    destravarInteracao();
  }
  //#endregion

  return (
    <Container>
      <GlobalStyle />
      <Jogo
        inicio={inicio}
        imagens={imagens}
        imagem={imagem}
        imagemRef={imagemRef}
        iniciarJogo={iniciarJogo}
        reiniciar={reiniciar}
        palavra={palavra}
        letraRef={letraRef}
        venceu={venceu}
        perdeu={perdeu}
      />
      <Letras
        btnAlfabetoRef={btnAlfabetoRef}
        verificarLetra={verificarLetra}
        inicio={inicio}
      />
      <Chute
        inicio={inicio}
        setChute={setChute}
        inputRef={inputRef}
        btnChutarRef={btnChutarRef}
        arriscarChute={arriscarChute}
      />
    </Container>
  );
}
