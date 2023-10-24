import Spinner from '../spinner/spinner';
import '../spinner/spinner.css';

function Loader(): JSX.Element {
  return (
    <section className="container">
      <p>Loading ...</p>
      <Spinner />
    </section>
  );
}

export default Loader;
