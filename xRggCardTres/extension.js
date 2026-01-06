module.exports = {
    name: 'XRggCardTres',
    publisher: 'RobertoGG',
    cards: [{
        type: 'XRggCardTresCard',
        source: './src/cards/XRggCardTresCard',
        title: 'XRggCardTres Card',
        displayCardType: 'XRggCardTres Card',
        description: 'Tarjeta | Capacitacion Experience | 06 01 2026',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};