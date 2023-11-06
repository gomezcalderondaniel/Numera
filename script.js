function generateMatrix() {
  var birthdate = document.getElementById('birthdate').value;
  var dateParts = birthdate.split('-');
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  var matrixContainer = document.getElementById('matrixContainer');
  matrixContainer.innerHTML = '';

  var matrix1 = generateMatrix1(year, month, day);
  var matrix2 = generateMatrix2(year, month, day);

  matrixContainer.appendChild(createMatrixTable(matrix1));
  matrixContainer.appendChild(createMatrixTable(matrix2));
}

function generateMatrix1(year, month, day) {
  var matrix = [
    [0, year.charAt(0), year.charAt(1), year.charAt(2), year.charAt(3)],
    [day.charAt(0), day.charAt(0) + year.charAt(0), day.charAt(0) + year.charAt(1), day.charAt(0) + year.charAt(2), day.charAt(0) + year.charAt(3)],
    [day.charAt(1), day.charAt(1) + year.charAt(0), day.charAt(1) + year.charAt(1), day.charAt(1) + year.charAt(2), day.charAt(1) + year.charAt(3)],
    [month.charAt(0), month.charAt(0) + year.charAt(0), month.charAt(0) + year.charAt(1), month.charAt(0) + year.charAt(2), month.charAt(0) + year.charAt(3)],
    [month.charAt(1), month.charAt(1) + year.charAt(0), month.charAt(1) + year.charAt(1), month.charAt(1) + year.charAt(2), month.charAt(1) + year.charAt(3)]
  ];

  return matrix;
}

function generateMatrix2(year, month, day) {
  var matrix = [
    [0, day.charAt(0), day.charAt(1), month.charAt(0), month.charAt(1)],
    [year.charAt(0), year.charAt(0) + day.charAt(0), year.charAt(0) + day.charAt(1), year.charAt(0) + month.charAt(0), year.charAt(0) + month.charAt(1)],
    [year.charAt(1), year.charAt(1) + day.charAt(0), year.charAt(1) + day.charAt(1), year.charAt(1) + month.charAt(0), year.charAt(1) + month.charAt(1)],
    [year.charAt(2), year.charAt(2) + day.charAt(0), year.charAt(2) + day.charAt(1), year.charAt(2) + month.charAt(0), year.charAt(2) + month.charAt(1)],
    [year.charAt(3), year.charAt(3) + day.charAt(0), year.charAt(3) + day.charAt(1), year.charAt(3) + month.charAt(0), year.charAt(3) + month.charAt(1)]
  ];

  return matrix;
}

function generateMatrix() {
  var birthdate = document.getElementById('birthdate').value;
  var dateParts = birthdate.split('-');
  var year = dateParts[0];
  var month = dateParts[1];
  var day = dateParts[2];

  var matrixContainer = document.getElementById('matrixContainer');
  matrixContainer.innerHTML = '';

  var matrix1 = generateMatrix1(year, month, day);
  var matrix2 = generateMatrix2(year, month, day);

  matrixContainer.appendChild(createMatrixTable(matrix1, 'matrix1'));
  matrixContainer.appendChild(createMatrixTable(matrix2, 'matrix2'));
}

