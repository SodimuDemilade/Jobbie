import "./JobCard.css";
import {useNavigate} from "react-router-dom";
import {StringUtil} from "@/util/stringUtil.ts";
import {Job} from "@/util/type/Job.ts";

export const JobCard = (jobData: Job) => {

    const navigate = useNavigate();

    return (
        <div className={"jobCard"} onClick={() => navigate(`/jobs/${jobData.id}`, {
            state: jobData
        })}>
            <img src={jobData.image} alt="" width={250} height={170}/>
            <div className={"jobCardBody"}>
                <h5>{jobData.jobTitle}</h5>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <p>{jobData.company}</p>
                    <p className={"badge badge-dark"}>{jobData.location}</p>
                    {/*<p>{jobData.description}</p>*/}
                    <p>{jobData.skills}</p>
                    <p>{StringUtil.formatCurrency(jobData.salary, "USD")}/yr</p>
                </div>
            </div>
        </div>
    )
}