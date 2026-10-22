
// Credentials Task

type Credentials = {
    email: string;
    password: string;
    role: "admin" | "user";
}

const validUser: Credentials = {
    email: "john@test.com",
    password: "123",
    role: "user"
};

function getLoginUrl(env:string): string {
    return `https://${env}.example.com/login`;
}

export { validUser, getLoginUrl};