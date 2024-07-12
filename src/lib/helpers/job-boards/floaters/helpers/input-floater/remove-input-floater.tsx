export default function removeInputFloater() {
    const floater = document.getElementById('fastapp-floater')

    if (floater) {
        floater.remove()
    }
}
