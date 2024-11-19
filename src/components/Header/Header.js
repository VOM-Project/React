import React from 'react'
import Search from "../../assets/search.svg";
import Ph_bell_light from "../../assets/ph-bell-light.svg";
import LogoutButton from "../../components/LoginPage/Logout.js";

function Header({ searchNickname, setSearchNickname, handleSearchNickname, profile_profileImgUrl }) {
    return (
        <header className="header">
            <div className="header-frame">
                <div className="header-search">
                    <img className="search-svg" alt="Search" src={Search} />
                    <input
                        className="label"
                        type="text"
                        value={searchNickname}
                        onChange={(e) => setSearchNickname(e.target.value)}
                        onKeyDown={(e) => handleSearchNickname(e)}
                        placeholder="닉네임을 검색해보세요"
                    />
                </div>
                <div className="header-notification">
                    <img
                        className="notification-svg"
                        alt="Ph bell light"
                        src={Ph_bell_light}
                    />
                </div>
                <img
                    className="header-profile"
                    alt="Mask group"
                    src={profile_profileImgUrl}
                />
                <LogoutButton />
            </div>
            <div className="header-home">VOM</div>
        </header>
    );
}

export default Header;