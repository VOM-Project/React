import React, { useState, useEffect } from "react";
import axios from "axios";

import "../homepy-style.css";
import "../homepy-styleguide.css";

import mingcute_edit_line from "../assets/mingcute_edit-line.svg";
import tabler_checkbox from "../assets/tabler_checkbox.svg";

export default function Try() {

    const [isEdit, setIsEdit] = useState(false);
    const [user_greeting, setUser_greeting] = useState();

    useEffect(() => {
        getUser();
    }, []);

    /**
     * 인사말 조회
     */
    async function getUser() {
        await axios
            .get("/api/homepy/1/greeting")
            .then(response => {
                console.log(response.data);
                setUser_greeting(response.data.greeting);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /**
     * 인사말 변경
     */
    const handleChange = (e) => {
        setUser_greeting(e.target.value);
    };

    // const handleClick = () => {
    //     setUser({ user_greeting });
    // };

    async function setGreeting() {
        setIsEdit(false);

        await axios
            .post("/api/homepy/1/greeting", null, {
                params: { greeting: user_greeting }
            })
            .then(response => {
                console.log(response.data);;
            })
            .catch((error) => {
                console.log(error);
            })
    }


    if (isEdit) {
        return (
            <>

                <div className="frame-4">
                    <div className="div-wrapper">
                        <div className="text-wrapper-2">인사말</div>
                        <div classnane="frame-greeting">
                            <img className="tabler_checkbox" alt="tabler_checkbox" src={tabler_checkbox} onClick={() => setGreeting()} />
                        </div>
                    </div>
                    <div className="frame-5">
                        <textarea className="textarea" value={user_greeting} onChange={handleChange} />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                {
                    <div className="frame-4">
                        <div className="div-wrapper">
                            <div className="text-wrapper-2">인사말</div>
                            <div classnane="frame-greeting">
                                <img className="mingcute_edit_line" alt="mingcute_edit_line" src={mingcute_edit_line} onClick={() => setIsEdit(true)} />
                            </div>
                        </div>
                        <div className="frame-5">
                            <p className="p">
                                {user_greeting}
                            </p>
                        </div>
                    </div>
                }
            </>
        );
    }
}