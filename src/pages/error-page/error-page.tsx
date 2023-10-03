import { Link } from 'react-router-dom';

function ErrorPage(): JSX.Element {
  return (
    <>
      <div><h1>404. Такая страница не существует</h1></div>
      <Link to='/'><button>Вернуться на главную</button>
      </Link>
    </>
  );
}

export default ErrorPage;
