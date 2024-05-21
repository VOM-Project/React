import React, { useState } from 'react'
import axios from "axios";
import "./homepy-style.css";
import "./homepy-styleguide.css";
import Toast from "./components/Toast";
import Profile from "./components/Profile";
// import SVGInline from 'react-svg-inline'

import Search from "./assets/search.svg";
import Ph_bell_light from "./assets/ph-bell-light.svg";
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
                <Profile />
            </div>
        </div>
    );
}
