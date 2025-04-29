import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1400px;
    border-radius: 8px;
    background-color: #fff;
    padding: 30px;
    margin: 100px auto;
`

export const Table = styled.table`
    width: 100%;
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
`

export const HeadlineActions = styled.div`
    display: flex;
    gap: 15px;
`