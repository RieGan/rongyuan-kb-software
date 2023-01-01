export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  // tslint:disable-next-line: only-arrow-functions
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      }
}

export const hsvToRgb = (h: number, s: number, v: number) => {
  var r, g, b
  var i
  var f, p, q, t

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h))
  s = Math.max(0, Math.min(100, s))
  v = Math.max(0, Math.min(100, v))

  // We accept saturation and value arguments from 0 to 100 because that's
  // how Photoshop represents those values. Internally, however, the
  // saturation and value are calculated from a range of 0 to 1. We make
  // That conversion here.
  s /= 100
  v /= 100

  if (s == 0) {
    // Achromatic (grey)
    r = g = b = v
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  h /= 60 // sector 0 to 5
  i = Math.floor(h)
  f = h - i // factorial part of h
  p = v * (1 - s)
  q = v * (1 - s * f)
  t = v * (1 - s * (1 - f))

  switch (i) {
    case 0:
      r = v
      g = t
      b = p
      break

    case 1:
      r = q
      g = v
      b = p
      break

    case 2:
      r = p
      g = v
      b = t
      break

    case 3:
      r = p
      g = q
      b = v
      break

    case 4:
      r = t
      g = p
      b = v
      break

    default:
      // case 5:
      r = v
      g = p
      b = q
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export const hsvToHex = (h: number, s = 100, v = 100) => {
  var r, g, b
  var i
  var f, p, q, t

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h))
  s = Math.max(0, Math.min(100, s))
  v = Math.max(0, Math.min(100, v))

  // We accept saturation and value arguments from 0 to 100 because that's
  // how Photoshop represents those values. Internally, however, the
  // saturation and value are calculated from a range of 0 to 1. We make
  // That conversion here.
  s /= 100
  v /= 100

  if (s == 0) {
    // Achromatic (grey)
    r = g = b = v
    return `#${Math.round(r * 255)
      .toString(16)
      .padStart(2, '0')}${Math.round(g * 255)
      .toString(16)
      .padStart(2, '0')}${Math.round(b * 255)
      .toString(16)
      .padStart(2, '0')}`
  }

  h /= 60 // sector 0 to 5
  i = Math.floor(h)
  f = h - i // factorial part of h
  p = v * (1 - s)
  q = v * (1 - s * f)
  t = v * (1 - s * (1 - f))

  switch (i) {
    case 0:
      r = v
      g = t
      b = p
      break

    case 1:
      r = q
      g = v
      b = p
      break

    case 2:
      r = p
      g = v
      b = t
      break

    case 3:
      r = p
      g = q
      b = v
      break

    case 4:
      r = t
      g = p
      b = v
      break

    default:
      // case 5:
      r = v
      g = p
      b = q
  }

  return `#${Math.round(r * 255)
    .toString(16)
    .padStart(2, '0')}${Math.round(g * 255)
    .toString(16)
    .padStart(2, '0')}${Math.round(b * 255)
    .toString(16)
    .padStart(2, '0')}`
}

export const rgbToHsv = (r: number, g: number, b: number) => {
  let rabs,
    gabs,
    babs,
    rr,
    gg,
    bb,
    h,
    s,
    v: number,
    diff: number,
    diffc,
    percentRoundFn
  rabs = r / 255
  gabs = g / 255
  babs = b / 255
  ;(v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs))
  diffc = (c: number) => (v - c) / 6 / diff + 1 / 2
  percentRoundFn = (num: number) => Math.round(num * 100) / 100
  if (diff === 0) {
    h = s = 0
  } else {
    s = diff / v
    rr = diffc(rabs)
    gg = diffc(gabs)
    bb = diffc(babs)

    if (rabs === v) {
      h = bb - gg
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb
    } else if (babs === v) {
      h = 2 / 3 + gg - rr
    }
    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100),
  }
}
