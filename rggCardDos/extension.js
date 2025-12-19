module.exports = {
    name: 'RggCardDos',
    publisher: 'RobertoGG',
    cards: [{
        type: 'RggCardDosCard',
        source: './src/cards/RggCardDosCard',
        title: 'RggCardDos Card',
        displayCardType: 'RggCardDos Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        // pageRoute: {
        //     route: '/',
        //     excludeClickSelectors: ['a']
        // },
        configuration: {
            client: [
                {
                    key: 'studentAcademicInfoPipeline',
                    label: 'Student Academic Info DC',
                    type: 'text',
                    required: true
                }
            ],
            server: [
                {
                    key: "ethosApiKey",
                    label:"Ethos APi KEY",
                    type: 'password',
                    required: true
                }
            ]
        },
        // configuration:{
        //     client: [{
        //         key: 'studentAcademicInfoPipeline',
        //         label: 'Student Academic Info DC',
        //         type: 'text',
        //         required: true
        //     }],
        //     server: [{
        //         key: 'ethosApiKey',
        //         label: 'Ethos API Key',
        //         type: 'password',
        //         required: true
        //     }]
        // }
    }],
    page: {
        source: './src/page/router.jsx'
    },
    queries:{
        'sites-list': [
            {
                resourceVersions:{
                    sites: { min: 6}
                },
                query: `{
                    sites: {sites}(
                        sort: { code: ASC }
                    )
                    {
                        edges{
                            node {
                                id
                                code
                                title
                                description
                            }
                        }
                    }
                }`
            }
        ],
        'buildings-list':[
            {
                resourceVersions:{
                    sites: { min: 6},
                    buildings: { min: 6 }
                },
                query:`
                    query listBuildings($siteId: ID){
                        buildings: {buildings}(
                            filter: {
                                {site}: { id: { EQ: $siteId} }                                
                            },
                            sort: { code: ASC }
                        )
                        {
                            edges {
                                node {
                                    id
                                    title
                                    description
                                    code
                                    site: {site} {
                                        id
                                        code
                                        title
                                    }
                                }
                            }
                        }
                    }
                `
            }
        ]
    }
};