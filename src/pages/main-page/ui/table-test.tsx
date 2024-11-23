// TODO: нужно его отредактировать. Сама спецификация должна быть чем-то обширным, с множеством полей и картинкой?
export interface Specification {
  id?: string;
  title?: string;
}
export interface Content {
  id?: string;
  specification?: Specification;
  title?: string;
}

export interface Car {
  // TODO: определились, он не должен быть массивом, это объект
  content?: Content;
  id: string;
  subRows?: Car[];
  title: string;
}

export const fakeData: Car[] = [
  {
    content: {
      id: "1",
      title: "Описание?",
      specification: {
        id: "2",
        title: "Краткое описание",
      },
    },
    id: "123",
    subRows: [
      {
        id: "666",
        title: "AUDI",
        subRows: [
          {
            id: "669",
            title: "A3",
          },
          {
            id: "670",
            title: "A7",
          },
        ],
      },
      {
        id: "667",
        title: "SEAT",
      },
      {
        id: "668",
        title: "Bugatti",
      },
      {
        id: "671",
        title: "Ducatti",
      },
    ],
    title: "VOLKSWAGEN AUTO GROUP",
  },
  {
    id: "9909",
    subRows: [
      {
        content: {
          id: "1",
          specification: {
            id: "2",
            title: "Another Value",
          },
          title: "Another Cont",
        },

        id: "99",
        subRows: [
          {
            id: "991",
            title: "omg, what?",
          },
        ],
        title: "qwerqewr",
      },
    ],
    title: "12341234",
  },
  {
    id: "22",
    title: "Пустышка",
  },
];