function createMatrixTable(matrix, matrixName) {
  var container = document.createElement('div');
  container.classList.add('matrix-container');

  var table = document.createElement('table');
  table.classList.add('matrix');

  for (var i = 0; i < matrix.length; i++) {
    var row = document.createElement('tr');

    for (var j = 0; j < matrix[i].length; j++) {
      var cell = document.createElement('td');
      cell.innerText = matrix[i][j];
      cell.classList.add('matrix-cell');

      // Add different CSS classes for the border styles
      if (i === 0 && j === 0) {
        cell.classList.add('top-left');
      } else if (i === 0 && j === matrix[i].length - 1) {
        cell.classList.add('top-right');
      } else if (i === matrix.length - 1 && j === 0) {
        cell.classList.add('bottom-left');
      } else if (i === matrix.length - 1 && j === matrix[i].length - 1) {
        cell.classList.add('bottom-right');
      } else if (i === 0) {
        cell.classList.add('top');
      } else if (i === matrix.length - 1) {
        cell.classList.add('bottom');
      } else if (j === 0) {
        cell.classList.add('left');
      } else if (j === matrix[i].length - 1) {
        cell.classList.add('right');
      }

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  container.appendChild(table);

  var input = document.createElement('textarea');
  input.type = 'text';
  input.id = matrixName + 'Input';
  input.placeholder = 'Notas';

  // container.style.display = 'inline-block';
  container.appendChild(input);


  return container;
}

let chart;

function updateGraph() {
  // toggleGraph();
  
  var graphContainer = document.getElementById("graphContainer");
  graphContainer.style.display = "block";
  
  // Retrieve input values
  const date = new Date(document.getElementById("birthdate").value);
  const frequency = date.getDate(); // Extract frequency from day
  const phase = date.getMonth() + 1; // Extract phase from month number
  const offset = date.getFullYear(); // Extract offset from year
  const amplitude = parseFloat(document.getElementById("amplitude").value);
  
  // Generate data for the graph
  const data = [];
  const labels = [];
  for (let x = 0; x <= amplitude; x += 1) {
    const y = (Math.sin(frequency * x) + Math.cos(phase * x) + Math.tan(offset * x)) / amplitude;
    data.push(y);
    labels.push(x.toFixed(0));
  }

  // Update the chart
  if (chart) {
    chart.data.datasets[0].data = data;
    chart.data.labels = labels;
    chart.update();
  } else {  
    const ctx = document.getElementById('graph').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Numeroligia',
          data: data,
          borderColor: 'black',
          backgroundColor: 'transparent',
          pointRadius: 0,
        }],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Edad',
            },
            ticks: {
              maxRotation: 0, // Prevent x-axis labels from overlapping
            },
          },
          y: {
            title: {
              display: false,
              text: 'f(x)',
            },
          },
        },
        responsive: true, // Enable responsive resizing
        maintainAspectRatio: true, // Allow the chart to adjust its size dynamically
        interaction: {
          mode: 'index', // Enable index mode for tooltips
          intersect: false, // Disable intersect mode for tooltips
        },
        plugins: {
          tooltip: {
            mode: 'index', // Enable index mode for tooltips
            intersect: false, // Disable intersect mode for tooltips
          },
          zoom: {
            zoom: {
              pinch: {
                enabled: true, // Enable zooming with pinch gestures
              },
              mode: 'xy', // Enable zooming on both axes
            },
            pan: {
              enabled: true, // Enable panning
              mode: 'xy', // Enable panning on both axes
            },
            limits: {
              maxZoom: 10, // Set the maximum zoom level
              minPan: {
                x: -100, // Set the minimum pan value for the x-axis
                y: -100, // Set the minimum pan value for the y-axis
              },
              maxPan: {
                x: 100, // Set the maximum pan value for the x-axis
                y: 100, // Set the maximum pan value for the y-axis
              },
            },
            zoomRange: {
              min: 0.1, // Set the minimum zoom range
              max: 10, // Set the maximum zoom range
            },
            limitsRange: {
              min: 0.1, // Set the minimum limit range
              max: 10, // Set the maximum limit range
            },
          },
        },
      },
    });
       
  }

  
  // Calculate the LCM of D, M, and Y  
  const absoluteD = Math.abs(date.getDate());
  const absoluteM = Math.abs(date.getMonth() + 1);
  const absoluteY = Math.abs(date.getYear());

  const lcmTemp = (absoluteD * absoluteM) / calculateGCD(absoluteD, absoluteM);
  const lcm = (lcmTemp * absoluteY) / calculateGCD(lcmTemp, absoluteY);

  // Calculate the overall frequency using the formula f = LCM / (2 * pi)
  const frequencyOA = lcm / (2 * Math.PI);

  // Calculate period
  const period = (2 * Math.PI) / frequencyOA;

  // Pass the correct values to the graphing function
  createAudioContext();
  // exportAsMP3(period, frequencyOA);
  console.log(period, frequencyOA)
  return {
    period,
    frequencyOA
  };
}


// Calculate the greatest common divisor (GCD) using the Euclidean algorithm
function calculateGCD(a, b) {
  if (b === 0) {
    return a;
  } else {
    return calculateGCD(b, a % b);
  }
}

// Add an event listener to the export button
document.getElementById('exportButton').addEventListener('click', exportAsPDF);

// Update the exportAsPDF function
async function exportAsPDF() {
  // Create a new HTML2PDF instance
  const element = document.body;
  const {
    html2pdf
  } = window;

  // Configure the PDF options
  const options = {
    filename: 'Numera.pdf',
    image: {
      type: 'jpeg',
      quality: 1
    },
    html2canvas: {
      scale: 1
    },
    jsPDF: {
      unit: 'in',
      format: 'letter',
      orientation: 'landscape'
    },
  };

  // Create the PDF
  await html2pdf().set(options).from(element).save();
}
// Onda Numerologica
// Add an event listener to the toggle button
document.getElementById('toggleButton').addEventListener('click', toggleAnimation);

// Canvas setup
const canvas = document.createElement('canvas');
canvas.width = 1500;
canvas.height = 500;
document.getElementById('graphNatural').appendChild(canvas);
const context = canvas.getContext('2d');

// Animation loop
let animationId;

// Start the animation loop
animate();

