import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ReviewBlock from '../../components/review-block/review-block';
import SimularCards from '../../components/simular-cards/simular-cards';

function ProductCardPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">Ретрокамера Das Auge IV</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x" />
                    <img src="img/content/das-auge.jpg" srcSet="img/content/das-auge@2x.jpg 2x" width="560" height="480" alt="Ретрокамера Das Auge IV" />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">Ретрокамера Das Auge IV</h1>
                  <div className="rate product__rate">
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-full-star"></use>
                    </svg>
                    <svg width="17" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <p className="visually-hidden">Рейтинг: 4</p>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>73 450 ₽</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <ProductTabs />
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <SimularCards />
          </div>
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export default ProductCardPage;
