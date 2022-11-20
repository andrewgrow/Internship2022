 - Create a private certificate into src/config/certs:
```shell
ssh-keygen -t rsa -b 4096 -m PEM -q -N "" -f server_certificate.pem
```

- Create a public certificate into src/config/certs:
```shell
openssl rsa -in server_certificate.pem -pubout -outform PEM -out server_certificate.pem.pub
```
