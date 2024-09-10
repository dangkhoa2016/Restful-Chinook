
# get list of albums
curl -s "http://localhost:5000/api/albums" | jq
{
  "rows": [
    {
      "album_id": 1,
      "title": "For Those About To Rock We Salute You",
      "artist_id": 1
    },
    {
      "album_id": 2,
      "title": "Balls to the Wall",
      "artist_id": 2
    },
    {
      "album_id": 3,
      "title": "Restless and Wild",
      "artist_id": 2
    },
    {
      "album_id": 4,
      "title": "Let There Be Rock",
      "artist_id": 1
    },
    {
      "album_id": 5,
      "title": "Big Ones",
      "artist_id": 3
    },
    {
      "album_id": 6,
      "title": "Jagged Little Pill",
      "artist_id": 4
    },
    {
      "album_id": 7,
      "title": "Facelift",
      "artist_id": 5
    },
    {
      "album_id": 8,
      "title": "Warner 25 Anos",
      "artist_id": 6
    },
    {
      "album_id": 9,
      "title": "Plays Metallica By Four Cellos",
      "artist_id": 7
    },
    {
      "album_id": 10,
      "title": "Audioslave",
      "artist_id": 8
    }
  ],
  "total": 347
}

# get a single album by id
curl -s "http://localhost:5000/api/albums/1" | jq
{
  "album_id": 1,
  "title": "For Those About To Rock We Salute You",
  "artist_id": 1
}

# create an album
curl -H "Content-Type: application/json" \
  -d '{"title": "The Modern Sound of Betty Carter", "artist_id": 1}' http://localhost:5000/api/albums | jq
{
  "album_id": 348,
  "title": "The Modern Sound of Betty Carter",
  "artist_id": 1
}

# update an album
curl -X PUT -H "Content-Type: application/json" \
  -d '{"title": "The Modern Sound of Betty Carter (remastered)"}' http://localhost:5000/api/albums/1 | jq
{
  "album_id": 1,
  "title": "The Modern Sound of Betty Carter (remastered)",
  "artist_id": 1
}

# delete an album
curl -X DELETE http://localhost:5000/api/albums/1 | jq
{
  "1": "Deleted"
}

####################

# get list of artists
curl -s "http://localhost:5000/api/artists" | jq
{
  "rows": [
    {
      "artist_id": 1,
      "name": "AC/DC"
    },
    {
      "artist_id": 2,
      "name": "Accept"
    },
    {
      "artist_id": 3,
      "name": "Aerosmith"
    },
    {
      "artist_id": 4,
      "name": "Alanis Morissette"
    },
    {
      "artist_id": 5,
      "name": "Alice In Chains"
    },
    {
      "artist_id": 6,
      "name": "Antônio Carlos Jobim"
    },
    {
      "artist_id": 7,
      "name": "Apocalyptica"
    },
    {
      "artist_id": 8,
      "name": "Audioslave"
    },
    {
      "artist_id": 9,
      "name": "BackBeat"
    },
    {
      "artist_id": 10,
      "name": "Billy Cobham"
    }
  ],
  "total": 275
}

# get a single artist by id
curl -s "http://localhost:5000/api/artists/1" | jq
{
  "artist_id": 1,
  "name": "AC/DC"
}

# create an artist
curl -H "Content-Type: application/json" -d '{"name": "The Beatles"}' http://localhost:5000/api/artists | jq
{
  "artist_id": 276,
  "name": "The Beatles"
}

# update an artist
curl -X PUT -H "Content-Type: application/json" -d '{"name": "The Beatles (remastered)"}' \
  http://localhost:5000/api/artists/1 | jq
{
  "artist_id": 1,
  "name": "The Beatles (remastered)"
}

# delete an artist
curl -X DELETE http://localhost:5000/api/artists/1 | jq
{
  "1": "Deleted"
}

####################

