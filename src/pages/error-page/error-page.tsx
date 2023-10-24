import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

function ErrorPage(): JSX.Element {
  return (
    <>
      <div data-testid='error'><h1>404. Такая страница не существует</h1></div>
      <Link to={AppRoute.Catalog}><button>Вернуться на главную</button>
      </Link>
    </>
  );
}

export default ErrorPage;
