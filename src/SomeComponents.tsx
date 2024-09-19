import {useModal} from '@/app/providers/modal-provider';

export const SomeComponent = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div>
        <h2>Первое модальное окно</h2>
        <button onClick={() => openModal(
          <div>
            <h2>Вложенное модальное окно</h2>
            <p>Это вложенное модальное окно!</p>
          </div>
        )}>
          Открыть вложенное модальное окно
        </button>
      </div>
    );
  };

  return (
    <button onClick={handleOpenModal}>Открыть модальное окно</button>
  );
};
