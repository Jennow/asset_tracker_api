const getDashboardController = require('../dashboard.controller.js');

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

const mockedRegisterReq = mockRequest();
const mockedNext = jest.fn();

describe('load dasboard test', () => {
    test('successful full load', async() => {
        getAssets = jest.fn(async() => [{
            "id": 1,
            "name":"test asset name", 
        }]);
        getCurrency = jest.fn(async() => [{
            "id": 1,
            "name":"test currency"
        }]);

        const mockedReq = mockRequest();
        const mockedRes = mockResponse();
        const dashboardController = getDashboardController({getAssets}, {getCurrency});

        return await dashboardController.load(mockedReq, mockedRes, mockedNext).then(data => {
            expect(mockedRes.status).toHaveBeenCalledWith(201);
        });
    })
})