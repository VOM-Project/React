import React, { useState, useEffect } from "react";
import axios from "axios";

import "../../pages/homepy-style.css";
import "../../pages/homepy-styleguide.css";

import mingcute_edit_line from "../../assets/mingcute_edit-line.svg";
import tabler_checkbox from "../../assets/tabler_checkbox.svg";

export default function Greeting() {
  const [isEdit, setIsEdit] = useState(false);
  const [user_greeting, setUser_greeting] = useState();

  useEffect(() => {
    getUserGreeting();
  }, []);

  /**
   * 인사말 조회
   */
  const config = {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      Authorization: "Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3Nzc2MjgxLCJleHAiOjE3MTc3Nzg4NzN9.dvWnHVlgLAQqJDUjS7bePEBuSYzCuXUhP20T1KPVS_A",
    },
  };
  // async function getUser() {
  //   await axios
  //     .get("/api/homepy/1/greeting", config)
  //     .then((response) => {
  //       console.log(response.data);
  //       setUser_greeting(response.data.greeting);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }


  const getUserGreeting = async () => {
    try {
      const response = await axios.get('/api/homepy/1/greeting', config);
      console.log('Response data:', response.data);
      setUser_greeting(response.data.greeting);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
    }
  };

  getUserGreeting();


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
      .post("/api/homepy/1/greeting", config, {
        params: { greeting: user_greeting },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isEdit) {
    return (
      <>
        <div className="frame-4">
          <div className="div-wrapper">
            <div className="text-wrapper-2">인사말</div>
            <div className="frame-a">
              <img
                className="tabler_checkbox"
                alt="tabler_checkbox"
                src={tabler_checkbox}
                onClick={() => setGreeting()}
              />
            </div>
          </div>
          <div className="frame-5">
            <textarea
              className="textarea"
              value={user_greeting}
              onChange={handleChange}
            />
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
              <div className="frame-a">
                <img
                  className="mingcute_edit_line"
                  alt="mingcute_edit_line"
                  src={mingcute_edit_line}
                  onClick={() => setIsEdit(true)}
                />
              </div>
            </div>
            <div className="frame-5">
              <p className="p">{user_greeting}</p>
            </div>
          </div>
        }
      </>
    );
  }
}
