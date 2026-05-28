#!/usr/bin/env node
import fs from 'node:fs'

const input = process.argv[2] ?? '.env.local'
const output = process.argv[3] ?? ''

function parseLine(rawLine) {
  const line = rawLine.trim()
  if (!line || line.startsWith('#')) return null

  const eqIndex = line.indexOf('=')
  if (eqIndex === -1) return null

  let key = line.slice(0, eqIndex).trim()
  if (key.startsWith('export ')) key = key.slice(7).trim()
  if (!key) return null

  let value = line.slice(eqIndex + 1).trim()

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1)
  } else {
    const commentIndex = value.indexOf(' #')
    if (commentIndex !== -1) value = value.slice(0, commentIndex).trimEnd()
  }

  return [key, value]
}

const env = {}
const content = fs.readFileSync(input, 'utf8')

for (const rawLine of content.split(/\r?\n/)) {
  const entry = parseLine(rawLine)
  if (entry) env[entry[0]] = entry[1]
}

const json = JSON.stringify(env, null, 2) + '\n'

if (output) {
  fs.writeFileSync(output, json)
} else {
  process.stdout.write(json)
}
