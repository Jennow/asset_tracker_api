const getDashboardController = require('../dashboard.controller.js');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.status().send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};
var mockUser;
var mockRequest;
var mockedRegisterReq;

beforeAll(async() => {
    mockUser = {
        "id": "65695525-d9d8-4d62-a986-d9cf688c108b",
    }  
    mockRequest = (body) => {
        return {
            body: body,
            userData: mockUser
        };
    };
    mockedRegisterReq = mockRequest();

});

const mockedNext = jest.fn();

describe('load dasboard test', () => {
    test('successful full load', async() => {
        getUserassets = jest.fn(async() => [{
            "id": 1,
            "name":"test asset name", 
        }]);        
        getUserAssetHistory = jest.fn(async() => [{
            "id": 1,
            "name":"test userasset name", 
        }]);        
        getTransactions = jest.fn(async() => [{
            "id": 1,
            "name":"test transaction name", 
        }]);
        getCurrency = jest.fn(async() => [{
            "id": 1,
            "name":"test currency"
        }]);
        getSummary = jest.fn(async() => [{
            "id": 1,
            "name":"test overview"
        }]);

        const mockedReq = mockRequest();
        const mockedRes = mockResponse();
        const dashboardController = getDashboardController({getUserassets, getUserAssetHistory, getSummary}, {getTransactions});
        
        return await dashboardController.load(mockedReq, mockedRes, mockedNext).then(data => {
            expect(mockedRes.status).toHaveBeenCalledWith(201);
        });
    })
})