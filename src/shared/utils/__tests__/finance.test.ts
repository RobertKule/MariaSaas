import { describe, it, expect } from 'vitest';
import { convertCurrency, calculateMargin } from '../finance';

describe('Finance Utils', () => {
    it('devrait convertir correctement les CDF en USD', () => {
        const rate = 2800;
        const amountInCDF = 5600;
        expect(convertCurrency(amountInCDF, rate, 'USD')).toBe(2.00);
    });

    it('devrait calculer une marge correcte', () => {
        const buy = 10;
        const sell = 15;
        const result = calculateMargin(sell, buy);
        expect(result.profit).toBe(5);
        expect(result.percentage).toBe(33.33);
    });

    it('devrait renvoyer une marge de 0 si le prix de vente est 0', () => {
        expect(calculateMargin(0, 10).percentage).toBe(0);
    });
});