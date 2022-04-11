import fs from 'fs'
import path from 'path'
import { scanFolder } from './scanner'

const found = {
    api: 0,
    ui: 0,
    ad: 0,
    legacy: 0,
}

const keys = fs.readFileSync(
    path.resolve(__dirname, 'loc.csv')
).toString().split('\r\n').map((key: string) => ({
    key,
    api: false,
    ui: false,
    ad: false,
    legacy: false,
}))

const root = path.resolve(__dirname, '../',)
const exclude = ['node_modules', '.git', 'web', 'lokalise-tmp', 'images', 'mosaico', 'vendor', 'storage']

const results = keys.map(({ key }: any) => {
    const api = scanFolder(path.resolve(root, 'Platform-API'), key, exclude)
    const ui = scanFolder(path.resolve(root, 'Platform-UI-Prototype'), key, exclude)
    const ad = scanFolder(path.resolve(root, 'ui'), key, exclude)
    const legacy = scanFolder(path.resolve(root, 'old-platform'), key, exclude)
    found.api += Number(api)
    found.ui += Number(ui)
    found.ad += Number(ad)
    found.legacy += Number(legacy)
    return { key, api, ui, ad, legacy }
})

let output: string = ''
results.forEach(({ key, api, ui, ad, legacy }: any) => {
    output += `${key},${api},${ui},${ad},${legacy}\r\n`
})

fs.writeFileSync(
    path.resolve(__dirname, 'output.csv'),
    output,
    { encoding: 'utf-8', flag: 'w' }
)

console.log(`Found api: ${found.api}`)
console.log(`Found ui: ${found.ui}`)
console.log(`Found ad: ${found.ad}`)
console.log(`Found legacy: ${found.legacy}`)