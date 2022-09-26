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
      <Imagem src={imagens[imagem]} ref={imagemRef} />
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
        >
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
  );
}
