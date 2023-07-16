document.getElementById('input').addEventListener('keydown', function(e) {
    if (e.key == 'Enter') {
        var input = document.getElementById('input').value;

        fetch(`/api/translation?text=${encodeURIComponent(input)}`)
            .then(response => response.json()) 
            .then(data => {
                console.log(data);  // Log the response object
                document.getElementById('output').innerHTML = data.output;
                document.getElementById('input').value = ''; 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
