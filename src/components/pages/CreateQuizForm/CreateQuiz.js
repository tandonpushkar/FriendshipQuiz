import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import Data from "./Data";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon
} from "react-share";

let CreateQuiz = ({ name }) => {
  //state
  const [Loading, setLoading] = useState(false);
  const [QuestionData, SetQuestionData] = useState(Data);
  const [QuizLink, setQuizLink] = useState("");
  const [ChangeButton, setChangeButton] = useState(false);
  const [ResultLink, setResultLink] = useState("");
  const [getuserid, setuserid] = useState("");
  const [copyText, setcopyText] = useState("Copy Link");
  const clipboard = useClipboard();

  let copystate = () => {
    clipboard.copy();
    setcopyText("Copied");
  };

  let onInputChange = e => {
    const result = QuestionData.map(ques => {
      if (ques.id !== e.target.name) return ques;
      return {
        ...ques,
        options: ques.options.map(opt => {
          const checked = opt.radioName === e.target.value;
          return {
            ...opt,
            selected: checked
          };
        })
      };
    });
    SetQuestionData(result);
  };

  let onSubmit = async event => {
    setLoading(true);
    event.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/users`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          name: name,
          data: QuestionData
        }) // body data type must match "Content-Type" header
      }
    );
    const userid = await response.json();
    setuserid(userid);
    const resultlink = `${process.env.REACT_APP_BASE_URL}/result/${userid}`;
    const quizlink = `${process.env.REACT_APP_BASE_URL}/quiz/${userid}`;
    setLoading(false);
    setChangeButton(true);
    setQuizLink(quizlink);
    setResultLink(resultlink);
  };

  return (
    <div class="container">
      {QuestionData.length < 1 ? (
        "Loading..."
      ) : (
          <div class="container">
            <p class="mb-5" />
            <div class="card text-center text-white font-weight-bolder text-uppercase p-2 mb-4" style={{
              backgroundImage: "radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )"
            }}>

              <h3>Hello {name},</h3>

            </div>

            <div class="card text-center text-white font-weight-bolder p-2" style={{
              background: "linear-gradient(to right, #0575e6, #021b79)"
            }}>
              <h5>Select an answer for each of the following question :</h5>
            </div>

            {
              QuestionData.map((ques, idx) => (
                <div>
                  <p class="mb-3" />

                  <div class="card" style={{
                    backgroundColor: "#FFDEE9", backgroundImage: " linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"
                  }}>
                    <h5 class="card-header" > {ques.id}</h5>
                    <div class="card-body">
                      <blockquote class="blockquote mb-0">{ques.Ques}</blockquote>
                      <p class="card-text" style={{ display: "flex" }}>
                        {ques.options.map((lo, idx) => {
                          return (
                            <div class="mr-3">
                              <p class="mb-2" />
                              <div
                                class="input-group"
                                style={{
                                  display: "flex",
                                  flexDirection: "column"
                                }}>
                                <div class="input-group-prepend mb-1">
                                  <div class="input-group-text cc-selector">
                                    <input
                                      type="radio"
                                      id={lo.radioName}
                                      key={idx}
                                      name={ques.id}
                                      value={lo.radioName}
                                      checked={lo.selected}
                                      onChange={onInputChange}
                                      aria-label="Radio button for following text input"
                                    />
                                    <label
                                      class={`drinkcard-cc ${lo.radioName}`}
                                      for={lo.radioName}
                                    />
                                  </div>
                                </div>
                                <span
                                  class="input-group-text"
                                  id="inputGroup-sizing-default">
                                  {lo.radioName}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }

            <p class="mb-4" />

            {
              Loading ? (
                <button
                  class="btn btn-primary btn-lg btn-block "
                  onClick={onSubmit}
                  type="button"
                  disabled>
                  <span
                    class="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </button>
              ) : ChangeButton ? (
                <div>
                  <div class="alert alert-success" role="alert">
                    Quiz Created Successfully
              </div>
                  <WhatsappShareButton url={QuizLink} quote={name}>
                    <button class="btn btn-success btn-lg btn-block " type="button">
                      <WhatsappIcon size={50} round={true} />
                  Share to Whatsapp
                </button>
                  </WhatsappShareButton>
                </div>
              ) : (
                    <button
                      class="btn btn-primary btn-lg btn-block "
                      onClick={onSubmit}
                      type="button">
                      Create Quiz
                    </button>
                  )
            }

            <br />

            {
              QuizLink.length > 0 && (
                <div>
                  {" "}
                  <Link class="nav-link md-3" to={"/quiz/" + getuserid}>
                    <input
                      ref={clipboard.target}
                      style={{ width: "100%", marginBottom: "30px" }}
                      value={QuizLink}
                      readOnly
                    />
                  </Link>
                  <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button
                      type="button"
                      class="btn btn-outline-info"
                      onClick={copystate}>
                      {copyText}
                    </button>
                    <WhatsappShareButton url={QuizLink} quote={name}>
                      <WhatsappIcon size={50} round={true} />
                    </WhatsappShareButton>

                    <TelegramShareButton url={QuizLink} quote={name}>
                      <TelegramIcon size={50} round={true} />
                    </TelegramShareButton>
                  </div>
                </div>
              )
            }

            <br />
            <br />
          </div >
        )
      }
    </div >
  );
};

export default CreateQuiz;
