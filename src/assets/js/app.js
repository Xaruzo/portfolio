import { portfolioData } from './portfolioData.js';
import { PortfolioView } from './portfolioView.js';
import { PortfolioController } from './portfolioController.js';

const init = () => {
    try {
        const view = new PortfolioView();
        const controller = new PortfolioController(portfolioData, view);
        controller.init();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
