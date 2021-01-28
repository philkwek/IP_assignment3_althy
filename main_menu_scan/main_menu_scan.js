function onScanSuccess(qrCodeMessage) {
    alert(qrCodeMessage)
    html5QrcodeScanner.clear();
	// handle on success condition with the decoded message
}

function onScanError(errorMessage) {
    alert('Scanning failed!'); // handle on error condition, with error message
    html5QrcodeScanner.clear();
}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanError);