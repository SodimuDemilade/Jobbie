import {createContext, ReactNode, useContext, useState} from "react";
import {Job} from "@/util/type/Job.ts";

type FavoritesContextType = {
    favorites: Job[];
    addFavorite: (job: Job) => void;
    removeFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({children}: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Job[]>([]);

    function addFavorite(job: Job) {
        setFavorites((prev) => [...prev, job]);
    }

    function removeFavorite(id: string) {
        setFavorites((prev) => prev.filter(job => job.id != id));
    }

    function isFavorite(id: string) {
        return favorites.some((job) => job.id === id);
    }

    return (
        <FavoritesContext.Provider value={{favorites, addFavorite, removeFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites must be used within the context");
    }

    return context;
}