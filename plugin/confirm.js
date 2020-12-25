$.confirm = function(options) {
	return new Promise((res, rej) => {
		const modal = $.modal({
			title: 'Действительно удалить?',
			width: '400px',
            closable: false,
            content: options.content,
            onClose() {
                modal.destroy()
            },
			footerButtons: [
				{text: 'Отмена', type: 'secondary', handler() {
					modal.close()
					rej()
				}},
				{text: 'Удалить', type: 'danger', handler() {
					modal.close()
					res()
				}}
				]
        })
    setTimeout(() => {
        modal.open()
    }, 250)

    })
}