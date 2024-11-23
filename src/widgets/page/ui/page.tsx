import { memo, MutableRefObject, ReactNode, useRef } from "react";

import cls from "./page.module.scss";

export const PAGE_ID = "PAGE_ID";

interface PageProps {
  children: ReactNode;
}

export const Page = memo((props: PageProps) => {
  const { children } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <main ref={wrapperRef} className={cls.Page} id={PAGE_ID}>
      {children}
    </main>
  );
});

Page.displayName = "Page";
