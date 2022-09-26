import { alfabeto } from "../util";
import { AlfabetoLetra, AlfabetoWapper } from "./styles";

export default function Letras({btnAlfabetoRef, verificarLetra, inicio}) {
  return(
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
  );
}
