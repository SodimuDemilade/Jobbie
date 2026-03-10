import {JobCard} from "@/component/card/JobCard.tsx";
import "./Dashboard.css";
import {useFavorites} from "@/context/FavoritesContext.tsx";

export const Favorites = () => {
    const {favorites} = useFavorites();
    return (
        <div style={{padding: '30px'}}>
            <h2>My Favorites</h2>
            <div className={"dashboardJobList"}>
                {favorites.map((item, index) => (
                    <JobCard {...item} key={index}/>
                ))}
            </div>
        </div>
    )
}