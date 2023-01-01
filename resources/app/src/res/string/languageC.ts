export const langueLocale = {
    中文简体: {
        name: '中文简体',
        locale: ['zh', 'zh-cn', 'zh-tw'],
    },
    英语: {
        name: 'English',
        locale: ['en', 'en-au', 'en-ca', 'en-gb', 'en-nz', 'en-us', 'en-za'],
    },
    德语: {
        name: 'Deutsch',
        locale: ['de', 'de-at', 'de-ch', 'de-de'],
    },
    越南语: {
        name: 'Tiếng Việt',
        locale: ['vi'],
    },
    泰语: {
        name: 'ภาษาไทย',
        locale: ['th'],
    },
    中文繁体: {
        name: '中文繁體',
        locale: ['zh-tw'],
    },
    韩语: {
        name: '한글',
        locale: ['ko'],
    },
    西班牙语: {
        name: 'Spanish',
        locale: ['es', 'es-419'],
    },
    巴葡语: {
        name: 'Portuguese',
        locale: ['pt', 'pt-BR', 'pt-PT'],
    },
    捷克语: {
        name: 'Čeština',
        locale: ['cs', 'cs_CZ'],
    },
    日语: {
        name: 'Japanese',
        locale: ['ja'],
    },
    法语: {
        name: 'French',
        locale: ['fr', 'fr-CA', 'fr-CH', 'fr-FR'],
    },
    意大利语: {
        name: 'Italian',
        locale: ['it', 'it-CH', 'it-IT',],
    },
    瑞典语: {
        name: 'Swedish',
        locale: ['sv',],
    },
    俄语: {
        name: 'Russian',
        locale: ['ru',],
    },
    乌克兰语: {
        name: 'Ukrainian',
        locale: ['uk',],
    },
}

export const langueLocaleVArr = Object.values(langueLocale)
export const langueLocaleKArr = Object.keys(langueLocale)

export const getLanguage = (locale: string) => {
    for (let i = 0; i < langueLocaleVArr.length; i++) {
        const tmp = langueLocaleVArr[i].locale
        if (tmp.findIndex(v => v.toLowerCase() === locale) !== -1)
            return langueLocaleKArr[i]
    }
    return langueLocaleKArr[1]
}
