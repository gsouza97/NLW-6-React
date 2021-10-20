import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../Assets/images/logo.svg";
import Button from "../Components/Button";
import Question from "../Components/Question";
import RoomCode from "../Components/RoomCode";
import { useAuth } from "../Hooks/useAuth";
import { useRoom } from "../Hooks/useRoom";
import { database } from "../Services/firebase";
import "../Styles/room.scss";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const code = params.id;
  const [newQuestion, setNewQuestion] = useState("");
  const { questions, title } = useRoom(code);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in.");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${code}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={code} />
            <Button isOutlined>Encerrar Sala</Button>
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
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
