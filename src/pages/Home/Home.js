import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import QuestionDetail from "../Question/QuestionDetail";
import axios from "../../axios/axiosConfig";
import "../LoginPage/account.css";
import "./home.css";

function Home() {
  const [userData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (!userData.token) {
      navigate("/login");
    } else {
      loadQuestions();
    }
  }, [userData, navigate]);
  console.log(userData);
  const loadQuestions = async () => {
    try {
      const { data } = await axios.get("api/questions/getquestions", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setQuestions(data?.data);
      console.log(data);
      console.log(data?.data);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };

  const handleClick = () => {
    navigate("/newquestion");
  };

  const handleSearchChange = () => {
    const searchValue = searchRef.current.value.toLowerCase();
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.title.toLowerCase().includes(searchValue))
    );
  };

  return (
    <section className="container">
      <div className="header_row">
        <button className="blue_button" onClick={handleClick}>
          Ask Question
        </button>
        {userData.user && (
          <h1 className="header_border">
            Welcome: {userData.user.display_name}
          </h1>
        )}
      </div>
      <div className="search" style={{ borderBottom: "0.1px solid" }}>
        <h2>Questions</h2>
        <input
          className="search_bar"
          type="text"
          placeholder="Search..."
          ref={searchRef}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {questions.length === 0 ? (
          <div>No Result Found</div>
        ) : (
          questions.map((question) => (
            <QuestionDetail question={question} key={question.id} />
          ))
        )}
      </div>
    </section>
  );
}

export default Home;
