declare global {
  interface Window {
    msCrypto: Crypto;
  }
}

const crypto = window.crypto || window.msCrypto;

async function createMd5Hash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('MD5', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Export the polyfilled function(s) as needed
export { createMd5Hash };
