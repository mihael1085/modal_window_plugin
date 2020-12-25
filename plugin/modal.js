Element.prototype.appendAfter = function(element){
    element.parentNode.insertBefore(this, element.nextSubling)
}

_createFooter = function(buttons) {

        // if(buttons.length === 0)
        //     return document.createElement('div')
        
        const $footer = document.createElement('div')
        $footer.classList.add('modal-footer')

        buttons.forEach((button) => {
            const $btn = document.createElement('button')
            $btn.classList.add('btn')
            $btn.classList.add(`btn-${button.type}`)
            $btn.textContent = button.text
            $btn.addEventListener('click', button.handler)
            $footer.appendChild($btn)
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


    const $footer = _createFooter(options.footerButtons)
    $footer.appendAfter(modal.querySelector('[data-content]'))

    document.body.appendChild(modal)
    return modal
}


$.modal = function(options) {
    const $modal = _createModal(options)
    const ANIMATION_DELAY = 200
    let destroyed = false
    let closing = false
    const listener = (el) => { if (el.toElement.dataset.close)
                                    methods.close()
                                }


    const methods = {
        open() {
            if(destroyed) console.log('modal is destroyed')
            $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                closing = false
                if(typeof options.onClose === 'function') {
                    options.onClose()
                }
                $modal.classList.remove('hide')
            }, ANIMATION_DELAY)
        },
        destroy() {
            $modal.removeEventListener('click', listener)
            $modal.parentNode.removeChild($modal)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        },
        setButtons(buttons, parameters='') {
            let footer = document.querySelector('.modal-footer')
            footer.parentNode.removeChild(footer)
            const $footer = _createFooter(buttons)
            $footer.appendAfter(document.querySelector('[data-content]'))
            $footer.querySelector('')
        }
    }

    $modal.addEventListener('click', listener)

    return methods
}
