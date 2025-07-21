declare const _default: () => {
    app: {
        port: number;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        name: string;
    };
};
export default _default;
