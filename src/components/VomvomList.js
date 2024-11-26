import React from "react";
import "./VomvomList.css"; // 스타일 파일 (선택사항)
import styled from "styled-components";
import userImg from "../assets/profile.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px; /* 모서리를 둥글게 */
  padding: 20px;
  width: 90%;
  max-width: 300px;
  max-height: 60%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const ModalTitle = styled.h2`
color: var(--main);
  font-family: var(--body-md-semibold-font-family);
  font-size: 18pt;
  font-style: var(--body-md-semibold-font-style);
  font-weight: var(--body-md-semi bold-font-weight);
  letter-spacing: var(--body-md-semibold-letter-spacing);
  line-height: var(--body-md-semi bold-line-height);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;

const FromMemberId = styled.div`
  color: var(--graysubtitle);
  flex: 1;
  font-family: var(--body-md-semibold-font-family);
  font-size: var(--body-md-semibold-font-size);
  font-style: var(--body-md-semibold-font-style);
  font-weight: var(--body-md-semibold-font-weight);
  letter-spacing: var(--body-md-semibold-letter-spacing);
  line-height: var(--body-md-semibold-line-height);
  position: relative;
`;

const CreatedAt = styled.div`
  color: var(--graysubtitle);
  flex: 1;
  font-family: var(--body-sm-regular-font-family);
  font-size: var(--body-sm-regular-font-size);
  font-style: var(--body-sm-regular-font-style);
  font-weight: var(--body-sm-regular-font-weight);
  letter-spacing: var(--body-sm-regular-letter-spacing);
  line-height: var(--body-sm-regular-line-height);
  position: relative;
`;

export default function VomvomList({ vomvomList, onClose }) {
  // return (
  //     <div className="vomvom-list">
  //         <h3>봄봄 친구 목록</h3>
  //         <button className="close-button" onClick={onClose}>
  //             닫기
  //         </button>
  //         <ul>
  //             {vomvomList.map((friend, index) => (
  //                 <li key={index} className="vomvom-list-item">
  //                     <img
  //                         src={friend.profileUrl}
  //                         alt={`${friend.nickname}'s profile`}
  //                         className="vomvom-list-img"
  //                     />
  //                     <span>{friend.nickname}</span>
  //                 </li>
  //             ))}
  //         </ul>
  //     </div>
  // );
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>VOMVOM</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <List>
          {vomvomList.map((vomvom, index) => (
            <ListItem key={index}>
              <ProfileImg
                src={vomvom.profileUrl || userImg} // 기본 이미지 fallback
                alt="profile"
              />
              <FromMemberId>{vomvom.nickname}</FromMemberId>
              {/* <CreatedAt>{new Date(point.createdAt).toISOString().slice(0, 16).replace('T', ' ')}</CreatedAt> */}
            </ListItem>
          ))}
        </List>
      </ModalContainer>
    </ModalOverlay>
  );
}