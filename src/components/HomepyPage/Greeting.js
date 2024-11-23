import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Greeting.css";
import "../../pages/homepy-styleguide.css";

import mingcute_edit_line from "../../assets/mingcute_edit-line.svg";


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
  const [greeting, setGreeting] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newGreeting, setNewGreeting] = useState("");

  //getGreeting
  useEffect(() => {
    if (!memberId) {
      console.error("memberId is missing!");
      return;
    }
    axios
      .get(`/api/homepy/${memberId}/greeting`, config)
      .then((response) => {
        setGreeting(response.data.greeting);
      })
      .catch((error) => {
        console.error("Error fetching greeting:", error);
      });
  }, [memberId]);

  // setGreeting
  const updateGreeting = () => {
    if (!newGreeting.trim()) {
      alert("인사말을 입력해주세요!");
      return;
    }
    const queryParams = new URLSearchParams({ greeting: newGreeting }).toString();
    axios
      .post(`/api/homepy/${memberId}/greeting?${queryParams}`, null, config)
      .then((response) => {
        setGreeting(newGreeting); // 새 인사말 반영
        setIsEditing(false); // 편집 모드 닫기
      })
      .catch((error) => {
        console.error("Error updating greeting:", error);
      });
  };

  /*
   * Render
   */
  return (
    <div className="greeting">
      <div className="title">
        <div className="title-text">인사말</div>
        {memberId === localStorage.getItem("memberId") && (
          <img
            className="svg"
            alt="edit-svg"
            src={mingcute_edit_line}
            onClick={() => {
              if (isEditing) {
                updateGreeting(); // 인사말 업데이트
              } else {
                setIsEditing(true); // 편집 모드로 전환
              }
            }}
          />
        )}
      </div>
      <div className="content">
        {isEditing ? (
          <input
            type="text"
            className="textarea"
            value={newGreeting}
            onChange={(e) => setNewGreeting(e.target.value)}
            placeholder="새 인사말을 입력하세요"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateGreeting();
              }
            }}
          />
        ) : (
          <p className="textarea">{greeting}</p>
        )}
      </div>
    </div>
  );
}
