module.exports = {
    name: 'RgDevMyFirstCard',
    publisher: 'DEV | Roberto Guzman Gonzalez',
    cards: [{
        type: 'RgDevMyFirstCardCard',
        source: './src/cards/RgDevMyFirstCardCard',
        title: 'RgDevMyFirstCard Card',
        displayCardType: 'RgDevMyFirstCard Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};