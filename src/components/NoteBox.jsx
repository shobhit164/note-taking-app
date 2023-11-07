import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../styles/NoteBox.module.css";

const NoteBox = (props) => {
  const { isMobile, id, username, shortname, usercolor, isSelected, onSelect } =
    props;

  const navigate = useNavigate();
  const [background, setBackground] = useState(false);

  const handleOnClick = () => {
    setBackground(!background);
    onSelect();
    navigate(`/write/${id}`);
  };

  const wrapperStyle = {
    backgroundColor: isSelected ? "#F7ECDC" : "",
  };

  const roundStyle = {
    backgroundColor: usercolor,
  };

  return (
    <Link
      to={`/write/${id}`}
      className={styles.wrapper}
      style={wrapperStyle}
      onClick={handleOnClick}
    >
      <div className={styles.round} style={roundStyle}>
        <span>{shortname}</span>
      </div>
      <p>{username}</p>
    </Link>
  );
};

export default NoteBox;
