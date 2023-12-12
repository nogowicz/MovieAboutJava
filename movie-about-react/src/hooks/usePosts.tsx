import { useContext } from "react";
import { DataContext } from "../store/DataProvider";

export function usePosts() {
    const dataContext = useContext(DataContext);

    if (!dataContext) {
        throw new Error("usePosts must be used within an DataProvider");
    }

    return dataContext;
}
