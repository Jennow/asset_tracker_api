const userMiddleware = require('../users');

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

describe('user registration', () => {

    test('valid input', () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            username: 'testuser',
            password: 'testpwd',
            repeat: 'testpwd',
            currencyid: 1,
            email: 'test@test.com'
        });
        const mockedRes = mockResponse();
        userMiddleware.validateRegister(mockedReq, mockedRes, mockedNext);
        expect(mockedNext).toHaveBeenCalled(); 
    })

    test('invalid username', async () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            username: 't',
            password: 'testpwd',
            repeat: 'testpwd',
            currencyid: 1,
            email: 'test@test.com'
        });
        const mockedRes = mockResponse();
        const expectedError = { 
            message: 'Please enter a username with min. 3 chars' 
        };

        await userMiddleware.validateRegister(mockedReq, mockedRes, mockedNext);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.status().send).toHaveBeenCalledWith(expectedError);
    })

    test('invalid password', async () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            username: 'testuser',
            password: 'test',
            repeat: 'test',
            currencyid: 1,
            email: 'test@test.com'
        });
        const mockedRes = mockResponse();
        const expectedError = { 
            message: 'Please enter a password with min. 6 chars' 
        };

        await userMiddleware.validateRegister(mockedReq, mockedRes, mockedNext);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.status().send).toHaveBeenCalledWith(expectedError);
    })

    test('invalid password repeat', async () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            username: 'testuser',
            password: 'testpwd',
            repeat: 'testpwwwww',
            currencyid: 1,
            email: 'test@test.com'
        });
        const mockedRes = mockResponse();
        const expectedError = { 
            message: 'Both passwords must match' 
        };

        await userMiddleware.validateRegister(mockedReq, mockedRes, mockedNext);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.status().send).toHaveBeenCalledWith(expectedError);
    })

    test('missing currencyid', async () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            username: 'testuser',
            password: 'testpwd',
            repeat: 'testpwd',
            email: 'test@test.com'
        });
        const mockedRes = mockResponse();
        const expectedError = { 
            message: 'Please select currency' 
        };

        await userMiddleware.validateRegister(mockedReq, mockedRes, mockedNext);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.status().send).toHaveBeenCalledWith(expectedError);
    })

    test('missing email', async () => {
        const mockedNext = jest.fn();
        const mockedReq = mockRequest({
            username: 'testuser',
            password: 'testpwd',
            repeat: 'testpwd',
            currencyid: 1,
        });
        const mockedRes = mockResponse();
        const expectedError = { 
            message: 'Please enter a valid email adress' 
        };

        await userMiddleware.validateRegister(mockedReq, mockedRes, mockedNext);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.status().send).toHaveBeenCalledWith(expectedError);
    })
})