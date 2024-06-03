import { useState } from "react";
import useVerified from "../hook/useVerified";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContestAdd = () => {
    const [isVerified] = useVerified();
    const [startDate, setStartDate] = useState(new Date());

    console.log(new Date(startDate).toLocaleDateString());

    return (
        <div>
            <h2 className="font-bold text-4xl text-center">---Add Contest---</h2>
            <div>
                <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-xl p-5">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Name*</span>
                        </label>
                        <input type="text" placeholder="Contest Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image*</span>
                        </label>
                        <input type="file" name="image" className="file-input file-input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Description*</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="Contest Description"></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task*</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="Task"></textarea>
                    </div>
                   
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Prize money*</span>
                        </label>
                        <input type="text" placeholder="Prize money" className="input input-bordered" required />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Price*</span>
                        </label>
                        <input type="number" placeholder="Contest Price" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contest Type/Tags*</span>
                        </label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>
                                Contest Type/Tags
                            </option>
                            <option>Image Design Contests</option>
                            <option>Article Writing</option>
                            <option>Marketing Strategy</option>
                            <option>Digital Advertisement</option>
                            <option>Gaming Review</option>
                            <option>Book Review</option>
                            <option>Business Idea</option>
                            <option>Movie Review</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline*</span>
                        </label>
                        <DatePicker
                            className="input input-bordered w-full"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    {isVerified === "block" ? (
                        <button className="btn w-full mt-2 col-span-2" disabled>
                            You are Blocked
                        </button>
                    ) : (
                        <button className="btn bg-[#0ecdb9] border-none w-full mt-2 text-white col-span-2">
                            Add Now
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContestAdd;
