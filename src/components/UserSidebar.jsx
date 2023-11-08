import React, { useEffect, useState } from "react";
import styles from "../styles/UserSidebar.module.css";
import NoteBox from "./NoteBox";

const UserSidebar = ({ isMobile, take, setInput }) => {
  const [users, setUsers] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    const storedUsersJSON = localStorage.getItem("users");
    const storedUsers = JSON.parse(storedUsersJSON) || [];
    setUsers(storedUsers);
  }, [take]);

  const handleNoteSelect = (noteId) => {
    setSelectedNoteId(noteId);
  };

  return (
    <div className={`${styles.wrapper} ${styles.font_family}`}>
      <p className={styles.p}>Pocket Notes</p>
      <div className={styles.main}>
        <button onClick={() => setInput(true)} className={styles.font_family}>
          <span>+</span>Create Notes group
        </button>
        <div className={styles.items}>
          <div className={styles.notes}>
            {users.map((user) => (
              <NoteBox
                isMobile={isMobile}
                id={user.id}
                key={user.id}
                username={user.userName}
                shortname={user.shortName}
                usercolor={user.userColor}
                isPicked={selectedNoteId === user.id}
                onGet={() => handleNoteSelect(user.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
