import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/WriteArea.module.css";
import NoteBox from "./NoteBox";
import TextBox from "./TextBox";
import sendicon from "../resources/sendicon.png";
import backicon from "../resources/backicon.png";

const WriteArea = ({ users }) => {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [userName, setUserName] = useState("");
  const [userColor, setUserColor] = useState("");
  const [shortName, setShortName] = useState("");
  const [newText, setNewText] = useState("");
  const [myTexts, setMyTexts] = useState([]);

  useEffect(() => {
    const user = users.find((element) => element.id === parseInt(noteId));
    if (user) {
      setUserName(user.userName);
      setUserColor(user.userColor);
      setShortName(user.shortName);
      setMyTexts(user.texts ? Object.values(user.texts) : []);
    }
  }, [noteId, users]);

  const handleText = (e) => {
    setNewText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === parseInt(noteId)) {
        user.texts = user.texts || {};

        user.textCount = (user.textCount || 0) + 1;
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        user.texts[`text${user.textCount}`] = {
          data: newText,
          dateStamp: formatDate(new Date()),
          timeStamp: `${formattedHours}:${formattedMinutes} ${ampm}`,
        };

        return user;
      }
      return user;
    });

    setMyTexts(
      Object.values(
        updatedUsers.find((user) => user.id === parseInt(noteId)).texts || {}
      )
    );

    const updatedArray = users.map((user) => {
      if (user.id === parseInt(noteId)) {
        return updatedUsers.find((u) => u.id === user.id);
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedArray));
    setNewText("");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <header>
        <img onClick={handleBack} src={backicon} alt="" />
        <div style={{ pointerEvents: "none" }}>
          <NoteBox
            username={userName}
            usercolor={userColor}
            shortname={shortName}
          />
        </div>
      </header>
      <main>
        <br />
        <br />
        {myTexts.map((text, index) => (
          <TextBox
            key={index}
            data={text.data}
            dateStamp={text.dateStamp}
            timeStamp={text.timeStamp}
          ></TextBox>
        ))}
      </main>
      <footer>
        <textarea
          onChange={handleText}
          onKeyDown={handleKeyDown}
          placeholder="Enter your text here..........."
          value={newText}
        ></textarea>
        <img onClick={handleSubmit} src={sendicon} alt="" />
      </footer>
    </div>
  );
};

export default WriteArea;
