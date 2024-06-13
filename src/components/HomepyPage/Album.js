import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Album.css";
import "../../pages/homepy-styleguide.css";

import ph_plus_fill from "../../assets/ph_plus-fill.svg";


// const FileUpload = ({ memberId }) => {
export default function Album({ memberId }) {

    /**
   * Authorization
   */
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    };

    /* 사진 조회 */
    // 상태 관리: 이미지 목록
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`/api/album/${memberId}`, config)
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching the images:', error);
            });
    }, [memberId]);

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
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            }).catch((err) => {
                console.log('Error response data:', err.response.data);
                console.log('Error response status:', err.response.status);
                console.log('Error response headers:', err.response.headers);
            });
    };

    /* 사진 삭제 */
    const handleDelete = (id) => {
        axios.delete(`/api/album/${memberId}/${id}/delete`, config)
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
                    <div className="frame">
                        {images.map((image) => (
                            <div key={image.id} className="img-wrapper">
                                <img src={image.img_url} alt={`Image ${image.id}`} className="img" onClick={() => handleDelete(image.id)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}