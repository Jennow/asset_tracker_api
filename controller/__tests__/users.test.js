const getUsersController = require('../users.controller.js');
const bcrypt = require('bcryptjs');

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

const mockedRegisterReq = mockRequest({
    username: 'testuser',
    password: 'testpwd',
    repeat: 'testpwd',
    currencyid: 1,
    email: 'test@test.com'
});

const mockedNext = jest.fn();

describe('user register test', () => {
    test('successful registration', async() => {
        findUserIdByUsername = jest.fn(async() => []);
        createUser = jest.fn()
        const mockedRes = mockResponse();

        const usersController = getUsersController({
            findUserIdByUsername,
            createUser,
        });

        return await usersController.register(mockedRegisterReq, mockedRes, mockedNext).then(data => {
            const expectedMessage = { 
                message: 'registered' 
            };

            expect(mockedRes.status().send).toHaveBeenCalledWith(expectedMessage);
            expect(mockedRes.status).toHaveBeenCalledWith(201);

            expect(findUserIdByUsername.mock.calls.length).toBe(1);
            expect(createUser.mock.calls.length).toBe(1);
        });
    })

    test('duplicate registration',async() => {
        findUserIdByUsername = jest.fn(async() => ['entry']);
        createUser = jest.fn()
        const mockedRes = mockResponse();

        const usersController = getUsersController({
            findUserIdByUsername,
            createUser,
        });

        return await usersController.register(mockedRegisterReq, mockedRes, mockedNext).then(data => {
            const expectedMessage = { 
                message: 'This username is already in use!' 
            };

            expect(mockedRes.status().send).toHaveBeenCalledWith(expectedMessage);
            expect(mockedRes.status).toHaveBeenCalledWith(409);

            expect(findUserIdByUsername.mock.calls.length).toBe(1);
            expect(createUser.mock.calls.length).toBe(0);
        });
    })
})

describe('user login test', () => {
    test('successful login', async() => {
        findUserByUsername = jest.fn(async() => [{
            "username": "testuser",
            "email":"test@test.com", 
            "password": await bcrypt.hash("123456", 10),
            "currencyid": 1
        }]);
        updateUserLogin = jest.fn()

        getCurrency = jest.fn(async(userId) => [{
            "id": 1,
            "name":"test currency"
        }]);

        const usersController = getUsersController({
            findUserByUsername,
            updateUserLogin,
            getCurrency
        });

        const mockedReq = mockRequest({
            username: 'testuser',
            password: '123456',
        });
        const mockedRes = mockResponse();
        return await usersController.login(mockedReq, mockedRes, mockedNext).then(data => {
            expect(mockedRes.status).toHaveBeenCalledWith(201);

            expect(findUserByUsername.mock.calls.length).toBe(1);
            expect(updateUserLogin.mock.calls.length).toBe(1);
        });
    })

    test('wrong password login', async() => {
        findUserByUsername = jest.fn(async() => [{
            "username": "testuser",
            "email":"test@test.com", 
            "password": await bcrypt.hash("123456", 10),
            "currencyid": 1
        }]);
        updateUserLogin = jest.fn()
        getCurrency = jest.fn(async(userId) => []);

        const usersController = getUsersController({
            findUserByUsername,
            updateUserLogin,
            getCurrency
        });

        const mockedReq = mockRequest({
            username: 'testuser',
            password: 'false_password',
        });
        const mockedRes = mockResponse();
        

        return await usersController.login(mockedReq, mockedRes, mockedNext).then(data => {
            const expectedMessage = { 
                message: 'Username or password incorrect!' 
            };

            expect(mockedRes.status().send).toHaveBeenCalledWith(expectedMessage);
            expect(mockedRes.status).toHaveBeenCalledWith(400);

            expect(findUserByUsername.mock.calls.length).toBe(1);
            expect(updateUserLogin.mock.calls.length).toBe(0);
        });
    })

    test('user not found login', async() => {
        findUserByUsername = jest.fn(async() => []);
        updateUserLogin = jest.fn()

        const usersController = getUsersController({
            findUserByUsername,
            updateUserLogin,
        });

        const mockedReq = mockRequest({
            username: 'testuser',
            password: '123456',
        });
        const mockedRes = mockResponse();
        

        return await usersController.login(mockedReq, mockedRes, mockedNext).then(data => {
            const expectedMessage = { 
                message: 'Username or password incorrect!' 
            };

            expect(mockedRes.status().send).toHaveBeenCalledWith(expectedMessage);
            expect(mockedRes.status).toHaveBeenCalledWith(400);

            expect(findUserByUsername.mock.calls.length).toBe(1);
            expect(updateUserLogin.mock.calls.length).toBe(0);
        });
    })

})