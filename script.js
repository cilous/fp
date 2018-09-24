document.getElementById('fileinput').addEventListener('change', readFileFromEvent, false)

function readFileFromEvent(event) {
    var file = event.target.files[0]
    var r = new FileReader()
    r.onload = updateContent
    r.readAsBinaryString(file)
}

function logFileLoad(event) {
    var content = event.target.result
    console.log(content)
}

function updateContent(event) {
    // logFileLoad(event)
    setContent(parseMarkDown(event.target.result))
}

function setContent(content) {
    document.getElementById("main").innerHTML = content
}

function parseMarkDown(content) {
    // split content for each paragraph
    const content_splited = R.split(/\n\n/, content)

    const BLANK = ''
    const replace = (textReplace,input) => (textFind) => R.replace(textFind,textReplace,input)
    
    const addTagH = input => {
        const replace_tagH_addTextFind = replace(BLANK, input)
        // Search if input start with '#' pattern then add tag <h#> 
        if ( R.test(/^#/, input) ) {
            const count = R.match(/^#+/g, input)[0]
            const text = replace_tagH_addTextFind(count)
            const tagH = '<h' + count.length + '>' + text + '</h' + count.length + '>'
            return tagH
        } else {
            // if not start with '#' will return (input) with no touch
            return input
        }
    }

    const addTagP  = input => {
        // Search if input not start with <h#> from previous function will add tag <p> 
        if ( !R.test(/^<h/g, input) ) {
            const tagP = '<p>' + input + '<p/>'
            return tagP
        } else {
            return input
        }
    }


    const addTagB = input => {
        // Search if input are include '*' then convert to tag <b> 
        if ( R.test(/\*(.*?)\*/g, input) ) {
            let inputEdited = input
            const textWithStar = R.match(/\*(.*?)\*/g, input)
            const addBold = text => {
                const replace_tagB_addTextFind = replace(BLANK, text)
                const textWithoutStar = replace_tagB_addTextFind(/\*/g)
                inputEdited = R.replace(text,'<b>' + textWithoutStar + '</b>' ,inputEdited)
                return inputEdited
            }
            const tagB = R.map(addBold, textWithStar)
            console.log(tagB);
            return R.takeLast(1,tagB)
        } else {
            return input
        }
    }
    const composeAddTag = R.compose(R.map(addTagB),R.map(addTagP),R.map(addTagH))
    const content_html = R.reduce(R.concat,BLANK,composeAddTag(content_splited))
    return content_html
}