// Variabel untuk menyimpan status mendengarkan
let isListening = false;

// Variabel untuk menyimpan level zoom kamera
let zoomLevel = 1;

// Fungsi untuk memperbesar kamera
function zoomIn() {
  zoomLevel = Math.min(10, zoomLevel + 1); // Maksimum zoom hingga 10x
  const videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.style.transform = 'scale(' + zoomLevel + ')';
  }
}

// Fungsi untuk memperkecil kamera
function zoomOut() {
  zoomLevel = Math.max(1, zoomLevel - 1); // Minimum zoom adalah 1x
  const videoElement = document.querySelector('video');
  if (videoElement) {
    videoElement.style.transform = 'scale(' + zoomLevel + ')';
  }
}

// Fungsi untuk mendeteksi objek menggunakan model TensorFlow.js
async function detectObject() {
  try {
    // Memuat model deteksi objek yang telah dilatih sebelumnya
    const model = await cocoSsd.load();

    // Mendapatkan elemen video dari kamera
    const videoElement = document.querySelector('video');

    // Mendeteksi objek pada setiap frame video
    const objects = await model.detect(videoElement);

    // Menampilkan hasil deteksi objek
    console.log('Detected objects:', objects);
    return objects;
  } catch (error) {
    console.error('Error detecting object:', error);
    throw error;
  }
}

function updateJam() {

    //document.getElementById("jam").innerText = waktu;
}

// Panggil fungsi updateJam setiap detik
setInterval(updateJam, 1000);

function speak(text, options = {}) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 1.1; // Kecepatan bicara, default: 1
  utterance.pitch = options.pitch || 0.6; // Nada suara, default: 1
  utterance.volume = options.volume || 1.2; // Volume, default: 1
  window.speechSynthesis.speak(utterance);
}


// Fungsi untuk mengeksekusi perintah berdasarkan suara
function executeCommand(command) {
  const splitCommand = command.split(' ');
  const action = splitCommand[0];
  
  switch(action) {
    case 'halo':
      if (splitCommand.length > 1) {
        const greeting = splitCommand.slice(2).join(' ');
        const result = 'halo juga. ada yang bisa saya bantu?';
        speak(result);
        return result;
      } else {
        const result = 'maaf, saya tidak mengerti dengan perkataan anda! Bisa tolong ulangi lagi?'
        speak(result);
        return result;
      }
    case 'bawa':
      if (splitCommand.length > 1 && splitCommand[1] === 'saya ke') {
        if (splitCommand.length > 2) {
          const application = splitCommand.slice(2).join(' ');
          window.open(application + '://');
          const result = 'Baik, saya akan membawa anda ke aplikasi ' + application;
        speak(result);
        return result;
        } else {
        const result = 'maaf, saya tidak mengerti dengan perkataan anda! Bisa tolong ulangi lagi?'
        speak(result);
        return result;
        }
      } else {
        const result = 'Maaf, saya belum mengenali perintah tersebut!';
        speak(result);
        return result;
      }
    case 'bukakan':
      if (splitCommand.length > 1 && splitCommand[1] === 'saya') {
        if (splitCommand.length > 2) {
          const url = splitCommand.slice(2).join(' ');
          window.open('http://' + url, '_blank');
          const result = 'Baik, saya akan membukakan anda ' + url;
        speak(result);
        return result;
        } else {
        const result = 'maaf, saya tidak mengerti dengan perkataan anda! Bisa tolong ulangi lagi?'
        speak(result);
        return result;
        }
      } else {
        const result = 'Maaf, saya belum mengenali perintah tersebut!';
        speak(result);
        return result;
      }
    case 'carikan':
      if (splitCommand.length > 1 && splitCommand[1] === 'saya') {
        if (splitCommand.length > 2) {
          const search = splitCommand.slice(2).join(' ');
          window.open('https://www.google.com/search?q=' + search, '_blank');
          const result = 'Baik, saya akan mencarikan anda ' + search;
        speak(result);
        return result;
        } else {
        const result = 'maaf, saya tidak mengerti dengan perkataan anda! Bisa tolong ulangi lagi?'
        speak(result);
        return result;
        }
      } else {
        const result = 'Maaf, saya belum mengenali perintah tersebut!';
        speak(result);
        return result;
      }
    case 'sekarang':
      if (splitCommand.length > 1 && splitCommand[1] === 'jam') {
    var now = new Date();
    var jam = now.getHours();
    var menit = now.getMinutes();
    var detik = now.getSeconds();

    // Tambahkan leading zero jika jam, menit, atau detik kurang dari 10
    jam = (jam < 10) ? "0" + jam : jam;
    menit = (menit < 10) ? "0" + menit : menit;
    detik = (detik < 10) ? "0" + detik : detik;

    var waktu = jam + ":" + menit + ":" + detik;
          const result = 'Sekarang jam ' + waktu;
          speak(result);
          return result;
        } else {
        const result = 'Maaf, saya belum mengenali perintah tersebut!';
        speak(result);
        return result;
        }
    case 'tampilkan':
      if (splitCommand.length > 1 && splitCommand[1] === 'kamera') {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();
            document.body.appendChild(videoElement);
          })
          .catch(function(error) {
            console.error('Error accessing camera:', error);
          });
        return 'Menampilkan kamera...';
      } else {
        return 'Perintah tidak dikenali';
      }
    case 'perbesar':
      if (splitCommand.length > 1 && splitCommand[1] === 'kamera') {
        zoomIn();
        return 'Memperbesar kamera...';
      } else {
        return 'Perintah tidak dikenali';
      }
    case 'perkecil':
      if (splitCommand.length > 1 && splitCommand[1] === 'kamera') {
        zoomOut();
        return 'Memperkecil kamera...';
      } else {
        return 'Perintah tidak dikenali';
      }
    case 'deteksi':
      if (splitCommand.length > 1 && splitCommand[1] === 'objek') {
        detectObject()
          .then(objects => {
            const result = objects.map(obj => obj.class + ' (skor: ' + obj.score.toFixed(2) + ')').join(', ');
            document.getElementById('commandResult').textContent = 'Objek yang terdeteksi: ' + result;
          })
          .catch(error => {
            console.error('Error detecting object:', error);
            document.getElementById('commandResult').textContent = 'Gagal mendeteksi objek';
          });
      } else {
        return 'Perintah tidak dikenali';
      }
    default:
      const result = 'Maaf, saya belum mengenali perintah tersebut!';
      speak(result);
      return result;
      
  }
}

// Inisialisasi SpeechRecognition API
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = 'id-ID';

// Mendeteksi suara masuk
recognition.onresult = function(event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log('Command:', command);
  const result = executeCommand(command);
  document.getElementById('commandResult').textContent = result;
}

// Mengaktifkan atau menonaktifkan SpeechRecognition saat tombol ditekan
document.getElementById('toggleListening').addEventListener('click', () => {
  isListening = !isListening; // Mengubah status mendengarkan
  if (isListening) {
    recognition.start(); // Memulai mendengarkan
    document.getElementById('toggleListening').textContent = 'Hentikan Mendengarkan';
    document.getElementById('toggleListening').style = 'background-color: #1e9f01; border: 1px solid #1e9f01';
  } else {
    recognition.abort(); // Menghentikan mendengarkan
    document.getElementById('toggleListening').textContent = 'Mulai Mendengarkan';
    document.getElementById('toggleListening').style = 'background-color: #29ca04; border: 1px solid #29ca04';
  }
});

// Menggunakan fungsi speak untuk memberi respons suara
