const splitter = (key: string, separator: string = '.') => {
    const keys = key.split('::')
    if (keys.length < 3) {
        return key.replace(/::/g, separator)
    }
    keys.pop()
    return keys.join(separator)
}

export default splitter
