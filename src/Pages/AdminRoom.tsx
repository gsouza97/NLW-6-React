import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from "../Assets/images/logo.svg";
import deleImg from "../Assets/images/delete.svg";
import Button from "../Components/Button";
import Question from "../Components/Question";
import RoomCode from "../Components/RoomCode";
import { useAuth } from "../Hooks/useAuth";
import { useRoom } from "../Hooks/useRoom";
import "../Styles/room.scss";
import { database } from "../Services/firebase";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const code = params.id;
  const { questions, title } = useRoom(code);

  async function handleEndRoom() {
    await database.ref(`rooms/${code}`).update({
      closedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${code}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={code} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
