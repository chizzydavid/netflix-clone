export const truncate = function (string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
}

export const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


