import { BtnChutar, ContainerRow, InputTexto } from "./styles";

export default function Chute({inicio, setChute, inputRef, btnChutarRef, arriscarChute}) {
  return (
    <ContainerRow>
      <p>Já sei a palavra:</p>
      <InputTexto
        disabled={inicio ? false : true}
        onChange={(e) => setChute(e.target.value)}
        ref={inputRef}
      ></InputTexto>
      <BtnChutar
        ref={btnChutarRef}
        disabled={inicio ? false : true}
        onClick={arriscarChute}
      >
        Chutar
      </BtnChutar>
    </ContainerRow>
  );
}
