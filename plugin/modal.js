_createModal = function(options) {
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">This is my modal window</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit amet consectetur</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    `)

    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const $modal = _createModal(options)

    return {
        open() {
            $modal.classList.add('open')
        },
        close() {
            $modal.classList.remove('open')
    } 
}
}