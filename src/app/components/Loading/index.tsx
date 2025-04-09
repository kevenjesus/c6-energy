import * as S from './style'

interface LoadingProps {
    headline?: string
}

export default function Loading({headline = 'Carregando...'}: LoadingProps) {
    return (
        <S.Loading>
            <S.Headline>{headline}</S.Headline>
            <img src='/loading.gif' width={65} alt={headline} />
        </S.Loading>
    )
}