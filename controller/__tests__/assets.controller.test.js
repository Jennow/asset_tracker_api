const getAssetsController = require('../assets.controller.js');

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

describe('post asset test', () => {
    test('successful post', async() => {
        const expectedMessage = {
            success: true,
            id: 99
        };
        addAsset = jest.fn(async() => {
            return {
                insertId: 99 
            }});

        const mockedReq = mockRequest();
        const mockedRes = mockResponse();
        const transactionsController = getAssetsController({addAsset});
        
        return await transactionsController.add(mockedReq, mockedRes, mockedNext).then(data => {

            expect(mockedRes.status).toHaveBeenCalledWith(201);

            expect(mockedRes.status().send).toHaveBeenCalledWith(expectedMessage);            
        });
    })
})