import { Link } from 'react-router-dom';
import HeaderFormSearch from '../header-form-search/header-form-search';
import { AppRoute } from '../../utils/const';

function Header(): JSX.Element {
  return (
    <header className="header" id="header" data-testid='header-test'>
      <div className="container">
        <Link to={AppRoute.Main} className="header__logo" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to={AppRoute.Catalog} className="main-nav__link" >Каталог</Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">Гарантии</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">Доставка</a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">О компании</a>
            </li>
          </ul>
        </nav>
        <HeaderFormSearch />
        <Link to={AppRoute.ShopCart} className="header__basket-link">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </Link>
      </div>
    </header>
  );
}

export default Header;

