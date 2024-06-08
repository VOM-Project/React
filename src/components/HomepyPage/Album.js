import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Album.css";
import "../../pages/homepy-styleguide.css";

import ph_plus_fill from "../../assets/ph_plus-fill.svg";


// const FileUpload = ({ memberId }) => {
export default function Album() {


    var memberId = 1;


    /**
   * Authorization
   */
    const config = {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3Nzg5ODA5LCJleHAiOjE3MjA0NjgyMDl9.dSVUDBi7AD6HKJqp5t-HIvsTHA97znaJvDVpBdbWSuM`,
        },
    };

    /* 사진 등록 */
    const [files, setFiles] = useState([]);

    const handleUpload = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const uploadFiles = (e) => {
        e.preventDefault();
        const formData = new FormData();

        files.forEach((file, index) => {
            formData.append(`file`, file);
        });

        console.log(Array.from(formData.entries()));

        axios.post(`/api/album/${memberId}/new`, formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                Authorization: `Bearer eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInN1YiI6InRlc3QxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE3Nzg5ODA5LCJleHAiOjE3MjA0NjgyMDl9.dSVUDBi7AD6HKJqp5t-HIvsTHA97znaJvDVpBdbWSuM`,
            },
        })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log('Error response data:', err.response.data);
                console.log('Error response status:', err.response.status);
                console.log('Error response headers:', err.response.headers);
            });
    };

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

    /* 사진 조회 */
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

    // 상태 관리: 이미지 목록
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`/api/album/${memberId}`, config) // 실제 API URL로 변경하세요
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching the images:', error);
            });
    }, []);

    /* 사진 삭제 */
    const handleDelete = (id) => {
        axios.delete(`/api/album/1/${memberId}/delete`, config)
            .then(response => {
                // 서버 응답이 성공적이면 상태 업데이트
                const updatedImages = images.filter(image => image.id !== id);
                setImages(updatedImages);
            })
            .catch(error => {
                console.error("There was an error deleting the image!", error);
            });
    };


    /*
     * Render
     */
    return (
        <>
            <div className="album">
                <div className="title">
                    <div className="title-text">앨범</div>
                    <form onSubmit={uploadFiles}>
                        <input
                            className='file-input'
                            type="file" multiple
                            onChange={handleUpload} />
                        <button className='upload-button' type="submit">
                            <img className="svg"
                                alt="upload-svg" src={ph_plus_fill} />
                        </button>
                    </form>
                </div>
                <div className="content">
                    <div className="frame-10">
                        {images.map((image) => (
                            <div key={image.id} className="unsplash-wrapper">
                                <img src={image.img_url} alt={`Image ${image.id}`} className="unsplash" onClick={() => handleDelete(image.id)} />
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