function animate(period, frequencyOA) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Draw y-axis
  context.beginPath();
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.strokeStyle = '#000';
  context.lineWidth = 1;
  context.stroke();

  // Draw x-axis
  context.beginPath();
  context.moveTo(0, canvas.height / 2);
  context.lineTo(canvas.width, canvas.height / 2);
  context.strokeStyle = '#000';
  context.lineWidth = 1;
  context.stroke();

  // Draw x-axis labels and values
  context.font = '12px Arial';
  context.fillStyle = '#000';
  context.textAlign = 'right';
  context.fillText('0', canvas.width / 2, canvas.height / 2 + 5);
  context.fillText('π', canvas.width / 2 + Math.PI * canvas.width / period, canvas.height / 2 + 5);
  context.fillText('2π', canvas.width / 2 + 2 * Math.PI * canvas.width / period, canvas.height / 2 + 5);

  // Draw y-axis labels and values
  context.font = '12px Arial';
  context.fillStyle = '#000';
  context.textAlign = 'right';
  context.fillText('100', canvas.width / 2 - 5, canvas.height / 2 - 100);
  context.fillText('t', canvas.width / 2 - 5, canvas.height / 2);
  context.fillText('-100', canvas.width / 2 - 5, canvas.height / 2 + 100);
  
  // Retrieve input values
  const T = period;
  const frequency = parseFloat(frequencyOA);
  const A = 100; // Amplitude
  const k = (2 * Math.PI) / T; // Wave number
  const ω = 2 * Math.PI * frequency; // Angular frequency

  // Calculate time-dependent wave function
  const t = Date.now() * 0.001; // Current time in seconds
  for (let x = 0; x < canvas.width; x += 0.15) {
    const real = A * Math.cos(k * x - ω * t);
    const imag = A * Math.sin(k * x - ω * t);
    const y = canvas.height / 2 - real; // Vertical position inverted for graph display

    context.fillRect(x, y, 1.5, 1.5);
  }

  animationId = requestAnimationFrame(() => animate(period, frequencyOA));
}

 function toggleAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = undefined;
  } else {
    const { period, frequencyOA } = updateGraph(); // Get the period and frequencyOA values from the updateGraph function
    animate(period, frequencyOA); // Pass the values to the animate function
  }
}
// Sonido Numerologico
// Audio context and oscillator variables
let audioContext;
let oscillator;

// Create audio context and start playback
function createAudioContext() {
    if (audioContext) {
     return; // Prevent creating multiple audio contexts
    }

 // Retrieve input values
  const date = new Date(document.getElementById("birthdate").value);
  const frequency = date.getDate(); // Extract frequency from day
  const phase = date.getMonth() + 1; // Extract phase from month number
  const offset = date.getFullYear(); // Extract offset from year
 // Calculate the LCM of D, M, and Y  
 const absoluteD = Math.abs(date.getDate());
 const absoluteM = Math.abs(date.getMonth() + 1);
 const absoluteY = Math.abs(date.getYear());

 const lcmTemp = (absoluteD * absoluteM) / calculateGCD(absoluteD, absoluteM);
 const lcm = (lcmTemp * absoluteY) / calculateGCD(lcmTemp, absoluteY);

 // Calculate the overall frequency using the formula f = LCM / (2 * pi)
 const frequencyOA = lcm / (2 * Math.PI);

 // Calculate period
 const period = (2 * Math.PI) / frequencyOA;

    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    audioContext.sampleRate = 48000;
    const sampleRate = audioContext.sampleRate;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1.0; // Adjust the gain value (0.0 - 1.0) to make the sound audible
    gainNode.connect(audioContext.destination);

    // Proceed only if input values have changed
    const T = parseFloat(period);
    const A = 100; // Amplitude
    const k = (2 * Math.PI) / T; // Wave number
    const ω = 2 * Math.PI * frequencyOA; // Angular frequency
    // const frequencyAdj = (ω * 1); // Adjusting frequency to hearing rangelog

    // Calculate time-dependent wave function
    const samples = [];
    const samplesImag = [];
    const stepSize = 0.001; // Adjust the step size for smoother sound

    for (let x = 0; x < 1; x += stepSize) {
      const real = A * Math.cos(k * x - ω * audioContext.currentTime);
      const imag = A * Math.sin(k * x - ω * audioContext.currentTime);
      samples.push(real);
      samplesImag.push(imag);
    }    


  // Create custom waveform using the samples
  // const customWaveform = audioContext.createPeriodicWave(new Float32Array(samples), new Float32Array(samplesImag));

  // Play/stop the sound
  function playSound(frequencyOA) {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
    }

    oscillator = audioContext.createOscillator();
    // oscillator.setPeriodicWave(customWaveform);
    // oscillator.type = 'sine'; // Set the waveform type to triangle
    oscillator.connect(gainNode);
    oscillator.frequency.value = frequencyOA; // Update the frequency of the oscillator
    // oscillator.frequency.exponentialRampToValueAtTime(frequencyOA, MP3Context.currentTime + 0.1);
    oscillator.sampleRate = 48000;
    oscillator.start();
  }

  function stopSound() {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }

    
  }

  
  // Event listener to play/stop sound on button click
  const playSoundButton = document.getElementById('playSound');
  playSoundButton.addEventListener('click', function () {
    if (!oscillator) {
      playSound(frequencyOA);
    } else {
      stopSound();
    }
  });

  // console.log('f_Adj: ', frequencyAdj);
  console.log('f_OA: ', frequencyOA);
  console.log('omega: ', ω);
  console.log('Sample Rate: ', sampleRate);
  // exportAsMP3(frequencyOA);
  return {
    audioContext,
    oscillator,
    frequencyOA
  };
  // Play the sound
  // playSound(samples, frequencyAdj);
  

}

