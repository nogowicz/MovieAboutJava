import axios from "axios";
import { ReactNode, createContext } from "react";
import { useNavigate } from "react-router-dom";

type PostType = {
    anonymous: boolean;
    content: string;
    date: string;
    title: string;
    mediaType: string;
    addedBy: string;
};

type CommentType = {
    content: string;
    postId: number | null;
    addedBy: string;
    createdAt: string;
};

type DataContextType = {
    addPost: (data: PostType) => Promise<void>;
    editPost: (data: PostType, postId: number) => Promise<void>;
    deletePost: (postId: number) => Promise<void>;
    addComment: (data: CommentType) => Promise<void>;
    deleteComment: (commentId: number) => Promise<void>;
}

export const DataContext = createContext<DataContextType>({
    addPost: async () => {
        return Promise.reject("addPost function is not implemented");
    },
    editPost: async () => {
        return Promise.reject("editPost function is not implemented");
    },
    deletePost: async () => {
        return Promise.reject("deletePost function is not implemented");
    },
    addComment: async () => {
        return Promise.reject("addPost function is not implemented");
    },
    deleteComment: async () => {
        return Promise.reject("deleteComment function is not implemented");
    },
});


type DataProviderProps = {
    children: ReactNode,
}

export function DataProvider({ children }: DataProviderProps) {
    const navigation = useNavigate();
    return (
        <DataContext.Provider
            value={{
                addPost: async (data) => {
                    await axios.post("http://localhost:8080/api/posts", data);
                    navigation('/posts');
                },
                editPost: async (updatedData, postId) => {
                    await axios.put(`http://localhost:8080/api/posts/${postId}`, updatedData);
                },
                deletePost: async (postId) => {
                    await axios.delete(`http://localhost:8080/api/posts/${postId}`);
                },
                addComment: async (updatedData) => {
                    await axios.post(`http://localhost:8080/api/comments`, updatedData)
                },
                deleteComment: async (commentId) => {
                    await axios.delete(`http://localhost:8080/api/comments/${commentId}`);
                }
            }}
        >
            {children}
        </DataContext.Provider>
    );
}