# get list of customers
curl -s "http://localhost:5000/api/customers" | jq
{
  "rows": [
    {
      "customer_id": 1,
      "first_name": "Luís",
      "last_name": "Gonçalves",
      "company": "Embraer - Empresa Brasileira de Aeronáutica S.A.",
      "address": "Av. Brigadeiro Faria Lima, 2170",
      "city": "São José dos Campos",
      "state": "SP",
      "country": "Brazil",
      "postal_code": "12227-000",
      "phone": "+55 (12) 3923-5555",
      "fax": "+55 (12) 3923-5566",
      "email": "luisg@embraer.com.br",
      "support_rep_id": 3
    },
    {
      "customer_id": 2,
      "first_name": "Leonie",
      "last_name": "Köhler",
      "company": "",
      "address": "Theodor-Heuss-Straße 34",
      "city": "Stuttgart",
      "state": "",
      "country": "Germany",
      "postal_code": "70174",
      "phone": "+49 0711 2842222",
      "fax": "",
      "email": "leonekohler@surfeu.de",
      "support_rep_id": 5
    },
    {
      "customer_id": 3,
      "first_name": "François",
      "last_name": "Tremblay",
      "company": "",
      "address": "1498 rue Bélanger",
      "city": "Montréal",
      "state": "QC",
      "country": "Canada",
      "postal_code": "H2G 1A7",
      "phone": "+1 (514) 721-4711",
      "fax": "",
      "email": "ftremblay@gmail.com",
      "support_rep_id": 3
    },
    {
      "customer_id": 4,
      "first_name": "Bjørn",
      "last_name": "Hansen",
      "company": "",
      "address": "Ullevålsveien 14",
      "city": "Oslo",
      "state": "",
      "country": "Norway",
      "postal_code": "0171",
      "phone": "+47 22 44 22 22",
      "fax": "",
      "email": "bjorn.hansen@yahoo.no",
      "support_rep_id": 4
    },
    {
      "customer_id": 5,
      "first_name": "František",
      "last_name": "Wichterlová",
      "company": "JetBrains s.r.o.",
      "address": "Klanova 9/506",
      "city": "Prague",
      "state": "",
      "country": "Czech Republic",
      "postal_code": "14700",
      "phone": "+420 2 4172 5555",
      "fax": "+420 2 4172 5555",
      "email": "frantisekw@jetbrains.com",
      "support_rep_id": 4
    },
    {
      "customer_id": 6,
      "first_name": "Helena",
      "last_name": "Holý",
      "company": "",
      "address": "Rilská 3174/6",
      "city": "Prague",
      "state": "",
      "country": "Czech Republic",
      "postal_code": "14300",
      "phone": "+420 2 4177 0449",
      "fax": "",
      "email": "hholy@gmail.com",
      "support_rep_id": 5
    },
    {
      "customer_id": 7,
      "first_name": "Astrid",
      "last_name": "Gruber",
      "company": "",
      "address": "Rotenturmstraße 4, 1010 Innere Stadt",
      "city": "Vienne",
      "state": "",
      "country": "Austria",
      "postal_code": "1010",
      "phone": "+43 01 5134505",
      "fax": "",
      "email": "astrid.gruber@apple.at",
      "support_rep_id": 5
    },
    {
      "customer_id": 8,
      "first_name": "Daan",
      "last_name": "Peeters",
      "company": "",
      "address": "Grétrystraat 63",
      "city": "Brussels",
      "state": "",
      "country": "Belgium",
      "postal_code": "1000",
      "phone": "+32 02 219 03 03",
      "fax": "",
      "email": "daan_peeters@apple.be",
      "support_rep_id": 4
    },
    {
      "customer_id": 9,
      "first_name": "Kara",
      "last_name": "Nielsen",
      "company": "",
      "address": "Sønder Boulevard 51",
      "city": "Copenhagen",
      "state": "",
      "country": "Denmark",
      "postal_code": "1720",
      "phone": "+453 3331 9991",
      "fax": "",
      "email": "kara.nielsen@jubii.dk",
      "support_rep_id": 4
    },
    {
      "customer_id": 10,
      "first_name": "Eduardo",
      "last_name": "Martins",
      "company": "Woodstock Discos",
      "address": "Rua Dr. Falcão Filho, 155",
      "city": "São Paulo",
      "state": "SP",
      "country": "Brazil",
      "postal_code": "01007-010",
      "phone": "+55 (11) 3033-5446",
      "fax": "+55 (11) 3033-4564",
      "email": "eduardo@woodstock.com.br",
      "support_rep_id": 4
    }
  ],
  "total": 59
}

# get a single customer by id
curl -s "http://localhost:5000/api/customers/1" | jq
{
  "customer_id": 1,
  "first_name": "Luís",
  "last_name": "Gonçalves",
  "company": "Embraer - Empresa Brasileira de Aeronáutica S.A.",
  "address": "Av. Brigadeiro Faria Lima, 2170",
  "city": "São José dos Campos",
  "state": "SP",
  "country": "Brazil",
  "postal_code": "12227-000",
  "phone": "+55 (12) 3923-5555",
  "fax": "+55 (12) 3923-5566",
  "email": "luisg@embraer.com.br",
  "support_rep_id": 3
}

# create a customer
curl -H "Content-Type: application/json" \
  -d '{"first_name": "The Beatles", "last_name": "abc",
  "email": "test@customer.local", "address": "123 Main St",
  "city": "New York", "state": "NY", "postal_code": "10001"}' \
  http://localhost:5000/api/customers | jq
{
  "customer_id": 60,
  "first_name": "The Beatles",
  "last_name": "abc",
  "company": null,
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": null,
  "postal_code": "10001",
  "phone": null,
  "fax": null,
  "email": "test@customer.local",
  "support_rep_id": null
}

# update a customer
curl -X PUT -H "Content-Type: application/json" \
  -d '{"first_name": "The Beatles (remastered)", "last_name": "abc",
  "email": "test@customer.local", "address": "123 Main St",
  "city": "New York", "state": "NY", "postal_code": "10001"}' \
  http://localhost:5000/api/customers/1 | jq
{
  "customer_id": 1,
  "first_name": "The Beatles (remastered)",
  "last_name": "abc",
  "company": "Embraer - Empresa Brasileira de Aeronáutica S.A.",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "Brazil",
  "postal_code": "10001",
  "phone": "+55 (12) 3923-5555",
  "fax": "+55 (12) 3923-5566",
  "email": "test@customer.local",
  "support_rep_id": 3
}

