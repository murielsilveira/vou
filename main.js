const worker = new Worker('./worker.js')

worker.onmessage = function(e) {
  document.getElementById('content').innerHTML = e.data
}

function getData() {
  document.getElementById('content').innerHTML = 'loading ...'
  worker.postMessage('mensagem')
}

getData()
