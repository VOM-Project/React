import React, { useEffect, useState } from 'react';
import style from './FCMPage.module.css';
// import { customAxios } from '../api/customAxios';
import { getToken, getMessaging } from 'firebase/messaging';
import { initializeApp } from "firebase/app";
// import toast from 'react-hot-toast';

const FCM = () => {
    // 버튼 토글
    const [isPushEnabled, setPushEnabled] = useState(false);

    // useEffect(() => {
    //     const isFCM = localStorage.getItem("fcmToken");
    //     if (isFCM !== null) {
    //         setPushEnabled(true);
    //     }
    // }, []);

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
    const FirebaseConfigApiKey = process.env.FIREBASE_CONFIG_APIKEY;
    const FirebaseConfigAuthDomain = process.env.FIREBASE_CONFIG_AUTHDOMAIN;
    const FirebaseConfigProjectId = process.env.FIREBASE_CONFIG_PROJECTID;
    const FirebaseConfigStorageBucket = process.env.FIREBASE_CONFIG_STORAGEBUCKET;
    const FirebaseConfigMessagingSenderId = process.env.FIREBASE_CONFIG_MESSAGINGSENDERID;
    const FirebaseConfigAppId = process.env.FIREBASE_CONFIG_APPID;
    const firebaseConfig = {
        apiKey: `${FirebaseConfigApiKey}`,
        authDomain: `${FirebaseConfigAuthDomain}`,
        projectId: `${FirebaseConfigProjectId}`,
        storageBucket: `${FirebaseConfigStorageBucket}`,
        messagingSenderId: `${FirebaseConfigMessagingSenderId}`,
        appId: `${FirebaseConfigAppId}`
    };

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);



    /* 테스트 */
    getFirebaseToken();



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
        const FcmToken = process.env.FCM_TOKEN
        try {
            const token = await getToken(messaging, {
                vapidKey: `${FcmToken}`,
            });

            if (token) {
                localStorage.setItem("fcmToken", token);
                setting(token);
                console.error(`${token}`);
            } else {
                // setPushEnabled(false);
                // return null;
                console.error("너냐");
            }
        } catch (error) {
            console.error("Error getting token: ", error);
            setPushEnabled(false);
            return null;
        }
    }

    const setting = (token) => {
        const body = {
            token: token
        };
        // customAxios.post("/fcm", body)
        //     .then((res) => {
        //         toast.success("푸시 알림을 받습니다", {
        //             duration: 1000,
        //         });
        //         setTimeout(() => {
        //         }, 1000);
        //     })
        //     .catch((res) => {
        //         setPushEnabled(false);
        //     })
    }

    const hideOffPush = () => {
        // customAxios.delete("/fcm")
        //     .then((res) => {
        //         window.localStorage.removeItem("fcmToken");
        //     })
        //     .catch((res) => {
        //     })
    }

    // return (
    //     <div className={style.btnBox}>
    //         <div className={style.pushSwitch + (isPushEnabled ? ' ' + style.pushEnabled : '')} onClick={togglePushNotification} >
    //             <div className={style.switchButton} />
    //         </div>

    //     </div>
    // );
};

export default FCM;