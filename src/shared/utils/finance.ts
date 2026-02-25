/**
 * Calcule le prix converti selon le taux du jour
 */
export const convertCurrency = (amount: number, rate: number, target: 'USD' | 'CDF') => {
    if (target === 'USD') {
        return Number((amount / rate).toFixed(2));
    }
    return Math.round(amount * rate);
};

/**
 * Calcule la marge commerciale
 */
export const calculateMargin = (sellPrice: number, buyPrice: number) => {
    const profit = sellPrice - buyPrice;
    const percentage = sellPrice > 0 ? (profit / sellPrice) * 100 : 0;
    return {
        profit,
        percentage: Number(percentage.toFixed(2))
    };
};