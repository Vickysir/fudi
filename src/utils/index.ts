export const havePlaceholder = (value: number | string | undefined | null, thePlaceholderKey: string = "-"): string => {
    let content = null;
    if (value === null || value === undefined || value === "") return content = thePlaceholderKey
    switch (value) {
        case 0:
            content = thePlaceholderKey
            break;
        default: content = value
            break;
    }
    return content
}

export const openOnlineChat = (telphopne: string | number) => {
    const tel = telphopne ? telphopne : 353000000023;
    window.open(`https://wa.me/${tel}`)
}
export const openAppStore = (type: string) => {
    switch (type) {
        case "IOS":
            window.open(`https://apps.apple.com/cn/app/fudi-more/id1174079302`)
            break;
        case "Android":
            window.open(`https://play.google.com/store/apps/details?id=a2bliving.ie.a2b`)
            break;

    }
}

export const clearStore = () => {
    APP_STORE.authInfo = null
    APP_STORE.registInfo = null
    APP_STORE.resetPwdInfo = null
    APP_STORE.commonInfo = null
}