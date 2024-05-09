export const Keys = {
    portfolios: ['portfolios'] as const,
    portfolio: (id: number) => ['portfolio', id] as const,
}
