import { myParseNumbers, parseBody, parseXML, LogType, Logger, generateExtendedDataBase64, PeriodicType } from './common'
import { processors } from 'xml2js'

describe('common', () => {
  describe('myParseNumbers', () => {
    it('should return the value as is for ElementName or InstanceID starting with 0', () => {
      const value = '0123'
      const name = 'ElementName'
      const result = myParseNumbers(value, name)
      expect(result).toBe(value)
    })
    it('should call xml2js.parseNumbers for other cases', () => {
      const value = '123'
      const name = 'Attribute'
      const spy = jest.spyOn(processors, 'parseNumbers')
      const result = myParseNumbers(value, name)
      expect(spy).toHaveBeenCalledWith(value, name)
      expect(result).toBe(123) // assuming xml2js.parseNumbers returns an array
    })
  })
  describe('parseBody', () => {
    it('should return an empty string if message body is empty', () => {
      const message: any = { body: { text: '' } }
      const result = parseBody(message as any)
      expect(result).toBe('')
    })

    it('should parse the message body correctly', () => {
      const message: any = {
        body: {
          text:
            '5\r\n' +
            'hello\r\n' +
            '6\r\n' +
            ' world\r\n' +
            '0\r\n' +
            '\r\n',
          boundary: '',
          contentType: 'text',
          params: []
        },
        bodySize: 38,
        headersSize: 0,
        protocolVersion: '1',
        statusCode: 200
      }
      const result = parseBody(message as any)
      expect(result).toBe('hello world')
    })

    it('should return an empty string if the message body is invalid', () => {
      const message: any = {
        body: {
          text:
            '5\r\n' +
            'hello\r\n' +
            '6\r\n' +
            ' world', // missing the final chunk size and CRLF
        }
      }
      const result = parseBody(message as any)
      expect(result).toBe('')
    })
  })

  describe('parseXML', () => {
    it('should return null if the XML is invalid', () => {
      const xmlBody = '<invalid-xml'
      const result = parseXML(xmlBody)
      expect(result).toBeNull()
    })
  })

  describe('Logger', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
    const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => { })
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => { })
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => { })

    afterEach(() => {
      jest.clearAllMocks()
    })

    afterAll(() => {
      consoleErrorSpy.mockRestore()
      consoleDebugSpy.mockRestore()
      consoleInfoSpy.mockRestore()
      consoleWarnSpy.mockRestore()
    })

    it('should log an error message', () => {
      const module = 'test-module'
      const msg = 'test-error-msg'
      Logger(LogType.ERROR, module, msg)
      expect(consoleErrorSpy).toHaveBeenCalledWith(`${module}:${msg}`)
    })

    it('should log a debug message if the log level is DEBUG', () => {
      const module = 'test-module'
      const msg = 'test-debug-msg'
      const prevLogLevel = process.env.LOG_LEVEL
      process.env.LOG_LEVEL = 'DEBUG'
      Logger(LogType.DEBUG, module, msg)
      expect(consoleDebugSpy).toHaveBeenCalledWith(`${module}:${msg}`)
      process.env.LOG_LEVEL = prevLogLevel
    })

    it('should not log a debug message if the log level is not DEBUG', () => {
      const module = 'test-module'
      const msg = 'test-debug-msg'
      const prevLogLevel = process.env.LOG_LEVEL
      process.env.LOG_LEVEL = 'INFO'
      Logger(LogType.DEBUG, module, msg)
      expect(consoleDebugSpy).not.toHaveBeenCalled()
      process.env.LOG_LEVEL = prevLogLevel
    })

    it('should log an info message', () => {
      const module = 'test-module'
      const msg = 'test-info-msg'
      Logger(LogType.INFO, module, msg)
      expect(consoleInfoSpy).toHaveBeenCalledWith(`${module}:${msg}`)
    })

    it('should log a warning message', () => {
      const module = 'test-module'
      const msg = 'test-warning-msg'
      Logger(LogType.WARNING, module, msg)
      expect(consoleWarnSpy).toHaveBeenCalledWith(`${module}:${msg}`)
    })

    it('should not log a message for an invalid log type', () => {
      const module = 'test-module'
      const msg = 'test-msg'
      const invalidLogType = 'INVALID'
      Logger(invalidLogType as LogType, module, msg)
      expect(consoleErrorSpy).not.toHaveBeenCalled()
      expect(consoleDebugSpy).not.toHaveBeenCalled()
      expect(consoleInfoSpy).not.toHaveBeenCalled()
      expect(consoleWarnSpy).not.toHaveBeenCalled()
    })
  })
  describe('generateExtendedDataBase64', () => {
    test('generates extended data correctly for periodic type 0', () => {
      const expectedValue = 'AAAAAAAAAAo='
      const result = generateExtendedDataBase64(PeriodicType.Interval, 10)
      expect(result).toEqual(expectedValue)
    })
    
    test('generates extended data correctly for periodic type 1', () => {
      const expectedValue = 'AAAABQAAAB4='
      const result = generateExtendedDataBase64(PeriodicType.Daily, undefined, 5, 30)
      expect(result).toEqual(expectedValue)
    })
    
    test('generates empty extended data for other trigger types', () => {
      const expectedValue = ''
      const result = generateExtendedDataBase64()
      expect(result).toEqual(expectedValue)
    })
  })
})
