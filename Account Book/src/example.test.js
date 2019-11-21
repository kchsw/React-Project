import { exec } from "child_process";

test('test equal', () => {
    expect(2 + 1).toBe(3)
})

test('test not equal', () => {
    expect(2 + 2).not.toBe(3)
})

test('true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})

test('test number', () => {
    expect(4).toBeGreaterThan(3)
    expect(3).toBeLessThan(4)
})

test('test object', () => {
    expect({name: 'a'}).toEqual({name: 'a'})
})

