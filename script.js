var suspiciousIds = [
    "65e386436fc2f96f6377860b",
    "65e386436fc2f96f6377860c",
    "65e386436fc2f96f6377860d",
    "65e386436fc2f96f6377860e",
    "65e386436fc2f96f6377860f",
    "65e386436fc2f96f63778610",
    "65e386436fc2f96f63778611",
    "65e386436fc2f96f63778612",
    "65e386436fc2f96f63778613",
    "65e386436fc2f96f63778614",
    "65e386436fc2f96f63778615",
    "65e386436fc2f96f63778616",
    "65e386436fc2f96f63778617"
];

function search() {
    var transactionId = $('#transactionId').val();

    if (suspiciousIds.includes(transactionId)) {
        alert('Suspicious transaction ID: ' + transactionId);
    } else {
        alert('Valid transaction ID: ' + transactionId);
    }
}