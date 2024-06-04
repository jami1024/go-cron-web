# go-cron-web

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
