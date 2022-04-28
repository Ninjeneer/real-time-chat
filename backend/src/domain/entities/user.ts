export default class User {
    private id?: string;
    private username: string;
    private password: string;
    private token: string;
    private color: string; // hex color

    constructor(username: string, password?: string, color?: string, id?: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.color = color ? color : this.generateColor();
    }
    
    public setId(id: string): void {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getToken(): string {
        return this.token;
    }

    public setToken(value): string {
        return this.token = value;
    }

    public getColor(): string {
        return this.color;
    }

    private generateColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}