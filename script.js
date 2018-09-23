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
    const content_splited = R.split(/\r\n\r\n/, content)
    
    // const addTag = x => {
    //     if ( R.test(/^#/, x) ) {
    //         const count = R.match(/^#+/g, x)[0]
    //         const temp = R.replace(count, '', x)
    //         const h = '<h' + count.length + '>' + temp + '</h' + count.length + '>'
    //         return h
    //     } else {
    //         if (R.test(/\*(.*?)\*/g, x)) {
    //             const bold = R.match(/\*(.*?)\*/g, x)
    //             const addBold = text => {
    //                 const textWithoutStar = R.replace(/\*/g,'',text)
    //                 x = R.replace(text,'<b>' + textWithoutStar + '</b>' ,x)
    //             }
    //             R.forEach(addBold, bold)
    //         }
    //         const p = '<p>' + x + '</p>'
    //         return p
    //     }
    // }
    
    
    // const match = (condition, input) => R.match(condition,input)
    // const test = (condition, input) => R.test(condition,input)
    const blank = ''
    const replaceAddReplaceInput = (textReplace,input) => (textFind) => R.replace(textFind,textReplace,input)

    const addTagH = input => {
        const tagHReplaceAddTextFind = replaceAddReplaceInput(blank, input)
        // Search if input start with '#' pattern then add tag <h#> 
        if ( R.test(/^#/, input) ) {
            const count = R.match(/^#+/g, input)[0]
            const temp = tagHReplaceAddTextFind(count)
            const tagH = '<h' + count.length + '>' + temp + '</h' + count.length + '>'
            return tagH
        } else {
            // if not start with '#' will return input with no touch
            return input
        }
    }

    const addTagP  = input => {
        // Search if input not start with <h#> from previous function will add tag <p> 
        if ( !R.test(/^<h/g ,input) ) {
            const tagP = '<p>' + input + '</p>'
            return tagP
        } else {
            return input
        }
    }

    const addTagB = input => {
        // Search if input are include '*' then convert to tag <b> 
        if ( R.test(/\*(.*?)\*/g, input) ) {
            const findBold = R.match(/\*(.*?)\*/g, input)
            const addBold = text => {
                const tagBReplaceAddTextFind = replaceAddReplaceInput(blank, text)
                const textWithoutStar = tagBReplaceAddTextFind(/\*/g)
                input = R.replace(text,'<b>' + textWithoutStar + '</b>' ,input)
                return input
            }
            const tagB = R.map(addBold, findBold)
            console.log(tagB)
            return R.takeLast(1,tagB)
            
        } else {
            return input
        }
    }
    // consequence? may be bad?
    const content_tagH = R.map(addTagH, content_splited)
    const content_tagP = R.map(addTagP, content_tagH)
    const content_tagB = R.map(addTagB, content_tagP).reduce(R.concat)

    // const temp = R.map(addTag, content_splited).reduce(R.concat,'')
    return content_tagB
}