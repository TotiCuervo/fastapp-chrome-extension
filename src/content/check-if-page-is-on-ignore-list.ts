const ignorePages = [
    'linkedin.com',
    'google.com',
    'youtube.com',
    'facebook.com',
    'instagram.com',
    'twitter.com',
    'x.com',
    'reddit.com',
    'github.com'
]

export default function checkIfPageIsOnIgnoreList() {
    return ignorePages.some((page) => window.location.href.includes(page))
}