# delete a customer
curl -X DELETE http://localhost:5000/api/customers/1 | jq
{
  "1": "Deleted"
}

####################

# get list of employees
curl -s "http://localhost:5000/api/employees" | jq
{
  "rows": [
    {
      "employee_id": 1,
      "last_name": "Adams",
      "first_name": "Andrew",
      "title": "General Manager",
      "reports_to": "",
      "birth_date": "1962-02-18 00:00:00",
      "hire_date": "2002-08-14 00:00:00",
      "address": "11120 Jasper Ave NW",
      "city": "Edmonton",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T5K 2N1",
      "phone": "+1 (780) 428-9482",
      "fax": "+1 (780) 428-3457",
      "email": "andrew@chinookcorp.com"
    },
    {
      "employee_id": 2,
      "last_name": "Edwards",
      "first_name": "Nancy",
      "title": "Sales Manager",
      "reports_to": 1,
      "birth_date": "1958-12-08 00:00:00",
      "hire_date": "2002-05-01 00:00:00",
      "address": "825 8 Ave SW",
      "city": "Calgary",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T2P 2T3",
      "phone": "+1 (403) 262-3443",
      "fax": "+1 (403) 262-3322",
      "email": "nancy@chinookcorp.com"
    },
    {
      "employee_id": 3,
      "last_name": "Peacock",
      "first_name": "Jane",
      "title": "Sales Support Agent",
      "reports_to": 2,
      "birth_date": "1973-08-29 00:00:00",
      "hire_date": "2002-04-01 00:00:00",
      "address": "1111 6 Ave SW",
      "city": "Calgary",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T2P 5M5",
      "phone": "+1 (403) 262-3443",
      "fax": "+1 (403) 262-6712",
      "email": "jane@chinookcorp.com"
    },
    {
      "employee_id": 4,
      "last_name": "Park",
      "first_name": "Margaret",
      "title": "Sales Support Agent",
      "reports_to": 2,
      "birth_date": "1947-09-19 00:00:00",
      "hire_date": "2003-05-03 00:00:00",
      "address": "683 10 Street SW",
      "city": "Calgary",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T2P 5G3",
      "phone": "+1 (403) 263-4423",
      "fax": "+1 (403) 263-4289",
      "email": "margaret@chinookcorp.com"
    },
    {
      "employee_id": 5,
      "last_name": "Johnson",
      "first_name": "Steve",
      "title": "Sales Support Agent",
      "reports_to": 2,
      "birth_date": "1965-03-03 00:00:00",
      "hire_date": "2003-10-17 00:00:00",
      "address": "7727B 41 Ave",
      "city": "Calgary",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T3B 1Y7",
      "phone": "1 (780) 836-9987",
      "fax": "1 (780) 836-9543",
      "email": "steve@chinookcorp.com"
    },
    {
      "employee_id": 6,
      "last_name": "Mitchell",
      "first_name": "Michael",
      "title": "IT Manager",
      "reports_to": 1,
      "birth_date": "1973-07-01 00:00:00",
      "hire_date": "2003-10-17 00:00:00",
      "address": "5827 Bowness Road NW",
      "city": "Calgary",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T3B 0C5",
      "phone": "+1 (403) 246-9887",
      "fax": "+1 (403) 246-9899",
      "email": "michael@chinookcorp.com"
    },
    {
      "employee_id": 7,
      "last_name": "King",
      "first_name": "Robert",
      "title": "IT Staff",
      "reports_to": 6,
      "birth_date": "1970-05-29 00:00:00",
      "hire_date": "2004-01-02 00:00:00",
      "address": "590 Columbia Boulevard West",
      "city": "Lethbridge",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T1K 5N8",
      "phone": "+1 (403) 456-9986",
      "fax": "+1 (403) 456-8485",
      "email": "robert@chinookcorp.com"
    },
    {
      "employee_id": 8,
      "last_name": "Callahan",
      "first_name": "Laura",
      "title": "IT Staff",
      "reports_to": 6,
      "birth_date": "1968-01-09 00:00:00",
      "hire_date": "2004-03-04 00:00:00",
      "address": "923 7 ST NW",
      "city": "Lethbridge",
      "state": "AB",
      "country": "Canada",
      "postal_code": "T1H 1Y8",
      "phone": "+1 (403) 467-3351",
      "fax": "+1 (403) 467-8772",
      "email": "laura@chinookcorp.com"
    }
  ],
  "total": 8
}

