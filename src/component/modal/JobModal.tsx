// JobModal.tsx
import {Modal} from "antd";
import NiceModal, {antdModal, useModal} from "@ebay/nice-modal-react";
import {useFormik} from "formik";
import {BaseInput} from "../input/BaseInput.tsx";
import {useDispatch, useSelector} from "react-redux";
import {baseStore} from "@/store/baseStore.ts";
import {Job} from "@/util/type/Job.ts";
import {toastUtil} from "@/util/toastUtil.ts";
import {useState} from "react";
import {RootState} from "@/store";


export default NiceModal.create(({jobData}: { jobData: Job }) => {
    const dispatch = useDispatch();
    const modal = useModal();
    const [loading, setLoading] = useState(false);
    const baseState = useSelector((state: RootState) => state.base);


    const formik = useFormik({
        initialValues: {
            name: "",
            coverLetter: "",
            email: ""
        },
        onSubmit: () => console.log("Submit"),
    })

    const handleResponse = () => {
        toastUtil.showUniqueToast("applied", `You’ve successfully applied for ${jobData.jobTitle}!`, "success");
        // modal.hide();
    }

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const jobs = [...baseState.appliedJobs || [], jobData];
            dispatch(baseStore.mutation.setAppliedJobs(jobs));
            modal.resolve(formik.values);
            modal.hide();
            handleResponse();
        }, 1500)
    };


    return (
        <Modal
            {...antdModal(modal)}
            open={modal.visible}
            title={`Apply for ${jobData?.jobTitle}`}
            footer={null}
            // okText="Create"
            // onOk={handleSubmit}
            // onCancel={() => modal.hide()}
            width={800}
            centered
        >
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit()
            }} className={"loginForm"}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '20px'}}>
                    <div className={"formLabelValue"}>
                        <label className="formLabel">Name</label>
                        <BaseInput
                            name="name"
                            placeholder="Enter Name"
                            formik={formik}
                            className={"formInput"}
                        />
                    </div>
                    <div className={"formLabelValue"}>
                        <label className="formLabel">Email</label>
                        <BaseInput
                            name="email"
                            placeholder="Enter Email"
                            formik={formik}
                            className={"formInput"}
                        />
                    </div>
                    <div className={"formLabelValue"}>
                        <label className="formLabel">Cover Letter</label>
                        <textarea className={"formInput"} rows={10}
                                  onChange={(e) => formik.setFieldValue("coverLetter", e.target.value)}/>
                    </div>
                </div>

                <div className={"formButtonGroup"}>
                    <BaseInput
                        type={"submit"}
                        name={"Create"}
                        className={"formButton"}
                        formik={formik}
                        loading={loading}
                    />
                    <BaseInput
                        type={"button"}
                        name={"Cancel"}
                        value={"Cancel"}
                        className={"formButton"}
                        inputStyle={{backgroundColor: "transparent", border: '1px solid #d9d9d9', color: 'black'}}
                        formik={formik}
                        onClick={() => {
                            modal.hide();
                        }}
                    />
                </div>
            </form>
        </Modal>
    );
});
