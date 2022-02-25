import fs from 'fs'
import path from 'path'

export const scanFile = (file: string, key: string): boolean => {
    const expr = new RegExp(key, 'g')
    const expr1 = new RegExp(key.replace(/::/g, '.'), 'g')
    const contents = fs.readFileSync(file, { encoding: 'utf-8', flag: 'r' }).toString()
    return expr.test(contents) || expr1.test(contents)
}

export const scanFolder = (folder: string, key: string, exclude?: Array<string>): boolean => {
    let found = false
    
    const readDir = fs.readdirSync(folder)
    for(let filename of readDir) {
        if (exclude && exclude.includes(filename)) break
        const file = path.resolve(folder, filename)
        const { isDirectory, isFile } = fs.statSync(file)
        if (isDirectory())  found = scanFolder(file, key)
        if (isFile()) found = scanFile(file, key)
    }

    return found
}