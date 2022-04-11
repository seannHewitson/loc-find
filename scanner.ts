import fs from 'fs'
import path from 'path'

export const scanFile = (file: string, key: string): boolean => {
    const expr = new RegExp(key, 'g')
    const contents = fs.readFileSync(file, { encoding: 'utf-8', flag: 'r' }).toString()
    return expr.test(contents)
}

const exclude: Array<string> = [
    'node_modules',
    '.git',
    'web',
    'lokalise-tmp',
    'images',
    'mosaico',
    'vendor',
    'storage'
]

export const scanFolder = (folder: string, key: string): boolean => {
    let found = false
    const readDir = fs.readdirSync(folder)
    for (let filename of readDir) {
        if (!exclude || !exclude.includes(filename)) {
            const file = path.resolve(folder, filename)
            const stats = fs.statSync(file)
            if (stats.isFile()) found = scanFile(file, key)
            if (stats.isDirectory()) found = scanFolder(file, key)
            if (found) {
                break
            }
        }
    }

    return found
}