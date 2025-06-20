import React from "react";
import { useState } from "react";



function AddProjectModal() {
    const [name, setName] = useState("");
    
    return (
        <div className="absolute left-1/2 top-[10vh] -translate-x-1/2 z-50 w-[65%] flex items-center justify-center">
            <div className="bg-white h-full w-[100%] relative p-5 border-2">
                {/* Close button */}
                <button className="text-[1.6rem] cursor-pointer font-bold absolute top-2 right-10 z-[100]">
                x
                </button>

                <form className=" w-[80%] mx-auto">
                {/* Name input */}
                <div className="space-y-2">
                    <label htmlFor="name" className="inline-block text-gray-700 text-[1.2rem] mr-3 font-normal mb-2">
                    Name
                    </label>
                    <input
                    id="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none h-[28px] border border-[grey] rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder=""
                    />
                </div>

                {/* Gacha Type section */}
                <div className="mt-16 space-y-4 ">
                    <h2 className="mb-5 text-xl font-medium text-center capitalize">
                    Gacha Type
                    </h2>
                    
                    {/* Gacha display area */}
                    <div className="h-[240px] cursor-pointer w-[220px] flex flex-col items-center justify-center border-2 border-grey m-auto">
                    <div className="grid grid-cols-3 gap-1">
                        {Array.from({ length: 9 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-[10px] h-[10px] bg-black"
                        />
                        ))}
                    </div>
                    </div>

                    <p className="mt-3 mb-10 text-xl font-normal text-center capitalize">
                    Static Gacha
                    </p>
                </div>

                {/* Submit button */}
                <div className="flex justify-center pt-4">
                    <button
                    type="submit"
                    className="bg-[white] border border-[gray] block text-black font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
}

export default AddProjectModal;