# get a single employee by id
curl -s "http://localhost:5000/api/employees/1" | jq
{
  "employee_id": 1,
  "last_name": "Adams",
  "first_name": "Andrew",
  "title": "General Manager",
  "reports_to": "",
  "birth_date": "1962-02-18 00:00:00",
  "hire_date": "2002-08-14 00:00:00",
  "address": "11120 Jasper Ave NW",
  "city": "Edmonton",
  "state": "AB",
  "country": "Canada",
  "postal_code": "T5K 2N1",
  "phone": "+1 (780) 428-9482",
  "fax": "+1 (780) 428-3457",
  "email": "andrew@chinookcorp.com"
}

# create an employee
curl -H "Content-Type: application/json" -d '{"last_name": "Johnson", "first_name": "Tyler",
"title": "Sales Manager", "reports_to": 1, "birth_date": "1980-01-01", "hire_date": "2010-01-01",
"address": "123 Main St", "city": "New York", "state": "NY", "country": "USA", "postal_code": "10001",
"phone": "(123) 456-7890", "fax": "(123) 456-7891", "email": "tyler@chinookcorp.com"}' \
  http://localhost:5000/api/employees | jq
{
  "employee_id": 9,
  "last_name": "Johnson",
  "first_name": "Tyler",
  "title": "Sales Manager",
  "reports_to": 1,
  "birth_date": "1980-01-01",
  "hire_date": "2010-01-01",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postal_code": "10001",
  "phone": "(123) 456-7890",
  "fax": "(123) 456-7891",
  "email": "tyler@chinookcorp.com"
}

# update an employee
curl -X PUT -H "Content-Type: application/json" -d '{"last_name": "Johnson (remastered)",
"first_name": "Tyler", "title": "Sales Manager", "reports_to": 1, "birth_date": "1980-01-01",
"hire_date": "2010-01-01", "address": "123 Main St", "city": "New York", "state": "NY",
"country": "USA", "postal_code": "10001", "phone": "(123) 456-7890", "fax": "(123) 456-7891",
"email": "tyler@chinookcorp.com"}' \
  http://localhost:5000/api/employees/1 | jq
{
  "employee_id": 1,
  "last_name": "Johnson (remastered)",
  "first_name": "Tyler",
  "title": "Sales Manager",
  "reports_to": 1,
  "birth_date": "1980-01-01",
  "hire_date": "2010-01-01",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "postal_code": "10001",
  "phone": "(123) 456-7890",
  "fax": "(123) 456-7891",
  "email": "tyler@chinookcorp.com"
}

# delete a employee
curl -X DELETE http://localhost:5000/api/employees/1 | jq
{
  "1": "Deleted"
}

####################

# get list of genres
curl -s "http://localhost:5000/api/genres" | jq
{
  "rows": [
    {
      "genre_id": 1,
      "name": "Rock"
    },
    {
      "genre_id": 2,
      "name": "Jazz"
    },
    {
      "genre_id": 3,
      "name": "Metal"
    },
    {
      "genre_id": 4,
      "name": "Alternative & Punk"
    },
    {
      "genre_id": 5,
      "name": "Rock And Roll"
    },
    {
      "genre_id": 6,
      "name": "Blues"
    },
    {
      "genre_id": 7,
      "name": "Latin"
    },
    {
      "genre_id": 8,
      "name": "Reggae"
    },
    {
      "genre_id": 9,
      "name": "Pop"
    },
    {
      "genre_id": 10,
      "name": "Soundtrack"
    }
  ],
  "total": 25
}

# get a single genre by id
curl -s "http://localhost:5000/api/genres/1" | jq
{
  "genre_id": 1,
  "name": "Rock"
}

# create a genre
curl -H "Content-Type: application/json" -d '{"name": "Jazz"}' http://localhost:5000/api/genres | jq
{
  "genre_id": 26,
  "name": "Jazz"
}

# update a genre
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Jazz (remastered)"}'\
  http://localhost:5000/api/genres/1 | jq
{
  "genre_id": 1,
  "name": "Jazz (remastered)"
}

# delete a genre
curl -X DELETE http://localhost:5000/api/genres/1 | jq
{
  "1": "Deleted"
}

####################

