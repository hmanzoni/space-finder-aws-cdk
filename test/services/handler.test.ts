import { handler } from '../../src/services/monitor/handler';

describe('Monitor lambda test test suit', () => {
  const festSpy = jest.spyOn(global, 'fetch');
  festSpy.mockImplementation(() => Promise.resolve({} as any));

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('makes reqs for records in SnsEvents', async () => {
    await handler({
      Records: [{ Sns: { Message: 'Test message' } }],
    } as any);
    expect(festSpy).toHaveBeenCalledTimes(1);
    expect(festSpy).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      body: JSON.stringify({ text: 'Test message' }),
    });
  });

  test('No records, no reqs', async () => {
    await handler({
      Records: [],
    } as any);
    expect(festSpy).not.toHaveBeenCalled();
  });
});
