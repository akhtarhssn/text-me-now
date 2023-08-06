import React, { useContext, useState, useEffect } from "react";
import { ChatEngine } from "react-chat-engine";
import { AuthContext } from "../Providers/AuthProvider";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Chats = () => {
  const { user, logOut } = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  const projectId = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
  const privateKey = process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY;

  // console.log("Project ID:", projectId);
  // console.log("Private Key:", privateKey);

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": projectId,
          "user-name": user?.email,
          "user-secret": user?.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append("email", user?.email);
        formData.append("username", user?.email);
        formData.append("secret", user?.uid);

        getFile(user?.photoURL).then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users", formData, {
              headers: {
                "private-key": privateKey,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, history, projectId, privateKey]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">TextMe</div>
        <div className="logout-tab" onClick={() => logOut()}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID={projectId}
        userName={user?.email}
        userSecret={user?.uid}
      />
    </div>
  );
};

export default Chats;
