import fs from 'fs'
import path from 'path'

import { scanFolder } from './scanner'
import keys from './keys'

const repos: any = {
    platformUI: 'Platform-UI-Prototype',
    platformAPI: 'Platform-API',
    legacy: 'old-platform'
}

const found: any = {}
Object.keys(repos).forEach((repo: string) => (found[repo] = 0))

const results = keys.map(({ key }: any) => {
    const result: any = { key }
    Object.keys(repos).forEach((repo: string) => {
        result[repo] = scanFolder(
            path.resolve(__dirname, '../', repos[repo]),
            key
        )
        found[repo] += Number(result[repo])
    })
    return result
})

if (results.length) {
    let output: string = `${Object.keys(results[0]).join(',')}\r\n`
    results.forEach((result: any) => (
        output += `${
            Object.keys(result)
                .map((key: string) => result[key])
                .join(',')
        }\r\n`
    ))
    
    fs.writeFileSync(
        path.resolve(__dirname, 'output.csv'),
        output,
        { encoding: 'utf-8', flag: 'w' }
    )
}

console.log({ found })