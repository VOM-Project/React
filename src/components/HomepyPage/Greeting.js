import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Greeting.css";
import "../../pages/homepy-styleguide.css";

import mingcute_edit_line from "../../assets/mingcute_edit-line.svg";
import tabler_checkbox from "../../assets/tabler_checkbox.svg";


export default function Greeting() {


  var memberId = 1;


  /**
   * Authorization
   */
  const config = {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3Nzg5ODA5LCJleHAiOjE3MjA0NjgyMDl9.dSVUDBi7AD6HKJqp5t-HIvsTHA97znaJvDVpBdbWSuM`,
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
  const handleChange = (e) => {
    setGreeting(e.target.value);
  };

  // const handleClick = () => {
  //     setUser({ greeting });
  // };

  const editGreeting = async () => {
    console.log('Greeting to be sent:', greeting);
    setIsEdit(false);

    try {
      const response = await axios.post(`/api/homepy/${memberId}/greeting`, {
        greeting: greeting,
      }, {
        headers: {
          Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3Nzg5ODA5LCJleHAiOjE3MjA0NjgyMDl9.dSVUDBi7AD6HKJqp5t-HIvsTHA97znaJvDVpBdbWSuM`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Error request data:', error.request);
      } else {
        console.log('Error message:', error.message);
      }
      console.log('Error config:', error.config);
    }
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
            <img
              className="svg"
              alt="checkbox-svg"
              src={tabler_checkbox}
              onClick={() => editGreeting()}
            />
          </div>
          <div className="content">
            <textarea
              className="textarea"
              value={greeting}
              onChange={handleChange}
            />
          </div>
        </div>
      </>
    );
  }
}
