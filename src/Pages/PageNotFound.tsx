import "../Styles/not-found.scss";
import logoImg from "../Assets/images/logo.svg";
import notFoundImg from "../Assets/images/notFound.png";
import { Link, useHistory } from "react-router-dom";
import Button from "../Components/Button";

const PageNotFound = () => {
  const history = useHistory();

  function handleNavigateToHome() {
    history.push("/");
  }

  return (
    <div id="page-not-found">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />
          </Link>
        </div>
      </header>
      <main>
        <img src={notFoundImg} alt="Error 404: Page Not Found" />
        <h1>Ooops...</h1>
        <p>page not found</p>
        <Button onClick={handleNavigateToHome}>Voltar ao início</Button>
      </main>
    </div>
  );
};

export default PageNotFound;
