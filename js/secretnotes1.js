var encrypted_text = "";

var get_encrypted_message = function() {
    var client = new XMLHttpRequest();
    client.open('GET', 'https://taotetik.github.io/encrypted/1.txt');
    client.onreadystatechange = function() {
        encrypted_text = client.responseText;
    }
    client.send();
};
get_encrypted_message();

setInterval(function() {
    if (encrypted_text.length <= 1) get_encrypted_message();
}, 2000);

console.log(my_aes.encryptMessage('Welcome to AES !', 'your_password'));
console.log(my_aes.decryptMessage('U2FsdGVkX1/S5oc9WgsNyZb8TJHsuL7+p4yArjEpOCYgDTUdkVxkmr+E+NdJmro9', 'your_password'));

var is_correctly_decrypted = function(dec_text) {
    var sha512hash = CryptoJS.SHA512(dec_text).toString();
    return sha512hash == "a3a39eb7baba0698fb8c917432a872167a38578d99c568779a90513377d76e24c27ece4af89b36baec32d4161ec272007cab5728e7c90f8b54af9fcb2d25d117";
}

var get_decrypted_text = function(pass) {
    if (encrypted_text.length <= 1) {
        alert("Something is wrong with getting the secret notes");
        return "";
    }
    var could_decrypt = true,
        decrypted_text;
    try {
        decrypted_text = my_aes.decryptMessage(encrypted_text, pass);
    } catch (err) {
        could_decrypt = false;
    }
    if (!could_decrypt || (typeof decrypted_text) != "string" || decrypted_text.length <= 1) {
        alert("Wrong password, try again");
        return "";
    }
    if (!is_correctly_decrypted(decrypted_text)) {
        alert("Wrong password. Incorrectly decrypted");
        return "";
    } else return decrypted_text;
};

function open_notes() {
    var entered_pass = document.getElementById("notepass").value;
    console.log('Entered pass: ' + entered_pass);
    var decrypted = get_decrypted_text(entered_pass);
    if (is_correctly_decrypted(decrypted)) {
        document.getElementById("passnotesbox").innerHTML = decrypted;
    }
}

function check_pass(ele) {
    if (event.key === 'Enter') {
        open_notes();
    }
}