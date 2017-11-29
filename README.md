# WaveCipher
JavaScript based key set encryption

WaveCipher is fairly simple encryption / decryption written in JavaScript.  This is static object. The system provides:

* Create a key set / cipher
* Encode a ASCII string set
* Decode an encrypted string

## Why use this?
IMHO WaveCipher is:

* Simple
* Fast
* and Fun. This one is subjective.

## How do I use it?

The WaveCipherTest.html is the best resource for how this work.

### Properties

#### WaveCipher.fakeKeyCount - How fake key used to pad out encryption
**Default Value:** 100

#### WaveCipher.keyCount - How many sets will be generated each individual character.  For example '4' ccould make ["1234", "ABCD", "4567", "EFGH"]
**Default Value:** 4

#### WaveCipher.keyLength - How long will the individual keys be.  For example '4' could make 'ABCD'
**Default Value:** 4

#### WaveCipher.redHerringCharacters - Characters that are randomly inserted inserted in an ecryoted string to help randomize the results.
**Default Value:** ' .!'
**Note:** While this will only encrypt ASCII characters the valid characters can be ANY character.

#### WaveCipher.validCharacters - Characters to create the key sets
**Default Value:** '0123456789ABCDEF'
**Note:** While this will only encrypt ASCII characters the valid characters can be ANY character.

### Functions

#### WaveCipher.generate() - Returns a JSON string cipher

#### WaveCipher.decode([Key Set], [String]) - Encodes an ASCII string

* [Key Set] - A key set you generated with the WaveCipher.generate() function
* [String] - ASCII string you want to encode

#### WaveCipher.encode([Key Set], [String]) - Decode an encrypted string 

* [Key Set] - A key set you generated with the WaveCipher.generate() function
* [String] - ASCII string you want to decode
