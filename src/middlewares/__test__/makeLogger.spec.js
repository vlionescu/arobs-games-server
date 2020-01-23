describe('logger [middleware]', () => {
  beforeEach(jest.resetModules);

  it('should be a function', () => {
    const makeLogger = require('../makeLogger');
    expect(typeof makeLogger).toEqual('function');
  });

  it('should return a function', () => {
    const makeLogger = require('../makeLogger');
    const logger = makeLogger();

    expect(typeof logger).toEqual('function');
  });

  it('should call next if ENV is test', () => {
    const makeLogger = require('../makeLogger');
    const logger = makeLogger();

    const next = jest.fn();

    logger(null, null, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should wrap res.send method', () => {
    const makeLogger = require('../makeLogger');
    const logger = makeLogger();

    jest.mock('../../config', () => ({ ENV: 'development' }));

    // eslint-disable-next-line no-console
    console.log = jest.fn();
    const next = jest.fn();
    const send = jest.fn();
    const now = jest.fn();

    const currentDate = Date.now();
    now.mockImplementation(() => currentDate);
    Date.now = now;

    const req = { path: 'path', method: 'method', body: {} };
    const res = { send };

    logger(req, res, next);
    res.send('Test value');

    expect(send).toHaveBeenCalledWith('Test value');
    expect(send).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenNthCalledWith(
      1,
      `[Request  ${req.path}]`,
      `[${new Date(currentDate).toLocaleString()}]`,
      req.method,
      req.body,
    );
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenNthCalledWith(
      2,
      `[Response ${req.path}]`,
      `[${new Date(currentDate).toLocaleString()}] ${currentDate - currentDate} ms`,
      'Test value',
    );
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledTimes(2);
  });
});
