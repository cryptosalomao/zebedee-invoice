const toMsats = amount => {
  const converted = amount * 1000

  return converted
}

const toSats = amount => {
  const converted = amount / 1000

  return converted
}

export {
  toMsats,
  toSats
}
