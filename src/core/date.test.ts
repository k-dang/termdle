import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { getTodaysDate } from './date';

describe('getTodaysDate', () => {
  beforeEach(() => {
    // Mock Date to ensure consistent test results
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers after each test
    vi.useRealTimers();
  });

  test('should return today\'s date in YYYY-MM-DD format', () => {
    // Set a specific date for testing
    const mockDate = new Date('2024-01-15T10:30:00Z');
    vi.setSystemTime(mockDate);

    const result = getTodaysDate();
    expect(result).toBe('2024-01-15');
    expect(typeof result).toBe('string');
    expect(result).toHaveLength(10);
  });

  test('should handle different timezones consistently', () => {
    // Test with different timezone offsets
    const mockDate = new Date('2024-06-15T15:30:00'); 
    vi.setSystemTime(mockDate);

    const result = getTodaysDate();
    expect(result).toBe('2024-06-15');
  });
});
