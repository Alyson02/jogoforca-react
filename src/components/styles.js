import styled from "styled-components";

export const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`;

export const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Imagem = styled.img`
  width: 50%;
`;

export const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BtnAdicionaPalavra = styled.button`
  border: none;
  outline: none;
  background-color: #27ae60;
  color: white;
  cursor: pointer;
  padding: 12px 24px;
  border-radius: 7px;
`;

export const MarcadoresWapper = styled.ul`
  display: flex;
  gap: 10px;
`;

export const Marcador = styled.li`
  width: 20px;
  border-bottom: 2px solid #121212;
  text-align: center;
  padding-bottom: 5px;
`;

export const AlfabetoWapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
  gap: 10px;
`;

export const AlfabetoLetra = styled.button`
  width: 40px;
  height: 40px;
  background-color: azure;
  border: 2px solid darkblue;
  color: darkblue;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
`;

export const ContainerRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  p {
    font-weight: 400;
    font-size: 20px;
  }
`;

export const InputTexto = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
`;

export const BtnChutar = styled(AlfabetoLetra)`
  width: auto;
`;
