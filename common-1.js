$(function () {
  var App = {

    init: function () {
      Quagga.init(this.state, function (err) {
        if (err) {
          console.log(err);
          return;
        }
        App.attachListeners();
        App.checkCapabilities();
        Quagga.start();
      });
    },

    checkCapabilities: function () {
      var track = Quagga.CameraAccess.getActiveTrack();
      var capabilities = {};
      if (typeof track.getCapabilities === 'function') {
        capabilities = track.getCapabilities();
      }
    },

    initCameraSelection: function () {
      var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

      return Quagga.CameraAccess.enumerateVideoDevices();
    },

    attachListeners: function () {
      var self = this;

      self.initCameraSelection();
    },

    _convertNameToState: function (name) {
      return name.replace("_", ".").split("-").reduce(function (result, value) {
        return result + value.charAt(0).toUpperCase() + value.substring(1);
      });
    },

    applySetting: function (setting, value) {
      var track = Quagga.CameraAccess.getActiveTrack();
      if (track && typeof track.getCapabilities === 'function') {
        switch (setting) {
          case 'zoom':
            return track.applyConstraints({
              advanced: [{
                zoom: parseFloat(value)
              }]
            });
          case 'torch':
            return track.applyConstraints({
              advanced: [{
                torch: !!value
              }]
            });
        }
      }
    },

    setState: function (path, value) {
      var self = this;

      if (typeof self._accessByPath(self.inputMapper, path) === "function") {
        value = self._accessByPath(self.inputMapper, path)(value);
      }

      if (path.startsWith('settings.')) {
        var setting = path.substring(9);
        return self.applySetting(setting, value);
      }
      self._accessByPath(self.state, path, value);

      console.log(JSON.stringify(self.state));
      App.detachListeners();
      Quagga.stop();
      App.init();
    },

    inputMapper: {
      inputStream: {
        constraints: function (value) {
          if (/^(\d+)x(\d+)$/.test(value)) {
            var values = value.split('x');
            return {
              width: {
                min: parseInt(values[0])
              },
              height: {
                min: parseInt(values[1])
              }
            };
          }
          return {
            deviceId: value
          };
        }
      },
      numOfWorkers: function (value) {
        return parseInt(value);
      },
      decoder: {
        readers: function (value) {
          if (value === 'ean_extended') {
            return [{
              format: "ean_reader",
              config: {
                supplements: [
                  'ean_5_reader', 'ean_2_reader'
                ]
              }
            }];
          }
          return [{
            format: value + "_reader",
            config: {}
          }];
        }
      }
    },
    state: {
      inputStream: {
        type: "LiveStream",
        constraints: {
          width: {
            min: 1280
          },
          height: {
            min: 720
          },
          aspectRatio: {
            min: 1,
            max: 100
          },
          facingMode: "environment" // or user
        }
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      numOfWorkers: 4,
      frequency: 10,
      decoder: {
        readers: [{
          format: "ean_reader",
          config: {}
        }]
      },
      locate: true
    },
    lastResult: null
  };

  App.init();

  Quagga.onProcessed(function (result) {
    var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
        result.boxes.filter(function (box) {
          return box !== result.box;
        }).forEach(function (box) {
          Quagga.ImageDebug.drawPath(box, {
            x: 0,
            y: 1
          }, drawingCtx, {
            color: "green",
            lineWidth: 2
          });
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {
          x: 0,
          y: 1
        }, drawingCtx, {
          color: "#00F",
          lineWidth: 2
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, {
          x: 'x',
          y: 'y'
        }, drawingCtx, {
          color: 'red',
          lineWidth: 3
        });
      }
    }
  });

  Quagga.onDetected(function (result) {

    var code = result.codeResult.code;

    console.log(code);


    if (App.lastResult !== code) {
      App.lastResult = code;
      var $node = null,

      $node = $('<h4 class="code"></h4>');
      $node.find("h4.code").html(code);
      $("#result_strip").prepend($node);
    }
  });
});