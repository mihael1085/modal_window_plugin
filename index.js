const options = {
    title: 'My first modal window',
    isClosable: true,
    content: `  <p>Lorem ipsum dolor sit amet consectetur</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            `,
    width: '',
    footerButtons: [
    {text: 'ok', type: 'primary', handler() {
    	console.log('primary button clicked')
    }},
    {text: 'Cancel', type: 'danger', handler() {
    	console.log('danger button clicked')
    }},
    ]
}

const modal = $.modal(options)