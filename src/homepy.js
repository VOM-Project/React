import React from 'react'
import "./homepy-style.css";
import "./homepy-styleguide.css";
import Toast from "./components/Toast";
// import SVGInline from 'react-svg-inline'

import Search from "./assets/search.svg";
import Ph_bell_light from "./assets/ph-bell-light.svg";
import Ic_baseline_people from "./assets/ic-baseline-people.svg";
import Ic_outline_email from "./assets/ic-outline-email.svg";
import Mingcute_birthday from "./assets/mingcute-birthday-2-line.svg";
import Fluent_person from "./assets/fluent-person-12-regular.svg";
import Mingcute_location from "./assets/mingcute-location-line.svg";
import Mdi_heart from "./assets/mdi-heart.svg";
import Ic_baseline_people_white from "./assets/ic-baseline-people-white.svg";
import Icon from "./assets/icon-50.svg";


export default function main() {
    return (
        <div className="main">
            <div className="div-2">
                <header className="header">
                    <div className="frame">
                        <div className="input-no-label">
                            <div className="input-no-label-2">
                                <img className="ic-baseline-people" alt="Search" src={Search} />
                                <div className="label">닉네임을 검색해보세요</div>
                            </div>
                        </div>
                        <div className="input-no-label-3">
                            <img className="img" alt="Ph bell light" src={Ph_bell_light} />
                        </div>
                        <img className="mask-group" alt="Mask group" src={require("./assets/Mask-group.png")} />
                    </div>
                    <div className="text-wrapper">VOM</div>
                </header>
                <div className="frame-2">
                    <div className="frame-3">
                        <div className="frame-4">
                            <div className="div-wrapper">
                                <div className="text-wrapper-2">인사말</div>
                            </div>
                            <div className="frame-5">
                                <p className="p">
                                    안녕하세요 저는 대학교 다니는 박서현이에요!!
                                    <br />
                                    화상 채팅 좋아요
                                    <br />콕 찌르기도 좋아요 ^_^
                                    <br />
                                    봄봄 걸어주세요~~~
                                </p>
                            </div>
                        </div>
                        <div className="frame-6">
                            <div className="text-wrapper-3">관심 키워드</div>
                            <div className="frame-7">
                                <div className="frame-8">
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#개발</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#IT</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#운동</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#테니스</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#맛집 탐방</div>
                                    </div>
                                </div>
                                <div className="frame-8">
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#강아지</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#여행</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#영화 감상</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#산책</div>
                                    </div>
                                    <div className="tag-feature-l-instance">
                                        <div className="design-component-instance-node">#러닝</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="frame-9">
                            <div className="div-wrapper">
                                <div className="text-wrapper-2">앨범</div>
                            </div>
                            <div className="frame-wrapper">
                                <div className="frame-10">
                                    <div className="unsplash-wrapper">
                                        <img className="unsplash" alt="Unsplash" src={require("./assets/unsplash-oqHYQyGD9Po.png")} />
                                    </div>
                                    <div className="unsplash-wrapper">
                                        <img className="unsplash" alt="Unsplash" src={require("./assets/unsplash-r2nJPbEYuSQ.png")} />
                                    </div>
                                    <div className="unsplash-wrapper">
                                        <img className="unsplash" alt="Unsplash" src={require("./assets/unsplash-KMn4VEeEPR8.png")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="button">
                        <img className="img-2" alt="Icon" src={Icon} />
                        <div className="text-wrapper-4">화상채팅 시작하기</div>
                    </button>
                </div>
                <div className="frame-11">
                    <div className="frame-12">
                        <img className="mask-group-2" alt="Mask group" src={require("./assets/high-school-student-teenager-girl-headphones-with-tablet-home 1.png")} />
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
            </div>
        </div>
    );
}
