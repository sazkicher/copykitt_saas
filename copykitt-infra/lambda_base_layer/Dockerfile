FROM amazonlinux:2

# Habilitar el repositorio de Amazon Linux Extras y listar los paquetes disponibles
RUN amazon-linux-extras enable python3.8 && \
    yum clean metadata && \
    yum install -y python3.8 python3-pip zip && \
    yum clean all

# Configurar PIP y Virtualenv
RUN python3.8 -m pip install --upgrade pip && \
    python3.8 -m pip install virtualenv

# Crear y activar un entorno virtual
RUN python3.8 -m venv /env
ENV PATH="/env/bin:$PATH"

# Copiar e instalar las dependencias
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Crear un archivo ZIP para la implementación
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]


# FROM amazonlinux:2

# # Install Python
# RUN yum install -y python310 && \
#     yum install -y python3-pip && \
#     yum install -y zip && \
#     yum clean all

# # Set up PIP and Venv
# RUN python3.10 -m pip install --upgrade pip && \
#     python3.10 -m pip install virtualenv
# RUN python3.10 -m venv base
# RUN source base/bin/activate

# # Install dependencies
# COPY ./requirements.txt .
# RUN pip install -r requirements.txt -t ./python

# # Zip it up for deployment.
# RUN zip -r layer.zip ./python/
# ENTRYPOINT ["/bin/bash", "-l"]

# @DhrutiDilipbhaiPatel