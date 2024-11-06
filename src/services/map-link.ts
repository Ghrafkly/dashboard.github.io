export const mapLink = (url: string, replacements: {[key: string]: string}): string => {
    return Object.entries(replacements).reduce((link, [key, value]) => {
        return link.replace(`{${key}}`, value);
    }, url);
}