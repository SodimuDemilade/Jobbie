import "./JobDetail.css"
import {useLocation} from "react-router-dom";
import {StringUtil} from "@/util/stringUtil.ts";
import {useFavorites} from "@/context/FavoritesContext.tsx";
import JobModal from "@/component/modal/JobModal.tsx";
import {useModal} from "@ebay/nice-modal-react";
import {Job} from "@/util/type/Job.ts";
import {RootState} from "@/store";
import {useSelector} from "react-redux";

export const JobDetail = () => {
    const {state} = useLocation();
    const jobData = state || {};
    const {addFavorite, removeFavorite, isFavorite} = useFavorites();
    const favorite = isFavorite(jobData.id);
    const jobModal = useModal(JobModal);
    const baseState = useSelector((state: RootState) => state.base);

    const applied = baseState?.appliedJobs?.some((job: Job) => job.id == jobData.id)

    const toggleFavorite = () => {
        if (favorite) {
            removeFavorite(jobData.id);
        } else {
            addFavorite(jobData);
        }
    }

    const apply = () => {
        jobModal.show({jobData});
    }

    return (
        <div className={"jobDetailContainer"}>
            <div className={"jobDetails"}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <h4>{jobData.jobTitle}</h4>
                    <div>
                        <p>Location: {jobData.location}</p>
                        <p>Employment Type: {jobData.employmentType}</p>
                    </div>
                    <div>
                        {jobData.description}
                    </div>
                </div>
                <div>
                    <h4>Responsibilities</h4>
                    <ul>
                        {jobData.responsibilities.map((item: string, index: string) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>Requirements</h4>
                    <ul>
                        {jobData.requirements.map((item: string, index: string) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>Nice to Have</h4>
                    <ul>
                        {jobData.nice_to_have.map((item: string, index: string) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <h4>What We Offer</h4>
                    <ul>
                        {jobData.what_we_offer.map((item: string, index: string) => {
                            return (
                                <li key={index}>{item}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className={"jobDetailImage"}>
                <img src={jobData.image} alt="" width={320} height={190}/>
                <p style={{
                    fontSize: '20px',
                    fontWeight: 500
                }}>Salary: {StringUtil.formatCurrency(jobData.salary, "USD")}/yr</p>
                <div className={"jobButtonGroup"}>
                    <button className={"applyButton"} disabled={applied}
                            onClick={apply}>{`${applied ? 'Applied' : "Apply"}`}</button>
                    <button className={"favoriteButton"}
                            onClick={toggleFavorite}>{favorite ? "Remove from Favorite" : "Add to Favorite"}</button>
                </div>
            </div>
        </div>
    )
}