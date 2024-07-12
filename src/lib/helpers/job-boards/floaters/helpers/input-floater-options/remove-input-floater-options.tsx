export default function removeInputFloaterOptions() {
    const floater = document.getElementById('fastapp-floater-options')
    if (floater) {
        floater.remove()
    }
}
