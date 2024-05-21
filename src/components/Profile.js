import "../homepy-style.css";
import "../homepy-styleguide.css";

import Ic_baseline_people from "../assets/ic-baseline-people.svg";
import Ic_outline_email from "../assets/ic-outline-email.svg";
import Mingcute_birthday from "../assets/mingcute-birthday-2-line.svg";
import Fluent_person from "../assets/fluent-person-12-regular.svg";
import Mingcute_location from "../assets/mingcute-location-line.svg";
import Mdi_heart from "../assets/mdi-heart.svg";
import Ic_baseline_people_white from "../assets/ic-baseline-people-white.svg";

const Profile = (props) => {
    return (
        <div className="frame-11">
            <div className="frame-12">
                <img className="mask-group-2" alt="Mask group" src={require("../assets/profile1.png")} />
                <div className="frame-13">
                    <div className="frame-14">
                        <div className="text-wrapper-5">박서현</div>
                        <div className="frame-15">
                            <div className="frame-16">
                                <img className="ic-baseline-people" alt="Ic baseline people" src={Ic_baseline_people} />
                                <div className="text-wrapper-6">봄봄</div>
                            </div>
                            <div className="text-wrapper-3">32</div>
                        </div>
                    </div>
                    <div className="frame-7">
                        <div className="frame-17">
                            <div className="frame-18">
                                <img className="img-3" alt="Ic outline email" src={Ic_outline_email} />
                                <div className="text-wrapper-7">이메일</div>
                            </div>
                            <div className="text-wrapper-8">baek789@naver.com</div>
                        </div>
                        <div className="frame-17">
                            <div className="frame-18">
                                <img className="img-3" alt="Mingcute birthday" src={Mingcute_birthday} />
                                <div className="text-wrapper-7">생년월일</div>
                            </div>
                            <div className="text-wrapper-8">2023-12-31</div>
                        </div>
                        <div className="frame-17">
                            <div className="frame-19">
                                <img className="img-3" alt="Fluent person" src={Fluent_person} />
                                <div className="text-wrapper-7">나이</div>
                            </div>
                            <div className="text-wrapper-8">20세</div>
                        </div>
                        <div className="frame-17">
                            <div className="frame-18">
                                <img className="img-3" alt="Mingcute location" src={Mingcute_location} />
                                <div className="text-wrapper-7">지역</div>
                            </div>
                            <div className="text-wrapper-8">서울</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="frame-20">
                <button className="button-2">
                    <img className="img-2" alt="Mdi heart" src={Mdi_heart} />
                    <div className="text-wrapper-9">관심 보내기</div>
                </button>
                <button className="button-3">
                    <img className="img-2" alt="Ic baseline people" src={Ic_baseline_people_white} />
                    <div className="text-wrapper-4">봄봄 신청하기</div>
                </button>
            </div>
        </div>
    );
}

export default Profile;