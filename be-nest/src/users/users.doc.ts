import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";

export function CreateUserDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Create new users' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: exampleUser
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
            schema: {
                example: {
                    "message": [
                        "firstName must be longer than or equal to 1 characters",
                        "lastName must be longer than or equal to 1 characters",
                        "position must be longer than or equal to 1 characters",
                        "email must be longer than or equal to 1 characters",
                        "email must be an email",
                        "phone must be longer than or equal to 1 characters"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                }
            }
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict',
            schema: {
                example: {
                    statusCode: 409,
                    message: 'Email address is not unique',
                    error: 'Conflict'
                }
            }
        })
    )
}


export function FindAllUserDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get all users' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: {
                    first: 1,
                    last: 1,
                    next: null,
                    prev: null,
                    total: 2,
                    total_page: 1,
                    page: 1,
                    data: [
                        exampleUser,
                        exampleUser2
                    ]
                }
            }
        }),
        ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' }),
        ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' }),
        ApiQuery({ name: 'sortby', required: false, enum: ['firstName', 'lastName', 'position'], description: 'Sort by field' }),
        ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort order' })
    )
}

export function FindOneUseDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get single user by id' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: exampleUser
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Not Found',
            schema: {
                example: {
                    "message": "User not found!",
                    "error": "Not Found",
                    "statusCode": 404
                }
            }
        })
    )
}

export function UpdateUserDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Update single user by id' }),
        ApiResponse({
            status: 200,
            description: 'Success',
            schema: {
                example: exampleUser
            }
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
            schema: {
                example: {
                    "message": [
                        "firstName must be longer than or equal to 1 characters"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                }
            }
        }),
        ApiResponse({
            status: 409,
            description: 'Conflict',
            schema: {
                example: {
                    statusCode: 409,
                    message: 'Email address is not unique',
                    error: 'Conflict'
                }
            }
        }),
        ApiResponse({
            status: 404,
            description: 'Not Found',
            schema: {
                example: {
                    "message": "User not found!",
                    "error": "Not Found",
                    "statusCode": 404
                }
            }
        })
    )
}

export function DeleteUserDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Delete single user by id' }),
        ApiResponse({ status: 204, description: 'Success' }),
        ApiResponse({
            status: 404,
            description: 'Not Found',
            schema: {
                example: {
                    "message": "User not found!",
                    "error": "Not Found",
                    "statusCode": 404
                }
            }
        })
    )
}

const exampleUser = {
    id: '3fbb240d-0642-4b26-b9d6-85372ab5a35c',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    position: 'Developer',
    phone: "(111) 111-1111",
    deleted: false,
    createdAt: "2024-09-03T13:58:10.674Z",
    updatedAt: "2024-09-03T13:58:10.674Z"
};

const exampleUser2 = {
    id: 'c35d617b-97f7-4dfa-b40c-62378d493a04',
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david@example.com',
    position: 'CTO',
    phone: "(111) 111-1111",
    deleted: false,
    createdAt: "2024-09-03T13:58:10.674Z",
    updatedAt: "2024-09-03T13:58:10.674Z"
};
