import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1400px;
    border-radius: 8px;
    background-color: #fff;
    padding: 30px;
    margin: 100px auto;
`

export const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

export const Table = styled.table`
    width: 100%;
    min-width: 600px;
`

export const Th = styled.th`
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: #6D05F2;
    color: #fff;
    font-family: "Manrope", sans-serif;
`

export const Td = styled.td`
    padding: 20px;
    font-size: 15px;
    font-weight: normal;
    font-family: "Manrope", sans-serif;
`

export const Headline = styled.h2`
    font-size: 25px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Manrope", sans-serif;
    flex-direction: column;
    gap: 15px;
    @media (min-width: 1200px) {
        flex-direction: row;
    }
`

export const HeadlineActions = styled.div`
    display: flex;
    gap: 15px;
`

export const Input = styled.input`
    width: 100%;
    background-color:#dcd8d8;
    border-width: 0px 0px 0px 0px;
    border-radius: 15px 15px 15px 15px;
    font-size: 20px;
    font-weight: 400;
    color: #000;
    padding: 16px 23px 16px 23px;
    outline: none;
    margin-bottom: 15px;
    &::placeholder {
        color: #000;
    }
`

export const Select = styled.select`
  background-color: #dcd8d8;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 400;
  color: #000;
  padding: 16px 23px;
  width: 100%;
  margin-bottom: 15px;

  &::placeholder {
    color: #000;
  }
`

export const FormGroup = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin: 20px 0;
    input {
        margin-bottom: 0;
    }
`

export const ListModal = styled.div`
    max-height: 350px;
    overflow-y: auto;
`