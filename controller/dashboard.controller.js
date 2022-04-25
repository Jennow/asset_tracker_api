require('dotenv').config()

module.exports = (repository) => {
    const DashboardController = {
        load: async function(req, res, next) {
            // Assets
            // Transactions
            // Currency
            // PersonalizedHistories
            return res.status(201).json({
                assets: [
                    {
                        "id": 1,
                        "identifier": "bitcoin",
                        "name": "Bitcoin",
                        "icon": "fab fa-bitcoin",
                        "type": "crypto",
                        "subtype": "static",
                        "currencyId": 1,
                        "platform": "Binance",
                        "highlighted": true,
                        "performance": 80,
                        "amount": 0.1,
                        "sum": 3981.79,
                        "history": [
                            {
                                "date": "2022-01-01T18:25:43.511Z",
                                "amount": 0
                            },
                            {
                                "date": "2022-04-12T00:00:00.000Z",
                                "amount": 0.1
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "identifier": "MSCI",
                        "name": "MSCI World ESG",
                        "type": "stock",
                        "subtype": "etf",
                        "currencyId": 1,
                        "platform": "Trade Republic",
                        "highlighted": true,
                        "performance": 8,
                        "amount": 0,
                        "sum": 0,
                        "history": [
                            {
                                "date": "2022-01-01T18:25:43.511Z",
                                "amount": 0
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "identifier": "DIS",
                        "name": "Disney Stock",
                        "type": "stock",
                        "subtype": "static",
                        "currencyId": 1,
                        "platform": "Trade Republic",
                        "performance": -0.8,
                        "highlighted": true,
                        "amount": 1,
                        "sum": 301,
                        "history": [
                            {
                                "date": "2022-01-01T18:25:43.511Z",
                                "amount": 0
                            },
                            {
                                "date": "2022-04-12T00:00:00.000Z",
                                "amount": 1
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "identifier": "ethereum",
                        "name": "Ethereum",
                        "icon": "fab fa-ethereum",
                        "type": "crypto",
                        "subtype": "static",
                        "currencyId": 1,
                        "platform": "Binance",
                        "highlighted": true,
                        "performance": 80,
                        "amount": 0,
                        "sum": 0,
                        "history": [
                            {
                                "date": "2022-01-01T18:25:43.511Z",
                                "amount": 0
                            }
                        ]
                    }
                ],
                currency: {
                    short: '$',
                    identifier: 'usd'
                },
                personalizedHistories: [{"type":"crypto","data":[{"priceUsd":"3126.6468682949997338", "time":1648252800000,"date":"2022-03-26T00:00:00.000Z"},{"priceUsd":"3173.7064441151065666","time":1648339200000,"date":"2022-03-27T00:00:00.000Z"},{"priceUsd":"3347.8369958373795157","time":1648425600000,"date":"2022-03-28T00:00:00.000Z"},{"priceUsd":"3412.6941277910299839","time":1648512000000,"date":"2022-03-29T00:00:00.000Z"},{"priceUsd":"3394.5669347409777889","time":1648598400000,"date":"2022-03-30T00:00:00.000Z"},{"priceUsd":"3369.1557825359770851","time":1648684800000,"date":"2022-03-31T00:00:00.000Z"},{"priceUsd":"3349.3960983258115039","time":1648771200000,"date":"2022-04-01T00:00:00.000Z"},{"priceUsd":"3481.8871352829775008","time":1648857600000,"date":"2022-04-02T00:00:00.000Z"},{"priceUsd":"3495.1346158016343621","time":1648944000000,"date":"2022-04-03T00:00:00.000Z"},{"priceUsd":"3489.0240927996408841","time":1649030400000,"date":"2022-04-04T00:00:00.000Z"},{"priceUsd":"3494.1418470338436328","time":1649116800000,"date":"2022-04-05T00:00:00.000Z"},{"priceUsd":"3296.0058732841065749","time":1649203200000,"date":"2022-04-06T00:00:00.000Z"},{"priceUsd":"3218.9694740940195538","time":1649289600000,"date":"2022-04-07T00:00:00.000Z"},{"priceUsd":"3259.2065810548836805","time":1649376000000,"date":"2022-04-08T00:00:00.000Z"},{"priceUsd":"3225.9267940764315478","time":1649462400000,"date":"2022-04-09T00:00:00.000Z"},{"priceUsd":"3265.3065913667486727","time":1649548800000,"date":"2022-04-10T00:00:00.000Z"},{"priceUsd":"3092.3253234865085903","time":1649635200000,"date":"2022-04-11T00:00:00.000Z"},{"priceUsd":"3017.0148785746589738","time":1649721600000,"date":"2022-04-12T00:00:00.000Z"},{"priceUsd":"3086.6244330491548944","time":1649808000000,"date":"2022-04-13T00:00:00.000Z"},{"priceUsd":"3072.7230643955257638","time":1649894400000,"date":"2022-04-14T00:00:00.000Z"},{"priceUsd":"3031.7016357415957106","time":1649980800000,"date":"2022-04-15T00:00:00.000Z"},{"priceUsd":"3044.4111058552344061","time":1650067200000,"date":"2022-04-16T00:00:00.000Z"},{"priceUsd":"3052.9144448553864080","time":1650153600000,"date":"2022-04-17T00:00:00.000Z"},{"priceUsd":"2964.8482406257868742","time":1650240000000,"date":"2022-04-18T00:00:00.000Z"},{"priceUsd":"3075.2372145382531442","time":1650326400000,"date":"2022-04-19T00:00:00.000Z"},{"priceUsd":"3095.1448431091172921","time":1650412800000,"date":"2022-04-20T00:00:00.000Z"},{"priceUsd":"3088.0856901337150042","time":1650499200000,"date":"2022-04-21T00:00:00.000Z"},{"priceUsd":"2989.1172021418810407","time":1650585600000,"date":"2022-04-22T00:00:00.000Z"},{"priceUsd":"2963.2935891270851371","time":1650672000000,"date":"2022-04-23T00:00:00.000Z"},{"priceUsd":"2948.2461796222830244","time":1650758400000,"date":"2022-04-24T00:00:00.000Z"}],"timestamp":1650918371986}
                ],
                transactions: [
                    [
                        {
                            "id": 1,
                            "assetId": 1,
                            "createdate": "2012-04-23T18:25:43.511Z",
                            "amount": 100,
                            "status": 1,
                            "asset": {
                                "id": 1,
                                "identifier": "bitcoin",
                                "name": "Bitcoin",
                            }
                        },
                        {
                            "id": 2,
                            "assetId": 2,
                            "createdate": "2022-04-01T18:25:43.511Z",
                            "amount": -80,
                            "status": 1,
                            "asset": {
                                "id": 2,
                                "identifier": "MSCI",
                                "name": "MSCI World ESG",
                            }
                        },
                        {
                            "id": 3,
                            "assetId": 2,
                            "createdate": "2022-04-02T18:25:43.511Z",
                            "amount": 100,
                            "status": 1,
                            "asset": {
                                "id": 2,
                                "identifier": "MSCI",
                                "name": "MSCI World ESG",
                            }
                        },
                        {
                            "amount": 0.1,
                            "createdate": "2022-04-12T00:00:00.000Z",
                            "status": 1,
                            "assetId": 1,
                            "id": 4,
                            "asset": {
                                "id": 1,
                                "identifier": "bitcoin",
                                "name": "Bitcoin",
                            }
                        },
                        {
                            "amount": 1,
                            "createdate": "2022-04-12T00:00:00.000Z",
                            "status": 1,
                            "assetId": 3,
                            "id": 5,
                            "asset": {
                                "id": 3,
                                "identifier": "DIS",
                                "name": "Disney Stock",
                            }
                        }
                    ]
                ],
            });
        }
    }

    return DashboardController;
} 