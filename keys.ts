import fs from 'fs'
import path from 'path'

import splitter from './splitter'

const file = fs.readFileSync(
    path.resolve(__dirname, 'loc.csv')
).toString().split('\n')

const fileKeys: Array<any> = file.map((key: string) => ({
    key: splitter(key, '_'),
    found: false
}))

const keys = fileKeys.filter(({ key }: any, index: number) => (
    key.length && fileKeys.map(({ key: k }: any) => (k)).indexOf(key) == index
))

export default keys
