import React, { useState, useEffect } from "react";
import axios from "axios";

import "../homepy-style.css";
import "../homepy-styleguide.css";

import mingcute_edit_line from "../assets/mingcute_edit-line.svg";

export default function Greeting() {

    const [user_greeting, setUser_greeting] = useState();

    useEffect(() => {
        getUser();
    }, []);

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

    return (
        <>
            {
                <div className="frame-4">
                    <div className="div-wrapper">
                        <div className="text-wrapper-2">인사말</div>
                        <div classnane="frame-greeting">
                            <img className="mingcute_edit_line" alt="mingcute_edit_line" src={mingcute_edit_line} />
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