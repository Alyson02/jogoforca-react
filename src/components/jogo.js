import {
  BtnAdicionaPalavra,
  ContainerCol,
  Imagem,
  Marcador,
  MarcadoresWapper,
  Preview,
} from "./styles";

export default function Jogo({ imagens, imagem, imagemRef, inicio, reiniciar, iniciarJogo, palavra, letraRef, venceu, perdeu}) {
  return (
    <Preview>
      <Imagem src={imagens[imagem]} ref={imagemRef} data-identifier="game-image"/>
      <ContainerCol>
        <BtnAdicionaPalavra
          onClick={() => {
            if (inicio === false) {
              iniciarJogo();
            } else {
              reiniciar();
              iniciarJogo();
            }
          }}
          data-identifier="choose-word"
        >
          Escolher Palavra
        </BtnAdicionaPalavra>
        <MarcadoresWapper data-identifier="word">
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
  );
}
