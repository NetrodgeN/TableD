import { useEffect, useState } from "react";

import { Car } from "@/pages/main-page/ui/table-test.tsx";
import Arrow from "@/shared/assets/icons/arrow-down.svg";
import { Button } from "@/shared/ui/buttons";
import { BUTTON_SIZE } from "@/shared/ui/buttons/button.tsx";
import { CellContext } from "@tanstack/react-table";

import classNames from "classnames/bind";

import styles from "./cell-with-sub-row.module.scss";

const cn = classNames.bind(styles);

export const CellWithSubRow = (cell: CellContext<Car, unknown>) => {
  const { getValue, row } = cell;
  const initialValue = getValue();

  const [value, setValue] = useState(initialValue as string);

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue as string);
  }, [initialValue]);

  return (
    <div
      className={cn(styles.cell__wrapper, {})}
      style={{ paddingLeft: `${row.depth * 2}rem` }}
    >
      {row.getCanExpand() && (
        <Button
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: "pointer" },
            size: BUTTON_SIZE.SMALL,
          }}
          icon={
            !row.getIsExpanded() ? (
              <img src={Arrow} alt="arrow-down" />
            ) : (
              <img
                src={Arrow}
                alt="arrow-up"
                style={{ transform: "rotate(-90deg)" }}
              />
            )
          }
        />
      )}
      <span style={{ paddingLeft: row.getCanExpand() ? 0 : 48 }}>
        {value}
        {row.originalSubRows?.length ? ` (${row.originalSubRows?.length})` : ""}
      </span>
    </div>
  );
};

CellWithSubRow.displayName = "CellWithSubRow";