# get list of invoices
curl -s "http://localhost:5000/api/invoices" | jq
{
  "rows": [
    {
      "invoice_id": 1,
      "customer_id": 2,
      "invoice_date": "2009-01-01 00:00:00",
      "billing_address": "Theodor-Heuss-Straße 34",
      "billing_city": "Stuttgart",
      "billing_state": "",
      "billing_country": "Germany",
      "billing_postal_code": "70174",
      "total": 1.98
    },
    {
      "invoice_id": 2,
      "customer_id": 4,
      "invoice_date": "2009-01-02 00:00:00",
      "billing_address": "Ullevålsveien 14",
      "billing_city": "Oslo",
      "billing_state": "",
      "billing_country": "Norway",
      "billing_postal_code": "0171",
      "total": 3.96
    },
    {
      "invoice_id": 3,
      "customer_id": 8,
      "invoice_date": "2009-01-03 00:00:00",
      "billing_address": "Grétrystraat 63",
      "billing_city": "Brussels",
      "billing_state": "",
      "billing_country": "Belgium",
      "billing_postal_code": "1000",
      "total": 5.94
    },
    {
      "invoice_id": 4,
      "customer_id": 14,
      "invoice_date": "2009-01-06 00:00:00",
      "billing_address": "8210 111 ST NW",
      "billing_city": "Edmonton",
      "billing_state": "AB",
      "billing_country": "Canada",
      "billing_postal_code": "T6G 2C7",
      "total": 8.91
    },
    {
      "invoice_id": 5,
      "customer_id": 23,
      "invoice_date": "2009-01-11 00:00:00",
      "billing_address": "69 Salem Street",
      "billing_city": "Boston",
      "billing_state": "MA",
      "billing_country": "USA",
      "billing_postal_code": "2113",
      "total": 13.86
    },
    {
      "invoice_id": 6,
      "customer_id": 37,
      "invoice_date": "2009-01-19 00:00:00",
      "billing_address": "Berger Straße 10",
      "billing_city": "Frankfurt",
      "billing_state": "",
      "billing_country": "Germany",
      "billing_postal_code": "60316",
      "total": 0.99
    },
    {
      "invoice_id": 7,
      "customer_id": 38,
      "invoice_date": "2009-02-01 00:00:00",
      "billing_address": "Barbarossastraße 19",
      "billing_city": "Berlin",
      "billing_state": "",
      "billing_country": "Germany",
      "billing_postal_code": "10779",
      "total": 1.98
    },
    {
      "invoice_id": 8,
      "customer_id": 40,
      "invoice_date": "2009-02-01 00:00:00",
      "billing_address": "8, Rue Hanovre",
      "billing_city": "Paris",
      "billing_state": "",
      "billing_country": "France",
      "billing_postal_code": "75002",
      "total": 1.98
    },
    {
      "invoice_id": 9,
      "customer_id": 42,
      "invoice_date": "2009-02-02 00:00:00",
      "billing_address": "9, Place Louis Barthou",
      "billing_city": "Bordeaux",
      "billing_state": "",
      "billing_country": "France",
      "billing_postal_code": "33000",
      "total": 3.96
    },
    {
      "invoice_id": 10,
      "customer_id": 46,
      "invoice_date": "2009-02-03 00:00:00",
      "billing_address": "3 Chatham Street",
      "billing_city": "Dublin",
      "billing_state": "Dublin",
      "billing_country": "Ireland",
      "billing_postal_code": "",
      "total": 5.94
    }
  ],
  "total": 412
}

# get a single invoice by id
curl -s "http://localhost:5000/api/invoices/1" | jq
{
  "invoice_id": 1,
  "customer_id": 2,
  "invoice_date": "2009-01-01 00:00:00",
  "billing_address": "Theodor-Heuss-Straße 34",
  "billing_city": "Stuttgart",
  "billing_state": "",
  "billing_country": "Germany",
  "billing_postal_code": "70174",
  "total": 1.98
}

# create an invoice
curl -H "Content-Type: application/json" -d '{"customer_id": 1,
"invoice_date": "2019-01-01T00:00:00", "billing_address": "123 Main St",
"billing_city": "Dallas", "billing_country": "USA", "billing_postal_code": "75234",
"billing_state": "Texas", "total": 0}' http://localhost:5000/api/invoices | jq
{
  "invoice_id": 413,
  "customer_id": 1,
  "invoice_date": "2019-01-01T00:00:00",
  "billing_address": "123 Main St",
  "billing_city": "Dallas",
  "billing_state": "Texas",
  "billing_country": "USA",
  "billing_postal_code": "75234",
  "total": 0
}

# update an invoice
curl -X PUT -H "Content-Type: application/json" -d \
  '{"customer_id": 2, "invoice_date": "2019-01-01T00:00:00",
  "billing_address": "123 Main St", "billing_city": "Dallas",
  "billing_country": "USA", "billing_postal_code": "75234",
  "billing_state": "Texas", "total": 53535}' \
  http://localhost:5000/api/invoices/1 | jq
{
  "invoice_id": 1,
  "customer_id": 2,
  "invoice_date": "2019-01-01T00:00:00",
  "billing_address": "123 Main St",
  "billing_city": "Dallas",
  "billing_state": "Texas",
  "billing_country": "USA",
  "billing_postal_code": "75234",
  "total": 53535
}

# delete an invoice
curl -X DELETE http://localhost:5000/api/invoices/1 | jq
{
  "1": "Deleted"
}

####################

# get list of invoice_lines
curl -s "http://localhost:5000/api/invoice-lines" | jq
{
  "rows": [
    {
      "invoice_line_id": 1,
      "invoice_id": 1,
      "track_id": 2,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 2,
      "invoice_id": 1,
      "track_id": 4,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 3,
      "invoice_id": 2,
      "track_id": 6,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 4,
      "invoice_id": 2,
      "track_id": 8,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 5,
      "invoice_id": 2,
      "track_id": 10,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 6,
      "invoice_id": 2,
      "track_id": 12,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 7,
      "invoice_id": 3,
      "track_id": 16,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 8,
      "invoice_id": 3,
      "track_id": 20,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 9,
      "invoice_id": 3,
      "track_id": 24,
      "unit_price": 0.99,
      "quantity": 1
    },
    {
      "invoice_line_id": 10,
      "invoice_id": 3,
      "track_id": 28,
      "unit_price": 0.99,
      "quantity": 1
    }
  ],
  "total": 2240
}

