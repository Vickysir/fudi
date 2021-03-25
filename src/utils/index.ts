export const havePlaceholder = (value: number | string | undefined | null, thePlaceholderKey: string = "-"): string => {
    let content = null;
    if (value === null || value === undefined || value === "") return content = thePlaceholderKey
    switch (value) {
        case 0:
            content = thePlaceholderKey
            break;
        default: value
            break;
    }
    return content
}