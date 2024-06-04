import React, { useState, useEffect } from "react";
import axios from "axios";

import "./CalleeProfile-style.css";
import Ic_baseline_people from "../../assets/ic-baseline-people.svg";
import Ic_outline_email from "../../assets/ic-outline-email.svg";
import Mingcute_birthday from "../../assets/mingcute-birthday-2-line.svg";
import Mingcute_location from "../../assets/mingcute-location-line.svg";
import Mdi_heart from "../../assets/mdi-heart.svg";
import Ic_baseline_people_white from "../../assets/ic-baseline-people-white.svg";

export default function CalleProfile() {
  // const baseUrl = "http://localhost:8080";

  const [user_profileImgUrl, setUser_profileImgUrl] = useState();
  const [user_nickname, setUser_nickname] = useState();
  const [user_vomvomCount, setUser_vomvomCount] = useState();
  const [user_email, setUser_email] = useState();
  const [user_birth, setUser_birth] = useState();
  const [user_region, setUser_region] = useState();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    await axios
      .get("/api/homepy/1/profile")
      .then((response) => {
        console.log(response.data);
        setUser_profileImgUrl(response.data.profileImgUrl);
        setUser_nickname(response.data.nickname);
        setUser_vomvomCount(response.data.vomVomCount);
        setUser_email(response.data.email);
        setUser_birth(response.data.birth);
        setUser_region(response.data.region);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const [profiles, setprofiles] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // // useEffect 에 첫번째 파라미터로 등록하는 함수에는 async 를 사용 할 수 없기 때문에
  // useEffect(() => {
  //     // 내부에서 async 를 사용하는 새로운 함수를 선언
  //     const fetchprofiles = async () => {
  //         try {
  //             // 요청이 시작 할 때에 error와 profiles를 초기화
  //             setError(null);
  //             setprofiles(null);
  //             // loading 상태를 true로 변경
  //             setLoading(true);
  //             const res = await axios.get(
  //                 "http://localhost:8080/api/homepy/1/profile"
  //             );
  //             setprofiles(res.data); // res.data 안에 API 데이터가 있다.
  //         } catch (e) {
  //             setError(e);
  //         }
  //         setLoading(false);
  //     };
  //     fetchprofiles();
  // }, []);

  // if (loading) return <div>로딩중..</div>; // 로딩 상태가 활성화 됐을때 렌더링 될 문구
  // if (error) return <div>에러가 발생했습니다</div>; // 에러 발생시 렌더링 될 문구
  // if (!profiles) return <div>노노</div>; // profiles 값이 없을 때에는 null 을 보여주도록 처리

  return (
    <>
      {
        // profiles.map(profile => (
        <div className="frame-11">
          <div className="frame-12">
            <img
              className="mask-group-2"
              alt="Mask group"
              src="https://vom-bucket.s3.ap-northeast-2.amazonaws.com/profile1.png"
            />
            <div className="frame-13">
              <div className="frame-14">
                <div className="text-wrapper-5">{user_nickname}</div>
                <div className="frame-15">
                  <div className="frame-16">
                    <img
                      className="ic-baseline-people"
                      alt="Ic baseline people"
                      src={Ic_baseline_people}
                    />
                    <div className="text-wrapper-6">봄봄</div>
                  </div>
                  <div className="text-wrapper-3">{user_vomvomCount}</div>
                </div>
              </div>
              <div className="frame-7">
                <div className="frame-17">
                  <div className="frame-18">
                    <img
                      className="img-3"
                      alt="Ic outline email"
                      src={Ic_outline_email}
                    />
                    <div className="text-wrapper-7">이메일</div>
                  </div>
                  <div className="text-wrapper-8">{user_email}</div>
                </div>
                <div className="frame-17">
                  <div className="frame-18">
                    <img
                      className="img-3"
                      alt="Mingcute birthday"
                      src={Mingcute_birthday}
                    />
                    <div className="text-wrapper-7">생년월일</div>
                  </div>
                  <div className="text-wrapper-8">{user_birth}</div>
                </div>
                <div className="frame-17">
                  <div className="frame-18">
                    <img
                      className="img-3"
                      alt="Mingcute location"
                      src={Mingcute_location}
                    />
                    <div className="text-wrapper-7">지역</div>
                  </div>
                  <div className="text-wrapper-8">{user_region}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-20">
            <button className="button-3">
              <img
                className="img-2"
                alt="Ic baseline people"
                src={Ic_baseline_people_white}
              />
              <div className="text-wrapper-4">봄봄 신청하기</div>
            </button>
          </div>
        </div>
        // ))
      }
    </>
  );
}