# get a single invoice_line by id
curl -s "http://localhost:5000/api/invoice-lines/1" | jq
{
  "invoice_line_id": 1,
  "invoice_id": 1,
  "track_id": 2,
  "unit_price": 0.99,
  "quantity": 1
}

# create an invoice_line
curl -H "Content-Type: application/json" -d '{"invoice_id": 1, "track_id": 2,
"unit_price": 0.99, "quantity": 1}' http://localhost:5000/api/invoice-lines | jq
{
  "invoice_line_id": 2241,
  "invoice_id": 1,
  "track_id": 2,
  "unit_price": 0.99,
  "quantity": 1
}

# update an invoice_line
curl -X PUT -H "Content-Type: application/json" -d '{"invoice_id": 1, "track_id": 4,
"unit_price": 10.50, "quantity": 10}' http://localhost:5000/api/invoice-lines/1 | jq
{
  "invoice_line_id": 1,
  "invoice_id": 1,
  "track_id": 4,
  "unit_price": 10.5,
  "quantity": 10
}

# delete an invoice_line
curl -X DELETE http://localhost:5000/api/invoice-lines/1 | jq
{
  "1": "Deleted"
}

####################

# get list of media types
curl -s "http://localhost:5000/api/media-types" | jq
{
  "rows": [
    {
      "media_type_id": 1,
      "name": "MPEG audio file"
    },
    {
      "media_type_id": 2,
      "name": "Protected AAC audio file"
    },
    {
      "media_type_id": 3,
      "name": "Protected MPEG-4 video file"
    },
    {
      "media_type_id": 4,
      "name": "Purchased AAC audio file"
    },
    {
      "media_type_id": 5,
      "name": "AAC audio file"
    }
  ],
  "total": 5
}

# get a single media type by id
curl -s "http://localhost:5000/api/media-types/1" | jq
{
  "media_type_id": 1,
  "name": "MPEG audio file"
}

# create a media type
curl -H "Content-Type: application/json" -d '{"name": "MPEG audio file"}' http://localhost:5000/api/media-types | jq
{
  "media_type_id": 6,
  "name": "MPEG audio file"
}

# update a media type
curl -X PUT -H "Content-Type: application/json" -d \
  '{"name": "Protected AAC audio file"}' \
  http://localhost:5000/api/media-types/1 | jq
{
  "media_type_id": 1,
  "name": "Protected AAC audio file"
}

# delete a media type
curl -X DELETE http://localhost:5000/api/media-types/1 | jq
{
  "1": "Deleted"
}

####################

# get list of playlists
curl -s "http://localhost:5000/api/playlists" | jq
{
  "rows": [
    {
      "playlist_id": 1,
      "name": "Music"
    },
    {
      "playlist_id": 2,
      "name": "Movies"
    },
    {
      "playlist_id": 3,
      "name": "TV Shows"
    },
    {
      "playlist_id": 4,
      "name": "Audiobooks"
    },
    {
      "playlist_id": 5,
      "name": "90’s Music"
    },
    {
      "playlist_id": 6,
      "name": "Audiobooks"
    },
    {
      "playlist_id": 7,
      "name": "Movies"
    },
    {
      "playlist_id": 8,
      "name": "Music"
    },
    {
      "playlist_id": 9,
      "name": "Music Videos"
    },
    {
      "playlist_id": 10,
      "name": "TV Shows"
    }
  ],
  "total": 18
}

# get a single playlist by id
curl -s "http://localhost:5000/api/playlists/1" | jq
{
  "playlist_id": 1,
  "name": "Music"
}

# create a playlist
curl -H "Content-Type: application/json" -d '{"name": "Music"}' http://localhost:5000/api/playlists | jq
{
  "playlist_id": 19,
  "name": "Music"
}

# update a playlist
curl -X PUT -H "Content-Type: application/json" -d \
  '{"name": "Movies"}' \
  http://localhost:5000/api/playlists/1 | jq
{
  "playlist_id": 1,
  "name": "Movies"
}

# delete a playlist
curl -X DELETE http://localhost:5000/api/playlists/1 | jq
{
  "1": "Deleted"
}

####################

