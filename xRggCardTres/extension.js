module.exports = {
    name: 'XRggCardTres',
    publisher: 'RobertoGG',
    cards: [{
        type: 'XRggCardTresCard',
        source: './src/cards/XRggCardTresCard',
        title: 'XRggCardTres Card',
        displayCardType: 'XRggCardTres Card',
        description: 'Tarjeta | Capacitacion Experience | 06 01 2026',
        // pageRoute: {
        //     route: '/',
        //     excludeClickSelectors: ['a']
        // }
        // configuration: {
        //     client: [
        //         {
        //             key: "getAcademicInfoPipeline",
        //             label: "Pipeline Academic Info",
        //             type: "text",
        //             required: false
        //         },
        //         {
        //             key: "ethosApiKey",
        //             label:"Ethos APi KEY",
        //             type: 'password',
        //             required: false
        //         }
        //     ],

        // }

        configuration: {
            client: [
                {
                    key: 'getAcademicInfoPipeline',
                    label:'Pipeline Academic Info',
                    type: 'text',
                    required:true
                }
            ],
            server: [
                {
                    key: 'ethosApiKey',
                    label:'Ethos Api Key',
                    type: 'password',
                    required:true
                }
            ]
        }
    }],
    page: {
        source: './src/page/router.jsx'
    },
    queries: {
        'person-data': [
            {
                query: `query getPersonData($personId: ID) {
                        persons: persons12(
                                filter: { id: { EQ: $personId } } 
                                sort: { id: DESC }
                            ) {
                            edges {
                                node {
                                    id
                                    names {
                                        fullName
                                    }
                                }
                            }
                        }
                    }`
            }
        ]
    }
};