document.getElementById('exportButtonMP3').addEventListener('click', exportAsMP3);

let MP3Context;
let MP3oscillator;
let gainNode;

function exportAsMP3() {
  if (MP3Context) {
    return; // Prevent creating multiple audio contexts
  }

  // Retrieve input values
  const date = new Date(document.getElementById("birthdate").value);
  const frequency = date.getDate(); // Extract frequency from day
  const phase = date.getMonth() + 1; // Extract phase from month number
  const offset = date.getFullYear(); // Extract offset from year
 // Calculate the LCM of D, M, and Y  
 const absoluteD = Math.abs(date.getDate());
 const absoluteM = Math.abs(date.getMonth() + 1);
 const absoluteY = Math.abs(date.getYear());

 const lcmTemp = (absoluteD * absoluteM) / calculateGCD(absoluteD, absoluteM);
 const lcm = (lcmTemp * absoluteY) / calculateGCD(lcmTemp, absoluteY);

 // Calculate the overall frequency using the formula f = LCM / (2 * pi)
 const frequencyOA = lcm / (2 * Math.PI);

 // Calculate period
//  const period = (2 * Math.PI) / frequencyOA;

  const duration = 10; // Duration in seconds
  
  MP3Context = new (window.AudioContext || window.webkitAudioContext)();
  MP3Context.sampleRate = 48000;
  gainNodeMP3 = MP3Context.createGain();
  gainNodeMP3.gain.value = 1.0; // Adjust the gain value (0.0 - 1.0) to make the sound audible
  gainNodeMP3.connect(MP3Context.destination);

  MP3oscillator = MP3Context.createOscillator();
  MP3oscillator.connect(gainNodeMP3);
  MP3oscillator.frequency.value = frequencyOA; 
  // Update the frequency of the oscillator
  // MP3oscillator.frequency.exponentialRampToValueAtTime(frequencyOA, MP3Context.currentTime + 0.1);
  MP3oscillator.sampleRate = 48000;

  // MP3oscillator.start();

  // setTimeout(() => {
    MP3oscillator.start();
    const audio = createAudioElement(); // Create an HTMLAudioElement
    const stream = captureAudioStream(audio); // Capture the audio stream
    const mediaRecorder = createMediaRecorder(stream); // Create the MediaRecorder
    const chunks = []; // Array to store recorded audio chunks

    mediaRecorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const blob = createBlob(chunks); // Create a Blob from recorded chunks
      const url = createObjectURL(blob); // Create a URL for the Blob
      setAudioSource(audio, url); // Set the URL as the source of the audio element
      downloadAudio(blob); // Download the audio
    });

    startRecording(mediaRecorder, duration); // Start recording

    setTimeout(() => {
      stopRecording(mediaRecorder); // Stop recording after the specified duration
      MP3oscillator.stop(); // Stop the oscillator after recording
      MP3Context.close(); // Close the audio context after recording
      gainNodeMP3.disconnect(); // Disconnect the gain node
      MP3Context = null; // Reset the audio context
      MP3oscillator = null; // Reset the oscillator
      gainNodeMP3 = null; // Reset the gain node
    }, duration * 1000);
  // });
}


function createAudioElement() {
  const audio = new Audio();
  audio.controls = false;
  return audio;
}

function captureAudioStream() {
  const audioStream = MP3Context.createMediaStreamDestination();
  gainNodeMP3.connect(audioStream);
  return audioStream.stream;
}


function createMediaRecorder(stream) {
  return new MediaRecorder(stream);
}

function createBlob(chunks) {
  return new Blob(chunks, { type: 'audio/wav' });
}

function createObjectURL(blob) {
  return URL.createObjectURL(blob);
}

function setAudioSource(audio, url) {
  audio.src = url;
}

function downloadAudio(blob) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Numera.wav';
  link.click();
}

function startRecording(mediaRecorder, duration) {
  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
  }, duration * 1000);
}

function stopRecording(mediaRecorder) {
  mediaRecorder.stop();
}