# get list of tracks
curl -s "http://localhost:5000/api/tracks" | jq
{
  "rows": [
    {
      "track_id": 1,
      "name": "For Those About To Rock (We Salute You)",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 343719,
      "bytes": 11170334,
      "unit_price": 0.99
    },
    {
      "track_id": 2,
      "name": "Balls to the Wall",
      "album_id": 2,
      "media_type_id": 2,
      "genre_id": 1,
      "composer": "",
      "milliseconds": 342562,
      "bytes": 5510424,
      "unit_price": 0.99
    },
    {
      "track_id": 3,
      "name": "Fast As a Shark",
      "album_id": 3,
      "media_type_id": 2,
      "genre_id": 1,
      "composer": "F. Baltes, S. Kaufman, U. Dirkscneider & W. Hoffman",
      "milliseconds": 230619,
      "bytes": 3990994,
      "unit_price": 0.99
    },
    {
      "track_id": 4,
      "name": "Restless and Wild",
      "album_id": 3,
      "media_type_id": 2,
      "genre_id": 1,
      "composer": "F. Baltes, R.A. Smith-Diesel, S. Kaufman, U. Dirkscneider & W. Hoffman",
      "milliseconds": 252051,
      "bytes": 4331779,
      "unit_price": 0.99
    },
    {
      "track_id": 5,
      "name": "Princess of the Dawn",
      "album_id": 3,
      "media_type_id": 2,
      "genre_id": 1,
      "composer": "Deaffy & R.A. Smith-Diesel",
      "milliseconds": 375418,
      "bytes": 6290521,
      "unit_price": 0.99
    },
    {
      "track_id": 6,
      "name": "Put The Finger On You",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 205662,
      "bytes": 6713451,
      "unit_price": 0.99
    },
    {
      "track_id": 7,
      "name": "Let's Get It Up",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 233926,
      "bytes": 7636561,
      "unit_price": 0.99
    },
    {
      "track_id": 8,
      "name": "Inject The Venom",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 210834,
      "bytes": 6852860,
      "unit_price": 0.99
    },
    {
      "track_id": 9,
      "name": "Snowballed",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 203102,
      "bytes": 6599424,
      "unit_price": 0.99
    },
    {
      "track_id": 10,
      "name": "Evil Walks",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 263497,
      "bytes": 8611245,
      "unit_price": 0.99
    }
  ],
  "total": 3503
}

# get a single track by id
curl -s "http://localhost:5000/api/tracks/1" | jq
{
  "track_id": 1,
  "name": "For Those About To Rock (We Salute You)",
  "album_id": 1,
  "media_type_id": 1,
  "genre_id": 1,
  "composer": "Angus Young, Malcolm Young, Brian Johnson",
  "milliseconds": 343719,
  "bytes": 11170334,
  "unit_price": 0.99
}

# create a track
curl -H "Content-Type: application/json" -d '{"media_type_id": 1,
"genre_id": 1, "name": "You are not alone", "composer": "The darkness around us",
"milliseconds": 379000, "bytes": 10000000, "unit_price": 0.99}' http://localhost:5000/api/tracks | jq
{
  "track_id": 3504,
  "name": "You are not alone",
  "album_id": null,
  "media_type_id": 1,
  "genre_id": 1,
  "composer": "The darkness around us",
  "milliseconds": 379000,
  "bytes": 10000000,
  "unit_price": 0.99
}

# create a track 2 - CamelCase field and SnakeCase field and PascalCase field
curl -H "Content-Type: application/json" -d '{"media_type_id": 10,
"genreId": 1, "name": "You are not alone 2", "composer": "The darkness around us 2",
"milliseconds": 379000, "bytes": 10000000, "UnitPrice": 9.9}' http://localhost:5000/api/tracks | jq
{
  "track_id": 3504,
  "name": "You are not alone 2",
  "album_id": null,
  "media_type_id": 10,
  "genre_id": 1,
  "composer": "The darkness around us 2",
  "milliseconds": 379000,
  "bytes": 10000000,
  "unit_price": 9.9
}

# update a track
curl -X PUT -H "Content-Type: application/json" -d \
  '{"media_type_id": 1, "genre_id": 2,
  "name": "You are not alone (instrumental)", "composer": "The darkness around us",
  "milliseconds": 379000, "bytes": 10000000, "unit_price": 0.99}' \
  http://localhost:5000/api/tracks/1 | jq
{
  "track_id": 1,
  "name": "You are not alone (instrumental)",
  "album_id": 1,
  "media_type_id": 1,
  "genre_id": 2,
  "composer": "The darkness around us",
  "milliseconds": 379000,
  "bytes": 10000000,
  "unit_price": 0.99
}

# delete a track
curl -X DELETE http://localhost:5000/api/tracks/1 | jq
{
  "1": "Deleted"
}

# ----------------------------------------
# test associations
curl -s "http://localhost:5000/api/associations?model=albums&id=1&action=belongto" | jq
[
  {
    "name": "artists",
    "record": {
      "artist_id": 1,
      "name": "AC/DC"
    }
  }
]

curl -s "http://localhost:5000/api/associations?model=tracks&id=1&action=belongto" | jq
[
  {
    "name": "albums",
    "record": {
      "album_id": 1,
      "title": "For Those About To Rock We Salute You",
      "artist_id": 1
    }
  },
  {
    "name": "genres",
    "record": {
      "genre_id": 1,
      "name": "Rock"
    }
  },
  {
    "name": "media_types",
    "record": {
      "media_type_id": 1,
      "name": "MPEG audio file"
    }
  }
]

