const worker = new Worker('/worker.js')

worker.onmessage = function(e) {
  console.log(e.data)
  let dom = e.data.reduce((prev, next) => prev + '<p>' + next.show_title + '</p>', '')
  document.getElementById('content').innerHTML = dom
}

worker.postMessage('mensagem')
