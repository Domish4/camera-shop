import ReactFocusLock from 'react-focus-lock';
import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import { KeyCode } from '../../../utils/const';


type ModalProps = {
  isModalOpened: boolean;
  onCloseClick: () => void;
  children: React.ReactNode;
};

function Modal({ isModalOpened, onCloseClick, children }: ModalProps): JSX.Element {
  const modalRef = useRef(null);

  const onEscapeKeydown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === KeyCode.Esc) {
      onCloseClick();
    }
  }, [onCloseClick]);


  useEffect(() => {
    if (isModalOpened && modalRef.current) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscapeKeydown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEscapeKeydown);
    };
  }, [isModalOpened, onEscapeKeydown]);

  return (
    <ReactFocusLock autoFocus={false} disabled={!isModalOpened}>
      <div
        className={clsx('modal', isModalOpened && 'is-active')}
        ref={modalRef}
        tabIndex={-1}
        data-testid='modal'
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onCloseClick}></div>
          <div className="modal__content">
            {children}
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onCloseClick}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default Modal;
