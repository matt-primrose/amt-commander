import { DigestAuth, DigestAuthHeaders } from './digestAuth'

describe('DigestAuth test suite', () => {
  let digestAuth: DigestAuth

  beforeEach(() => {
    digestAuth = new DigestAuth('username', 'password', 'https://example.com', 8080)
  })
  describe('DigestAuth', () => {
    it('should return the correct username', () => {
      expect(digestAuth.getUsername()).toBe('username')
    })

    it('should set the username correctly', () => {
      digestAuth.setUsername('newusername')
      expect(digestAuth.getUsername()).toBe('newusername')
    })

    it('should return the correct password', () => {
      expect(digestAuth.getPassword()).toBe('password')
    })

    it('should set the password correctly', () => {
      digestAuth.setPassword('newpassword')
      expect(digestAuth.getPassword()).toBe('newpassword')
    })

    it('should return the correct URL', () => {
      expect(digestAuth.getUrl()).toBe('https://example.com')
    })

    it('should set the URL correctly', () => {
      digestAuth.setUrl('https://example2.com')
      expect(digestAuth.getUrl()).toBe('https://example2.com')
    })

    it('should return the correct port', () => {
      expect(digestAuth.getPort()).toBe(8080)
    })

    it('should set the port correctly', () => {
      digestAuth.setPort(8081)
      expect(digestAuth.getPort()).toBe(8081)
    })

    it('should return a new DigestAuthHeaders object', () => {
      const headers = digestAuth.getDigestAuthHeaders()
      expect(headers.realm).toBeUndefined()
      expect(headers.nonce).toBeUndefined()
      expect(headers.stale).toBeUndefined()
      expect(headers.qop).toBeUndefined()
      expect(headers.consoleNonce).toBeUndefined()
      expect(headers.uri).toBeUndefined()
      expect(headers.nonceCounter).toBe(1)
      expect(headers.nc).toBeUndefined()
    })

    it('should set the DigestAuthHeaders object correctly', () => {
      const headers = {
        realm: 'example realm',
        nonce: 'example nonce',
        stale: 'false',
        qop: 'auth',
        consoleNonce: 'example consoleNonce',
        uri: '/example',
        nonceCounter: 2,
        nc: '00000002',
      }
      digestAuth.setDigestAuthHeaders(headers)
      expect(digestAuth.getDigestAuthHeaders()).toEqual(headers)
    })
  })
  describe('parseAuthorizationHeader', () => {
    it('should return existing digestAuthHeaders when qop is not null', () => {
      digestAuth.getDigestAuthHeaders().qop = 'auth'
      const message: any = { headers: [] }
      const result = digestAuth.parseAuthorizationHeader(message)
      expect(result).toEqual(digestAuth.getDigestAuthHeaders())
    })

    it('should parse Www-Authenticate header when qop is null', () => {
      const message: any = {
        headers: [{ name: 'Www-Authenticate', value: 'Digest realm="testrealm@host.com",nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",qop="auth",stale="",uri=""' }]
      }
      const expected: any = {
        realm: 'testrealm@host.com',
        nonce: 'dcd98b7102dd2f0e8b11d0f600bfb0c093',
        stale: '',
        qop: 'auth',
        uri: '',
        nonceCounter: 1
      }
      const result = digestAuth.parseAuthorizationHeader(message)
      expect(result).toEqual(expected)
    })

    it('should return undefined when Www-Authenticate header is not present and qop is null', () => {
      const message: any = { headers: [] }
      const result = digestAuth.parseAuthorizationHeader(message)
      expect(result).toBeUndefined()
    })
  })
  describe('DigestAuth createMessage method', () => {
    it('should create the message string correctly when digestAuthHeaders are provided', () => {
      const digestAuth = new DigestAuth('username', 'password', 'example.com', 8080)
      const headers = new DigestAuthHeaders()
      headers.qop = 'auth'
      headers.realm = 'realm'
      headers.nonce = 'nonce'
      headers.uri = '/wsman'
      headers.nc = '00000001'
      headers.consoleNonce = 'consoleNonce'
  
      const xml = '<exampleXml></exampleXml>'
      const message = digestAuth.createMessage(xml, headers)
  
      expect(message).toMatch(/^POST \/wsman HTTP\/1.1\r\n/)
      expect(message).toContain('Host: example.com:8080\r\n')
      expect(message).toContain(`Content-Length: ${xml.length}\r\n\r\n${xml}`)
    })
  
    it('should create the message string correctly when digestAuthHeaders are not provided', () => {
      const digestAuth = new DigestAuth('username', 'password', 'example.com', 8080)
  
      const xml = '<exampleXml></exampleXml>'
      const message = digestAuth.createMessage(xml)
  
      expect(message).toMatch(/^POST \/wsman HTTP\/1.1\r\n/)
      expect(message).toContain('Host: example.com:8080\r\n')
      expect(message).toContain(`Content-Length: ${xml.length}\r\n\r\n${xml}`)
    })
  })
  describe('createAuthorizationString', () => {
    it('should return a string', () => {
      const digestAuthHeaders: any = {
        realm: 'Test Realm',
        nonce: 'Test Nonce',
        qop: 'auth'
      }
      const authString = digestAuth.createAuthorizationString(digestAuthHeaders)
      expect(typeof authString).toBe('string')
    })
  
    it('should generate a valid authorization header string', () => {
      // Replace with your own test values
      const username = 'testuser'
      const password = 'testpass'
      const digestAuthHeaders: any = {
        realm: 'Test Realm',
        nonce: 'Test Nonce',
        qop: 'auth'
      }
      const authString = digestAuth.createAuthorizationString(digestAuthHeaders)
      expect(authString).toContain('Authorization: Digest username="username",realm="Test Realm",nonce="Test Nonce",uri="/wsman",qop="auth"')
    })
  })
  describe('createDigestPassword', () => {
    it('should return a string', () => {
      const username = 'testuser'
      const password = 'testpass'
      const digestPassword = digestAuth.createDigestPassword(username, password)
      expect(typeof digestPassword).toBe('string')
    })
  
    it('should generate a valid digest password', () => {
      const username = 'testuser'
      const password = 'testpass'
      const digestPassword = digestAuth.createDigestPassword(username, password)
      expect(digestPassword).toBe('9d156f36e12de4935478c0d2b93b8dd6')
    })
  })
  describe('createDigestCredential', () => {
    it('should return a string', () => {
      const username = 'testuser'
      const password = 'testpass'
      const digestCredential = digestAuth.createDigestCredential(username, password)
      expect(typeof digestCredential).toBe('string')
    })
  
    it('should generate a valid digest credential', () => {
      const username = 'testuser'
      const password = 'testpass'
      const digestCredential = digestAuth.createDigestCredential(username, password)
      expect(digestCredential).toBe('nRVvNuEt5JNUeMDSuTuN1g==')
    })
  })
  
})
