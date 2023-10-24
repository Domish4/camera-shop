import Spinner from '../spinner/spinner';
import '../spinner/spinner.css';

function Loader(): JSX.Element {
  return (
    <div className="container">
      <p>Loading ...</p>
      <Spinner />
    </div>
  );
}

export default Loader;
