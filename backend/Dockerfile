FROM php:8.2-apache as base
WORKDIR /var/www/html

COPY . .

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN sed -ri 's/^www-data:x:82:82:/www-data:x:1000:50:/' /etc/passwd
RUN chown -R www-data:www-data /var/www/html

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

EXPOSE 80