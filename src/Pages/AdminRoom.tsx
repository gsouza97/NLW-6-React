import { Link, useHistory, useParams } from "react-router-dom";
import logoImg from "../Assets/images/logo.svg";
import deleteImg from "../Assets/images/delete.svg";
import checkImg from "../Assets/images/check.svg";
import answerImg from "../Assets/images/answer.svg";
import Button from "../Components/Button";
import Question from "../Components/Question";
import RoomCode from "../Components/RoomCode";
import { useRoom } from "../Hooks/useRoom";
import "../Styles/room.scss";
import { database } from "../Services/firebase";

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
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

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${code}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${code}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />
          </Link>
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>
                <button
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Dar destaque à pergunta" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
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
