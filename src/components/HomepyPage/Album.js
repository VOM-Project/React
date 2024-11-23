import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Album.css";
import "../../pages/homepy-styleguide.css";

import ph_plus_fill from "../../assets/ph_plus-fill.svg";


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
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const uploadFiles = (e) => {
        e.preventDefault();
        if (!file) {
            alert("업로드할 파일을 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append(`file`, file);

        axios.post(`/api/album/${memberId}/new`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                console.log(res.data);
                setShowUploadModal(false);
                setFile(null);
                setPreview("");
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
            .then((response) => {
                // 서버 응답이 성공적이면 상태 업데이트
                const updatedImages = images.filter(image => image.id !== id);
                setImages(updatedImages);
            })
            .catch(error => {
                console.error("There was an error deleting the image!", error);
            });
    };

    /* 이미지 모달 상태 */
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    /*
     * Render
     */
    return (
        <>
            <div className="album">
                <div className="title">
                    <div className="title-text">앨범</div>
                    <button
                        className="upload-button"
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                    >
                        <img className="svg" alt="upload-svg" src={ph_plus_fill} />
                    </button>
                </div>
                {/* <form onSubmit={uploadFiles}>
                    <input
                        className='file-input'
                        type="file" multiple
                        onChange={handleUpload} />
                    <button className='upload-button' type="submit">
                        <img className="svg"
                            alt="upload-svg" src={ph_plus_fill} />
                    </button>
                </form> */}
                <div className="content">
                    <div className="frame">
                        {images.map((image) => (
                            <div key={image.id} className="img-wrapper" onClick={() => {
                                setSelectedImage(image); // 선택된 이미지 데이터 설정
                                setShowImageModal(true);
                            }}>
                                <img src={image.img_url} alt={`Image ${image.id}`} className="img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div >

            {/* 업로드 모달 */}
            {showUploadModal && (
                <div className="modal-backdrop">
                    <div className="modal-upload">
                        <h3>사진 업로드</h3>
                        <form onSubmit={uploadFiles}>
                            <input
                                className="file-input"
                                type="file"
                                onChange={handleUpload}
                                accept="image/*"
                            />

                            {/* 미리보기 */}
                            {preview && (
                                <div className="preview">
                                    <img src={preview} alt="Preview" className="preview-img" />
                                </div>
                            )}

                            <button className="pink-button" type="submit">
                                업로드
                            </button>
                            <button
                                className="white-button"
                                type="button"
                                onClick={() => {
                                    setShowUploadModal(false);
                                    setFile(null);
                                    setPreview("");
                                }}
                            >
                                취소
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* 이미지 모달 */}
            {showImageModal && selectedImage && (
                <div className="modal-backdrop">
                    <div className="modal-image">
                        <img
                            src={selectedImage.img_url}
                            alt={`Selected Image`}
                            className="modal-img"
                        />
                        <div className="button-frame">
                            <button
                                className="white-button"
                                onClick={() => setShowImageModal(false)}
                            >
                                닫기
                            </button>

                            {/* 삭제 버튼 (memberId가 동일한 경우에만 표시) */}
                            {memberId === localStorage.getItem("memberId") && (
                                <button
                                    className="pink-button"
                                    onClick={() => {
                                        handleDelete(selectedImage.id); // 이미지 삭제
                                        setShowImageModal(false); // 모달 닫기
                                    }}
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}