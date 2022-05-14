<?php
print_r(json_decode(file_get_contents('https://yts.mx/api/v2/list_movies.json?limit=1&query_term=the%20lost%20city'),true));