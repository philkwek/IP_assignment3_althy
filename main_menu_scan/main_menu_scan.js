function onScanSuccess(qrCodeMessage) {
    html5QrcodeScanner.clear();
    window.location = qrCodeMessage;
    
	// handle on success condition with the decoded message
}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);