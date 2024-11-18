const { addNumbers } = require('./index');

describe('addNumbers', () => {
  // Test valid numeric additions
  test('adds two numbers correctly', () => {
    expect(addNumbers(5, 3)).toBe(8);
    expect(addNumbers(-1, 1)).toBe(0);
    expect(addNumbers(0, 0)).toBe(0);
    expect(addNumbers(2.5, 3.5)).toBe(6);
  });

  // Test numeric strings (should work after conversion)
  test('handles numeric strings correctly', () => {
    expect(addNumbers('5', '3')).toBe(8);
    expect(addNumbers(5, '3')).toBe(8);
    expect(addNumbers('5', 3)).toBe(8);
  });

  // Test invalid inputs - non-numeric strings
  test('throws TypeError for non-numeric string in first argument', () => {
    expect(() => addNumbers('ten', 5)).toThrow(TypeError);
    expect(() => addNumbers('ten', 5)).toThrow('Invalid first argument: Expected a number, got string');
  });

  test('throws TypeError for non-numeric string in second argument', () => {
    expect(() => addNumbers(5, 'ten')).toThrow(TypeError);
    expect(() => addNumbers(5, 'ten')).toThrow('Invalid second argument: Expected a number, got string');
  });

  // Test other invalid inputs
  test('throws TypeError for other invalid inputs', () => {
    // Test objects
    expect(() => addNumbers({}, 5)).toThrow(TypeError);
    expect(() => addNumbers(5, {})).toThrow(TypeError);

    // Test arrays
    expect(() => addNumbers([], 5)).toThrow(TypeError);
    expect(() => addNumbers(5, [])).toThrow(TypeError);

    // Test null
    expect(() => addNumbers(null, 5)).toThrow(TypeError);
    expect(() => addNumbers(5, null)).toThrow(TypeError);

    // Test undefined
    expect(() => addNumbers(undefined, 5)).toThrow(TypeError);
    expect(() => addNumbers(5, undefined)).toThrow(TypeError);
  });

  // Test edge cases
  test('handles edge cases correctly', () => {
    // Very large numbers
    expect(addNumbers(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
    
    // Very small numbers
    expect(addNumbers(Number.MIN_SAFE_INTEGER, -1)).toBe(Number.MIN_SAFE_INTEGER - 1);
    
    // Zero with negative numbers
    expect(addNumbers(0, -0)).toBe(0);
  });
});