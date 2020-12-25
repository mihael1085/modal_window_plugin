

Element.prototype.appendAfter = function(){}

_createFooter = function(buttons) {

        if(buttons.length == 0)
            return document.createElement('div')
        
        const $footer = document.createElement('div')
        $footer.classList.add('modal-footer')

        buttons.forEach((button) => {
            const $btn = document.createElement('button')
            $btn.classList.add(button.type)
            $btn.textContent = button.text
            $btn.addEventListener('click', button.handler)
            $footer.append($btn)
        })

        return $footer
    }

_createModal = function(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width:${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title"> ${options.title || 'modal window'}</span>
                    ${options.isClosable ? '<span class="modal-close" data-close="true">&times;</span>' : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)

    document.body.appendChild(modal)
    return modal
}


$.modal = function(options) {
    const $modal = _createModal(options)
    const ANIMATION_DELAY = 200
    let destroyed = false

    const listener = (el) => { if (el.toElement.dataset.close)
                                    methods.close()
                                }

    const $footer = _createFooter(options.footerButtons)
    document.querySelector('.modal-window').appendChild($footer)

    const methods = {
        open() {
            if(destroyed) console.log('modal is destroyed')
            $modal.classList.add('open')
        },
        close() {
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => $modal.classList.remove('hide')
                , ANIMATION_DELAY)
        },
        destroy() {
            $modal.removeEventListener('click', listener)
            $modal.parentNode.removeChild($modal)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    }

    $modal.addEventListener('click', listener)

    return methods
}
