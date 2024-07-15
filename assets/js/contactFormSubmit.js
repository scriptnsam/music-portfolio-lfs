form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value;
    const fullname = form.fullname.value;
    const message = form.message.value;

    // use the fetch api to post data to the backend and also add a loading... to the submit button
    fetch('/contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            fullname: fullname,
            message: message
        }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully');
                form.reset();
            } else {
                alert(data.errorM);
            }
        })
        .catch(err => {
            console.log(err);
        })
})