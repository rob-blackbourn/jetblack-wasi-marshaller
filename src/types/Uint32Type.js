import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

/**
 * A type representing a 32 bit unsigned integer
 * @extends {ValueType<number>}
 */
export class Uint32Type extends ValueType {
  /**
   * Construct a 32 bit unsigned integer type
   */
  constructor () {
    super(Uint32Array)
  }

  /**
   * Marshalls the value to a pointer
   * @param {MemoryManager} memoryManager The memory manager
   * @param {number} unmarshalledIndex The index of the value to marshall
   * @param {Array<*>} unmarshalledArgs The unmarshalled arguments
   * @returns {number} The address of a pointer to the value
   */
  marshall (memoryManager, unmarshalledIndex, unmarshalledArgs) {
    const address = this.alloc(memoryManager, unmarshalledIndex, unmarshalledArgs)
    memoryManager.dataView.setUint32(address, unmarshalledArgs[unmarshalledIndex])
    return address
  }

  /**
   * Unmarshall the value from a pointer.
   * @param {MemoryManager} memoryManager The memory manager
   * @param {number} address The address of the pointer to the value
   * @param {number} unmarshalledIndex The index of the unmarshalled value or -1
   * @param {Array<*>} unmarshalledArgs The unmarshalled arguments
   * @returns {number} The unmarshalled value.
   */
  unmarshall (memoryManager, address, unmarshalledIndex, unmarshalledArgs) {
    try {
      return memoryManager.dataView.getUint32(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
