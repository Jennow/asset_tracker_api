const assetsMiddleware = require('../assets.middleware');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.status().send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (body) => {
    return {
        body: body
    };
};

describe('validate asset test', () => {

    test('valid input', () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            "identifier": "ETH",
            "name": "Ethereum",
            "type": "crypto"
        });
        const mockedRes = mockResponse();
        assetsMiddleware.validateAsset(mockedReq, mockedRes, mockedNext);
        expect(mockedNext).toHaveBeenCalled(); 
    })

    test('valid complete input', () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            "identifier": "ETH",
            "name": "Ethereum",
            "type": "crypto",
            "icon": "test-icon",
            "subtype": "staking",
        });
        const mockedRes = mockResponse();
        assetsMiddleware.validateAsset(mockedReq, mockedRes, mockedNext);
        expect(mockedNext).toHaveBeenCalled(); 
    })


    test('missing required input', async () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            "identifier": "ETH",
            "name": "Ethereum",
        });
        const mockedRes = mockResponse();
        const expectedError = { 
            message: 'Missing type' 
        };

        await assetsMiddleware.validateAsset(mockedReq, mockedRes, mockedNext);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.status().send).toHaveBeenCalledWith(expectedError);
    })
})