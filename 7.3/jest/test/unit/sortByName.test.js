const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
});


it("should names with duplicate titles", () => {
  expect(
    sorting.sortByName([
      "Гарри Поттер",
      "Властелин Колец",
      "Властелин Колец",
      "Волшебник изумрудного города",
    ])
  ).toEqual([
    "Властелин Колец",
    "Властелин Колец",
    "Волшебник изумрудного города",
    "Гарри Поттер",
  ]);
});

it("should return the same array if it contains only one element", () => {
  expect(sorting.sortByName(["Гарри Поттер"])).toEqual(["Гарри Поттер"]);
  });
  
it("should return an empty array if the input array is empty", () => {
  expect(sorting.sortByName([])).toEqual([]);
  });