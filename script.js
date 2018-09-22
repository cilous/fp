document.getElementById('fileinput').addEventListener('change', readFileFromEvent, false)

function readFileFromEvent (event) {
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

function parseMarkDown (content) {
    var data = []
    var condition = x => x !== /$/
    var data = R.takeWhile(condition, content)
    console.log(data)
    // var content = R.replace(/$/g, '<p>',content)

    
	return content
}