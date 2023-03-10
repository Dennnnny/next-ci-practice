import { addTen } from "./index"


describe('Home', () => {
  it("add 10 ",() => {
    expect(addTen(1)).toBe(11);
  })

  it("add in correctly", () => {
    expect(addTen(1)).toBe(11)
  })

  it("add in correctly", () => {
    expect(addTen(2)).toBe(12)
  })
})
