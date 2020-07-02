import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

/**
 * A type representing a 16 bit unsigned integer
 * @template {number} T
 * @extends {ValueType<T>}
 */
export class Uint16Type extends ValueType {
  /**
   * Construct a 16 bit unsigned integer type
   */
  constructor () {
    super(Uint16Array)
  }

  /**
   * Marshalls the value to a pointer
   * @param {T} value The value to marhsall
   * @param {MemoryManager} memoryManager The memory manager
   * @returns {number} The address of a pointer to the value
   */
  marshall (value, memoryManager) {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setUint16(address, value)
    return address
  }

  /**
   * Unmarshal the value from a pointer.
   * @param {number} address The address of the pointer to the value
   * @param {MemoryManager} memoryManager The memory manager
   * @param {T} [value] Optional unmarshalled value
   * @returns {T} The unmarshalled value.
   */
  unmarshall (address, memoryManager, value) {
    try {
      return /** @type {T} */ (memoryManager.dataView.getUint16(address))
    } finally {
      memoryManager.free(address)
    }
  }
}
