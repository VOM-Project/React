import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Greeting.css";
import "../../pages/homepy-styleguide.css";

import mingcute_edit_line from "../../assets/mingcute_edit-line.svg";
import tabler_checkbox from "../../assets/tabler_checkbox.svg";


export default function Greeting({ memberId }) {

  /**
   * Authorization
   */
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };

  /**
   * Greeting
   */
  const [isEdit, setIsEdit] = useState(false);
  const [greeting, setGreeting] = useState();

  useEffect(() => {
    getGreeting();
  }, []);

  const getGreeting = async () => {
    try {
      const response = await axios.get(`/api/homepy/${memberId}/greeting`, config);
      console.log('Response data:', response.data);
      setGreeting(response.data.greeting);
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

  /* 인사말 변경 */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/homepy/${memberId}/greeting`, null, {
        params: {
          greeting: greeting,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      if (response.status === 200) {
        console.log('Greeting set successfully!');
      }
    } catch (error) {
      console.log('An error occurred. Please try again.');
    }

    setIsEdit(false);
  };

  /*
   * Render
   */
  if (!isEdit) {
    return (
      <>
        <div className="greeting">
          <div className="title">
            <div className="title-text">인사말</div>
            <img
              className="svg"
              alt="edit-svg"
              src={mingcute_edit_line}
              onClick={() => setIsEdit(true)}
            />
          </div>
          <div className="content">
            <p className="p">{greeting}</p>
          </div>
        </div>
      </>
    );
  } else { /* 변경중 */
    return (
      <>
        <div className="greeting">
          <div className="title">
            <div className="title-text">인사말</div>
            {/* <img
              className="svg"
              alt="checkbox-svg"
              src={tabler_checkbox}
            /> */}
          </div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="greeting"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                required
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}
