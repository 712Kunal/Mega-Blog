import conf from "../Config/Conf.js"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    //constructor method -> This constructor snippet ensures that when an instance
    //of your class is created, it immediately configures the client object with
    //the correct endpoint URL and project ID from a configu ration (conf) object.

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    //functionality for SignUp ->
    async CreateAccount({ email, password, name }) {
        try {
            const response = await this.account.create(ID.unique(), email, password, name);
            if (response) {
                console.log("Account created successfully:", response);
            } else {
             return response;   
            }
            return this.Login({ email, password });
        } catch (error) {
            console.log("Error during account creation:", error.message);
            throw error;
        }
    }
    
    //functionality for login 
    async Login({ email, password }) {
        try {
            const response = await this.account.createEmailPasswordSession(email, password);
            console.log("User logged in successfully:", response);
            return response;
        } catch (error) {
            console.log("Error during login:", error.message);
            throw error;
        }
    }

    //functionality for Logout ->
    async Logout() {
        try {
            const UserLogout = await this.account.deleteSessions();
            return UserLogout;
        } catch (error) {
            throw error;
        }
    }

    //functionality to check Is user login or logout ->
    async GetCurrentUser() {
        try {
            const CurrentUser = await this.account.get();
            return CurrentUser;
        } catch (error) {
            return null;
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
    }
}

//creating an object or instance of class "AuthService"
const authservice = new AuthService();

export default authservice