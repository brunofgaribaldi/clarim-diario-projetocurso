import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NewsCard from './NewsCard'

describe('NewsCard', () => {
    it('mostra a categoria e o título recebidos por props', () => {
        render(
            <MemoryRouter>
                <NewsCard id={1} categoria="Cidade" titulo="Metrô terá horário estendido" />
            </MemoryRouter>
        )

        expect(screen.getByText('Cidade')).toBeInTheDocument()
        expect(screen.getByText('Metrô terá horário estendido')).toBeInTheDocument()
    })

    it('não mostrar parágrafo de resumo quando a prop não vem', () => {
        render(
            <MemoryRouter>
                <NewsCard id={2} categoria="Esportes" titulo="Knicks vencem" />
            </MemoryRouter>
        )

        expect(screen.queryByText(/Madison/)).not.toBeInTheDocument()
    })
})