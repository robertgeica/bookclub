import React, { useState, Fragment } from "react";
import axios from "axios";
import store from "../../store/store";

import { handleUpdateProfile } from '../../actions/profile';

const EditProfile = (props) => {

  let userProfile = props.profile[0];

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileUsername, setProfileUsername] = useState(null);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);

    onChangeProfileImage(e.target.files[0].name);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    await axios.post("api/fileupload", formData);
  };

  const onChangeProfileImage = (e) => {
    setProfileImage(e);
  };
  const onChangeProfileUsername = (e) => {
    setProfileUsername(e);
  };

  return (
    <div className="category-form">
      <form className="form">
        <input
          className="form-field"
          placeholder="category name"
          onChange={(e) =>
            onChangeProfileUsername(e.target.value)
          }
          defaultValue={userProfile.username}
        />

        <div className="inp">
          <label htmlFor={`profile`} className="btn select">
            Select Profile Image
          </label>
          <input
            id={`profile`}
            onChange={(e) => onFileChange(e)}
            className=" hide"
            type="file"
          />
          <input
            className="form-field upload middle-form-field"
            name="imageUrl"
            placeholder={
              selectedFile == null ? userProfile.profileImage : selectedFile.name
            }
            defaultValue={
              selectedFile == null ? '' : selectedFile.name
            }
          />
          <span className="btn" onClick={onFileUpload}>
            Upload
          </span>
        </div>

        <button
          type="button"
          className="btn"
          onClick={() =>
            store.dispatch(
              handleUpdateProfile(userProfile.userId, profileImage, profileUsername)
            )
          }
        >
          Update profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
