FROM amazonlinux:2

# Install build dependencies for Python
RUN yum update -y \
    && yum groupinstall -y "Development Tools" \
    && yum erase openssl-devel -y \
    && yum install openssl11 openssl11-devel  libffi-devel bzip2-devel wget -y \
    && yum clean all

RUN wget https://www.python.org/ftp/python/3.11.0/Python-3.11.0.tgz \
    && tar xf Python-3.11.0.tgz \
    && cd Python-3.11.0 \
    && ./configure \
    && make altinstall \
    && cd .. \
    && rm -rf Python-3.11.0 Python-3.11.0.tgz

# Upgrade pip and install virtualenv
RUN yum install -y python3-pip 

# Set up Venv
RUN python3 -m venv base
RUN source base/bin/activate

RUN python3 -m pip install pydantic_core -t ./python

# Install dependencies
COPY ./requirements.txt .
RUN python3 -m pip install -r requirements.txt -t ./python

# Zip it up for deployment
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l" ]