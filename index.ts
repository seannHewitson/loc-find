import fs from 'fs'
import path from 'path'
import { scanFolder } from './scanner'

const found = {
    api:  0,
    ui: 0
}

const keys = fs.readFileSync(
    path.resolve(__dirname, 'loc.csv')
).toString().split('\r\n').map((key: string) => ({
    key,
    api: false,
    ui: false
}))

const root = path.resolve(__dirname, '../', )
const exclude = ['node_modules', '.git', 'lokalise-tmp', 'mosaico']

const results = keys.map(({ key }: any) => {
    const api = scanFolder(path.resolve(root, 'Platform-API'), key, [...exclude, 'vendor'])
    const ui = scanFolder(path.resolve(root, 'Platform-UI-Prototype'), key, exclude)
    found.api += Number(api)
    found.ui += Number(ui)
    return { key, api, ui } 
})

//  Create file if not exists
fs.writeFileSync(
    path.resolve(__dirname, 'output.csv'),
    '',
    { encoding: 'utf-8', flag: 'w' }
)

console.log(`Found ${``}`)