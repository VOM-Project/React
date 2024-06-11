import React, { useState, useEffect } from "react";
import axios from "axios";

import "./CalleeProfile-style.css";
import Ic_baseline_people from "../../assets/ic-baseline-people.svg";
import Ic_outline_email from "../../assets/ic-outline-email.svg";
import Mingcute_birthday from "../../assets/mingcute-birthday-2-line.svg";
import Mingcute_location from "../../assets/mingcute-location-line.svg";
import Mdi_heart from "../../assets/mdi-heart.svg";
import Ic_baseline_people_white from "../../assets/ic-baseline-people-white.svg";
import userImg from "../../assets/profile.png";

export default function CalleProfile({ remoteMemberId, connectHeaders }) {
  const [profile_profileImgUrl, setProfile_profileImgUrl] = useState();
  const [profile_nickname, setProfile_nickname] = useState();
  const [profile_vomvomCount, setProfile_vomvomCount] = useState();
  const [profile_email, setProfile_email] = useState();
  const [profile_birth, setProfile_birth] = useState();
  const [profile_region, setProfile_region] = useState();

  useEffect(() => {
    if (remoteMemberId) {
      getProfile();
    }
  }, [remoteMemberId]);

  async function getProfile() {
    const memberId = remoteMemberId;
    await axios
      .get(`/api/homepy/${memberId}/profile`, { headers: connectHeaders })
      .then((response) => {
        console.log(response.data);
        if (response.data.profileImgUrl == null) {
          setProfile_profileImgUrl(userImg);
        } else {
          setProfile_profileImgUrl(response.data.profileImgUrl);
        }
        setProfile_nickname(response.data.nickname);
        setProfile_vomvomCount(response.data.vomVomCount);
        setProfile_email(response.data.email);
        setProfile_birth(response.data.birth);
        setProfile_region(response.data.region);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {
        // profiles.map(profile => (
        <div className="frame-11">
          <div className="frame-12">
            <img
              className="mask-group-2"
              alt="Mask group"
              src={profile_profileImgUrl}
            />
            <div className="frame-13">
              <div className="frame-14">
                <div className="text-wrapper-5">{profile_nickname}</div>
                <div className="frame-15">
                  <div className="frame-16">
                    <img
                      className="ic-baseline-people"
                      alt="Ic baseline people"
                      src={Ic_baseline_people}
                    />
                    <div className="text-wrapper-6">봄봄</div>
                  </div>
                  <div className="text-wrapper-3">{profile_vomvomCount}</div>
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
                  <div className="text-wrapper-8">{profile_email}</div>
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
                  <div className="text-wrapper-8">{profile_birth}</div>
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
                  <div className="text-wrapper-8">{profile_region}</div>
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
