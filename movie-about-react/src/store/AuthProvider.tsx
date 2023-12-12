import axios from "axios";
import { ReactNode, createContext } from "react";
import { useSignIn, useSignOut } from "react-auth-kit";
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
    login: (usernameOrEmail: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    login: async () => {
        return Promise.reject("login function is not implemented");
    },
    signUp: async () => {
        return Promise.reject("register function is not implemented");
    },
    logout: async () => {
        return Promise.reject("logout function is not implemented");
    },
});


type AuthProviderProps = {
    children: ReactNode,
}

interface ResponseType {
    data: {
        accessToken: string;
        expiresIn: number;
        tokenType: string;
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const signIn = useSignIn();
    const signOut = useSignOut();
    const navigate = useNavigate();
    return (
        <AuthContext.Provider
            value={{
                login: async (usernameOrEmail: string, password: string) => {
                    const response: ResponseType = await axios.post("http://localhost:8080/api/auth/signin", {
                        usernameOrEmail: usernameOrEmail,
                        password: password
                    });

                    signIn({
                        token: response.data.accessToken,
                        expiresIn: response.data.expiresIn,
                        tokenType: response.data.tokenType,
                        authState: {
                            usernameOrEmail: usernameOrEmail,
                            token: response.data.accessToken,
                        }
                    });
                    navigate("/");
                },
                signUp: async (email: string, password: string, username: string) => {
                    await axios.post("http://localhost:8080/api/auth/signup", {
                        email: email,
                        password: password,
                        username: username,
                    });
                    navigate("/");
                },
                logout: async () => {
                    signOut();
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}