function searchMovie() {
    $('#movie-list').html('');
    
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '6d49b9fb',
            's': $('#search-input').val()
        },
        success: function(res) {
            if(res.Response == "True") {

                let movies = res.Search

                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="`+ data.Poster +`" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted>`+ data.Year +`</h6>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');

            }else {
                $('#movie-list').html('<h1 class="text-center">'+ res.Error +'</h1>');
            }
        }
    });
}

$('#search-button').on('click', function() {
    searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if(e.keyCode === 13) {
        searchMovie();
    }
});