import { MessageObject } from "./messageHandler"

describe('MessageObject', () => {
  test('can be instantiated with default values', () => {
    const messageObject = new MessageObject()
    expect(messageObject.class).toBeUndefined()
    expect(messageObject.api).toBeUndefined()
    expect(messageObject.method).toBeUndefined()
    expect(messageObject.xml).toBeUndefined()
    expect(messageObject.enumerationContext).toBeUndefined()
    expect(messageObject.error).toEqual([])
  })

  test('can be instantiated with provided values', () => {
    const messageObject = new MessageObject('testClass', 'testApi', 'testMethod', '<xml>test</xml>', 'testEnumerationContext')
    expect(messageObject.class).toEqual('testClass')
    expect(messageObject.api).toEqual('testApi')
    expect(messageObject.method).toEqual('testMethod')
    expect(messageObject.xml).toEqual('<xml>test</xml>')
    expect(messageObject.enumerationContext).toEqual('testEnumerationContext')
    expect(messageObject.error).toEqual([])
  })
})