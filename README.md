# go-cron-web
## 该项目是[go-cron](https://github.com/jami1024/go-cron-web)前端页面
## Configure the backend service address
```
# 配置后端地址和端口
cat src/service/config/index.ts
...
if (import.meta.env.PROD) {
  BASE_URL = 'http://xxxxx'
} else {
  // 正确配置后端服务地址和端口
  BASE_URL = 'http://go-cron-server:8181'
}
...
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### docker
``` 
# 构建docker镜像
docker build -t go-cron-web:latest .

# 运行docker镜像
docker run -d -p 80:80 go-cron-web:latest 
```
