import React from "react";
import Dropzone from "dropzone";

const FileUpload = () => {
    const dropZone = new Dropzone(".dropzone", {
        url: "http://localhost:8000/api/upload",
        method: "post",
        autoProcessQueue: false,
        paramName: "files",
        parallelUploads: 99,
        maxFileSize: 1000,
        uploadMultiple: true,
    });

    return (
        <form action="" class="dropzone" method="post" encType="multipart/form-data">
            <div>
                <input multiple type="file" />
            </div>
        </form>
    );
};

export default FileUpload;
