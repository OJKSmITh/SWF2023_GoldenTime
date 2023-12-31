#!/usr/bin/env bash

# nginx 설치
apt install nginx -y

systemctl enable nginx

NGINX_CONF="/etc/nginx/sites-available/default"

WEB_SOCKET_CONF=$(cat << 'EOF'
location ~* \.io {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy false;

    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
EOF
)

# nginx 설정
cp $NGINX_CONF $NGINX_CONF.bak
sed -i '74,91d' $NGINX_CONF
sed -i 's|root /var/www/html;||g' $NGINX_CONF
sed -i 's|index index.html index.htm index.nginx-debian.html;||g' $NGINX_CONF
sed -i 's|location / {|location / {\n\t\tproxy_set_header HOST $host;\n\t\tproxy_pass http://127.0.0.1:3000;\n\t\tproxy_redirect off;|' $NGINX_CONF
sed -i 's|try_files $uri $uri/ =404;||g' $NGINX_CONF
sed "55r /dev/stdin" $NGINX_CONF <<< "$WEB_SOCKET_CONF" > temp && sudo mv temp $NGINX_CONF

systemctl restart nginx

cat <<EOF >> /home/ubuntu/nodejs.sh
#!/usr/bin/env bash

# node lts 버전 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts

# npm 최신 버전 설치
npm install -g npm@latest

# pm2 설치
npm install pm2 -g

# 테스트 파일 다운로드 후 실행
mkdir /home/ubuntu/www && cd /home/ubuntu/www
curl -O https://raw.githubusercontent.com/cloudcoke/script/main/react_project_script/server.js
export HOSTNAME=$(hostname -f)
pm2 start server.js
EOF

su - ubuntu -c "bash /home/ubuntu/nodejs.sh"

# mysql client 설치
apt install mysql-client -y
