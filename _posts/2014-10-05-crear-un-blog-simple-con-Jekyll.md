---
layout: post
title:  "Como crear un blog simple cpn Jekyll"
date:   2014-10-05 17:58:10
categories: tutoriales jekyll github
---

En el primer post explicaré como montar un blog sencillo con Jekyll, primero necesitan crear una cuenta en [github][github], luego crean un [nrepositorio][nuevo repositorio] al cual deben llamar `mi_usuario.github.io` en el cual reemplazan `mi_usuario` por el nombre de usuario de github.

Luego configuran el acceso a github desde la terminal:
{% highlight bash %}
git config --global color.ui true
git config --global user.name "nombre de usuario"
git config --global user.email "tu dirección de correo"
ssh-keygen -t rsa -C "tu dirección de correo"
{% endhighlight %}

Deben pegar el contenido de la llave en [clavessh][este enlace], la llave se encuentra en `home/.ssh/id_rsa.pub` y para ver su contenido pueden ejecutar `cat ~/.ssh/id_rsa.pub`, cuando hayan realizado esto escriben en la terminal.
{% highlight bash %}
ssh -T git@github.com
{% endhighlight %}

[github]:	https://github.com
[nrepositorio]: https://github.com/new
[clavessh]: https://github.com/settings/ssh