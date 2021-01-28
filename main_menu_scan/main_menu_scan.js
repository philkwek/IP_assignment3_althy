function onScanSuccess(qrCodeMessage) {
    alert(qrCodeMessage)
    html5QrcodeScanner.clear();
	// handle on success condition with the decoded message
}

var html5QrcodeScanner = new Html5QrcodeScanner(
	"qr-reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);