import { useModal } from "@/app/providers/modal-provider";
import { AddTitleModal } from "@/pages/main-page/ui/add-title-modal.tsx";
import { Car } from "@/pages/main-page/ui/table-test.tsx";
import plusIcon from "@/shared/assets/icons/plus-icon.svg";
import { Dropdown } from "@/shared/ui/popups";
import { CellContext } from "@tanstack/react-table";

type RowType = {
  title: string;
  contentTitle: string;
  nestedTitle?: string;
};
export const MenuCell = (cell: CellContext<Car, unknown>) => {
  const { row, table } = cell;
  const { openModal } = useModal();

  const createRowHandler = ({ title, contentTitle, nestedTitle }: RowType) => {
    const newSubRow: Car = {
      id: `${row.id}-${Date.now()}`,
      title,
      content: contentTitle
        ? {
            id: `${row.id}-${Date.now()}`,
            title: contentTitle,
            specification: nestedTitle
              ? {
                  id: `${row.id}-${Date.now() - 0.123}`,
                  title: nestedTitle,
                }
              : {},
          }
        : {},
    };

    table.options.meta?.addSubRow(row.id, newSubRow);
  };

  const openCreateRowModal = () => {
    openModal(<AddTitleModal onSubmit={createRowHandler} />);
  };

  const deleteRowHandler = () => {};

  return (
    <Dropdown
      direction="bottom left"
      items={[
        {
          content: "Создать",
          onClick: openCreateRowModal,
        },
        {
          content: "Удалить",
          onClick: deleteRowHandler,
        },
      ]}
      trigger={<img src={plusIcon} alt="plus-icon" />}
    />
  );
};
