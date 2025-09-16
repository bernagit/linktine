export interface ApiError {
    message: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface LoginSuccess {
    user: User;
    token: string;
}