curl -s "http://localhost:5000/api/associations?model=albu1ms&id=1&action=belongto" | jq
{
  "message": "Invalid model"
}

curl -s "http://localhost:5000/api/associations?model=albums&id=1&action=hasmany" | jq
[
  {
    "name": "tracks",
    "record": {
      "rows": [
        {
          "track_id": 1,
          "name": "For Those About To Rock (We Salute You)",
          "album_id": 1,
          "media_type_id": 1,
          "genre_id": 1,
          "composer": "Angus Young, Malcolm Young, Brian Johnson",
          "milliseconds": 343719,
          "bytes": 11170334,
          "unit_price": 0.99
        },
        {
          "track_id": 2,
          "name": "Balls to the Wall",
          "album_id": 2,
          "media_type_id": 2,
          "genre_id": 1,
          "composer": "",
          "milliseconds": 342562,
          "bytes": 5510424,
          "unit_price": 0.99
        },
        {
          "track_id": 3,
          "name": "Fast As a Shark",
          "album_id": 3,
          "media_type_id": 2,
          "genre_id": 1,
          "composer": "F. Baltes, S. Kaufman, U. Dirkscneider & W. Hoffman",
          "milliseconds": 230619,
          "bytes": 3990994,
          "unit_price": 0.99
        },
        {
          "track_id": 4,
          "name": "Restless and Wild",
          "album_id": 3,
          "media_type_id": 2,
          "genre_id": 1,
          "composer": "F. Baltes, R.A. Smith-Diesel, S. Kaufman, U. Dirkscneider & W. Hoffman",
          "milliseconds": 252051,
          "bytes": 4331779,
          "unit_price": 0.99
        },
        {
          "track_id": 5,
          "name": "Princess of the Dawn",
          "album_id": 3,
          "media_type_id": 2,
          "genre_id": 1,
          "composer": "Deaffy & R.A. Smith-Diesel",
          "milliseconds": 375418,
          "bytes": 6290521,
          "unit_price": 0.99
        },
        {
          "track_id": 6,
          "name": "Put The Finger On You",
          "album_id": 1,
          "media_type_id": 1,
          "genre_id": 1,
          "composer": "Angus Young, Malcolm Young, Brian Johnson",
          "milliseconds": 205662,
          "bytes": 6713451,
          "unit_price": 0.99
        },
        {
          "track_id": 7,
          "name": "Let's Get It Up",
          "album_id": 1,
          "media_type_id": 1,
          "genre_id": 1,
          "composer": "Angus Young, Malcolm Young, Brian Johnson",
          "milliseconds": 233926,
          "bytes": 7636561,
          "unit_price": 0.99
        },
        {
          "track_id": 8,
          "name": "Inject The Venom",
          "album_id": 1,
          "media_type_id": 1,
          "genre_id": 1,
          "composer": "Angus Young, Malcolm Young, Brian Johnson",
          "milliseconds": 210834,
          "bytes": 6852860,
          "unit_price": 0.99
        },
        {
          "track_id": 9,
          "name": "Snowballed",
          "album_id": 1,
          "media_type_id": 1,
          "genre_id": 1,
          "composer": "Angus Young, Malcolm Young, Brian Johnson",
          "milliseconds": 203102,
          "bytes": 6599424,
          "unit_price": 0.99
        },
        {
          "track_id": 10,
          "name": "Evil Walks",
          "album_id": 1,
          "media_type_id": 1,
          "genre_id": 1,
          "composer": "Angus Young, Malcolm Young, Brian Johnson",
          "milliseconds": 263497,
          "bytes": 8611245,
          "unit_price": 0.99
        }
      ],
      "total": 3503
    }
  }
]


curl -s "http://localhost:5000/api/associations?model=albums&id=1&action=hasmany&limit=2&offset=50" | jq
{
  "message": "Invalid target"
}

curl -s "http://localhost:5000/api/associations?model=albums&id=1&action=hasmany&target=tracks&limit=5&offset=5" | jq
{
  "rows": [
    {
      "track_id": 6,
      "name": "Put The Finger On You",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 205662,
      "bytes": 6713451,
      "unit_price": 0.99
    },
    {
      "track_id": 7,
      "name": "Let's Get It Up",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 233926,
      "bytes": 7636561,
      "unit_price": 0.99
    },
    {
      "track_id": 8,
      "name": "Inject The Venom",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 210834,
      "bytes": 6852860,
      "unit_price": 0.99
    },
    {
      "track_id": 9,
      "name": "Snowballed",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 203102,
      "bytes": 6599424,
      "unit_price": 0.99
    },
    {
      "track_id": 10,
      "name": "Evil Walks",
      "album_id": 1,
      "media_type_id": 1,
      "genre_id": 1,
      "composer": "Angus Young, Malcolm Young, Brian Johnson",
      "milliseconds": 263497,
      "bytes": 8611245,
      "unit_price": 0.99
    }
  ],
  "total": 3503
}
