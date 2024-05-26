import React, { useState, useEffect } from "react";
import axios from "axios";

import "../homepy-style.css";
import "../homepy-styleguide.css";

import ph_plus_fill from "../assets/ph_plus-fill.svg";


export default function Album() {

    const [files, setFiles] = useState([]);

    const handleFilesChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const uploadFiles = (e) => {
        e.preventDefault();
        const formData = new FormData();

        files.map((file) => {
            formData.append("file", file);
        });

        console.log(Array.from(formData));

        axios.post('/api/album/1/new', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.error(err);
            });
    }

    // async function uploadAlbum() {
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     await axios
    //         .post("/api/album/1/new", formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //             params: { greeting: user_greeting }
    //         })
    //         .then(response => {
    //             console.log(response.data);;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    /**
     * 사진 조회
     */
    // const [user_albums, setUser_albums] = useState();

    // useEffect(() => {
    //     getAlbum();
    // }, []);

    // async function getAlbum() {
    //     await axios
    //         .get("/api/album/1")
    //         .then(response => {
    //             console.log(response.data);
    //             setUser_albums(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('/api/album/1') // 실제 API URL로 변경하세요
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching the images:', error);
            });
    }, []);


    return (
        <>
            <div className="frame-9">
                <div className="div-wrapper">
                    <div className="text-wrapper-2">앨범</div>
                    <div className="frame-a">
                        <form>
                            <input
                                className='file-input'
                                type="file"
                                mulitple
                                onChange={handleFilesChange}
                            />
                            {/* <button onClick={uploadFiles}>upload</button> */}
                            <img className="ph_plus_fill" alt="ph_plus_fill" src={ph_plus_fill} onClick={uploadFiles} />
                        </form>
                    </div>
                </div>
                <div className="frame-wrapper">
                    <div className="frame-10">
                        {images.map((image, index) => (
                            <div key={index} className="unsplash-wrapper">
                                <img src={image.img_url} alt={`Image ${index + 1}`} className="unsplash" />
                            </div>
                        ))}
                        {/* <div className="unsplash-wrapper">
                            <img className="unsplash" alt="Unsplash" src={require("../assets/unsplash-oqHYQyGD9Po.png")} />
                        </div>
                        <div className="unsplash-wrapper">
                            <img className="unsplash" alt="Unsplash" src={require("../assets/unsplash-r2nJPbEYuSQ.png")} />
                        </div>
                        <div className="unsplash-wrapper">
                            <img className="unsplash" alt="Unsplash" src={require("../assets/unsplash-KMn4VEeEPR8.png")} />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}