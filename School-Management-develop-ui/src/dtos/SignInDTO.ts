class SignInDTO  {
    private username: string;
    private password: string;
    
    constructor (username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    static fromJSON(json: {username: string, password: string}) {
        if (!json.username || typeof json.username !== 'string') {
            throw new Error('Invalid username');
        }
        if (!json.password || typeof json.password !== 'string') {
            throw new Error('Invalid password');
        }
        return new SignInDTO(json.username, json.password)
    }
}

export default SignInDTO;