import { useModal } from "@/app/providers/modal-provider";

export const SomeComponent = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal(
      <div>
        <h2>Первое модальное окно</h2>
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          onClick={() =>
            openModal(
              <div>
                <h2>Вложенное модальное окно</h2>
                <p>Это вложенное модальное окно!</p>
              </div>,
            )
          }
        >
          Открыть вложенное модальное окно
        </button>
      </div>,
    );
  };

  // eslint-disable-next-line react/button-has-type
  return <button onClick={handleOpenModal}>Открыть модальное окно</button>;
};
