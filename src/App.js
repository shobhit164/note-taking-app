import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Avatar from "./components/Avatar";
import WriteArea from "./components/WriteArea";
import UserSidebar from "./components/UserSidebar";
import "./App.css";

function App() {
  const [input, setInput] = useState(false);
  const [id, setId] = useState(0);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [take, setTake] = useState(false);
  const [userColor, setUserColor] = useState("");

  const userNameRef = useRef();
  const [color1, setColor1] = useState(false);
  const [color2, setColor2] = useState(false);
  const [color3, setColor3] = useState(false);
  const [color4, setColor4] = useState(false);
  const [color5, setColor5] = useState(false);
  const [color6, setColor6] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      const parsedData = JSON.parse(data);
      const maxId = Math.max(...parsedData.map((user) => user.id));
      setId(maxId + 1);
      setUsers(parsedData);
    }
  }, []);

const makeNote = () => {
  if (userName && userName.length >= 1 && userColor) {
    setTake(!take);
    setInput(false);
    const newUser = {
      id: id,
      userName: userName,
      userColor: userColor,
      shortName: userName.slice(0, 2).toUpperCase(),
    };
    setId(id + 1);
    userNameRef.current.value = "";
    setColor1(false);
    setColor2(false);
    setColor3(false);
    setColor4(false);
    setColor5(false);
    setColor6(false);
    const newUsers = [...users, newUser];
    setUsers(newUsers);

    localStorage.setItem("users", JSON.stringify(newUsers));
  }
};


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="wrapper">
        <div className="highlight" style={{ display: input ? "flex" : "none" }}>
          <div className="main_group">
            <p className="heading">Create New Notes group</p>
            <span className="grp_name">
              Group Name{" "}
              <input
                ref={userNameRef}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Enter your group name...."
              />
            </span>

            <div className="magic_colors">
              <span>Choose colour</span>
              <span
                onClick={() => {
                  setUserColor("#B38BFA");
                  setColor1(!color1);
                  setColor2(false);
                  setColor3(false);
                  setColor4(false);
                  setColor5(false);
                  setColor6(false);
                }}
                className={`div color1 ${color1 ? "selected_color" : ""}`}
              ></span>
              <span
                onClick={() => {
                  setUserColor("#FF79F2");
                  setColor1(false);
                  setColor2(!color2);
                  setColor3(false);
                  setColor4(false);
                  setColor5(false);
                  setColor6(false);
                }}
                className={`div color2 ${color2 ? "selected_color" : ""}`}
              ></span>
              <span
                onClick={() => {
                  setUserColor("#43E6FC");
                  setColor1(false);
                  setColor2(false);
                  setColor3(!color3);
                  setColor4(false);
                  setColor5(false);
                  setColor6(false);
                }}
                className={`div color3 ${color3 ? "selected_color" : ""}`}
              ></span>
              <span
                onClick={() => {
                  setUserColor("#F19576");
                  setColor1(false);
                  setColor2(false);
                  setColor3(false);
                  setColor4(!color4);
                  setColor5(false);
                  setColor6(false);
                }}
                className={`div color4 ${color4 ? "selected_color" : ""}`}
              ></span>
              <span
                onClick={() => {
                  setUserColor("#0047FF");
                  setColor1(false);
                  setColor2(false);
                  setColor3(false);
                  setColor4(false);
                  setColor5(!color5);
                  setColor6(false);
                }}
                className={`div color5 ${color5 ? "selected_color" : ""}`}
              ></span>
              <span
                onClick={() => {
                  setUserColor("#6691FF");
                  setColor1(false);
                  setColor2(false);
                  setColor3(false);
                  setColor4(false);
                  setColor5(false);
                  setColor6(!color6);
                }}
                className={`div color6 ${color6 ? "selected_color" : ""}`}
              ></span>
            </div>
            <div className="btn_section">
              <button onClick={makeNote}>Create</button>
            </div>
          </div>
        </div>
        {isMobile ? (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <UserSidebar
                    take={take}
                    setInput={setInput}
                    isMobile={isMobile}
                  ></UserSidebar>
                }
              ></Route>
              <Route
                path="/write/:noteId"
                element={<WriteArea users={users}></WriteArea>}
              ></Route>
            </Routes>
          </>
        ) : (
          <>
            <div className="userSidebar">
              <UserSidebar take={take} setInput={setInput}></UserSidebar>
            </div>
            <div className="avatar">
              <Routes>
                <Route
                  path="/write/:noteId"
                  element={<WriteArea users={users}></WriteArea>}
                ></Route>
                <Route path="/" element={<Avatar></Avatar>}></Route>
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
