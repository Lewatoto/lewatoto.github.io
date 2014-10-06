---
layout: post
comments: True
title:  "Como crear un blog simple con Jekyll"
date:   2014-10-05 17:58:11
categories: tutoriales jekyll
---

En el primer post explicaré como montar un blog sencillo con Jekyll, tal vez no sea la mejor forma de hacerlo pero este es el método que utilicé para crear este blog.

##Preparando el repositorio
Primero necesitan crear una cuenta en [github] [github], luego crean un [nuevo repositorio][nrepositorio] al cual deben llamar `mi_usuario.github.io` en el cual reemplazan `mi_usuario` por el nombre de usuario de github.

Luego configuran el acceso a github desde la terminal:
{% highlight bash %}
git config --global color.ui true
git config --global user.name "nombre de usuario"
git config --global user.email "dirección de correo"
ssh-keygen -t rsa -C "dirección de correo"
{% endhighlight %}

Deben pegar el contenido de la llave en [este enlace][clavessh], la llave se encuentra en `home/.ssh/id_rsa.pub` y para ver su contenido pueden ejecutar `cat ~/.ssh/id_rsa.pub`, cuando hayan realizado esto escriben en la terminal.
{% highlight bash %}
ssh -T git@github.com
{% endhighlight %}
En la terminal deberían de ver un mesaje parecido al siguiente:
{% highlight bash %}
Hi Lewatoto! You've successfully authenticated, but GitHub does not provide shell access.
{% endhighlight %}
Con esto ya configurado clonan su repositorio con el siguiente comando:
{% highlight bash %}
git clone https://github.com/mi_usuario/mi_usuario.github.io.git
{% endhighlight %}

##Instalando Jekyll
Para instalar Jekyll deben instalar las siguientes dependencias, pueden buscar un tutorial que se adapte a la distribución que estén utilizando:

+   Ruby.
+   RubyGems.
+   NodeJS u otro runtime de JavaScript.

Una vez instaladas las dependencias ejecutan los siguiente:
{% highlight bash %}
gem install jekyll
rbenv rehash  # Si usas rbenv, rehash para poder ejecutar el comando 
{% endhighlight %}

Para crear el sitio escriben:
{% highlight bash %}
jekyll new mi_usuario.github.io
{% endhighlight %}

Esto creará los archivos necesarios para su blog, por el momento los archivos y directorios que vamos a utilizar son:

+   `_config.yml` Es el archivo de configuración de su sitio.
+ `_post` Es la carpeta en la que deben agregar los archivos que serán las entradas en el blog.

##Configurando el blog

En el archivo `_config.yml`se configura lo siguiente:

+   `title`: El título del blog.
+   `email`: Por si desean mostrar su correo electrónico.
+   `description`: La descripción del blog.
+   `baseurl`: La ubicación del blog, por si lo está en alguna carpeta dentro de su repositorio, por ejemplo `/blog/`.
+   `url`: La dirección de su blog, en este caso es "http://mi_usuario.github.io"
+   `twitter_username`: El nombre de su usuario en twitter.
+   `github_username`: El nombre de su usuario en github.

##Publicando entradas
Para publicar entradas deben crear un archivo nuevo en la carpeta `_post` con el formato `YYYY-MM-DD-nombre-de-la-entrada.ext` en donde ext es la extensión del archivo que puede ser .markdown o .md, pueden aprender lo básico de esta sintáxis pueden ver este [enlace][manualmd], un ejemplo de esto puede ser:
{% highlight bash %}
---
layout: post
title:  "Mi primera publicación"
date:   2014-10-05 17:58:11
categories: blog
---

Mi primera entrada
-------------------

Esta es la primera publicación en mi nuevo blog.
{% endhighlight %}

En donde se `layout` define si es una entrada o es una página (estás deben ir en la carpeta raíz), el título de la entrada, la fecha de publicación y las categorías de la entrada.

##Subiendo el blog a github

En la terminal deben colocarse dentro de la carpeta con el comando:

{% highlight bash %}
cd mi_usuario.github.io/
#luego deben ejecutar lo siguiente
git add --all
git commit -m "pueden ponder cualquier comentario"
git push origin master
{% endhighlight %}

Les pediran su nombre de usuario de github y su contraseña, si todo funciona bien, deverían de ver algo parecido a esto.

{% highlight bash %}
lewatoto.github.io$ git push origin master 
Username for 'https://github.com': Lewatoto
Password for 'https://Lewatoto@github.com': 
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 554 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To https://github.com/Lewatoto/lewatoto.github.io.git
   8576c7f..8b2e4a0  master -> master
{% endhighlight %}

Si todo ha salido bien pueden ingresar en su blog, entrando en la dirección [http://mi_usuario.github.io/](http://lewatoto.github.io/), este es el método que utilice para crear este blog, iré publicando mas tutoriales conforme aprenda mas sobre esto, por el momento aquí termina la primera entrada.

[github]:	https://github.com
[nrepositorio]: https://github.com/new
[clavessh]: https://github.com/settings/ssh
[manualmd]: http://daringfireball.net/projects/markdown/basics