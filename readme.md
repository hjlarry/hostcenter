### What to do?

* Edit your host convenient
* Quick switch hosts like develop environment, product environment , and their free combination
* Furthermore , you can use the hosts we provide to across the gfw to learning & working


### Demo




### Download



### Build your own

Clone first :

    git clone https://github.com/hjlarry/hostcenter.git

To run the laravel server :

    cd hostcenter
    composer install
    cp .env.example .env //edit config
    php artisan migrate
    
To build the clients :

    cd electron
    npm install
    npm run dev  //or npm run build