apt-get update
apt-get install -y apt-utils
apt-get install -y locales
locale-gen en_US.UTF-8
echo "export LANG=en_US.UTF-8" >> /root/.bashrc
echo "export LANGUAGE=en_US:en" >> /root/.bashrc
echo "export LC_ALL=en_US.UTF-8" >> /root/.bashrc
apt-get install -y vim
apt-get install -y python3-setuptools
apt-get install -y software-properties-common
apt-add-repository -y ppa:zanchey/asciinema
apt-get update
apt-get install -y asciinema
apt-get install -y clips
