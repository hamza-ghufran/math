function AND(A, B) {
  return Number(A && B)
}

function OR(A, B) {
  return Number(A || B)
}

function NOT(A) {
  return Number(!A)
}

function XOR(A, B) {
  const result1 = OR(A, B)
  const result2 = NOT(AND(A, B))

  return Number(AND(result1, result2))
}

function HALF_ADDER(A, B) {
  const sum = XOR(A, B)
  const carry = AND(A, B)

  return {
    sum: Number(sum),
    carry: Number(carry)
  }
}

function FULL_ADDER(A, B, C) {
  const result = HALF_ADDER(A, B)
  const result2 = HALF_ADDER(result.sum, C)

  return {
    sum: Number(result2.sum),
    carry: Number(OR(result.carry, result2.carry))
  }
}

function _8_BIT_ADDER(a, b) {
  const A = a.split('')
  const B = b.split('')
  const result = []
  // console.log(A, B)

  const result1 = HALF_ADDER(Number(A[A.length - 1]), Number(B[B.length - 1]))
  result.unshift(result1.sum)

  let carry = result1.carry

  for (let i = A.length - 2; i >= 0; i--) { // and B
    const AIndex = Number(A[i])
    const BIndex = Number(B[i])

    const resultN = FULL_ADDER(AIndex, BIndex, carry)
    result.unshift(resultN.sum)
    carry = resultN.carry
  }

  if (carry) console.log('overflow')
  return result
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function bin2dec(binary) {
  return parseInt(binary, 2);
}

console.log(_8_BIT_ADDER('11001100', '0011000'))