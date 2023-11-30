import axios from "axios";
import { ReactNode, createContext, useContext } from "react";
import { useSignIn } from "react-auth-kit";

type AuthContextType = {
    login: (username: string, password: string) => Promise<void>;
    // register: (email: string, password: string, username: string) => Promise<void>;
    // logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    login: async () => { },
    // register: async () => { },
    // logout: async () => { },
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
    return (
        <AuthContext.Provider
            value={{
                login: async (username: string, password: string) => {
                    const response: ResponseType = await axios.post("http://localhost:8080/api/auth/signin", data);

                    signIn({
                        token: response.data.accessToken,
                        expiresIn: response.data.expiresIn,
                        tokenType: response.data.tokenType,
                        authState: {
                            usernameOrEmail: username,
                            token: response.data.accessToken,
                        }
                    });
                },
                // register: async (email: string, password: string, username: string) => {

                // },
                // logout: async () => {

                // }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return authContext;
}
