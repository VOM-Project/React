self.addEventListener("install", function (e) {
    // console.log("fcm sw install..");
    self.skipWaiting();
});

self.addEventListener("activate", function (e) {
    // console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
    // console.log("push: ", e.data.json());
    if (!e.data.json()) return;

    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        /* 웹 푸시 알림에 이미지가 삽입되었으면 한다면 */
        icon: resultData.image,
        tag: resultData.tag,
        ...resultData,
    };
    // console.log("push: ", { resultData, notificationTitle, notificationOptions });

    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
    // console.log("notification click");
    const url = "/homepy";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});