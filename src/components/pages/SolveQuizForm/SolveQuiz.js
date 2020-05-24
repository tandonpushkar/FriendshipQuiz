import React, { useState } from "react";
import { Link } from "react-router-dom";

let ResultGenerate = (AnswerData, QuestionData) => {
  let count = 0;
  let arrayAnswers = AnswerData.map(ans => {
    return ans.options.map(opt => {
      return opt.selected;
    });
  });
  let compareAnswers = QuestionData.map(ques => {
    return ques.options.map(opt => {
      return opt.selected;
    });
  });
  for (let i = 0; i < arrayAnswers.length; i++) {
    if (arrayAnswers[i][0] === compareAnswers[i][0]) {
      count++;
    }
  }

  return count;
};

let SolveQuiz = ({ name, sendername, SenderAnswer, id }) => {
  //Data

  const Data = [
    {
      id: "Question 1",
      Ques: `What is ${sendername}'s favorite vehicle??`,
      options: [
        { radioName: "Car", selected: true },
        { radioName: "Bike", selected: false }
      ]
    },
    {
      id: "Question 2",
      Ques: `What would ${sendername} choose?`,
      options: [
        { radioName: "Rose", selected: true },
        { radioName: "Lily", selected: false }
      ]
    },
    {
      id: "Question 3",
      Ques: `What is ${sendername}'s favorite slang term in electronic communications?`,
      options: [
        { radioName: "WTF", selected: true },
        { radioName: "LOL", selected: false }
      ]
    },
    {
      id: "Question 4",
      Ques: `What is ${sendername}'s favorite season?`,
      options: [
        { radioName: "Winter", selected: true },
        { radioName: "Summer", selected: false }
      ]
    },
    {
      id: "Question 5",
      Ques: `Which drink do ${sendername} like the most?`,
      options: [
        { radioName: "Soft drink", selected: true },
        { radioName: "Hard drink", selected: false }
      ]
    },
    {
      id: "Question 6",
      Ques: `Which animal do ${sendername} like the most?`,
      options: [
        { radioName: "Giraffe", selected: true },
        { radioName: "Rabbit", selected: false }
      ]
    },
    {
      id: "Question 7",
      Ques: `What is ${sendername}'s idea of a perfect evening?`,
      options: [
        { radioName: "Hit a club", selected: true },
        { radioName: "Movie with friends", selected: false }
      ]
    },
    {
      id: "Question 8",
      Ques: `What do ${sendername} prefer?`,
      options: [
        { radioName: "Tea", selected: true },
        { radioName: "Coffee", selected: false }
      ]
    }
  ];

  //state

  const [Loading, setLoading] = useState(false);
  const [ChangeButton, setChangeButton] = useState(false);
  const [QuestionData, SetQuestionData] = useState(Data);
  const [Result, setResult] = useState("");

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
    const result = ResultGenerate(SenderAnswer, QuestionData);
    setResult(result);

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/result/${id}`,
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
          result: result
        }) // body data type must match "Content-Type" header
      }
    );
    const message = await response.json();
    setLoading(false);
    setChangeButton(true);
  };

  return (
    <div class="container">
      {QuestionData.length < 1 ? (
        "Loading..."
      ) : (
          <div class="container">
            <p class="mb-5" />
            <div class="card text-center text-white font-weight-bolder text-uppercase p-2 mb-2" style={{
              backgroundImage: "linear-gradient( 65.5deg,  rgba(23,205,205,1) -15.1%, rgba(23,25,95,1) 71.5% )"
            }}>
              <h5>Hello {name},</h5>
            </div>
            <div class="card text-center text-white font-weight-bolder text-uppercase p-2 mb-2" style={{
              backgroundImage: "radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )"
            }}>
              <h5>Quiz about {sendername}</h5>
            </div>
            <div class="card text-center text-white font-weight-bolder p-2" style={{
              background: "linear-gradient(to right, #0575e6, #021b79)"
            }}>
              <h5>Select an answer for each of the following question :</h5>
            </div>

            {QuestionData.map((ques, idx) => (
              <div>
                <p class="mb-3" />
                <div class="card" style={{ backgroundColor: "#FFDEE9", backgroundImage: " linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)" }}>
                  <h5 class="card-header">{ques.id}</h5>
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
            ))}

            <p class="mb-4" />

            {Loading ? (
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
                  Your Quiz Has Been Submitted Successfully
              </div>
                <Link to={"/result/" + id}>
                  <button class="btn btn-success btn-lg btn-block " type="button">
                    Check Result
                </button>
                </Link>
              </div>
            ) : (
                  <button
                    class="btn btn-primary btn-lg btn-block "
                    onClick={onSubmit}
                    type="button">
                    Submit your quiz
                  </button>
                )}
            <br />
            <br />
          </div>
        )}
    </div>
  );
};

export default SolveQuiz;
