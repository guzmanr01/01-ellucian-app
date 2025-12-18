module.exports = {
    name: 'RgDevMyFirstCard',
    publisher: 'sample',
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
    },
    queries: {
        'sites-list': [
            {
                resourceVersions: {
                    sites: { min: 6 }
                },
                query: `{
                    sites: {sites}(
                        sort: { code: ASC }
                    ) {
                        edges {
                            node {
                                id
                                code
                                title
                                description
                            }
                        }
                    }
                }`
            },
        ]
    }
};