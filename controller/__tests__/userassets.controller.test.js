const getUserAssetsController = require('../userassets.controller.js');

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
        addUserasset = jest.fn(async() => {
            return {
                insertId: 99 
            }});

        const mockedReq = mockRequest();
        const mockedRes = mockResponse();
        const userAssetsController = getUserAssetsController({addUserasset});
        
        return await userAssetsController.add(mockedReq, mockedRes, mockedNext).then(data => {

            expect(mockedRes.status).toHaveBeenCalledWith(201);
            expect(mockedRes.status().send).toHaveBeenCalledWith(expectedMessage);            
        });
    })
})