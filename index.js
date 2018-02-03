'use strict'

const arrayPad = require('array-pad')
const isNil = require('is-nil')
const isGlobalObject = require('is-global-object')
const isObject = require('is-object')
const ofn = require('ofn')
const {set} = require('dot-prop')
const wfn = require('wfn')

module.exports = ofn([2, 0, 1], (i = 0, path, f) => wfn(f, function () {
  const args = arrayPad(Array.from(arguments), i)
  if (!isNil(this) && !isGlobalObject(this)) {
    if (path) {
      if (!isObject(args[i])) args[i] = {}
      set(args[i], path, this)
    } else {
      args.splice(i, 0, this)
    }
  }
  return f.apply(this, args)
}))
