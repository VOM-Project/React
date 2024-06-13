import React, { useEffect, useState } from "react";
import style from "./FCMPage.module.css";
import axios from 'axios';
import { getToken, getMessaging } from "@firebase/messaging";
import { initializeApp } from "@firebase/app";
// import toast from 'react-hot-toast';

const FCM = () => {
    // 버튼 토글
    const [isPushEnabled, setPushEnabled] = useState(false);

    useEffect(() => {
        const isFCM = localStorage.getItem("fcmToken");
        if (isFCM == null) {
            getFirebaseToken();
        }
    }, []);

    const togglePushNotification = () => {
        if (isPushEnabled === false) {
            setPushEnabled(true);
            hideOnPush();
        } else if (isPushEnabled === true) {
            setPushEnabled(false);
            hideOffPush();
        }
    };

    // firebase 설정
    const firebaseConfig = {
        apiKey: "AIzaSyDGhHbHf450b3YzFkkt2ijsQl3aqv46ZC8",
        authDomain: "vomvom-fd09b.firebaseapp.com",
        projectId: "vomvom-fd09b",
        storageBucket: "vomvom-fd09b.appspot.com",
        messagingSenderId: "432336158624",
        appId: "1:432336158624:web:746d838315ee0a98356ec5",
        measurementId: "G-3GVCL4J5VZ"
    };
    // console.log("fiirebase config api key:", FirebaseConfigApiKey);

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);


    const hideOnPush = async () => {
        // 1. 알림 설정 허용인지 체크
        // const permission = await subs();

        // if (permission === "denied") {
        //     // 알림 권한이 거부된 경우의 동작
        //     setPushEnabled(false);
        // } else {
        //     // 알림 권한이 허용된 경우의 동작
        //     setTimeout(getFirebaseToken(), 1000);
        // }


    }

    async function subs() {

        const permission = await Notification.requestPermission();
        return permission;
    }

    async function getFirebaseToken() {
        try {
            const token = await getToken(messaging, {
                vapidKey: "BFnobZ_xdzY2JservLmuItkwkzzfxiMO_gvY5d2saZsp3GL6PVq_2cVFx7MobYgGx-6joWVvxvjvRe_7zRtnGMw",
            });

            if (token) {
                localStorage.setItem("fcmToken", token);
                setFcmToken(token);
                console.error(`${token}`);
            } else {
                // setPushEnabled(false);
                // return null;
            }
        } catch (error) {
            console.error("Error getting token: ", error);
            setPushEnabled(false);
            return null;
        }
    }

    const setFcmToken = async (fcmToken) => {
        try {
            const response = await axios.post(`/api/fcm/${localStorage.getItem("memberId")}`, null, {
                params: {
                    fcmToken: fcmToken
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            });
            if (response.status === 200) {
                console.log('FCM token set successfully');
            } else {
                console.error('Failed to set FCM token', response.status);
            }
        } catch (error) {
            console.error('Error setting FCM token:', error);
            console.log('Error response data:', error.response.data);
            console.log('Error response status:', error.response.status);
            console.log('Error response headers:', error.response.headers);
        }
    };

    const hideOffPush = () => {
        // customAxios.delete("/fcm")
        //     .then((res) => {
        //         window.localStorage.removeItem("fcmToken");
        //     })
        //     .catch((res) => {
        //     })
    };

    // return (
    //     <div className={style.btnBox}>
    //         <div className={style.pushSwitch + (isPushEnabled ? ' ' + style.pushEnabled : '')} onClick={togglePushNotification} >
    //             <div className={style.switchButton} />
    //         </div>

    //     </div>
    // );
};

export default FCM;
