import {JobCard} from "@/component/card/JobCard.tsx";
import "./Dashboard.css";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export const Applied = () => {
    const baseState = useSelector((state: RootState) => state.base);
    return (
        <div style={{padding: '30px'}}>
            <h2>Applied Jobs</h2>
            <div className={"dashboardJobList"}>
                {baseState.appliedJobs.map((item, index) => (
                    <JobCard {...item} key={index}/>
                ))}
            </div>
        </div>
    )
}