import "./Dashboard.css";
import {BaseSelect} from "@/component/input/BaseSelect.tsx";
import {useFormik} from "formik";
import {JobCard} from "@/component/card/JobCard.tsx";
import {JobData} from "@/util/data/jobData.ts";
import {useState} from "react";
import {Job} from "@/util/type/Job.ts";
import {BaseInput} from "@/component/input/BaseInput.tsx";

export default function Dashboard() {
    const [activePage, setActivePage] = useState<number>(1);
    const totalPages = Math.ceil(JobData.length / 5);
    const [data, setData] = useState<Job[]>(JobData.slice(0, 5));

    const formik = useFormik({
        initialValues: {
            location: "",
            jobType: "",
            jobLevel: "",
            companyTitle: ""
        },
        onSubmit: () => {
        }
    })

    const handlePrevPageClick = () => {
        const prevPage = activePage - 1;
        setActivePage(prevPage);

        const indexOfLastJob = prevPage * 5;
        const indexOfFirstJob = indexOfLastJob - 5;

        setData(JobData.slice(indexOfFirstJob, indexOfLastJob));
    };

    const handleNextPageClick = () => {
        const nextPage = activePage + 1;
        setActivePage(nextPage);

        const indexOfLastJob = nextPage * 5;
        const indexOfFirstJob = indexOfLastJob - 5;

        setData(JobData.slice(indexOfFirstJob, indexOfLastJob));
    };

    const handleGoToPage = (page: number) => {
        setActivePage(page);

        const indexOfLastJob = page * 5;
        const indexOfFirstJob = indexOfLastJob - 5;

        setData(JobData.slice(indexOfFirstJob, indexOfLastJob));
    }

    const getPages = () => {
        const pages = [];
        const range = 2; // Number of pages to show before and after active page
        const start = Math.max(1, Number(activePage) - range);
        const end = Math.min(totalPages, Number(activePage) + range);

        if (Number(activePage) > range + 1) {
            pages.push(1);
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (activePage < totalPages - range) {
            pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const searchJobs = () => {
        const param = formik.values.companyTitle.toLowerCase();
        setData(JobData.filter(job => job.company.toLowerCase().includes(param) || job.jobTitle.toLowerCase().includes(param)))
    }

    const filterJobs = () => {
        console.log("formik", formik.values);
        setData(JobData.filter(job => job.location == formik.values.location &&
            (job.employmentType == formik.values.jobType || formik.values.jobType == "") &&
            (job.experienceLevel == formik.values.jobLevel || formik.values.jobLevel == "")
        ))
    }


    return (
        <div className={"dashboardContainer"}>
            <div className={"dashboardSidebar"}>
                <div className={"dashboardSearch"}>
                    <h4>By Job Title or Company</h4>
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: '5px', alignItems: 'center'}}>
                        <BaseInput
                            name={"companyTitle"}
                            formik={formik}
                            className={"formInput"}
                        />
                        <button className={"searchButton"}
                                style={{width: '60px', padding: '5px', background: "#6c757d"}}
                                onClick={() => {
                                    handleGoToPage(activePage);
                                }}>Clear
                        </button>
                    </div>
                    <button className={"searchButton"} onClick={searchJobs}>Find Jobs</button>
                </div>
                <div>
                    <h4>Filter</h4>
                    <div className={"loginForm"} style={{gap: "15px"}}>
                        <div style={{width: "100%"}}>
                            <label className="formLabel">Location</label>
                            <BaseSelect
                                name="location"
                                items={[
                                    {label: "Select Location", value: ""},
                                    ...[...new Set(JobData.map(job => job.location))].map(location => ({
                                        label: location,
                                        value: location
                                    }))
                                ]}
                                formik={formik}
                                className={"formInput"}
                            />
                        </div>
                        <div style={{width: "100%"}}>
                            <label className="formLabel">Job Type</label>
                            <BaseSelect
                                name="jobType"
                                items={[{label: "Select Type", value: ""}, {
                                    label: "Full-Time",
                                    value: "Full-Time"
                                }, {label: "Part-Time", value: "Part-Time"}, {
                                    label: "Internship",
                                    value: "Internship"
                                }]}
                                formik={formik}
                                className={"formInput"}
                            />
                        </div>
                        <div style={{width: "100%"}}>
                            <label className="formLabel">Experience Level</label>
                            <BaseSelect
                                name="jobLevel"
                                items={[{label: "Select Level", value: ""}, {
                                    label: "Entry Level",
                                    value: "Entry-Level"
                                }, {label: "Mid-Level", value: "Mid-Level"}, {
                                    label: "Senior Level",
                                    value: "Senior Level"
                                }]}
                                formik={formik}
                                className={"formInput"}
                            />
                        </div>
                        {/*<div style={{width: "100%"}}>*/}
                        {/*    <label className="formLabel">Salary Range</label>*/}
                        {/*    <BaseSelect*/}
                        {/*        name="salaryRange"*/}
                        {/*        items={[{label: "Select range", value: ""},*/}
                        {/*            {label: "<$30,000", value: "less,30000"},*/}
                        {/*            {label: "30,000 - 50,000", value: "less,30000,greater,50000"},*/}
                        {/*            {label: "Select range", value: ""},*/}
                        {/*            {label: "Select range", value: ""},*/}
                        {/*            {label: "Select range", value: ""}*/}
                        {/*        ]}*/}
                        {/*        formik={formik}*/}
                        {/*        className={"formInput"}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <button className={"searchButton"} onClick={filterJobs}>Add Filters</button>
                        <button className={"favoriteButton"} onClick={() => {
                            handleGoToPage(activePage);
                        }}>Clear Filter
                        </button>
                    </div>
                </div>
            </div>
            <div className={"dashboardJobs"}>
                <div className={"dashboardJobList"}>
                    {data.map((item, index) => (
                        <JobCard {...item} key={index}/>
                    ))}
                </div>
                <section className="pagination-section">
                    <button className="green-button white-button filter-btn w-inline-block"
                            onClick={() => handlePrevPageClick()} disabled={activePage == 1}>
                        <div className="svg white-svg filter number-btn w-embed">
                            <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M15.8333 9.99984H4.16666M4.16666 9.99984L9.99999 15.8332M4.16666 9.99984L9.99999 4.1665"
                                        stroke="#344054" strokeWidth="1.66667" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                                <p style={{fontWeight: 600}}>Previous</p>
                            </div>
                        </div>
                    </button>
                    <div className="pagination-numbers">
                        {getPages().map((page, index) => (
                            <div
                                key={index}
                                className={`number ${activePage == page ? "active-page" : ""}`}
                                onClick={() => {
                                    if (page !== "...") {
                                        handleGoToPage(Number(page));
                                    }
                                }}
                            >
                                <div className="text-block-32">
                                    {page}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="green-button white-button filter-btn w-inline-block"
                            onClick={() => handleNextPageClick()} disabled={activePage == totalPages}>
                        <div className="svg white-svg filter number-btn w-embed">
                            <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                <p style={{fontWeight: 600}}>Next</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M4.16669 9.99984H15.8334M15.8334 9.99984L10 4.1665M15.8334 9.99984L10 15.8332"
                                        stroke="#344054" strokeWidth="1.66667" strokeLinecap="round"
                                        strokeLinejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                    </button>
                </section>
            </div>
        </div>
    );
}