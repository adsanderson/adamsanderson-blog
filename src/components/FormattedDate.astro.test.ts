import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import FormattedDate from './FormattedDate.astro';

test('FormattedDate renders date from Date object', async () => {
  const container = await AstroContainer.create();
  const testDate = new Date('2023-01-15T12:00:00Z');
  const result = await container.renderToString(FormattedDate, {
    props: {
      date: testDate,
    },
  });

  expect(result).toContain('<time');
  expect(result).toContain('datetime="2023-01-15T12:00:00.000Z"');
  expect(result).toContain('Jan 15, 2023');
});

test('FormattedDate renders date from string', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(FormattedDate, {
    props: {
      date: '2023-12-25',
    },
  });

  expect(result).toContain('<time');
  expect(result).toContain('datetime="2023-12-25T00:00:00.000Z"');
  expect(result).toContain('Dec 25, 2023');
});

test('FormattedDate renders ISO string correctly', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(FormattedDate, {
    props: {
      date: '2023-06-30T14:30:00Z',
    },
  });

  expect(result).toContain('<time');
  expect(result).toContain('datetime="2023-06-30T14:30:00.000Z"');
  expect(result).toContain('Jun 30, 2023');
});

test('FormattedDate throws error for undefined date', async () => {
  const container = await AstroContainer.create();
  
  await expect(
    container.renderToString(FormattedDate, {
      props: {
        date: undefined,
      },
    })
  ).rejects.toThrow('FormattedDate component requires a date prop');
});

test('FormattedDate throws error for invalid date string', async () => {
  const container = await AstroContainer.create();
  
  await expect(
    container.renderToString(FormattedDate, {
      props: {
        date: 'invalid-date',
      },
    })
  ).rejects.toThrow('Invalid date value: invalid-date');
});

test('FormattedDate throws error for invalid Date object', async () => {
  const container = await AstroContainer.create();
  
  await expect(
    container.renderToString(FormattedDate, {
      props: {
        date: new Date('invalid'),
      },
    })
  ).rejects.toThrow('Invalid date value:');
});

test('FormattedDate formats different months correctly', async () => {
  const container = await AstroContainer.create();
  
  const testCases = [
    { date: '2023-01-01', expected: 'Jan 1, 2023' },
    { date: '2023-02-14', expected: 'Feb 14, 2023' },
    { date: '2023-03-31', expected: 'Mar 31, 2023' },
    { date: '2023-04-15', expected: 'Apr 15, 2023' },
    { date: '2023-05-10', expected: 'May 10, 2023' },
    { date: '2023-06-22', expected: 'Jun 22, 2023' },
    { date: '2023-07-04', expected: 'Jul 4, 2023' },
    { date: '2023-08-25', expected: 'Aug 25, 2023' },
    { date: '2023-09-12', expected: 'Sep 12, 2023' },
    { date: '2023-10-31', expected: 'Oct 31, 2023' },
    { date: '2023-11-23', expected: 'Nov 23, 2023' },
    { date: '2023-12-25', expected: 'Dec 25, 2023' },
  ];

  for (const { date, expected } of testCases) {
    const result = await container.renderToString(FormattedDate, {
      props: { date },
    });
    expect(result).toContain(expected);
  }
});