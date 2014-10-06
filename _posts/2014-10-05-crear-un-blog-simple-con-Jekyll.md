---
layout: post
title:  "Como crear un blog simple con Jekyll"
date:   2014-10-05 17:58:11
categories: tutoriales jekyll github
---

En el primer post explicaré como montar un blog sencillo con Jekyll, tal vez no sea la mejor forma de hacerlo pero este es el método que utilicé para crear este blog.

Primero necesitan crear una cuenta en [github] [github], luego crean un [nuevo repositorio][nrepositorio] al cual deben llamar `mi_usuario.github.io` en el cual reemplazan `mi_usuario` por el nombre de usuario de github.

Luego configuran el acceso a github desde la terminal:
{% highlight bash %}
git config --global color.ui true
git config --global user.name "nombre de usuario"
git config --global user.email "tu dirección de correo"
ssh-keygen -t rsa -C "tu dirección de correo"
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
Para instalar Jekyll deben instalar las siguientes dependencias, pueden buscar un tutorial que se adapte a la distribución que estén utilizando:
- Ruby
- RubyGems
- NodeJS u otro runtime de JavaScript


[github]:	https://github.com
[nrepositorio]: https://github.com/new
[clavessh]: https://github.com/settings/ssh